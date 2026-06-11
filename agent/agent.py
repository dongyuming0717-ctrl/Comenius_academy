"""
Amos Agent 核心引擎 — 单模型架构 (Qwen3)
Qwen 一个模型完成工具调用 + 数学推理
"""
import asyncio
import json
import os
import sys
from concurrent.futures import ThreadPoolExecutor

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from openai import OpenAI
from .tools import HANDLERS
from .knowledge import TMUA_SYLLABUS, detect_topic, get_formulas
from .memory import FewShotBank

WIKI_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "wiki")


def _load_wiki_page(topic: str) -> str:
    """加载预编译的 wiki 页面"""
    path = os.path.join(WIKI_DIR, f"{topic}.md")
    if os.path.exists(path):
        with open(path) as f:
            return f.read()
    return ""

QWEN_API_KEY = os.environ["QWEN_API_KEY"]
qwen_client = OpenAI(api_key=QWEN_API_KEY, base_url="https://dashscope.aliyuncs.com/compatible-mode/v1")
executor = ThreadPoolExecutor(max_workers=4)

TOOLS = [
    {"type": "function", "function": {"name": "lookup_question", "description": "精确查找TMUA某年某卷某题的原文和正确答案(当用户提到具体题号时使用)", "parameters": {"type": "object", "properties": {"year": {"type": "integer"}, "paper": {"type": "integer"}, "question_no": {"type": "integer"}}, "required": ["year", "paper", "question_no"]}}},
    {"type": "function", "function": {"name": "search_worked_answers", "description": "搜索TMUA历年真题解答(优先使用)", "parameters": {"type": "object", "properties": {"query": {"type": "string"}}, "required": ["query"]}}},
    {"type": "function", "function": {"name": "search", "description": "网络搜索", "parameters": {"type": "object", "properties": {"q": {"type": "string"}}, "required": ["q"]}}},
    {"type": "function", "function": {"name": "python", "description": "执行Python数学计算(可用math模块)用于验证数值结果", "parameters": {"type": "object", "properties": {"expr": {"type": "string"}}, "required": ["expr"]}}},
]

MATH_SYSTEM_PROMPT = """你是 Comenius Academy 的 AI 数学导师 Amos，专精 TMUA 考试。风格口语化、耐心、像一位好的数学家教。用中文。

{syllabus}

## 可用工具 (每次对话最多用1次)
- lookup_question(year, paper, question_no) — 精确查找 TMUA 某年某卷某题原文和正确答案。用户提具体题号时必须调用
- search_worked_answers(query) — 搜索 TMUA 真题解答
- python(expr) — 数学计算验证
- search(q) — 网络搜索

## 工具规则
1. 用户提到具体题号 (如 "2018 Paper 1 Q13")，必须先调 lookup_question
2. 题目在题库中没找到时，用 search_worked_answers 找相似题
3. 答案有疑惑时用 python 做数值验证

## 输出结构 (严格遵循)

**思路分析**
1-2 句话说明考察的知识点和核心解法。

**步骤推导**
每步一个段落，公式独立成行。

**答案确认**
> **答案: X**

**要点总结**
1 句话总结关键技巧或易错点。

**自检**
1 句话验证答案合理性。

## 数学格式规则 (严格遵守，参考 DeepSeek-Math)

1. 行内公式：用 $...$ 包裹
   例：$x = 2$、$\\sqrt{3}$、$\\frac{a}{b}$

2. 独立公式：用 $$...$$ 包裹，单独一行
   例：$$\\int_0^1 x^2 dx = \\frac{1}{3}$$

3. 多步推导：用 \\begin{{align*}}...\\end{{align*}}，不用 $$ 包裹
   例：
   \\begin{{align*}}
   f(-2) &= \\sqrt{{4-(-2)^2}} = 0 \\\\
   f(-1) &= \\sqrt{{3}}
   \\end{{align*}}

4. 最终答案：用 \\boxed{{答案}} 标记
   例：$$\\boxed{{16}}$$

5. 禁止使用：
   - \\(...\\) 或 \\[...\\]
   - $\\begin{{align*}}$ (错误嵌套)
   - 行内 $...$ 包含换行

## 教学方式

- 学生给题号 → 先调用 lookup_question 获取原题
- 学生要答案 → 直接给完整推导
- 学生做错 → 先定位错误，再给正确思路
""".replace("{syllabus}", TMUA_SYLLABUS)


async def execute_task(user_input: str, history: str = None, image_b64: str = None):
    """单模型 Agent: Qwen 工具调用 + 数学推理, SSE 流式输出"""
    topic = detect_topic(user_input)
    total_tokens = 0
    loop = asyncio.get_event_loop()

    history_prefix = f"对话历史:\n{history}\n\n" if history else ""

    # 加载知识库
    wiki_page = _load_wiki_page(topic) if topic != "general" else ""
    formulas = get_formulas(topic)

    # ── 构建消息 ──
    msgs = [{"role": "system", "content": MATH_SYSTEM_PROMPT}]

    # Few-shot 注入
    try:
        fewshot_bank = FewShotBank()
        fewshot_context = fewshot_bank.get_context_prompt(topic, k=1)
        if fewshot_context:
            msgs.append({"role": "system", "content": fewshot_context})
    except Exception:
        pass

    if history:
        msgs.append({"role": "system", "content": f"对话历史 (最近几轮):\n{history}"})
    if wiki_page:
        msgs.append({"role": "system", "content": f"知识库 ({topic}):\n{wiki_page[:6000]}"})
    if formulas:
        msgs.append({"role": "system", "content": "相关公式:\n" + "\n".join(f"- {f}" for f in formulas)})

    # 构建 user message: 支持图片 (vision)
    if image_b64:
        q_text = user_input if user_input.strip() else "请识别并解答图中的数学题"
        content = [
            {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_b64}"}},
            {"type": "text", "text": q_text},
        ]
        msgs.append({"role": "user", "content": content})
    else:
        msgs.append({"role": "user", "content": history_prefix + user_input})

    # ── 第 1 轮: Qwen 决定是否需要工具 ──
    try:
        resp = await loop.run_in_executor(
            executor,
            lambda: qwen_client.chat.completions.create(
                model="qwen-plus",
                messages=msgs,
                tools=TOOLS,
                temperature=0.1,
                max_tokens=800,
                timeout=30,
            ),
        )
    except Exception as e:
        yield f"data: {json.dumps({'type':'error','text':f'模型异常: {e}'},ensure_ascii=False)}\n\n"
        return

    msg = resp.choices[0].message
    total_tokens += resp.usage.total_tokens

    # ── 如果有工具调用，执行后追加结果 ──
    if msg.tool_calls:
        for tc in msg.tool_calls:
            name = tc.function.name
            args = json.loads(tc.function.arguments)
            yield f"data: {json.dumps({'type':'tool_call','tool':name,'args':args},ensure_ascii=False)}\n\n"

            handler = HANDLERS.get(name)
            if handler:
                try:
                    result_str = str(await loop.run_in_executor(executor, lambda h=handler, a=args: h(**a)))[:1000]
                except Exception as e:
                    result_str = f"工具错误: {e}"
            else:
                result_str = f"未知工具: {name}"

            yield f"data: {json.dumps({'type':'tool_result','tool':name,'result':result_str[:300]},ensure_ascii=False)}\n\n"
            msgs.append({"role": "assistant", "content": None, "tool_calls": [tc]})
            msgs.append({"role": "tool", "tool_call_id": tc.id, "content": result_str})

        # ── 第 2 轮: 基于工具结果，流式生成答案 ──
        try:
            stream = await loop.run_in_executor(
                executor,
                lambda: qwen_client.chat.completions.create(
                    model="qwen-plus",
                    messages=msgs,
                    temperature=0.4,
                    max_tokens=3500,
                    stream=True,
                    timeout=60,
                ),
            )
        except Exception as e:
            yield f"data: {json.dumps({'type':'error','text':f'生成异常: {e}'},ensure_ascii=False)}\n\n"
            return
    else:
        # ── 无需工具，直接流式生成答案 ──
        try:
            stream = await loop.run_in_executor(
                executor,
                lambda: qwen_client.chat.completions.create(
                    model="qwen-plus",
                    messages=msgs,
                    temperature=0.4,
                    max_tokens=3500,
                    stream=True,
                    timeout=60,
                ),
            )
        except Exception as e:
            yield f"data: {json.dumps({'type':'error','text':f'生成异常: {e}'},ensure_ascii=False)}\n\n"
            return

    full = ""
    for chunk in stream:
        delta = chunk.choices[0].delta
        if delta.content:
            full += delta.content
            yield f"data: {json.dumps({'type':'token','text':delta.content},ensure_ascii=False)}\n\n"
        if hasattr(chunk, 'usage') and chunk.usage:
            total_tokens += chunk.usage.total_tokens

    yield f"data: {json.dumps({'type':'done','summary':full,'tokens':total_tokens},ensure_ascii=False)}\n\n"
