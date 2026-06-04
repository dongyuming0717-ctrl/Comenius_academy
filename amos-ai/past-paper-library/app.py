#!/usr/bin/env python3
"""Flask backend for CIE Past Paper Library + Comenius AI Chat."""
import asyncio
import json
import os
import sqlite3
import sys
import time
from pathlib import Path

from flask import Flask, Response, jsonify, request, send_file, send_from_directory, stream_with_context

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from agent.agent import execute_task

app = Flask(__name__, static_folder="static", static_url_path="")

# ── Conversation memory ────────────────────────────────────────────
conversations: dict[str, list[dict[str, str]]] = {}  # sid -> [{"user":..., "agent":...}]
last_activity: dict[str, float] = {}  # sid -> timestamp
MAX_SESSIONS = 100
MAX_TURNS = 10
SESSION_TTL = 1800  # 30 min


def _cleanup_sessions():
    now = time.time()
    expired = [sid for sid, t in last_activity.items() if now - t > SESSION_TTL]
    for sid in expired:
        conversations.pop(sid, None)
        last_activity.pop(sid, None)
    if len(conversations) > MAX_SESSIONS:
        oldest = sorted(last_activity.items(), key=lambda x: x[1])
        for sid, _ in oldest[: len(conversations) - MAX_SESSIONS]:
            conversations.pop(sid, None)
            last_activity.pop(sid, None)


def _save_turn(sid: str, user_msg: str, agent_response: str):
    _cleanup_sessions()
    if sid not in conversations:
        conversations[sid] = []
    conversations[sid].append({"user": user_msg, "agent": agent_response})
    if len(conversations[sid]) > MAX_TURNS:
        conversations[sid] = conversations[sid][-MAX_TURNS:]
    last_activity[sid] = time.time()

PAPERS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "papers", "cie_papers")
PAPERS_DIR = os.path.realpath(PAPERS_DIR)
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "papers.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# ── Paper API ──────────────────────────────────────────────────────

@app.route("/api/papers")
def api_papers():
    subject = request.args.get("subject", "")
    year = request.args.get("year", "")
    season = request.args.get("season", "")
    search = request.args.get("search", "").strip()

    query = "SELECT * FROM papers WHERE 1=1"
    params = []

    if subject:
        query += " AND subject_code = ?"
        params.append(subject)
    if year:
        query += " AND year = ?"
        params.append(int(year))
    if season:
        query += " AND season = ?"
        params.append(season)
    if search:
        query += " AND (subject_code LIKE ? OR subject_name LIKE ? OR CAST(year AS TEXT) LIKE ? OR season LIKE ? OR paper_number LIKE ? OR filename LIKE ?)"
        like = f"%{search}%"
        params.extend([like] * 6)

    query += " ORDER BY subject_code, year DESC, season_code, CAST(paper_number AS INTEGER)"

    conn = get_db()
    rows = conn.execute(query, params).fetchall()
    papers = [dict(r) for r in rows]
    conn.close()

    return jsonify(papers)


@app.route("/api/subjects")
def api_subjects():
    conn = get_db()
    rows = conn.execute(
        "SELECT DISTINCT subject_code, subject_name FROM papers ORDER BY subject_code"
    ).fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])


@app.route("/api/years")
def api_years():
    conn = get_db()
    rows = conn.execute(
        "SELECT DISTINCT year FROM papers ORDER BY year DESC"
    ).fetchall()
    conn.close()
    return jsonify([r["year"] for r in rows])


# ── PDF serving ────────────────────────────────────────────────────

def _safe_pdf_path(filepath: str) -> str:
    """防路径穿越: 规范化后确保在 PAPERS_DIR 内"""
    full = os.path.realpath(os.path.join(PAPERS_DIR, filepath))
    if not full.startswith(PAPERS_DIR + os.sep) and full != PAPERS_DIR:
        return None
    return full


@app.route("/api/pdf/<path:filepath>")
def serve_pdf(filepath):
    full_path = _safe_pdf_path(filepath)
    if not full_path or not os.path.isfile(full_path):
        return "Not found", 404
    return send_file(full_path, mimetype="application/pdf")


@app.route("/api/download/<path:filepath>")
def download_pdf(filepath):
    full_path = _safe_pdf_path(filepath)
    if not full_path or not os.path.isfile(full_path):
        return "Not found", 404
    return send_file(full_path, as_attachment=True, download_name=os.path.basename(filepath))


# ── AI Chat (SSE) ──────────────────────────────────────────────────

import base64 as b64


@app.route("/api/chat", methods=["GET", "POST"])
def api_chat():
    if request.method == "POST":
        q = request.form.get("q", "").strip()
        sid = request.form.get("sid", "").strip()
        # 截图支持: 将上传的图片转为 base64 data URI
        image_b64 = None
        image_file = request.files.get("image")
        if image_file and image_file.filename:
            raw = image_file.read()
            if raw:
                image_b64 = b64.b64encode(raw).decode("ascii")
    else:
        q = request.args.get("q", "").strip()
        sid = request.args.get("sid", "").strip()
        image_b64 = None

    if not q and not image_b64:
        return Response(
            "data: " + json.dumps({"type": "error", "text": "问题不能为空"}, ensure_ascii=False) + "\n\n",
            mimetype="text/event-stream",
        )

    history = None
    if sid and sid in conversations:
        turns = conversations[sid]
        if turns:
            history = "\n".join(
                f"- 学生: {t['user'][:200]}\n- Amos: {t['agent'][:300]}"
                for t in turns[-4:]
            )

    def generate():
        full_response = ""
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            agen = execute_task(q, history=history, image_b64=image_b64)
            while True:
                try:
                    event = loop.run_until_complete(agen.__anext__())
                    if event.startswith("data: "):
                        try:
                            data = json.loads(event[6:])
                            if data.get("type") == "done":
                                full_response = data.get("summary", "")
                        except (json.JSONDecodeError, KeyError):
                            pass
                    yield event
                except StopAsyncIteration:
                    break
        finally:
            loop.close()
            if sid and full_response:
                _save_turn(sid, q, full_response)

    return Response(
        stream_with_context(generate()),
        mimetype="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ── Static ─────────────────────────────────────────────────────────

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    print(f"Papers dir: {PAPERS_DIR}")
    print(f"Database:   {DB_PATH}")
    debug = os.environ.get("FLASK_DEBUG", "0") == "1"
    app.run(host="127.0.0.1", port=8080, debug=debug)
