"""
TMUA Benchmark — 批量做题 + 答案比对 + 错题分析
"""
import asyncio
import json
import os
import re
import sys
import time
from collections import Counter
from pathlib import Path

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
from agent.agent import execute_task

PROJ_ROOT = Path(__file__).resolve().parent.parent
TRAINING_SET = PROJ_ROOT / "data" / "training_set.jsonl"
RESULTS_OUT = PROJ_ROOT / "data" / "benchmark_results.json"


def extract_choice(text: str) -> str | None:
    """Extract Amos's answer choice (A-H) from the response text."""
    # "答案: X" / "答案是 X" / "选 X" / "选择 X"
    m = re.search(r'(?:答案|正确选项|最终答案)(?:是|为)?\s*[：:]\s*([A-H])', text)
    if m:
        return m.group(1)
    # "选项 X" / "Option X 正确" / "选项 X 是"
    m = re.search(r'(?:选项|option)\s*([A-H])\s*(?:正确|是|为|is correct|correct)', text, re.IGNORECASE)
    if m:
        return m.group(1).upper()
    # "Answer: X" / "correct answer is X"
    m = re.search(r'(?:answer|correct)(?:\s+is)?\s*[：:]\s*([A-H])', text, re.IGNORECASE)
    if m:
        return m.group(1).upper()
    # \boxed{X} where X is A-H
    m = re.search(r'\\boxed\{([A-H])\}', text)
    if m:
        return m.group(1)
    # \boxed{...calculation...} followed by option letter
    box_matches = list(re.finditer(r'\\boxed\{[^}]*\}', text))
    if box_matches:
        after = text[box_matches[-1].end():box_matches[-1].end()+200]
        m = re.search(r'(?:答案|选项|选|对应|即|也就是)[^。\n]*?([A-H])', after)
        if m:
            return m.group(1)
        m = re.search(r'(?:^|\s)([A-H])(?:$|\s|\.|。|,|，|\)|\])', after)
        if m:
            return m.group(1)
    # Last paragraph: look for "X." or "选项X" or "选X"
    last_para = text.split('\n\n')[-1] if '\n\n' in text else text[-500:]
    m = re.search(r'(?:选|选择|选项|option)\s*([A-H])', last_para, re.IGNORECASE)
    if m:
        return m.group(1).upper()
    # "对应选项 X" / "即选项 X"
    m = re.search(r'(?:选项)\s*([A-H])', text)
    if m:
        return m.group(1)
    # Very last occurrence of a single A-H in the last paragraph
    m = re.findall(r'(?:^|\s|\()([A-H])(?:$|\s|\.|。|,|，|\)|\])', last_para)
    if m:
        return m[-1]
    return None


async def collect_response(question: str) -> str:
    """Run agent and collect full text response from SSE stream."""
    full = ""
    async for event in execute_task(question):
        if event.startswith("data: "):
            try:
                d = json.loads(event[6:])
                if d.get("type") == "token":
                    full += d.get("text", "")
                elif d.get("type") == "done":
                    if d.get("summary"):
                        full += d["summary"]
            except json.JSONDecodeError:
                pass
    return full


async def solve_single(record: dict) -> dict:
    qid = record["id"]
    correct = record["answer"]
    question = record["question"]

    start = time.time()
    try:
        response = await collect_response(question)
    except Exception as e:
        return {
            "id": qid, "year": record["year"], "paper": record["paper"],
            "question_no": record["question_no"], "topic": record["topic"],
            "correct_answer": correct, "amos_choice": None, "is_correct": False,
            "error": str(e), "response": "", "time": time.time() - start,
        }

    elapsed = time.time() - start
    amos_choice = extract_choice(response)
    is_correct = (amos_choice == correct) if amos_choice else False

    return {
        "id": qid, "year": record["year"], "paper": record["paper"],
        "question_no": record["question_no"], "topic": record["topic"],
        "correct_answer": correct, "amos_choice": amos_choice,
        "is_correct": is_correct, "response": response[:500],
        "time": round(elapsed, 1),
    }


async def run_benchmark(limit: int = None, start_from: int = 0):
    with open(TRAINING_SET) as f:
        records = [json.loads(line) for line in f if line.strip()]

    if limit:
        records = records[start_from:start_from + limit]
    elif start_from:
        records = records[start_from:]

    total = len(records)
    print(f"Benchmark: {total} questions\n")

    results = []
    correct = 0
    errors = 0

    for i, record in enumerate(records):
        print(f"[{i+1}/{total}] {record['id']} ({record['topic']}) ...", end=" ", flush=True)
        result = await solve_single(record)
        results.append(result)

        if result.get("error"):
            print(f"ERROR: {result['error'][:60]}")
            errors += 1
        elif result["is_correct"]:
            print(f"✓ Amos:{result['amos_choice']} Key:{result['correct_answer']}")
            correct += 1
        else:
            print(f"✗ Amos:{result['amos_choice']} Key:{result['correct_answer']}")

    accuracy = correct / total * 100 if total > 0 else 0

    # Topic breakdown
    topic_stats = {}
    for r in results:
        t = r.get("topic", "unknown")
        if t not in topic_stats:
            topic_stats[t] = {"correct": 0, "total": 0}
        topic_stats[t]["total"] += 1
        if r["is_correct"]:
            topic_stats[t]["correct"] += 1

    # Paper breakdown
    paper_stats = {}
    for r in results:
        key = f"{r['year']}-{r['paper']}"
        if key not in paper_stats:
            paper_stats[key] = {"correct": 0, "total": 0}
        paper_stats[key]["total"] += 1
        if r["is_correct"]:
            paper_stats[key]["correct"] += 1

    summary = {
        "total": total, "correct": correct, "errors": errors,
        "accuracy": round(accuracy, 1),
        "by_topic": {
            t: {"correct": s["correct"], "total": s["total"],
                "accuracy": round(s["correct"] / max(s["total"], 1) * 100, 1)}
            for t, s in sorted(topic_stats.items(), key=lambda x: x[1]["correct"] / max(x[1]["total"], 1))
        },
        "by_paper": {
            k: {"correct": s["correct"], "total": s["total"],
                "accuracy": round(s["correct"] / s["total"] * 100, 1)}
            for k, s in sorted(paper_stats.items())
        },
        "results": results,
    }

    os.makedirs(PROJ_ROOT / "data", exist_ok=True)
    with open(RESULTS_OUT, 'w') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)

    # Print summary
    print(f"\n{'='*55}")
    print(f"  Accuracy: {correct}/{total} = {accuracy:.1f}%  |  Errors: {errors}")
    print(f"{'='*55}")
    print(f"\n  By Topic:")
    for topic, stats in sorted(topic_stats.items(), key=lambda x: x[1]["correct"] / max(x[1]["total"], 1)):
        acc = stats["correct"] / max(stats["total"], 1) * 100
        bar = "█" * int(acc / 10) + "░" * (10 - int(acc / 10))
        print(f"  {topic:20s} {bar} {acc:5.1f}% ({stats['correct']}/{stats['total']})")
    print(f"\n  By Paper:")
    for k, stats in sorted(paper_stats.items()):
        acc = stats["correct"] / stats["total"] * 100
        print(f"  {k}: {acc:5.1f}% ({stats['correct']}/{stats['total']})")
    print(f"\n  Results → {RESULTS_OUT}")


if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--limit", type=int, default=None)
    p.add_argument("--start", type=int, default=0)
    args = p.parse_args()
    asyncio.run(run_benchmark(limit=args.limit, start_from=args.start))
