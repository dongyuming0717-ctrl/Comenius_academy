"""
Generate SQL seed files from Mathpix-extracted questions.
Uses answer_keys.json for answers and classifications.json for topics.
Outputs one SQL file per paper, plus an all-in-one file.
"""
import json
import os
import re

PROJ_DIR = os.path.dirname(os.path.abspath(__file__))
QUESTIONS_FILE = os.path.join(PROJ_DIR, "extracted_questions_mathpix.json")
ANSWER_KEYS_FILE = os.path.join(PROJ_DIR, "answer_keys.json")
CLASSIFICATIONS_FILE = os.path.join(PROJ_DIR, "classifications.json")
OUTPUT_DIR = os.path.join(PROJ_DIR, "server")


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def letter_to_index(letter):
    """Convert answer letter A-H to 0-based index."""
    return ord(letter.upper()) - ord('A')


def escape_sql_json(text):
    """Escape text for PostgreSQL dollar-quoted JSON."""
    # Replace $$ with something else since we use $$ for dollar quoting
    return text


def parse_tabular_options(text, option_letters):
    """Parse options from LaTeX tabular environment.
    Returns (cleaned_text, option_contents) or (None, None) if no tabular found.
    Handles nested tabulars and grid-format (A & B & C) options.
    """
    # Find outermost \begin{tabular} (optionally preceded by \begin{center})
    begin_m = re.search(
        r'\n*(\\begin\{center\}\s*\n)?\\begin\{tabular\}', text
    )
    if not begin_m:
        return None, None

    # Find matching \end{tabular} by counting nesting depth
    pos = begin_m.end()
    depth = 1
    while depth > 0:
        next_begin = re.search(r'\\begin\{tabular\}', text[pos:])
        next_end = re.search(r'\\end\{tabular\}', text[pos:])
        if not next_end:
            return None, None
        if next_begin and next_begin.start() < next_end.start():
            depth += 1
            pos += next_begin.end()
        else:
            depth -= 1
            pos += next_end.end()

    tabular_end = pos

    # Check for \end{center} after the tabular
    after = text[tabular_end:]
    m_center = re.match(r'\s*\n?\\end\{center\}', after)
    if m_center:
        tabular_end += m_center.end()

    # Extract inner content (between outer \begin{tabular} and outer \end{tabular})
    inner_start = begin_m.end()
    last_end = text.rfind('\\end{tabular}', inner_start, tabular_end)
    if last_end == -1:
        return None, None
    inner_content = text[inner_start:last_end]

    # First attempt: standard row-by-row parsing (one option letter per row)
    row_content = re.sub(r'\\hline\s*\n?', '', inner_content)
    option_contents = []
    for idx, letter in enumerate(option_letters):
        next_letters = '|'.join(re.escape(l) for l in option_letters if l != letter)
        row_pat = re.compile(
            rf'(?:^|\n){re.escape(letter)}(.*?)(?:\n(?:{next_letters})\b|\\\\|$)',
            re.DOTALL | re.IGNORECASE
        )
        row_m = row_pat.search(row_content)
        if row_m:
            content = row_m.group(1).strip()
            content = re.sub(r'^\s*&\s*', '', content)
            content = re.sub(r'\s*&\s*', '  ', content)
            content = content.strip()
            option_contents.append(content if content else letter)
        else:
            option_contents.append(None)  # marker for "not found in rows"

    # Check if row parsing succeeded for all options
    all_found = all(c is not None for c in option_contents)
    # Also check quality: any content that's just other option letters is suspicious
    if all_found:
        for c in option_contents:
            if re.match(r'^[A-H]\s+[A-H]$', c):
                all_found = False
                break

    if not all_found:
        # Fall back to grid/flattened parsing.
        # First, find all option letters directly in the raw inner content
        # (before removing nested environments that might contain letters).
        option_contents = []
        for letter in option_letters:
            # Look for letter as an option marker: at line start, after &, or as (A)
            if (re.search(rf'(?:^|\n|&)\s*\({re.escape(letter)}\)', inner_content) or
                re.search(rf'(?:^|\n|&)\s*{re.escape(letter)}(?:\s|\[|$|&|\\\\)', inner_content)):
                option_contents.append(letter)
            else:
                option_contents.append(letter)

    if len(option_contents) != len(option_letters):
        return None, None

    # Remove the tabular block from text
    cleaned = text[:begin_m.start()] + text[tabular_end:]
    cleaned = cleaned.strip()
    return cleaned, option_contents


def remove_tabular_blocks(text):
    """Remove LaTeX tabular/center blocks from text.
    These are usually diagrams or non-option tabular content.
    """
    while True:
        begin_m = re.search(
            r'\n*(\\begin\{center\}\s*\n)?\\begin\{tabular\}', text
        )
        if not begin_m:
            break

        # Find matching \end{tabular} counting nesting
        pos = begin_m.end()
        depth = 1
        while depth > 0:
            next_begin = re.search(r'\\begin\{tabular\}', text[pos:])
            next_end = re.search(r'\\end\{tabular\}', text[pos:])
            if not next_end:
                # Unmatched tabular, just break
                depth = 0
                pos = len(text)
                break
            if next_begin and next_begin.start() < next_end.start():
                depth += 1
                pos += next_begin.end()
            else:
                depth -= 1
                pos += next_end.end()

        tabular_end = pos

        # Check for \end{center} after
        after = text[tabular_end:]
        m_center = re.match(r'\s*\n?\\end\{center\}', after)
        if m_center:
            tabular_end += m_center.end()

        # Remove the block (with preceding whitespace/newlines)
        text = text[:begin_m.start()] + text[tabular_end:]

    return text


def clean_and_parse_options(text, option_letters):
    """Clean question text and extract option contents.
    Returns (cleaned_text, option_contents_list).
    """
    # 1. Remove figure/image placeholders
    text = re.sub(r'\[FIGURE:[^\]]+\]', '', text)
    text = re.sub(r'\[diagram not to scale\]', '', text, flags=re.IGNORECASE)

    # 2. Remove exam header/footer junk (Q20 tail text)
    text = re.sub(r'\n*\\section\*\{TEST OF MATHEMATICS.*$', '', text, flags=re.DOTALL)
    text = re.sub(r'\n*TEST OF MATHEMATICS FOR UNIVERSITY ADMISSION.*$', '', text, flags=re.DOTALL)
    text = re.sub(r'\n*D\d+/\d+\n.*$', '', text, flags=re.DOTALL)
    text = re.sub(r'\n*Please read these instructions.*$', '', text, flags=re.DOTALL)
    text = re.sub(r'\n*This question paper consists.*$', '', text, flags=re.DOTALL)

    # 3. Remove tabular/center blocks (diagrams, not option content)
    text = remove_tabular_blocks(text)

    # 4. Normalize whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = text.strip()

    if not option_letters or len(option_letters) < 2:
        return text, list(option_letters) if option_letters else []

    # 4. Try tabular option parsing first
    cleaned, tabular_opts = parse_tabular_options(text, option_letters)
    if cleaned is not None:
        return cleaned, tabular_opts

    # 5. Standard parsing: find \n\nA, \n\nB, etc.
    # Options are separated from the question by a double newline.
    first_letter = option_letters[0]
    opt_start_pat = re.compile(rf'\n\n{first_letter}\s', re.IGNORECASE)
    m = opt_start_pat.search(text)
    double_nl = True
    if not m:
        # Fallback: try single newline (some formats omit the blank line)
        opt_start_pat = re.compile(rf'\n{first_letter}\s', re.IGNORECASE)
        m = opt_start_pat.search(text)
        double_nl = False
    if not m:
        return text, list(option_letters)

    opt_start = m.start() + (2 if double_nl else 1)
    question_part = text[:opt_start].strip()
    options_part = text[opt_start:]

    # 6. Parse each option's content
    option_contents = []
    for i, letter in enumerate(option_letters):
        # Try standard pattern first, then bold-math patterns.
        # Track which kind of pattern matched to fix $ delimiters.
        prefix = '^' if i == 0 else '\n'
        std_pat = re.compile(rf'{prefix}{re.escape(letter)}\s', re.IGNORECASE)
        bold_pat = re.compile(rf'(?:^|\n)\$\s*\\mathbf\{{{re.escape(letter)}\}}(?:\s|\$)', re.IGNORECASE)
        bold2_pat = re.compile(rf'(?:^|\n)\$\s*\\textbf\{{{re.escape(letter)}\}}(?:\s|\$)', re.IGNORECASE)

        m_start = std_pat.search(options_part)
        needs_opening_dollar = False
        if not m_start:
            m_start = bold_pat.search(options_part)
            if m_start:
                # Only prepend $ if the match ended with space (content was
                # inside the math block), not if it ended with $ (content is
                # outside the math block).
                needs_opening_dollar = m_start.group().endswith(' ')
        if not m_start:
            m_start = bold2_pat.search(options_part)
            if m_start:
                needs_opening_dollar = m_start.group().endswith(' ')

        if not m_start:
            option_contents.append(letter)
            continue

        content_start = m_start.end()

        if i + 1 < len(option_letters):
            next_letter = option_letters[i + 1]
            next_patterns = [
                re.compile(rf'\n{re.escape(next_letter)}\s', re.IGNORECASE),
                re.compile(rf'\n\$\s*\\mathbf\{{{re.escape(next_letter)}\}}(?:\s|\$)', re.IGNORECASE),
                re.compile(rf'\n\$\s*\\textbf\{{{re.escape(next_letter)}\}}(?:\s|\$)', re.IGNORECASE),
            ]
            m_end = None
            for npat in next_patterns:
                m_end = npat.search(options_part[content_start:])
                if m_end:
                    break
            if m_end:
                content_end = content_start + m_end.start()
            else:
                content_end = len(options_part)
        else:
            content_end = len(options_part)

        content = options_part[content_start:content_end].strip()
        content = re.sub(r'\\\\+$', '', content).strip()
        content = content.rstrip('\\').strip()
        # If we matched via bold-math pattern that ended with space,
        # the opening $ was consumed by the match. Prepend it.
        if needs_opening_dollar:
            content = '$' + content
        option_contents.append(content)

    return question_part, option_contents


def generate_paper_sql(paper_key, questions, answer_keys, classifications):
    """Generate SQL INSERT for a single paper."""
    year_str, paper_num = paper_key.split("-")
    year = int(year_str)
    paper_num = int(paper_num)

    # Sitting: Paper 1 is usually October, Paper 2 is usually October (or November for early years)
    if year <= 2016:
        sitting = "October"
    elif year == 2017:
        sitting = "November"
    else:
        sitting = "October"

    # Get answer key for this paper
    answers = answer_keys.get(paper_key, {})
    # Get classifications for this paper
    topics = classifications.get(paper_key, {})

    # Build question objects
    question_objects = []
    paper_topics = set()

    for q_num in range(1, 21):
        q_str = str(q_num)
        q_text = questions.get(q_str, "")
        answer_letter = answers.get(q_str, "A")
        answer_idx = letter_to_index(answer_letter)
        topic = topics.get(q_str, "")

        # Count number of options (A-H, usually 5-8).
        # Handles: \nA, (A), \mathbf{A}, \textbf{A}, and tabular-embedded letters.
        option_letters = []
        for letter in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']:
            if (re.search(rf'(^|\n){letter}\s', q_text) or
                f'({letter})' in q_text or
                f'{letter}[' in q_text or
                re.search(r'\\mathbf{' + re.escape(letter) + '}', q_text) or
                re.search(r'\\textbf{' + re.escape(letter) + '}', q_text)):
                option_letters.append(letter)

        # If text has tabular, also scan for letters embedded in tabular cells.
        # This catches grid-format options (A & B & C) and (A)[FIGURE:...] patterns.
        if 'tabular' in q_text:
            for letter in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']:
                if letter not in option_letters:
                    if (f'{letter}[' in q_text or f'({letter})' in q_text or
                        re.search(rf'(?:^|\n|&)\s*{re.escape(letter)}(?:\s|\[|$|&|\\\\)', q_text)):
                        option_letters.append(letter)

        # Clean text and extract actual option contents
        cleaned_text, option_contents = clean_and_parse_options(q_text, option_letters)

        # Last resort: if no options found but we have an answer, create placeholders
        if not option_contents and answer_letter:
            needed = max(letter_to_index(answer_letter) + 1, 5)
            all_letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
            option_letters = all_letters[:needed]
            option_contents = list(option_letters)

        # Check for diagram images
        image_dir = os.path.join(PROJ_DIR, "client/public/question-images")
        image_url = None
        for fig_idx in range(1, 10):
            fig_name = f"{paper_key}_q{q_num:02d}_fig{fig_idx}.jpg"
            if os.path.exists(os.path.join(image_dir, fig_name)):
                image_url = f"/question-images/{fig_name}"
                break

        if topic:
            paper_topics.add(topic)

        q_obj = {
            "id": f"q{q_num}",
            "text": cleaned_text,
            "options": option_contents,
            "answer": answer_idx,
            "topic": topic,
        }
        if image_url:
            q_obj["image_url"] = image_url

        question_objects.append(q_obj)

    # Format as JSON
    questions_json = json.dumps(question_objects, indent=2, ensure_ascii=False)

    # Paper title
    title = f"TMUA {year} {sitting} Paper {paper_num}"

    # Topics list
    topic_list = sorted(paper_topics) if paper_topics else ["algebra", "functions", "geometry", "trigonometry", "sequences", "calculus", "logic"]

    sql = f"""-- TMUA {year} Paper {paper_num} (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  '{title}',
  {paper_num},
  {year},
  '{sitting}',
  75,
  20,
  ARRAY{topic_list}::text[],
  $json${questions_json}$json$
);
"""
    return sql


def main():
    print("Loading data...")
    questions = load_json(QUESTIONS_FILE)
    answer_keys = load_json(ANSWER_KEYS_FILE)
    classifications = load_json(CLASSIFICATIONS_FILE)

    # Check for missing answer keys (2022-2023)
    for paper_key in questions:
        if paper_key not in answer_keys:
            print(f"WARNING: {paper_key} missing from answer_keys.json!")
        if paper_key not in classifications:
            print(f"WARNING: {paper_key} missing from classifications.json!")

    # Generate all papers SQL
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    all_sql_parts = ["-- TMUA 2016-2023 All Papers — Mathpix LaTeX Edition\n"]
    all_sql_parts.append("-- Generated from Mathpix OCR output\n\n")

    for paper_key in sorted(questions.keys()):
        if paper_key not in answer_keys:
            continue

        sql = generate_paper_sql(paper_key, questions[paper_key], answer_keys, classifications)

        # Write individual file
        file_path = os.path.join(OUTPUT_DIR, f"seed-{paper_key}-mathpix.sql")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(sql)

        all_sql_parts.append(sql)
        all_sql_parts.append("\n")

    # Write all-in-one file
    all_path = os.path.join(OUTPUT_DIR, "seed-all-papers-mathpix.sql")
    with open(all_path, "w", encoding="utf-8") as f:
        f.write("\n".join(all_sql_parts))

    # Count
    papers_done = len([k for k in questions if k in answer_keys])
    print(f"\nGenerated {papers_done} papers:")
    print(f"  Individual files: server/seed-*-mathpix.sql")
    print(f"  All-in-one: server/seed-all-papers-mathpix.sql")

    # Check for 2022-2023 answer keys
    missing_answers = [k for k in questions if k not in answer_keys]
    if missing_answers:
        print(f"\nPapers WITHOUT answer keys: {missing_answers}")
        print("These need answer keys added to answer_keys.json")


if __name__ == "__main__":
    main()
