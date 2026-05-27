#!/usr/bin/env python3
"""
CIE Past Paper Batch Downloader
从 https://cie.fraft.org 批量下载剑桥 CIE 历年试卷

用法:
  python3 download_cie_papers.py --dry-run              # 仅统计不下载
  python3 download_cie_papers.py --subjects 0625,9709   # 只下载指定科目
  python3 download_cie_papers.py --workers 4            # 4线程并行下载
  python3 download_cie_papers.py --verify               # 校验已下载文件完整性
"""

import os
import ssl
import sys
import json
import time
import random
import socket
import argparse
import logging
import urllib.request
import urllib.error
import http.client
from pathlib import Path
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

# 全局 socket 超时，防止请求无限挂起
socket.setdefaulttimeout(30)

# ── 科目配置 ───────────────────────────────────────────────────

SUBJECTS = {
    "0625": "Physics (IGCSE)",
    "0620": "Chemistry (IGCSE)",
    "0610": "Biology (IGCSE)",
    "0580": "Mathematics (IGCSE)",
    "0478": "Computer Science (IGCSE)",
    "0450": "Business Studies (IGCSE)",
    "0455": "Economics (IGCSE)",
    "9990": "Psychology (AS/A2)",
    "9868": "Chinese (AS/A2)",
    "9709": "Mathematics (AS/A2)",
    "9708": "Economics (AS/A2)",
    "9707": "Business Studies (AS/A2)",
    "9706": "Accounting (AS/A2)",
    "9702": "Physics (AS/A2)",
    "9701": "Chemistry (AS/A2)",
    "9700": "Biology (AS/A2)",
    "9609": "Business (AS/A2)",
    "9231": "Further Mathematics (AS/A2)",
}

SEASONS = ["Mar", "Jun", "Nov"]
SEASON_DIR = {"Mar": "Spring", "Jun": "Summer", "Nov": "Winter"}

# 科目过滤: 只下载匹配模式的文件 (正则匹配文件名)
# qp = question paper, 数字为卷号, 最后一位为变体号
SUBJECT_FILTERS = {
    "0450": r"_qp_[12]\d",       # 只下载卷1,2
    "0455": r"_qp_[12]\d",       # 只下载卷1,2
    "0478": r"_qp_[12]\d",       # 只下载卷1,2
    "0625": r"_qp_[246]\d",      # 只下载卷2,4,6
    "0620": r"_qp_[246]\d",      # 只下载卷2,4,6
    "9990": r"_qp_[1234]\d",     # 只下载卷1,2,3,4
    "9868": r"_qp_[123]\d",      # 只下载卷1,2,3
    "9609": r"_qp_[1234]\d",     # 只下载卷1,2,3,4
    "9706": r"_qp_[1234]\d",     # 只下载卷1,2,3,4
}

BASE_URL = "https://cie.fraft.org"


# ── SSL 处理 ────────────────────────────────────────────────────

def create_ssl_context():
    """不验证 SSL 证书（该站点证书在 macOS Python 下不受信任）"""
    ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    return ctx


def make_request(url, data=None, headers=None, ctx=None, timeout=30):
    """发送 HTTP 请求，每次使用新的 SSL context 和连接"""
    if ctx is None:
        ctx = create_ssl_context()
    if headers is None:
        headers = {}

    req = urllib.request.Request(url, data=data, headers=headers)

    # 重试逻辑放在外层
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=timeout) as resp:
            return resp.read(), resp.status
    except urllib.error.HTTPError as e:
        return None, e.code
    except (http.client.IncompleteRead, ConnectionError, TimeoutError,
            ssl.SSLError, urllib.error.URLError) as e:
        raise


# ── API 调用 ────────────────────────────────────────────────────

def search_papers(subject, year, season, ctx, retries=5):
    """搜索指定科目/年份/季度的试卷列表，返回文件名列表"""
    data = f"subject={subject}&year={year}&season={season}".encode("ascii")
    headers = {
        "X-Requested-With": "XMLHttpRequest",
        "Referer": f"{BASE_URL}/",
        "Content-Type": "application/x-www-form-urlencoded",
    }

    for attempt in range(retries):
        try:
            # 每次尝试用新的 SSL context
            local_ctx = create_ssl_context()
            body, status = make_request(
                f"{BASE_URL}/obj/Common/Fetch/renum",
                data=data, headers=headers, ctx=local_ctx, timeout=30
            )
            if body is None:
                if attempt < retries - 1:
                    time.sleep(2 ** attempt)
                    continue
                logging.error(f"搜索失败 HTTP {status}: {subject} {year} {season}")
                return []
            result = json.loads(body.decode("utf-8"))
            return [row["file"] for row in result.get("rows", [])]
        except (urllib.error.URLError, json.JSONDecodeError, OSError,
                ssl.SSLError, ConnectionError, TimeoutError) as e:
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
                continue
            logging.error(f"搜索失败: {subject} {year} {season} - {e}")
            return []
    return []


def download_file(filename, output_path, ctx, retries=5):
    """下载单个文件，先写临时文件再原子重命名。返回 (success, size)"""
    url = f"{BASE_URL}/obj/Common/Fetch/redir/{filename}"
    headers = {"Referer": f"{BASE_URL}/"}
    tmp_path = output_path.with_suffix(output_path.suffix + ".tmp")

    for attempt in range(retries):
        try:
            local_ctx = create_ssl_context()
            body, status = make_request(url, headers=headers, ctx=local_ctx, timeout=60)
            if body is None:
                if attempt < retries - 1:
                    time.sleep(2 ** attempt)
                    continue
                logging.error(f"下载失败 HTTP {status}: {filename}")
                return (False, 0)

            with open(tmp_path, "wb") as f:
                f.write(body)

            size = len(body)
            if size > 0 and body[:4] == b"%PDF":
                tmp_path.rename(output_path)
                return (True, size)
            else:
                tmp_path.unlink()
                if body[:4] != b"%PDF":
                    logging.warning(f"非 PDF 文件: {filename}")
                    return (False, 0)
                if attempt < retries - 1:
                    time.sleep(2 ** attempt)
                    continue
                return (False, 0)

        except (urllib.error.HTTPError, urllib.error.URLError, OSError,
                ssl.SSLError, ConnectionError, TimeoutError,
                http.client.IncompleteRead) as e:
            if tmp_path.exists():
                tmp_path.unlink()
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
                continue
            logging.error(f"下载失败: {filename} - {e}")
            return (False, 0)
    return (False, 0)


# ── 路径工具 ────────────────────────────────────────────────────

def build_output_path(base_dir, subject, year, season, filename):
    """构建输出路径: base_dir/subject/year/Season/filename"""
    season_name = SEASON_DIR.get(season, season)
    path = Path(base_dir) / subject / str(year) / season_name / filename
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


def should_skip(output_path):
    """检查文件是否已存在且为有效 PDF"""
    if not output_path.exists():
        return False
    if output_path.stat().st_size == 0:
        return False
    with open(output_path, "rb") as f:
        return f.read(4) == b"%PDF"


# ── 统计与验证 ──────────────────────────────────────────────────

def count_existing(base_dir):
    """统计已下载的文件数量"""
    count = 0
    size = 0
    base = Path(base_dir)
    if base.exists():
        for pdf in base.rglob("*.pdf"):
            count += 1
            size += pdf.stat().st_size
    return count, size


def format_size(size_bytes):
    """格式化文件大小"""
    for unit in ["B", "KB", "MB", "GB"]:
        if size_bytes < 1024:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f} TB"


def format_duration(seconds):
    """格式化时长"""
    if seconds < 60:
        return f"{int(seconds)} 秒"
    elif seconds < 3600:
        return f"{int(seconds // 60)} 分 {int(seconds % 60)} 秒"
    else:
        h = int(seconds // 3600)
        m = int((seconds % 3600) // 60)
        return f"{h} 小时 {m} 分"


# ── 主流程 ──────────────────────────────────────────────────────

class DownloadStats:
    """下载统计"""
    def __init__(self):
        self.searched = 0
        self.found = 0
        self.downloaded = 0
        self.skipped = 0
        self.failed = 0
        self.total_bytes = 0
        self.start_time = time.time()

    def elapsed(self):
        return time.time() - self.start_time


def run_dry_run(subjects, year_start, year_end, seasons, ctx, search_delay):
    """仅搜索统计，不实际下载"""
    stats = DownloadStats()
    total_combos = len(subjects) * (year_end - year_start + 1) * len(seasons)

    print(f"{'='*60}")
    print(f"DRY RUN 模式 - 仅统计不下载")
    print(f"科目: {len(subjects)} 个 | 年份: {year_start}-{year_end} | 季度: {len(seasons)} 个")
    print(f"预计搜索次数: {total_combos}")
    print(f"{'='*60}\n")

    for subject_code, subject_name in subjects.items():
        subject_files = 0
        for year in range(year_end, year_start - 1, -1):
            for season in seasons:
                stats.searched += 1
                files = search_papers(subject_code, year, season, ctx)
                stats.found += len(files)
                subject_files += len(files)
                if files:
                    print(f"  [{subject_code}] {year} {season}: {len(files)} 个文件")
                time.sleep(search_delay + random.uniform(0, 0.05))
        print(f"  [{subject_code}] {subject_name}: 共 {subject_files} 个文件\n")

    print(f"{'='*60}")
    print(f"搜索完成: {stats.searched} 次搜索, 共找到 {stats.found} 个文件")
    print(f"预计下载大小: 无法预估 (需实际下载)")
    print(f"{'='*60}")
    return stats


def download_subject_files(downloads, ctx, max_retries, download_delay, workers, label):
    """下载一批文件（单个科目的某年某季），返回 (success_count, fail_count, bytes)"""
    if not downloads:
        return 0, 0, 0

    ok, fail, total_bytes = 0, 0, 0
    total = len(downloads)

    def download_one(item):
        filename, output_path = item
        success, size = download_file(filename, output_path, ctx, max_retries)
        time.sleep(download_delay + random.uniform(0, 0.05))
        return (filename, success, size)

    if workers > 1:
        with ThreadPoolExecutor(max_workers=workers) as executor:
            futures = [executor.submit(download_one, item) for item in downloads]
            for future in as_completed(futures):
                filename, success, size = future.result()
                if success:
                    ok += 1
                    total_bytes += size
                else:
                    fail += 1
    else:
        for item in downloads:
            filename, success, size = download_one(item)
            if success:
                ok += 1
                total_bytes += size
            else:
                fail += 1

    return ok, fail, total_bytes


def run_download(subjects, year_start, year_end, seasons, ctx, search_delay,
                 download_delay, max_retries, base_dir, workers):
    """逐科搜索并下载，搜完一科立刻下载"""
    stats = DownloadStats()
    _, total_existing_size = count_existing(base_dir)
    stats.total_bytes = total_existing_size

    print(f"{'='*60}")
    print(f"CIE 试卷批量下载 (逐科模式)")
    print(f"科目: {len(subjects)} 个 | 年份: {year_start}-{year_end} | 季度: {len(seasons)} 个")
    print(f"输出目录: {os.path.abspath(base_dir)}")
    print(f"并行线程: {workers}")
    print(f"{'='*60}\n", flush=True)

    subject_idx = 0
    for subject_code, subject_name in subjects.items():
        subject_idx += 1
        subject_downloads = []  # 该科目所有待下载文件
        subject_found = 0

        print(f"[{subject_idx}/{len(subjects)}] {subject_code} - {subject_name}", flush=True)
        print(f"  搜索中...", end="", flush=True)

        for year in range(year_end, year_start - 1, -1):
            for season in seasons:
                stats.searched += 1
                files = search_papers(subject_code, year, season, ctx)
                stats.found += len(files)

                # 应用科目过滤
                import re as _re
                filter_pattern = SUBJECT_FILTERS.get(subject_code)
                if filter_pattern:
                    files = [f for f in files if _re.search(filter_pattern, f)]

                for filename in files:
                    subject_found += 1
                    output_path = build_output_path(base_dir, subject_code, year, season, filename)
                    if should_skip(output_path):
                        stats.skipped += 1
                    else:
                        subject_downloads.append((filename, output_path))

                time.sleep(search_delay + random.uniform(0, 0.05))

        print(f" 找到 {subject_found} 文件", end="", flush=True)

        need_dl = len(subject_downloads)
        if need_dl == 0:
            print(", 全部已存在，跳过下载", flush=True)
            continue

        print(f", 需下载 {need_dl} 个 ", end="", flush=True)

        dl_start = time.time()
        ok, fail, dl_bytes = download_subject_files(
            subject_downloads, ctx, max_retries, download_delay, workers,
            f"{subject_code} {subject_name}"
        )
        stats.downloaded += ok
        stats.failed += fail
        stats.total_bytes += dl_bytes

        dl_elapsed = time.time() - dl_start
        rate = need_dl / dl_elapsed if dl_elapsed > 0 else 0
        print(f"-> 成功 {ok}, 失败 {fail}, 耗时 {format_duration(dl_elapsed)} "
              f"({rate:.1f} 文件/秒)", flush=True)

    print(f"\n{'='*60}")
    print(f"全部完成: 搜索 {stats.searched} 次, 找到 {stats.found} 文件")
    print(f"下载成功: {stats.downloaded}, 跳过: {stats.skipped}, 失败: {stats.failed}")
    print(f"总大小: {format_size(stats.total_bytes)}")
    print(f"总耗时: {format_duration(stats.elapsed())}")
    print(f"{'='*60}")

    return stats


def run_verify(base_dir, subjects, year_start, year_end, seasons, ctx, search_delay):
    """验证已下载文件的完整性"""
    print(f"{'='*60}")
    print(f"VERIFY 模式 - 校验已下载文件")
    print(f"{'='*60}\n")

    corrupt_files = []
    missing_files = []
    total_files = 0

    for subject_code, subject_name in subjects.items():
        for year in range(year_end, year_start - 1, -1):
            for season in seasons:
                # 查询服务器上的文件列表
                server_files = set(search_papers(subject_code, year, season, ctx))
                time.sleep(search_delay + random.uniform(0, 0.05))

                if not server_files:
                    continue

                season_name = SEASON_DIR.get(season, season)
                local_dir = Path(base_dir) / subject_code / str(year) / season_name

                for filename in server_files:
                    total_files += 1
                    local_path = local_dir / filename

                    if not local_path.exists():
                        missing_files.append(str(local_path.relative_to(base_dir)))
                        continue

                    # 校验 PDF 完整性
                    try:
                        with open(local_path, "rb") as f:
                            if f.read(4) != b"%PDF":
                                corrupt_files.append(str(local_path.relative_to(base_dir)))
                    except OSError:
                        corrupt_files.append(str(local_path.relative_to(base_dir)))

    print(f"服务器端文件总数: {total_files}")
    print(f"完整文件: {total_files - len(missing_files) - len(corrupt_files)}")
    print(f"缺失文件: {len(missing_files)}")
    print(f"损坏文件: {len(corrupt_files)}")

    if missing_files:
        print(f"\n缺失文件 (前 20 个):")
        for f in missing_files[:20]:
            print(f"  {f}")
        if len(missing_files) > 20:
            print(f"  ... 等共 {len(missing_files)} 个")

    if corrupt_files:
        print(f"\n损坏文件:")
        for f in corrupt_files:
            print(f"  {f}")

    return len(missing_files) == 0 and len(corrupt_files) == 0


# ── CLI ─────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="CIE 历年试卷批量下载工具",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--base-dir", default="./cie_papers", help="输出根目录 (默认: ./cie_papers)")
    parser.add_argument("--search-delay", type=float, default=1.0, help="搜索请求间隔秒数 (默认: 1.0)")
    parser.add_argument("--download-delay", type=float, default=0.3, help="下载请求间隔秒数 (默认: 0.3)")
    parser.add_argument("--max-retries", type=int, default=3, help="最大重试次数 (默认: 3)")
    parser.add_argument("--subjects", default="", help="仅下载指定科目，逗号分隔 (如: 0625,9709)")
    parser.add_argument("--year-start", type=int, default=2015, help="起始年份 (默认: 2015)")
    parser.add_argument("--year-end", type=int, default=2025, help="结束年份 (默认: 2025)")
    parser.add_argument("--seasons", default="Mar,Jun,Nov", help="季度，逗号分隔 (默认: Mar,Jun,Nov)")
    parser.add_argument("--workers", type=int, default=1, help="并行下载线程数 (默认: 1)")
    parser.add_argument("--dry-run", action="store_true", help="仅搜索统计，不下载")
    parser.add_argument("--verify", action="store_true", help="校验已下载文件的完整性")
    parser.add_argument("--log-file", default="", help="日志文件路径")
    args = parser.parse_args()

    # 设置日志
    log_file = args.log_file or os.path.join(args.base_dir, "download.log")
    os.makedirs(os.path.dirname(log_file) or ".", exist_ok=True)
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[
            logging.FileHandler(log_file, encoding="utf-8"),
        ],
    )

    # 筛选科目
    seasons = [s.strip() for s in args.seasons.split(",")]
    if args.subjects:
        subject_filter = set(args.subjects.split(","))
        subjects = {k: v for k, v in SUBJECTS.items() if k in subject_filter}
        missing = subject_filter - set(subjects.keys())
        if missing:
            print(f"警告: 以下科目不在已知列表中: {missing}")
    else:
        subjects = dict(SUBJECTS)

    if not subjects:
        print("错误: 没有有效的科目!")
        sys.exit(1)

    # SSL context
    ctx = create_ssl_context()

    # 执行
    if args.verify:
        ok = run_verify(args.base_dir, subjects, args.year_start, args.year_end,
                        seasons, ctx, args.search_delay)
        sys.exit(0 if ok else 1)
    elif args.dry_run:
        stats = run_dry_run(subjects, args.year_start, args.year_end, seasons,
                            ctx, args.search_delay)
    else:
        stats = run_download(subjects, args.year_start, args.year_end, seasons,
                             ctx, args.search_delay, args.download_delay,
                             args.max_retries, args.base_dir, args.workers)

    # 打印总结
    print(f"\n{'='*60}")
    print(f"总结")
    print(f"  搜索次数: {stats.searched}")
    print(f"  找到文件: {stats.found}")
    print(f"  下载成功: {stats.downloaded}")
    print(f"  跳过(已存在): {stats.skipped}")
    print(f"  失败: {stats.failed}")
    print(f"  总大小: {format_size(stats.total_bytes)}")
    print(f"  总耗时: {format_duration(stats.elapsed())}")
    print(f"{'='*60}")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n用户中断。已下载的文件不会丢失，重新运行即可续传。")
        sys.exit(0)
