"""
Parse Mathpix-processed TMUA questions into training_set.jsonl
Reads extracted_questions_mathpix.json + answer_keys.json
Outputs data/training_set.jsonl
"""
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
from agent.knowledge import detect_topic

PROJ_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
MATHpix_PATH = os.path.join(PROJ_ROOT, "online-proctoring", "extracted_questions_mathpix.json")
ANSWERS_PATH = os.path.join(PROJ_ROOT, "online-proctoring", "answer_keys.json")
OUTPUT_PATH = os.path.join(PROJ_ROOT, "data", "training_set.jsonl")


def main():
    with open(MATHpix_PATH) as f:
        questions = json.load(f)
    with open(ANSWERS_PATH) as f:
        answers = json.load(f)

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    count = 0
    skipped = 0
    topic_counts = {}
    with open(OUTPUT_PATH, 'w') as out:
        for paper_key in sorted(questions.keys()):
            if '-' not in paper_key:
                continue
            year_str, paper_str = paper_key.split('-')
            year = int(year_str)
            paper = int(paper_str)

            answer_map = answers.get(paper_key, {})
            if not answer_map:
                print(f"  WARNING: No answer keys for {paper_key}")
                continue

            for qno_str in sorted(questions[paper_key].keys(), key=int):
                qno = int(qno_str)
                text = questions[paper_key][qno_str]
                if not text or len(text) < 20:
                    skipped += 1
                    continue

                answer = answer_map.get(qno_str)
                if not answer:
                    skipped += 1
                    continue

                topic = detect_topic(text)
                topic_counts[topic] = topic_counts.get(topic, 0) + 1

                record = {
                    "id": f"{paper_key}-Q{qno}",
                    "year": year,
                    "paper": paper,
                    "question_no": qno,
                    "topic": topic,
                    "question": text,
                    "answer": answer,
                }
                out.write(json.dumps(record, ensure_ascii=False) + '\n')
                count += 1

    print(f"Parsed {count} questions → {OUTPUT_PATH}")
    print(f"Skipped: {skipped}")
    print(f"Topic distribution:")
    for t, n in sorted(topic_counts.items(), key=lambda x: -x[1]):
        print(f"  {t}: {n}")
    return count


if __name__ == "__main__":
    main()
