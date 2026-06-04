"""
Classify TMUA questions into 14 topic tags using keyword matching.
Reads extracted_questions.json, outputs classifications.json.
"""
import json
import re

# 14 tags with keyword patterns (case-insensitive)
TAG_RULES = [
    ("trigonometry", [
        r'\b(trig|trigonometry|trigonometric|sine|sin|cos|cosine|tan\b|tangent|cot|cosec|sec\b|radian|arcsin|arccos|arctan)',
        r'\b(sin\^?2|cos\^?2|tan\^?2)',
    ]),
    ("integration", [
        r'\b(integral|integrate|integration|integrating|antiderivative)',
        r'\b(area under|area between|trapezium)\b',
        r'\bdx\b',
        r'\b(definite integral|indefinite integral)',
    ]),
    ("differentiation", [
        r"\b(differentiate|differentiation|derivative|d/dx|f\s*['']\s*\(|stationary point|turning point|tangent\s+line|gradient\s+of\s+the\s+curve|rate\s+of\s+change|normal\s+to\s+the\s+curve)",
        r'\b(second\s+derivative|concave|point\s+of\s+inflection)',
        r'\b(dy/dx)\b',
    ]),
    ("exponentials_logs", [
        r'\b(log|logarithm|ln\b|exponential|exponent|e\^|log_|log\s*\()',
        r'\b(logarithmic|natural\s+log)',
    ]),
    ("sequences_series", [
        r'\b(sequence|series|arithmetic\s+progression|geometric\s+progression|AP\b|GP\b|sum\s+to\s+infinity|nth\s+term|sigma\s+notation|\bΣ\b|binomial\s+expansion|binomial\s+coefficient|binomial\s+theorem)',
        r'\b(common\s+difference|common\s+ratio|arithmetic\s+sequence|geometric\s+sequence|convergent|divergent)',
        r'\b(coefficient\s+of\s+the\s+x\^?\d*\s*term\s+in\s+the\s+expansion)',
    ]),
    ("coordinate_geometry", [
        r'\b(coordinate|circle|circles|centre|radius|diameter|chord|tangent\s+to\s+the\s+circle|equation\s+of\s+the\s+circle)',
        r'\b(straight\s+line|gradient\s+of\s+the\s+line|midpoint|distance\s+between|parallel|perpendicular|intersection|intersect)',
        r'\b(line\s+.*\s+circle|circle\s+.*\s+line|point\s+of\s+intersection)',
    ]),
    ("quadratics_polynomials", [
        r'\b(quadratic|discriminant|completing\s+the\s+square|roots\s+of\s+the\s+equation|polynomial|factor\s+theorem|remainder\s+theorem)',
        r'\b(b\^2\s*-\s*4ac|real\s+roots|distinct\s+roots|repeated\s+root)',
        r'\b(cubic|quartic|degree\s+\d+\s+polynomial)',
        r'\b(expand|factorise|factorize|factorisation|factorization)',
    ]),
    ("inequalities", [
        r'\b(inequalit|inequality|<|>|≤|≥|\bless\s+than\b|\bgreater\s+than\b|set\s+of\s+values|range\s+of\s+values\s+for\s+which)',
    ]),
    ("functions", [
        r'\b(function|domain|range|inverse|composite|composition|one-to-one|onto|bijection|f\s*\(g\s*\(|gf\s*\(|fg\s*\()',
        r'\b(f\s*:\s*x\s*→|f\s*\(x\)\s*=\s*)',
        r'\b(inverse\s+function|f\^-1|f\s*\^\{\s*-1\s*\})',
    ]),
    ("transformations_graphs", [
        r'\b(transformation|transform|translation|stretch|reflection|graph\s+of|sketch|y\s*=\s*f\s*\()',
        r'\b(y\s*=\s*f\s*\(\s*x\s*[+-]\s*[a-z]\s*\)|y\s*=\s*f\s*\(\s*[a-z]x\s*\))',
        r'\b(asymptote|symmetry|even\s+function|odd\s+function)',
    ]),
    ("number_theory", [
        r'\b(number\s+theory|integer|divisible|divisor|factor\b|multiple\b|prime|mod|modulo|remainder|gcd\b|hcf\b|lcm\b|coprime|rational|irrational)',
        r'\b(digit|units\s+digit|last\s+digit|decimal\s+representation)',
    ]),
    ("logic_proof", [
        r'\b(logic|logical|proof|prove|conjecture|counterexample|necessary\s+condition|sufficient\s+condition|if\s+and\s+only\s+if|contrapositive|contradiction|implies|therefore|hence|deduce|negation)',
        r'\b(statement|true\s+statement|false\s+statement|always\s+true|never\s+true)',
    ]),
    ("algebra", [
        r'\b(algebra|simplify|simplification|surds?|rationalise|rationalize|indices|index\s+laws|exponent\s+laws|simultaneous\s+equation|solve\s+the\s+equation|expression)',
        r'\b(factorise|factorize|factorisation|factorization|expand|bracket)',
        r'\b(partial\s+fraction|algebraic\s+fraction)',
    ]),
]

# Low-confidence tag: use only when nothing else matches (catch-all)
GENERAL_KEYWORDS = [
    r'\b(general|miscellaneous)\b',
]

def clean_text(text):
    """Remove noise: page numbers, copyright, blank page markers."""
    text = re.sub(r'©\s*UCLES\s*\d{4}', '', text)
    text = re.sub(r'BLANK\s*PAGE', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\b\d{1,3}\s*\n\s*\d{1,3}\b', '', text)  # page numbers
    text = re.sub(r'\n\s*\d+\s*\n', '\n', text)  # standalone page numbers
    text = re.sub(r'^\d+\s*$', '', text, flags=re.MULTILINE)
    return text.strip()


def classify_question(text):
    """Return the best tag for a question based on keyword matching."""
    if not text or len(text.strip()) < 5:
        return None  # insufficient text

    text = clean_text(text)
    if not text or len(text.strip()) < 5:
        return None

    text_lower = text.lower()
    scores = {}

    for tag, patterns in TAG_RULES:
        score = 0
        for pat in patterns:
            matches = re.findall(pat, text_lower)
            score += len(matches)
        if score > 0:
            scores[tag] = score

    if not scores:
        return "general"

    # Return the tag with the highest score
    # If integration scores strongly with dx, it's definitely integration
    if "integration" in scores and scores.get("integration", 0) >= 2:
        return "integration"
    if "differentiation" in scores and scores.get("differentiation", 0) >= 3 and "integration" not in scores:
        return "differentiation"
    # If trigonometry is the top scorer, it's usually right
    if "trigonometry" in scores and scores["trigonometry"] >= max(scores.values()):
        return "trigonometry"

    best = max(scores, key=scores.get)

    # If best score is 1 and it's algebra (very generic), try to be more specific
    if scores[best] == 1 and best == "algebra":
        # Check for more specific faint signals
        if re.search(r'\b(sin|cos|tan|trig)\b', text_lower):
            return "trigonometry"
        if re.search(r'\b(log|ln|exponent)\b', text_lower):
            return "exponentials_logs"
        if re.search(r'\b(integral|dx)\b', text_lower):
            return "integration"
        if re.search(r'\b(derivative|dy/dx|gradient)\b', text_lower):
            return "differentiation"
        if re.search(r'\b(circle|radius|centre)\b', text_lower):
            return "coordinate_geometry"
        if re.search(r'\b(sequence|series|sum\b)\b', text_lower):
            return "sequences_series"

    return best


def main():
    with open('/Users/yumingdong/online-proctoring/extracted_questions.json') as f:
        extracted = json.load(f)

    classifications = {}
    stats = {tag: 0 for tag, _ in TAG_RULES}
    stats["general"] = 0
    stats["unclassified"] = 0

    # Classify 2016-2021
    for year_paper, questions in sorted(extracted.items()):
        classifications[year_paper] = {}
        for qnum_str, text in sorted(questions.items(), key=lambda x: int(x[0])):
            tag = classify_question(text)
            if tag is None:
                tag = "unclassified"
                stats["unclassified"] += 1
            else:
                stats[tag] = stats.get(tag, 0) + 1
            classifications[year_paper][qnum_str] = tag

    # Also add placeholders for 2022-2023 (to be classified manually)
    for year in [2022, 2023]:
        for paper in [1, 2]:
            key = f"{year}-{paper}"
            if key not in classifications:
                classifications[key] = {}
                for q in range(1, 21):
                    classifications[key][str(q)] = "unclassified"
                    stats["unclassified"] += 1

    # Write output
    with open('/Users/yumingdong/online-proctoring/classifications.json', 'w') as f:
        json.dump(classifications, f, indent=2)

    print("=== Classification Complete ===")
    total = sum(stats.values())
    print(f"Total questions: {total}")
    for tag, count in sorted(stats.items(), key=lambda x: -x[1]):
        pct = count / total * 100 if total > 0 else 0
        print(f"  {tag}: {count} ({pct:.1f}%)")

    # Show unclassified questions
    unclassified = []
    for year_paper, qs in classifications.items():
        for qnum, tag in qs.items():
            if tag == "unclassified":
                unclassified.append(f"{year_paper} Q{qnum}")
    if unclassified:
        print(f"\nUnclassified ({len(unclassified)}):")
        for u in unclassified[:20]:
            print(f"  {u}")
        if len(unclassified) > 20:
            print(f"  ... and {len(unclassified) - 20} more")

if __name__ == '__main__':
    main()
