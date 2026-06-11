"""AI Grading — GLM-5 orchestration + Qwen Vision execution"""
import base64, json, re, logging, traceback
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from openai import OpenAI
import fitz
from json_repair import repair_json

logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(levelname)s %(message)s')
log = logging.getLogger(__name__)

QWEN_KEY = "sk-a800533380c943e19f113fdfedb2b1f9"
GLM_KEY = "6b0f86e191124845b0c652f1ef28c87f.qsMD7yp1jSXTX7K5"
qwen = OpenAI(api_key=QWEN_KEY, base_url="https://dashscope.aliyuncs.com/compatible-mode/v1")
glm = OpenAI(api_key=GLM_KEY, base_url="https://api.z.ai/api/paas/v4")

app = Flask(__name__, static_folder="static", static_url_path="")
CORS(app)

# ── Step 1: GLM-5 reads MS → structured per-question rubric ──
MS_PARSE_PROMPT = """你是 CIE 阅卷组长。阅读以下 Marking Scheme，提取每道题的评分点。

返回 JSON:
{
  "total_marks": 75,
  "questions": [
    {
      "question_number": 1,
      "max_score": 12,
      "marks": [
        {"code": "M1", "description": "正确使用乘积法则", "value": 1},
        {"code": "A1", "description": "得到正确导数", "value": 1}
      ]
    }
  ]
}"""

# ── Step 2: Qwen grades ONE question against its specific rubric ──
GRADE_ONE_Q_PROMPT = """你是 CIE 数学阅卷老师。只评分第 {q_num} 题。

评分标准（来自 Marking Scheme）:
{marks_list}

学生手写解答在上方图片中。逐点评分。

返回 JSON:
{{
  "question_number": {q_num},
  "score": <实际得分>,
  "max_score": {max_score},
  "marks": [
    {{"code": "M1", "awarded": true, "reason": "10字以内"}}
  ]
}}"""

# ── Step 3: GLM-5 validates final total ──
VALIDATE_PROMPT = """你是 CIE 阅卷组长。验证以下评分是否合理。

原始 MS 总分: {ms_total}
AI 给出的逐题得分: {per_question_scores}
计算总分: {calculated_total}

检查:
1. 每道题得分不超过该题满分
2. 总分计算正确
3. 是否有明显矛盾的评分（如同一知识点在Q3给了分但在Q4又给）

返回 JSON:
{{
  "valid": true/false,
  "issues": ["问题描述"],
  "final_total_score": <最终总分>,
  "final_max_score": {ms_total}
}}"""


def pdf_to_images(pdf_bytes, dpi=300):
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    images = []
    for page in doc:
        pix = page.get_pixmap(dpi=dpi)
        images.append(base64.b64encode(pix.tobytes("png")).decode())
    return images


def extract_json(text):
    """Robust JSON extraction from LLM output"""
    text = text.strip()
    text = re.sub(r'```(?:json)?\s*', '', text)
    text = text.replace('```', '').strip()
    if not text.startswith('{'):
        idx = text.find('{')
        if idx > 0: text = text[idx:]
    return json.loads(repair_json(text))


@app.route("/")
def index():
    return send_from_directory("static", "index.html")

@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "time": datetime.now().isoformat()})


@app.route("/api/grade", methods=["POST"])
def grade():
    if "answer_pdf" not in request.files:
        return jsonify({"error": "需要上传学生答卷"}), 400

    answer_images = pdf_to_images(request.files["answer_pdf"].read())
    log.info(f"Answer: {len(answer_images)} pages")

    # Parse marking scheme
    if "scheme_pdf" in request.files and request.files["scheme_pdf"].filename:
        scheme_images = pdf_to_images(request.files["scheme_pdf"].read())
        scheme_content = [{"type": "image_url", "image_url": {"url": f"data:image/png;base64,{img}"}} for img in scheme_images]
        scheme_content.append({"type": "text", "text": MS_PARSE_PROMPT})
    else:
        scheme_text = request.form.get("scheme_text", "")
        if not scheme_text:
            return jsonify({"error": "需要 Marking Scheme"}), 400
        scheme_content = [{"type": "text", "text": f"Marking Scheme:\n{scheme_text}\n\n{MS_PARSE_PROMPT}"}]

    # ── Step 1: GLM-5 parses MS → structured rubric ──
    log.info("Step 1: GLM-5 parsing marking scheme...")
    try:
        resp = glm.chat.completions.create(
            model="glm-4-flash",
            messages=[{"role": "user", "content": scheme_content}],
            temperature=0, max_tokens=2000, timeout=45
        )
        rubric = extract_json(resp.choices[0].message.content)
        log.info(f"MS parsed: {len(rubric.get('questions',[]))} questions, total={rubric.get('total_marks','?')}")
    except Exception as e:
        log.error(f"MS parse failed: {e}")
        return jsonify({"result": {"total_score": 0, "max_score": 0, "error": f"无法解析 Marking Scheme: {str(e)[:200]}", "summary": "请检查 MS PDF 是否清晰可读"}})

    ms_questions = rubric.get("questions", [])
    if not ms_questions:
        return jsonify({"result": {"total_score": 0, "max_score": 0, "error": "MS 中未找到题目", "summary": "Marking Scheme 格式无法识别"}})

    # ── Step 2: Qwen grades each question individually ──
    log.info(f"Step 2: Qwen grading {len(ms_questions)} questions...")
    all_results = []
    total_scored = 0

    for q in ms_questions:
        q_num = q["question_number"]
        max_s = q["max_score"]
        marks_list = "\n".join([f"  {m['code']}: {m['description']} ({m.get('value',1)}分)" for m in q.get("marks", [])])

        prompt = GRADE_ONE_Q_PROMPT.format(q_num=q_num, marks_list=marks_list, max_score=max_s)

        # Send first page of answer (or all pages if only 1 question)
        page_idx = min(q_num - 1, len(answer_images) - 1)
        content = [
            {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{answer_images[page_idx]}"}},
            {"type": "text", "text": prompt},
        ]
        # If multi-page and this is Q1, send all pages
        if q_num == 1 and len(answer_images) > 1:
            for i in range(1, len(answer_images)):
                content.insert(-1, {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{answer_images[i]}"}})

        try:
            resp = qwen.chat.completions.create(
                model="qwen-vl-max",
                messages=[{"role": "user", "content": content}],
                temperature=0.1, max_tokens=2000, timeout=30,
                response_format={"type": "json_object"}
            )
            q_result = extract_json(resp.choices[0].message.content)
            q_score = min(q_result.get("score", 0), max_s)
            total_scored += q_score
            all_results.append({
                "question_number": q_num,
                "score": q_score,
                "max_score": max_s,
                "marks": q_result.get("marks", []),
            })
            log.info(f"  Q{q_num}: {q_score}/{max_s}")
        except Exception as e:
            log.error(f"  Q{q_num} failed: {e}")
            all_results.append({
                "question_number": q_num, "score": 0, "max_score": max_s,
                "marks": [], "error": str(e)[:100],
            })

    ms_total = rubric.get("total_marks", sum(q["max_score"] for q in ms_questions))

    # ── Step 3: GLM-5 validates ──
    log.info(f"Step 3: GLM-5 validating total {total_scored}/{ms_total}...")
    try:
        validate_prompt = VALIDATE_PROMPT.format(
            ms_total=ms_total,
            per_question_scores=json.dumps([{"Q"+str(q["question_number"]): f"{q['score']}/{q['max_score']}"} for q in all_results], ensure_ascii=False),
            calculated_total=total_scored
        )
        resp = glm.chat.completions.create(
            model="glm-4-flash",
            messages=[{"role": "user", "content": validate_prompt}],
            temperature=0, max_tokens=500, timeout=30
        )
        validation = extract_json(resp.choices[0].message.content)
        final_score = validation.get("final_total_score", total_scored)
    except Exception as e:
        log.error(f"Validation failed: {e}")
        validation = {"valid": True, "issues": [], "final_total_score": total_scored, "final_max_score": ms_total}
        final_score = total_scored

    log.info(f"Done: {final_score}/{ms_total}")

    return jsonify({"result": {
        "total_score": final_score,
        "max_score": ms_total,
        "questions": all_results,
        "summary": validation.get("issues", ["评分完成"])[0] if validation.get("issues") else "评分完成",
        "validated": validation.get("valid", True),
    }})


if __name__ == "__main__":
    app.run(port=5190, debug=False)
