#!/usr/bin/env python3
"""Scan ~/Downloads/cie_papers/ and build SQLite index."""

import sqlite3
import re
import os
from pathlib import Path

PAPERS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "papers", "cie_papers")
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "papers.db")

SUBJECTS = {
    "0450": "Business Studies (IGCSE)",
    "0455": "Economics (IGCSE)",
    "0478": "Computer Science (IGCSE)",
    "0580": "Mathematics (IGCSE)",
    "0610": "Biology (IGCSE)",
    "0620": "Chemistry (IGCSE)",
    "0625": "Physics (IGCSE)",
    "9231": "Further Mathematics (AS/A2)",
    "9609": "Business (AS/A2)",
    "9698": "Law (AS/A2)",
    "9700": "Biology (AS/A2)",
    "9701": "Chemistry (AS/A2)",
    "9702": "Physics (AS/A2)",
    "9706": "Accounting (AS/A2)",
    "9707": "Business Studies (AS/A2)",
    "9708": "Economics (AS/A2)",
    "9709": "Mathematics (AS/A2)",
    "9868": "Chinese (AS/A2)",
    "9990": "Psychology (AS/A2)",
}

SEASON_MAP = {"m": "Spring", "s": "Summer", "w": "Winter"}
TYPE_MAP = {"qp": "Question Paper", "ms": "Mark Scheme", "er": "Examiner Report", "ir": "Investigator Report", "in": "Insert"}

PATTERN = re.compile(
    r"^(\d{4})_([msw])(\d{2})_(qp|ms|er|ir|in)(?:_(\d{2}))?\.pdf$"
)


def parse_filename(filename):
    """Parse CIE filename, return dict or None."""
    m = PATTERN.match(filename)
    if not m:
        return None
    subject_code = m.group(1)
    season_code = m.group(2)
    year_short = int(m.group(3))
    paper_type = m.group(4)
    paper_number = m.group(5) or ""

    year = 2000 + year_short

    return {
        "subject_code": subject_code,
        "subject_name": SUBJECTS.get(subject_code, f"Unknown ({subject_code})"),
        "year": year,
        "season": SEASON_MAP[season_code],
        "season_code": season_code,
        "paper_number": paper_number,
        "type": paper_type,
        "type_label": TYPE_MAP[paper_type],
        "filename": filename,
    }


def build_index():
    papers_dir = Path(PAPERS_DIR)
    if not papers_dir.exists():
        print(f"Error: {PAPERS_DIR} not found")
        return

    conn = sqlite3.connect(DB_PATH)
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS papers (
            id INTEGER PRIMARY KEY,
            subject_code TEXT,
            subject_name TEXT,
            year INTEGER,
            season TEXT,
            season_code TEXT,
            paper_number TEXT,
            type TEXT,
            type_label TEXT,
            filename TEXT,
            relative_path TEXT,
            abs_path TEXT,
            file_size INTEGER
        )
    """)
    conn.execute("DELETE FROM papers")

    pdf_files = list(papers_dir.rglob("*.pdf"))
    records = []
    skipped = 0

    for pdf_path in pdf_files:
        info = parse_filename(pdf_path.name)
        if not info:
            skipped += 1
            continue
        rel_path = pdf_path.relative_to(papers_dir)
        records.append({
            **info,
            "relative_path": str(rel_path),
            "abs_path": str(pdf_path),
            "file_size": pdf_path.stat().st_size,
        })

    conn.executemany(
        """INSERT INTO papers
           (subject_code, subject_name, year, season, season_code,
            paper_number, type, type_label, filename,
            relative_path, abs_path, file_size)
           VALUES (:subject_code, :subject_name, :year, :season, :season_code,
                   :paper_number, :type, :type_label, :filename,
                   :relative_path, :abs_path, :file_size)""",
        records,
    )

    conn.commit()

    # Stats
    total = len(records)
    subjects = conn.execute(
        "SELECT subject_code, subject_name, COUNT(*) FROM papers GROUP BY subject_code ORDER BY subject_code"
    ).fetchall()
    types = conn.execute(
        "SELECT type_label, COUNT(*) FROM papers GROUP BY type"
    ).fetchall()

    print(f"Indexed {total} papers (skipped {skipped} unrecognized)")
    print(f"Subjects: {len(subjects)}")
    for code, name, cnt in subjects:
        print(f"  {code} {name}: {cnt}")
    print("Types:")
    for label, cnt in types:
        print(f"  {label}: {cnt}")

    conn.close()
    print(f"\nDatabase: {DB_PATH}")


if __name__ == "__main__":
    build_index()
