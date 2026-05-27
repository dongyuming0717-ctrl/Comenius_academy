#!/usr/bin/env python3
"""Flask backend for CIE Past Paper Library."""

import sqlite3
import os
from pathlib import Path

from flask import Flask, jsonify, request, send_file, send_from_directory

app = Flask(__name__, static_folder="static", static_url_path="")

PAPERS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "papers", "cie_papers")
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "papers.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# ── API ──────────────────────────────────────────────────────────


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


# ── PDF serving ──────────────────────────────────────────────────


@app.route("/api/pdf/<path:filepath>")
def serve_pdf(filepath):
    """Serve PDF for inline preview."""
    full_path = os.path.join(PAPERS_DIR, filepath)
    if not os.path.exists(full_path):
        return "Not found", 404
    return send_file(full_path, mimetype="application/pdf")


@app.route("/api/download/<path:filepath>")
def download_pdf(filepath):
    """Force download PDF."""
    full_path = os.path.join(PAPERS_DIR, filepath)
    if not os.path.exists(full_path):
        return "Not found", 404
    return send_file(full_path, as_attachment=True, download_name=os.path.basename(filepath))


# ── Static ───────────────────────────────────────────────────────


@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    print(f"Papers dir: {PAPERS_DIR}")
    print(f"Database:   {DB_PATH}")
    app.run(host="127.0.0.1", port=8080, debug=True)
