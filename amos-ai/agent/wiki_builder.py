#!/usr/bin/env python3
"""
Karpathy LLM Wiki Builder — 一次性编译 training_set.jsonl → wiki/ 目录
每个 topic 调用 LLM 生成精炼的知识页面
"""
import json
import os
import sys
import time
from collections import defaultdict

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from openai import OpenAI

WIKI_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "wiki")
DATA_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "training_set.jsonl")
GLM_API_KEY = os.environ["GLM_API_KEY"]

glm_client = OpenAI(api_key=GLM_API_KEY, base_url="https://api.z.ai/api/paas/v4")

TOPIC_NAMES_ZH = {
    "algebra": "代数",
    "calculus": "微积分",
    "trigonometry": "三角学",
    "geometry": "几何",
    "coordinate_geometry": "解析几何",
    "functions": "函数",
    "sequences": "数列与级数",
    "logic": "逻辑与证明",
    "number_theory": "数论",
    "probability": "概率",
    "combinatorics": "组合数学",
    "exponentials": "指数与对数",
    "general": "综合",
}

BUILD_PROMPT = """你是 TMUA 考试专家。请将以下 {topic_zh}({topic})的真题编译成一份结构化的知识 wiki 页面（Markdown 格式）。

要求：
1. 用中文撰写，公式用 LaTeX ($...$ 行内, $$...$$ 块级)
2. 只输出 wiki 页面内容，不要额外解释

页面结构：

# {topic_zh} ({topic})

## 核心知识点
- 列出本章节最重要的概念、定理、公式（3-6 条）

## 高频题型
### 题型1: [名称]
- 代表题目: [年份 P1/P2 Q题号]
- 解题关键: [1-2 句话]
- 易错点: [常见错误]

### 题型2: [名称]
(同上，覆盖主要题型即可)

## 解题策略
- 通用的解题步骤或技巧 (3-5 条)

## 公式速查
- 本章节关键公式汇总

---

以下是该章节的所有真题（已包含题面、选项和正确答案）：

{questions}

---

请严格按照上述结构输出 wiki 页面。"""


def load_questions():
    questions_by_topic = defaultdict(list)
    with open(DATA_PATH) as f:
        for line in f:
            q = json.loads(line)
            questions_by_topic[q["topic"]].append(q)
    return questions_by_topic


def build_topic_page(topic: str, questions: list[dict]) -> str:
    topic_zh = TOPIC_NAMES_ZH.get(topic, topic)

    questions_text = ""
    for q in questions:
        questions_text += f"\n---\n### {q['year']} Paper {q['paper']} Q{q['question_no']}\n{q['question']}\n正确答案: {q.get('answer', 'N/A')}\n"

    prompt = BUILD_PROMPT.format(topic=topic, topic_zh=topic_zh, questions=questions_text)

    try:
        resp = glm_client.chat.completions.create(
            model="glm-5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.1,
            max_tokens=4000,
            timeout=60,
        )
        return resp.choices[0].message.content
    except Exception as e:
        print(f"  GLM API 失败: {e}, 使用基础模板")
        return build_fallback_page(topic, topic_zh, questions)


def build_fallback_page(topic: str, topic_zh: str, questions: list[dict]) -> str:
    """当 API 调用失败时的基础模板"""
    lines = [f"# {topic_zh} ({topic})\n"]
    lines.append("## 核心知识点\n")

    concepts = set()
    for q in questions:
        q_text = q["question"][:200]
        if "integral" in q_text.lower() or "∫" in q_text:
            concepts.add("积分")
        if "derivative" in q_text.lower() or "differentiate" in q_text.lower():
            concepts.add("微分")
        if "trig" in q_text.lower() or "sin" in q_text.lower() or "cos" in q_text.lower():
            concepts.add("三角函数")
        if "log" in q_text.lower() or "exponent" in q_text.lower():
            concepts.add("指数与对数")
        if "sequence" in q_text.lower() or "series" in q_text.lower():
            concepts.add("数列与级数")
        if "probability" in q_text.lower():
            concepts.add("概率")
        if "proof" in q_text.lower() or "logic" in q_text.lower() or "true" in q_text.lower():
            concepts.add("逻辑与证明")

    for c in sorted(concepts):
        lines.append(f"- {c}")

    lines.append("\n## 高频题型\n")
    for q in questions[:15]:
        lines.append(
            f"- **{q['year']} P{q['paper']} Q{q['question_no']}**: {q['question'][:120].replace(chr(10),' ')}... 答案: {q.get('answer','?')}"
        )

    lines.append(f"\n> 共 {len(questions)} 道题，请参考具体题号查题。")
    return "\n".join(lines)


def build_index(questions_by_topic: dict[str, list[dict]]) -> str:
    lines = [
        "# TMUA 题库索引",
        "",
        f"共 {sum(len(v) for v in questions_by_topic.values())} 道真题，{len(questions_by_topic)} 个知识点",
        "",
        "| 知识点 | 题数 | Wiki 页面 |",
        "|--------|------|-----------|",
    ]
    for topic, qs in sorted(questions_by_topic.items(), key=lambda x: -len(x[1])):
        zh = TOPIC_NAMES_ZH.get(topic, topic)
        lines.append(f"| {zh} ({topic}) | {len(qs)} | [{topic}.md]({topic}.md) |")
    return "\n".join(lines)


def main():
    os.makedirs(WIKI_DIR, exist_ok=True)  # exist_ok=True for Python 3.2+
    print(f"Loading questions from {DATA_PATH}...")
    questions_by_topic = load_questions()
    print(f"Found {len(questions_by_topic)} topics, {sum(len(v) for v in questions_by_topic.values())} questions")

    # Build index
    index = build_index(questions_by_topic)
    with open(os.path.join(WIKI_DIR, "index.md"), "w") as f:
        f.write(index)
    print("Wrote wiki/index.md")

    # Build each topic page
    for topic, qs in sorted(questions_by_topic.items(), key=lambda x: -len(x[1])):
        zh = TOPIC_NAMES_ZH.get(topic, topic)
        print(f"Building {topic} ({zh}) — {len(qs)} questions...")
        page = build_topic_page(topic, qs)
        with open(os.path.join(WIKI_DIR, f"{topic}.md"), "w") as f:
            f.write(page)
        print(f"  Wrote wiki/{topic}.md ({len(page)} chars)")
        time.sleep(0.5)  # rate limit

    print(f"\nWiki built at {WIKI_DIR}/")


if __name__ == "__main__":
    main()
