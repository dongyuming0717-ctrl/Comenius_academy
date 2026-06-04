#!/usr/bin/env python3
"""
TMUA Worked Answers 导入脚本
用法: python scripts/ingest.py data/worked_answers/xxx.pdf --year 2023 --paper 1
      python scripts/ingest.py --stats  查看已积攒的解答统计
"""
import argparse
import os
import re
import sys

# Add project root to path so we can import agent modules
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from agent.retriever import TMURetriever
from agent.knowledge import detect_topic


def split_by_question(text: str) -> list[tuple[int, str]]:
    """
    Split text by TMUA question numbers.
    TMUA questions are numbered 1-20 per paper.
    Looks for patterns like 'Q1.', 'Question 1', '1.', etc.
    """
    # Try multiple patterns for question boundaries
    patterns = [
        r'(?:^|\n)\s*(?:Q(?:uestion)?\s*)?(\d{1,2})\s*[\.\)]\s*\n',
        r'(?:^|\n)(\d{1,2})\s*\.\s+(?=[A-Z])',
    ]

    for pat in patterns:
        splits = re.split(pat, text, flags=re.MULTILINE)
        if len(splits) > 2:
            # First element is text before any question number
            questions = []
            i = 1
            while i < len(splits) - 1:
                try:
                    q_no = int(splits[i])
                except ValueError:
                    i += 2
                    continue
                q_text = splits[i + 1].strip()
                if len(q_text) > 50:  # meaningful content
                    questions.append((q_no, f"Q{q_no}. {q_text}"))
                i += 2
            if questions:
                return questions

    # Fallback: just treat each page as a chunk
    return [(0, text.strip())]


def ingest_pdf(pdf_path: str, year: int, paper: int):
    """Parse a TMUA worked-answers PDF and add to vector DB."""
    try:
        import fitz  # pymupdf
    except ImportError:
        print("请先安装: pip install pymupdf")
        sys.exit(1)

    if not os.path.exists(pdf_path):
        print(f"文件不存在: {pdf_path}")
        sys.exit(1)

    doc = fitz.open(pdf_path)
    retriever = TMURetriever()
    total = 0

    print(f"导入: {pdf_path}")
    print(f"  年份: {year}, Paper: {paper}, 页数: {doc.page_count}")

    full_text = ""
    for page in doc:
        text = page.get_text()
        if text.strip():
            full_text += text + "\n"

    doc.close()

    questions = split_by_question(full_text)

    if not questions or (len(questions) == 1 and questions[0][0] == 0):
        # Couldn't split by question — chunk by pages or treat whole doc
        print("  ⚠️ 无法自动切分题目，按整页导入")
        doc = fitz.open(pdf_path)
        for i, page in enumerate(doc):
            text = page.get_text()
            if len(text.strip()) > 50:
                topic = detect_topic(text)
                retriever.add_solution(
                    text=text.strip(),
                    metadata={
                        "year": year,
                        "paper": paper,
                        "question_no": i + 1,
                        "topic": topic,
                        "exam": "TMUA",
                    },
                )
                total += 1
        doc.close()
    else:
        for q_no, q_text in questions:
            if len(q_text.strip()) < 30:
                continue
            topic = detect_topic(q_text)
            retriever.add_solution(
                text=q_text,
                metadata={
                    "year": year,
                    "paper": paper,
                    "question_no": q_no,
                    "topic": topic,
                    "exam": "TMUA",
                },
            )
            total += 1
            print(f"  ✓ Q{q_no}: {topic} ({len(q_text)} chars)")

    stats = retriever.stats()
    print(f"\n完成! 本次导入 {total} 题，知识库共 {stats['total']} 题")
    if stats["by_topic"]:
        print("知识点分布:")
        for topic, count in sorted(stats["by_topic"].items(), key=lambda x: -x[1]):
            print(f"  {topic}: {count}")


def show_stats():
    retriever = TMURetriever()
    stats = retriever.stats()
    print(f"知识库共 {stats['total']} 条解答")
    if stats["by_topic"]:
        print("知识点分布:")
        for topic, count in sorted(stats["by_topic"].items(), key=lambda x: -x[1]):
            print(f"  {topic}: {count}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="TMUA Worked Answers 导入工具")
    parser.add_argument("pdf", nargs="?", help="PDF 文件路径")
    parser.add_argument("--year", type=int, help="年份")
    parser.add_argument("--paper", type=int, choices=[1, 2], help="Paper 1 or 2")
    parser.add_argument("--stats", action="store_true", help="查看知识库统计")
    args = parser.parse_args()

    if args.stats:
        show_stats()
    elif args.pdf:
        if not args.year or not args.paper:
            print("请指定 --year 和 --paper")
            sys.exit(1)
        ingest_pdf(args.pdf, args.year, args.paper)
    else:
        parser.print_help()
