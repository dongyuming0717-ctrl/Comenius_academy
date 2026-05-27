r"""
Parse Mathpix .tex output into extracted_questions_v2.json format.
Pragmatic approach: extract each paper section, split by option blocks.
"""
import re
import json
import os
import shutil

TEX_PATH = os.path.expanduser("~/Downloads/bd9fd346-ac77-4caf-b249-c853cce5796c/bd9fd346-ac77-4caf-b249-c853cce5796c.tex")
IMAGES_SRC = os.path.expanduser("~/Downloads/bd9fd346-ac77-4caf-b249-c853cce5796c/images")
PROJ_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGES_DST = os.path.join(PROJ_DIR, "client/public/question-images")
OUTPUT_JSON = os.path.join(PROJ_DIR, "extracted_questions_mathpix.json")

PAPER_ORDER = [
    "2016-1", "2016-2", "2017-1", "2017-2",
    "2018-1", "2018-2", "2019-1", "2019-2",
    "2020-1", "2020-2", "2021-1", "2021-2",
    "2022-1", "2022-2", "2023-1", "2023-2",
]

# These are the 16 paper boundary lines (hard-coded from verified output)
PAPER_Q1_LINES = [84, 373, 752, 1074, 1449, 1741, 2116, 2461,
                  2785, 3085, 3489, 3845, 4245, 4588, 5002, 5340]


def find_all_question_candidates(lines, start, end):
    """
    Find ALL lines that look like they could start a question (1-20).
    Very lenient - catches all possible question starts including false positives.
    """
    candidates = []
    for i in range(start, end):
        s = lines[i].strip()
        if not s:
            continue

        # Check if line starts with a number 1-20 (in any format)
        # IMPORTANT: check from 20 down to 1 so "$11" matches 11 before 1
        matched = False

        for n in range(20, 0, -1):
            ns = str(n)

            # Plain "N " or "N."
            if s.startswith(f"{ns} ") or s.startswith(f"{ns}. "):
                candidates.append((i, n))
                matched = True
                break

            # "$N..." (math mode) - ensure next char after N is not a digit
            if s.startswith(f"${ns}"):
                next_pos = len(ns) + 1
                if next_pos >= len(s) or not s[next_pos].isdigit():
                    candidates.append((i, n))
                    matched = True
                    break

            # Just "N" on a line
            if s == ns:
                candidates.append((i, n))
                matched = True
                break

        if matched:
            continue

        # Handle OCR-merged numbers: "$760 \%$" where 760 should be question 7
        # Check if line starts with a number > 20 whose prefix is a valid question number
        m = re.match(r'^\$?(\d{2,3})\b', s)
        if m:
            num = int(m.group(1))
            if num > 20:
                # Try splitting: 760 -> 7, 60
                num_str = m.group(1)
                for split_at in range(1, len(num_str)):
                    prefix = int(num_str[:split_at])
                    if 1 <= prefix <= 20:
                        candidates.append((i, prefix))
                        matched = True
                        break

        if matched:
            continue

        # Handle: "16\\" (number followed by LaTeX line break)
        m = re.match(r'^(\d{1,2})\\\\', s)
        if m:
            n = int(m.group(1))
            if 1 <= n <= 20:
                candidates.append((i, n))
                continue

        # Handle: "$\mathbf{2 0}$ text..." (bold math with spaces in number)
        m = re.match(r'\$\\mathbf\{(\d)\s+(\d)\}\$', s)
        if m:
            n = int(m.group(1) + m.group(2))
            if 1 <= n <= 20:
                candidates.append((i, n))
                continue

        # Handle: "$\mathbf{2 0}$" with rest of text after
        m = re.match(r'\$\\mathbf\{(\d)\s+(\d)\}\$\s*(.+)', s)
        if m:
            n = int(m.group(1) + m.group(2))
            if 1 <= n <= 20:
                candidates.append((i, n))
                continue

    return candidates

def filter_question_starts(candidates, lines):
    """
    Filter candidates to find the real 20 question starts per paper.
    Strategy: pick the FIRST candidate for each number 1-20.
    Ambiguous cases: prefer candidates near paper start for early numbers.
    """
    # Group by question number
    by_num = {}
    for line_idx, q_num in candidates:
        if q_num not in by_num:
            by_num[q_num] = []
        by_num[q_num].append(line_idx)

    # For each number, pick the best candidate
    result = {}
    for n in range(1, 21):
        if n in by_num:
            # Take first occurrence
            result[n] = by_num[n][0]
        else:
            result[n] = None

    return result


def extract_question_text(lines, q_line, next_q_line):
    """Extract text between q_line and next_q_line."""
    if q_line is None:
        return ""

    end = next_q_line if next_q_line else q_line + 50
    text_lines = []
    for i in range(q_line, min(end, len(lines))):
        line = lines[i]
        stripped = line.strip()
        if not text_lines and not stripped:
            continue
        text_lines.append(line)

    while text_lines and not text_lines[-1].strip():
        text_lines.pop()

    return "\n".join(text_lines)


def get_question_number_content(lines, q_line):
    """Get the question number part from the start line."""
    s = lines[q_line].strip()
    for n in range(20, 0, -1):
        ns = str(n)
        if s.startswith(f"{ns} "):
            return n, s[len(ns) + 1:]
        if s.startswith(f"{ns}. "):
            return n, s[len(ns) + 2:]
        if s == ns:
            return n, ""
        # "N\\"
        if s.rstrip('\\') == ns:
            return n, ""
        if s.startswith(f"${ns}"):
            after = s[len(ns) + 1:]
            dollar = after.find("$")
            if dollar >= 0:
                rest = after[dollar + 1:].strip()
                return n, rest if rest else after[:dollar]
            return n, after
        # "$\mathbf{2 0}$ text..."
        m = re.match(r'\$\\mathbf\{(\d)\s+(\d)\}\$\s*(.+)', s)
        if m:
            num = int(m.group(1) + m.group(2))
            if num == n:
                return n, m.group(3)
        # "$760 \%$" merged number case
        m = re.match(r'^\$?(\d{2,3})\b\s*(.*)', s)
        if m:
            num = int(m.group(1))
            if num > 20:
                num_str = m.group(1)
                for split_at in range(1, len(num_str)):
                    prefix = int(num_str[:split_at])
                    if prefix == n:
                        return n, m.group(2)
    return None, s


def clean_question_text(text):
    """Clean up question text."""
    text = text.strip()
    # Remove common OCR/page artifacts
    text = re.sub(r'\\section\*\{BLANK PAGE\}', '', text)
    text = re.sub(r'\bUCLES \d{4}\b', '', text)
    text = re.sub(r'\[Turn over\]?', '', text)
    text = re.sub(r'END OF TEST', '', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'\\\\\[\d+pt\]', '', text)
    # Remove accessibility notices and blank page markers
    text = re.sub(r'This document was initially designed for print.*?missing text', '', text, flags=re.DOTALL)
    text = re.sub(r'If you need this document in a different format.*?\}', '', text, flags=re.DOTALL)
    text = re.sub(r'BLANK PAGE\n?', '', text)
    text = text.strip()
    return text


def process_images(text, paper_key, q_num):
    """Copy referenced images and replace with markers."""
    image_urls = []

    def replace_img(match):
        img_name = match.group(1).strip()
        src = os.path.join(IMAGES_SRC, img_name)
        idx = len(image_urls) + 1
        dst_name = f"{paper_key}_q{q_num:02d}_fig{idx}.jpg"
        dst = os.path.join(IMAGES_DST, dst_name)
        if os.path.exists(src):
            os.makedirs(IMAGES_DST, exist_ok=True)
            shutil.copy2(src, dst)
            image_urls.append(f"/question-images/{dst_name}")
        elif os.path.exists(src + ".jpg"):
            os.makedirs(IMAGES_DST, exist_ok=True)
            shutil.copy2(src + ".jpg", dst)
            image_urls.append(f"/question-images/{dst_name}")
        return f"[FIGURE:{dst_name}]"

    text = re.sub(r'\\includegraphics\[.*?\]\{([^}]+)\}', replace_img, text)
    return text, image_urls


def fill_missing_questions(positions, lines, p_start, p_end):
    """Fill in missing questions by interpolating between known positions."""
    missing = [n for n in range(1, 21) if positions.get(n) is None]
    if not missing:
        return dict(positions)

    result = dict(positions)
    for n in missing:
        # Find nearest preceding and following known questions
        prev_n = None
        for i in range(n - 1, 0, -1):
            if result.get(i) is not None:
                prev_n = i
                break
        next_n = None
        for i in range(n + 1, 21):
            if result.get(i) is not None:
                next_n = i
                break

        # Use p_end as fallback for last question
        prev_pos = None
        next_pos = None
        if prev_n is not None:
            prev_pos = result[prev_n]
        if next_n is not None:
            next_pos = result[next_n]
        elif prev_pos is not None:
            next_pos = p_end  # use paper boundary as upper limit

        if prev_pos is not None and next_pos is not None:
            weight = (n - prev_n) / (next_n - prev_n) if next_n else 0.5
            est_line = int(prev_pos + weight * (next_pos - prev_pos))

            # Search for any reasonable starting point near the estimate
            for offset in range(-30, 31):
                check_line = est_line + offset
                if check_line <= prev_pos or check_line >= next_pos:
                    continue
                s = lines[check_line].strip()
                if s and not s.startswith("\\"):
                    result[n] = check_line
                    break

    return result


def main():
    print("Reading .tex file...")
    with open(TEX_PATH, "r", encoding="utf-8") as f:
        text = f.read()
    lines = text.split("\n")

    # Use hard-coded paper boundaries
    paper_starts = PAPER_Q1_LINES + [len(lines)]
    result = {}

    for p_idx in range(len(PAPER_ORDER)):
        paper_key = PAPER_ORDER[p_idx]
        p_start = paper_starts[p_idx]
        p_end = paper_starts[p_idx + 1]

        print(f"\n{'='*60}")
        print(f"{paper_key}: lines {p_start}-{p_end}")

        # Find all question candidates within this paper
        candidates = find_all_question_candidates(lines, p_start, p_end)
        q_positions = filter_question_starts(candidates, lines)

        # Fill in gaps where OCR lost the question number
        positions = fill_missing_questions(q_positions, lines, p_start, p_end)

        # Sort positions and extract questions
        paper_data = {}
        sorted_nums = sorted(positions.keys())

        for i, n in enumerate(sorted_nums):
            q_line = positions[n]
            if q_line is None:
                continue

            # Find next known question line
            next_line = None
            for j in range(i + 1, len(sorted_nums)):
                if positions.get(sorted_nums[j]) is not None:
                    next_line = positions[sorted_nums[j]]
                    break

            # Extract from the line where the number appears
            _, rest = get_question_number_content(lines, q_line)
            q_text = rest + "\n" if rest else ""
            q_text += extract_question_text(lines, q_line + 1, next_line)
            q_text = clean_question_text(q_text)
            q_text, img_urls = process_images(q_text, paper_key, n)
            paper_data[str(n)] = q_text

            if img_urls:
                print(f"  Q{n}: {len(img_urls)} image(s)")

        result[paper_key] = paper_data

        n_got = len(paper_data)
        if n_got != 20:
            missing = [str(i) for i in range(1, 21) if str(i) not in paper_data]
            print(f"  >> Got {n_got}/20. Missing: {missing}")
        else:
            print(f"  OK: 20/20 questions")

    # Write output
    print(f"\nWriting to {OUTPUT_JSON}...")
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    total_q = sum(len(v) for v in result.values())
    ok = sum(1 for v in result.values() if len(v) == 20)
    print(f"\nDONE: {len(result)} papers, {total_q} questions ({ok}/16 papers complete)")
    for k in sorted(result.keys()):
        n = len(result[k])
        flag = "" if n == 20 else f" *** missing {20-n}"
        print(f"  {k}: {n}{flag}")


if __name__ == "__main__":
    main()
