"""AI Grading — CIE Marking Scheme + Student Answer"""
import base64, json, os, io, logging, traceback
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from json_repair import repair_json
from flask_cors import CORS
from openai import OpenAI
import fitz

logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(levelname)s %(message)s')
log = logging.getLogger(__name__)

QWEN_KEY = "sk-a800533380c943e19f113fdfedb2b1f9"
qwen = OpenAI(api_key=QWEN_KEY, base_url="https://dashscope.aliyuncs.com/compatible-mode/v1")

app = Flask(__name__, static_folder="static", static_url_path="")
CORS(app)

GRADING_PROMPT = """你是 CIE 考试局数学阅卷老师。根据官方 Marking Scheme 评估学生手写解答。

评分规则：
1. 严格按 Marking Scheme 中的题号(Q1, Q2, Q3...)和分值分配评分
2. Method mark (M): 方法正确就给分，即使最终答案错误
3. Accuracy mark (A): 答案必须完全正确
4. Independent mark (B): 独立评分点
5. Follow-through: 前一步算错但后续方法正确，Method marks 仍给
6. 每道题独立评分，最后汇总总分

只返回 JSON（不要 markdown，不要解释，直接返回 JSON 对象）:
{
  "questions": [
    {
      "question_number": 1,
      "score": <得分>,
      "max_score": <满分>,
      "marks": [
        {"point": "M1: xxx", "awarded": true, "reason": "10字以内"}
      ]
    }
  ],
  "total_score": <总分>,
  "max_score": <总分值>,
  "summary": "总体评价"
}"""

@app.route("/")
def index():
    return send_from_directory("static", "index.html")

@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "time": datetime.now().isoformat()})

def pdf_to_images(pdf_bytes):
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    images = []
    for page in doc:
        pix = page.get_pixmap(dpi=150)
        images.append(base64.b64encode(pix.tobytes("png")).decode())
    return images

@app.route("/api/grade", methods=["POST"])
def grade():
    log_line = []

    if "answer_pdf" not in request.files:
        return jsonify({"error": "需要上传学生答卷 (answer_pdf)"}), 400

    # 1. Process answer PDF
    answer_pdf = request.files["answer_pdf"].read()
    answer_images = pdf_to_images(answer_pdf)
    log_line.append(f"answer_pages={len(answer_images)}")

    # 2. Process marking scheme
    if "scheme_pdf" in request.files and request.files["scheme_pdf"].filename:
        scheme_pdf = request.files["scheme_pdf"].read()
        scheme_images = pdf_to_images(scheme_pdf)
        scheme_content = {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{scheme_images[0]}"}}
        log_line.append(f"scheme_pages={len(scheme_images)}")
    else:
        scheme_text = request.form.get("scheme_text", "")
        if not scheme_text:
            return jsonify({"error": "请上传 Marking Scheme PDF 或填写文本"}), 400
        scheme_content = {"type": "text", "text": f"Marking Scheme:\n{scheme_text}"}
        log_line.append("scheme=text")

    # 3. Build vision prompt
    content = [
        scheme_content,
        {"type": "text", "text": "以上是 Marking Scheme，以下是学生手写解答，请评分。"},
        {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{answer_images[0]}"}},
        {"type": "text", "text": GRADING_PROMPT},
    ]

    # 4. Call Qwen Vision
    try:
        resp = qwen.chat.completions.create(
            model="qwen-vl-plus",
            messages=[{"role": "user", "content": content}],
            temperature=0.1, max_tokens=4000, timeout=90,
            response_format={"type": "json_object"}
        )
        text = resp.choices[0].message.content.strip()
        log_line.append(f"qwen_tokens={resp.usage.total_tokens}")

        # Parse JSON — use json_repair to fix Qwen's malformed JSON
        import re
        cleaned = text.strip()
        # Remove markdown fences
        cleaned = re.sub(r'```(?:json)?\s*', '', cleaned)
        cleaned = cleaned.replace('```', '').strip()
        # Remove natural language preamble
        if not cleaned.startswith('{'):
            idx = cleaned.find('{')
            if idx > 0: cleaned = cleaned[idx:]
        # Use repair_json to fix common JSON errors
        result = json.loads(repair_json(cleaned))

        log.info(f"Grade OK: {log_line}, score={result.get('total_score','?')}/{result.get('max_score','?')}")
        return jsonify({"pages": len(answer_images), "result": result})

    except json.JSONDecodeError as e:
        log.error(f"JSON parse failed: {e}, raw={text[:300]}")
        return jsonify({"pages": len(answer_images), "result": {
            "total_score": 0, "max_score": 0,
            "error": f"JSON解析失败", "raw_response": text[:500],
            "summary": "AI 返回格式异常，请重试"
        }})
    except Exception as e:
        log.error(f"Grade failed: {e}\n{traceback.format_exc()}")
        return jsonify({"pages": len(answer_images), "result": {
            "total_score": 0, "max_score": 0,
            "error": str(e)[:300], "summary": "评分失败，请检查 PDF 是否可读"
        }})

if __name__ == "__main__":
    app.run(port=5190, debug=False)
