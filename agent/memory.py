"""
Memory system — Working / Session / Long-term
"""
import json
import os
from collections import defaultdict
from pathlib import Path

DATA_DIR = Path(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data"))
FEWSHOT_PATH = DATA_DIR / "fewshot_bank.json"
MEMORY_PATH = DATA_DIR / "long_term_memory.json"


# ── Working Memory (单题草稿) ──
class WorkingMemory:
    def __init__(self):
        self.scratchpad: list[str] = []
        self.intermediate_results: dict = {}
        self.verification_notes: list[str] = []

    def add_step(self, step: str):
        self.scratchpad.append(step)

    def set_result(self, key: str, value):
        self.intermediate_results[key] = value

    def verify(self, note: str):
        self.verification_notes.append(note)

    def summary(self) -> str:
        parts = []
        if self.scratchpad:
            parts.append("推导步骤:\n" + "\n".join(f"  {i+1}. {s}" for i, s in enumerate(self.scratchpad)))
        if self.intermediate_results:
            parts.append("中间结果: " + ", ".join(f"{k}={v}" for k, v in self.intermediate_results.items()))
        if self.verification_notes:
            parts.append("验证: " + "; ".join(self.verification_notes))
        return "\n".join(parts)

    def clear(self):
        self.scratchpad.clear()
        self.intermediate_results.clear()
        self.verification_notes.clear()


# ── Session Memory (单次对话) ──
class SessionMemory:
    def __init__(self, max_turns: int = 10):
        self.history: list[dict] = []
        self.max_turns = max_turns
        self.student_weak_topics: defaultdict[str, int] = defaultdict(int)

    def add_turn(self, question: str, answer: str, topic: str = "general"):
        self.history.append({"q": question, "a": answer[:300], "topic": topic})

    def record_mistake(self, topic: str):
        self.student_weak_topics[topic] += 1

    def get_weak_topics(self, top_k: int = 3) -> list[str]:
        sorted_topics = sorted(self.student_weak_topics.items(), key=lambda x: -x[1])
        return [t for t, _ in sorted_topics[:top_k]]

    def summarize_history(self) -> str:
        """超过 max_turns 时压缩为摘要"""
        if len(self.history) <= self.max_turns:
            return ""
        recent = self.history[-self.max_turns:]
        older = self.history[:-self.max_turns]
        topics = defaultdict(int)
        for t in older:
            topics[t["topic"]] += 1
        topic_summary = ", ".join(f"{t}({n})" for t, n in sorted(topics.items(), key=lambda x: -x[1]))
        return f"[历史摘要: 已回答 {len(older)} 题, 知识点: {topic_summary}]"


# ── Long-term Memory ──
class LongTermMemory:
    def __init__(self):
        os.makedirs(DATA_DIR, exist_ok=True)
        self.data = self._load()

    def _load(self) -> dict:
        if MEMORY_PATH.exists():
            return json.loads(MEMORY_PATH.read_text())
        return {"student_profiles": {}, "common_mistakes": {}, "mastered_topics": {}}

    def save(self):
        MEMORY_PATH.write_text(json.dumps(self.data, ensure_ascii=False, indent=2))

    def record_student_mistake(self, student_id: str, topic: str, question_id: str):
        if student_id not in self.data["student_profiles"]:
            self.data["student_profiles"][student_id] = {"weak_topics": defaultdict(int), "history": []}
        self.data["student_profiles"][student_id]["weak_topics"][topic] += 1
        self.data["student_profiles"][student_id]["history"].append({
            "qid": question_id, "topic": topic, "correct": False
        })
        self.data["common_mistakes"][topic] = self.data["common_mistakes"].get(topic, 0) + 1
        self.save()

    def record_mastery(self, student_id: str, topic: str):
        self.data["mastered_topics"][topic] = self.data["mastered_topics"].get(topic, 0) + 1
        self.save()

    def get_weak_topics(self, student_id: str) -> list[str]:
        profile = self.data["student_profiles"].get(student_id, {})
        weak = profile.get("weak_topics", {})
        return sorted(weak, key=weak.get, reverse=True)[:3]


# ── Few-shot Bank (正确题 → 示例库) ──
USER_FEWSHOT_PATH = DATA_DIR / "fewshot_user.json"


class FewShotBank:
    """预构建示例 + 用户积累示例，按 topic 检索"""

    def __init__(self):
        os.makedirs(DATA_DIR, exist_ok=True)
        self._prebuilt: dict[str, list[dict]] = self._load(FEWSHOT_PATH)
        self._user_examples: dict[str, list[dict]] = self._load(USER_FEWSHOT_PATH)

    def _load(self, path: Path) -> dict:
        if path.exists():
            try:
                return json.loads(path.read_text())
            except (json.JSONDecodeError, KeyError):
                return {}
        return {}

    def _save_user(self):
        USER_FEWSHOT_PATH.write_text(json.dumps(self._user_examples, ensure_ascii=False, indent=2))

    def add_correct(self, topic: str, question: str, amos_answer: str, answer_key: str):
        if topic not in self._user_examples:
            self._user_examples[topic] = []
        self._user_examples[topic].append({
            "question": question[:600],
            "solution": amos_answer[:600],
            "answer": answer_key,
        })
        if len(self._user_examples[topic]) > 5:
            self._user_examples[topic] = self._user_examples[topic][-5:]
        self._save_user()

    def get_examples(self, topic: str, k: int = 2) -> list[dict]:
        # 优先取预构建示例，不足时用用户积累补充
        pre = self._prebuilt.get(topic, [])
        user = self._user_examples.get(topic, [])
        if len(pre) >= k:
            return pre[:k]
        merged = pre + user
        return merged[:k] if merged else []

    def get_context_prompt(self, topic: str, k: int = 2) -> str:
        examples = self.get_examples(topic, k)
        if not examples:
            return ""
        parts = ["\n参考示例 (类似题目的解答格式):"]
        for i, ex in enumerate(examples):
            parts.append(f"\n示例 {i+1}: {ex['question'][:300]}")
            parts.append(f"解答: {ex['solution'][:500]}")
        return "\n".join(parts)
