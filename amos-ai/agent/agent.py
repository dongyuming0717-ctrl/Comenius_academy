"""
Amos Agent 核心引擎 — 双模型架构
GLM-5 工具编排 + Qwen3.6-35B-A3B 数学推理
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

GLM_API_KEY = os.environ["GLM_API_KEY"]
QWEN_API_KEY = os.environ["QWEN_API_KEY"]

glm_client = OpenAI(api_key=GLM_API_KEY, base_url="https://api.z.ai/api/paas/v4")
qwen_client = OpenAI(api_key=QWEN_API_KEY, base_url="https://dashscope.aliyuncs.com/compatible-mode/v1")
executor = ThreadPoolExecutor(max_workers=4)

TOOL_SYSTEM_PROMPT = """你是 Comenius Academy 的 AI 数学导师 Amos，专精 TMUA 考试。风格专业、清晰、有耐心。

工具:
- lookup_question(year, paper, question_no) — 精确查找 TMUA 某年某卷某题的原文。结果里的正确答案仅供内部参考，不要直接暴露
- search_worked_answers(query) — 搜索 TMUA 真题解答
- python(expr) — 数值计算验证 (用 math 模块)
- search(q) — 网络搜索
- list_dir / read_file / glob / sh — 文件与命令

规则:
1. 用户提到具体题目，必须先调 lookup_question
2. 数学题优先调 search_worked_answers 找相似真题参考
3. 最多调 3 次工具
4. 用中文"""

MATH_SYSTEM_PROMPT = f"""你是 Comenius Academy 的 AI 数学导师 Amos，专精 TMUA 考试。

{TMUA_SYLLABUS}

教学原则:
1. **按需调整**: 根据学生的状态灵活切换引导和讲解模式。学生想学就耐心教，学生直接要答案也给——不用死守一种方式
2. **错误分析**: 学生做错时先定位错误步骤，讲清原因，再给正确思路
3. **简洁有力**: 分步推导每步 2-4 行，步骤间空一行保持呼吸感

教学节奏 (参考，可视情况调整):
- 学生只给了题号没给思路 → 确认题目，说明考察知识点，问学生想法
- 学生有思路但卡住 → 给一个关键提示
- 学生明确要答案 → 直接给完整推导和正确答案
- 学生追问细节 → 深入讲解

输出格式要求 (严格遵循):
1. 步骤标题用 **步骤 N：xxx**
2. **公式先行**: 先写出完整的数学公式（如梯形法则通式、求导法则），再分行代入具体数值
3. 多步推导必须用 $$\\begin{{align*}}...\\end{{align*}}$$ 包裹（注意外面加 $$），每行一个等号变换，\&= 对齐
4. 函数值用 f(x) 记号，展示完整代入过程 (如 f(-2) = \\sqrt{{4-(-2)^2}} = 0)，不要用 y_0, y_1 简记
5. 积分必须显式写出 \\int 记号，不要只用文字描述
6. **所有数学符号、变量、公式必须用 $...$ 包裹** — 包括单独的数字、变量名、函数值
   - 正确: $f(-2) = \\sqrt{{4-(-2)^2}} = 0$
   - 错误: f(-2) = \\sqrt{{4-(-2)^2}} = 0
   - 即使只写一个变量也要包: $x_0 = -2$、$h = 1$、$n = 4$
7. 关键数字和结论 **加粗**
8. 最终答案用 > 引用块突出 (> **答案: H**)
9. 保留概念洞察（凹凸性的几何意义、图像变换的影响等）
10. 禁止使用 \\(...\\) 和 \\[...\\] 作为数学分隔符，只用 $...$ 和 $$...$$

风格: 口语化、耐心、像一位好的数学家教。用中文。"""

TOOLS = [
    {"type": "function", "function": {"name": "lookup_question", "description": "精确查找TMUA某年某卷某题的原文和正确答案(当用户提到具体题号时使用)", "parameters": {"type": "object", "properties": {"year": {"type": "integer"}, "paper": {"type": "integer"}, "question_no": {"type": "integer"}}, "required": ["year", "paper", "question_no"]}}},
    {"type": "function", "function": {"name": "search_worked_answers", "description": "搜索TMUA历年真题解答(优先使用)", "parameters": {"type": "object", "properties": {"query": {"type": "string"}}, "required": ["query"]}}},
    {"type": "function", "function": {"name": "search", "description": "网络搜索", "parameters": {"type": "object", "properties": {"q": {"type": "string"}}, "required": ["q"]}}},
    {"type": "function", "function": {"name": "list_dir", "description": "列出目录", "parameters": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]}}},
    {"type": "function", "function": {"name": "read_file", "description": "读取文件", "parameters": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]}}},
    {"type": "function", "function": {"name": "glob", "description": "通配符搜索文件", "parameters": {"type": "object", "properties": {"dir": {"type": "string"}, "pat": {"type": "string"}}, "required": ["dir", "pat"]}}},
    {"type": "function", "function": {"name": "sh", "description": "只读shell命令(ls/cat/find/grep等)", "parameters": {"type": "object", "properties": {"cmd": {"type": "string"}}, "required": ["cmd"]}}},
    {"type": "function", "function": {"name": "python", "description": "执行Python数学计算(可用math模块)用于验证数值结果", "parameters": {"type": "object", "properties": {"expr": {"type": "string"}}, "required": ["expr"]}}},
]


async def execute_task(user_input: str, history: str = None, image_b64: str = None):
    """双模型 Agent: GLM-5 工具编排 → Qwen3 数学推理, SSE 流式输出"""
    topic = detect_topic(user_input)
    total_tokens = 0

    history_prefix = f"对话历史:\n{history}\n\n" if history else ""

    # Karpathy Wiki: 加载预编译的知识页面 (Stage 2 注入)
    wiki_page = _load_wiki_page(topic) if topic != "general" else ""

    formulas = get_formulas(topic)
    formula_context = ""
    if formulas:
        formula_context = "\n相关公式:\n" + "\n".join(f"- {f}" for f in formulas)

    # ── Stage 1: GLM-5 工具编排 (不注入知识库, 保持简洁专注工具调用) ──
    stage1_input = user_input
    if image_b64 and not stage1_input.strip():
        stage1_input = "[用户通过截图提问，请跳过工具调用直接进入回答]"
    elif image_b64:
        stage1_input = "[用户通过截图提问] " + stage1_input
    msgs = [
        {"role": "system", "content": TOOL_SYSTEM_PROMPT},
        {"role": "user", "content": history_prefix + stage1_input},
    ]
    loop = asyncio.get_event_loop()

    for _ in range(3):
        try:
            resp = await loop.run_in_executor(
                executor,
                lambda: glm_client.chat.completions.create(
                    model="glm-5-turbo",
                    messages=msgs,
                    tools=TOOLS,
                    temperature=0.1,
                    max_tokens=600,
                    timeout=30,
                ),
            )
        except Exception as e:
            yield f"data: {json.dumps({'type':'error','text':f'GLM-5 异常: {e}'},ensure_ascii=False)}\n\n"
            return

        msg = resp.choices[0].message
        total_tokens += resp.usage.total_tokens

        if msg.tool_calls:
            tasks = []
            for tc in msg.tool_calls:
                name = tc.function.name
                args = json.loads(tc.function.arguments)
                yield f"data: {json.dumps({'type':'tool_call','tool':name,'args':args},ensure_ascii=False)}\n\n"
                handler = HANDLERS.get(name)
                if handler:
                    tasks.append(loop.run_in_executor(executor, lambda h=handler, a=args: h(**a)))

            results = await asyncio.gather(*tasks, return_exceptions=True)

            msgs.append({"role": "assistant", "content": None, "tool_calls": [tc for tc in msg.tool_calls]})
            for tc, result in zip(msg.tool_calls, results):
                if isinstance(result, Exception):
                    result_str = f"工具错误: {result}"
                else:
                    result_str = str(result)[:1000]
                yield f"data: {json.dumps({'type':'tool_result','tool':tc.function.name,'result':result_str[:300]},ensure_ascii=False)}\n\n"
                msgs.append({"role": "tool", "tool_call_id": tc.id, "content": result_str})
        else:
            break  # 工具循环结束, 所有问题都进入 Stage 2 Qwen3 推理

    # ── Stage 2: Qwen3 数学推理 (token 流式) ──
    context_parts = [m["content"] for m in msgs if m["role"] == "tool"]
    solve_msgs = [{"role": "system", "content": MATH_SYSTEM_PROMPT}]

    # Few-shot 注入: 同知识点做对的题目作为示例
    try:
        fewshot_bank = FewShotBank()
        fewshot_context = fewshot_bank.get_context_prompt(topic, k=1)
        if fewshot_context:
            solve_msgs.append({"role": "system", "content": fewshot_context})
    except Exception:
        pass

    if history:
        solve_msgs.append({"role": "system", "content": f"对话历史 (最近几轮):\n{history}"})
    if wiki_page:
        solve_msgs.append({"role": "system", "content": f"知识库 ({topic}):\n{wiki_page[:6000]}"})
    if context_parts:
        solve_msgs.append({"role": "system", "content": "参考信息:\n" + "\n---\n".join(context_parts[:2])})

    # 构建 Stage 2 的 user message: 支持图片 (vision)
    q_text = user_input if user_input.strip() else "请识别并解答图中的数学题"
    if image_b64:
        content = [
            {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_b64}"}},
            {"type": "text", "text": q_text},
        ]
        solve_msgs.append({"role": "user", "content": content})
    else:
        solve_msgs.append({"role": "user", "content": user_input})

    try:
        stream = await loop.run_in_executor(
            executor,
            lambda: qwen_client.chat.completions.create(
                model="qwen3.6-flash",
                messages=solve_msgs,
                temperature=0.4,
                max_tokens=2500,
                stream=True,
                timeout=60,
            ),
        )

        full = ""
        for chunk in stream:
            delta = chunk.choices[0].delta
            if delta.content:
                full += delta.content
                yield f"data: {json.dumps({'type':'token','text':delta.content},ensure_ascii=False)}\n\n"
            if hasattr(chunk, 'usage') and chunk.usage:
                total_tokens += chunk.usage.total_tokens

        yield f"data: {json.dumps({'type':'done','summary':full,'tokens':total_tokens},ensure_ascii=False)}\n\n"
    except Exception as e:
        yield f"data: {json.dumps({'type':'error','text':f'Qwen3 异常: {e}'},ensure_ascii=False)}\n\n"
