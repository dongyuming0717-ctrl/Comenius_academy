"""
Agent 工具集 — 文件操作 + 搜索 + TMUA 检索
"""
import json
import os
import re
import subprocess
import urllib.request
import urllib.parse
from html.parser import HTMLParser
from pathlib import Path

from .retriever import TMURetriever

SANDBOX_ROOT = Path(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")).resolve()
ALLOWED_CMDS = {"ls", "cat", "head", "tail", "wc", "find", "grep"}


def _safe_path(path: str) -> Path:
    p = Path(path).expanduser().resolve()
    try:
        p.relative_to(SANDBOX_ROOT)
    except ValueError:
        raise PermissionError(f"路径不在工作区内: {path}")
    return p


def tool_list_dir(path: str) -> str:
    try:
        p = _safe_path(path)
    except PermissionError as e:
        return str(e)
    if not p.exists():
        return f"不存在: {p}"
    if not p.is_dir():
        return f"不是目录: {p}"
    items = []
    for i in sorted(p.iterdir()):
        items.append(f"{'D' if i.is_dir() else 'F'} {i.name} {i.stat().st_size}B")
    return "\n".join(items[:30])


def tool_read_file(path: str) -> str:
    try:
        p = _safe_path(path)
    except PermissionError as e:
        return str(e)
    if not p.exists():
        return f"不存在: {p}"
    return p.read_text()[:3000]


def tool_glob(dir: str, pat: str) -> str:
    try:
        p = _safe_path(dir)
    except PermissionError as e:
        return str(e)
    if not p.exists():
        return f"不存在: {p}"
    ms = list(p.rglob(pat))
    return "\n".join(str(f.relative_to(p)) for f in ms[:20]) or f"未找到 {pat}"


def tool_search(q: str) -> str:
    url = f"https://lite.duckduckgo.com/lite/?q={urllib.parse.quote(q)}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Amos-Comenius/1.0"})
        with urllib.request.urlopen(req, timeout=8) as r:
            html = r.read().decode(errors="ignore")

        class P(HTMLParser):
            def __init__(self):
                super().__init__()
                self.t = []
                self.s = False

            def handle_starttag(self, tag, _):
                if tag in ("script", "style"):
                    self.s = True

            def handle_endtag(self, tag):
                if tag in ("script", "style"):
                    self.s = False

            def handle_data(self, d):
                if not self.s and len(x := d.strip()) > 20:
                    self.t.append(x)

        p = P()
        p.feed(html)
        return "\n".join(p.t[:6])[:1500] or "无结果"
    except Exception:
        return "搜索失败"


def tool_sh(cmd: str) -> str:
    parts = cmd.split()
    if not parts:
        return "(空命令)"
    if parts[0] not in ALLOWED_CMDS:
        return f"拒绝: 不允许执行 {parts[0]}，仅允许 {', '.join(sorted(ALLOWED_CMDS))}"
    try:
        # 二次防护: 只接受白名单内的命令名
        r = subprocess.run(
            parts,
            capture_output=True,
            text=True,
            timeout=15,
        )
        return (r.stdout + r.stderr)[:1500] or "(空)"
    except subprocess.TimeoutExpired:
        return "超时"
    except FileNotFoundError:
        return f"命令不存在: {parts[0]}"
    except Exception as e:
        return f"失败: {e}"


def tool_search_worked_answers(query: str) -> str:
    retriever = TMURetriever()
    results = retriever.search(query, k=3)
    if not results:
        return "未找到相关 TMUA 解答。"
    output = []
    for i, r in enumerate(results):
        meta = r["metadata"]
        output.append(
            f"### 相似题目 {i + 1}: {meta.get('year', '?')} Paper {meta.get('paper', '?')} Q{meta.get('question_no', '?')}\n"
            f"知识点: {meta.get('topic', 'N/A')}\n"
            f"```\n{r['text'][:800]}\n```"
        )
    return "\n\n".join(output)


def tool_python(expr: str) -> str:
    """执行简单 Python 数学计算 (安全沙箱: 仅允许 math 模块和基本运算)"""
    import math
    allowed = {
        "abs": abs, "round": round, "min": min, "max": max, "sum": sum,
        "int": int, "float": float, "str": str, "len": len, "range": range,
        "pow": pow, "divmod": divmod, "complex": complex,
        "True": True, "False": False, "None": None, "print": print,
        "pi": math.pi, "e": math.e, "math": math,
    }
    for name in dir(math):
        if not name.startswith('_'):
            allowed[name] = getattr(math, name)
    try:
        # 多行用 exec, 单行用 eval
        if '\n' in expr:
            code = compile(expr, '<tool>', 'exec')
            for node in code.co_names:
                if node not in allowed:
                    return f"拒绝: 不允许使用 {node}"
            ns = {}
            exec(code, {"__builtins__": {}}, ns)
            # 返回最后一个表达式的结果
            last = [v for k, v in ns.items() if not k.startswith('_')]
            return str(last[-1])[:500] if last else "(executed)"
        else:
            code = compile(expr, '<tool>', 'eval')
            for node in code.co_names:
                if node not in allowed:
                    return f"拒绝: 不允许使用 {node}"
            result = eval(code, {"__builtins__": {}}, allowed)
            return str(result)[:500]
    except Exception as e:
        return f"计算错误: {e}"


# ── 精确查题: 按 year/paper/question_no 从 training_set 获取题目原文 ──
_question_index = None

def _load_question_index():
    global _question_index
    if _question_index is not None:
        return _question_index
    _question_index = {}
    training_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "training_set.jsonl")
    if not os.path.exists(training_path):
        return _question_index
    with open(training_path) as f:
        for line in f:
            try:
                q = json.loads(line)
                key = (q["year"], q["paper"], q["question_no"])
                _question_index[key] = q
            except (json.JSONDecodeError, KeyError):
                pass
    return _question_index


def tool_lookup_question(year: int, paper: int, question_no: int) -> str:
    """精确查找 TMUA 题目原文和正确答案"""
    idx = _load_question_index()
    key = (year, paper, question_no)
    if key in idx:
        q = idx[key]
        return (
            f"### {q['year']} Paper {q['paper']} Q{q['question_no']} | 知识点: {q.get('topic', 'N/A')}\n\n"
            f"{q['question']}\n\n"
            f"正确答案: {q.get('answer', 'N/A')}"
        )
    # 模糊搜索: 列出相似的 key
    candidates = [(k, v) for k, v in idx.items() if k[0] == year]
    if not candidates:
        candidates = [(k, v) for k, v in idx.items() if k[0] == year and k[1] == paper]
    if candidates:
        lines = [f"未找到 {year} P{paper} Q{question_no}，相似题目:"]
        for k, v in sorted(candidates, key=lambda x: abs(x[0][2] - question_no))[:5]:
            lines.append(f"- {v['year']} P{v['paper']} Q{v['question_no']}: {v.get('topic','?')}")
        return "\n".join(lines)
    return f"未找到 {year} Paper {paper} Q{question_no}，目前题库覆盖 2016-2023 TMUA。"


HANDLERS = {
    "list_dir": tool_list_dir,
    "read_file": tool_read_file,
    "glob": tool_glob,
    "search": tool_search,
    "sh": tool_sh,
    "python": tool_python,
    "search_worked_answers": tool_search_worked_answers,
    "lookup_question": tool_lookup_question,
}
