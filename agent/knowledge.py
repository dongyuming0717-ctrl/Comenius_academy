"""
TMUA 知识库 — 考纲、公式、知识点检测
"""
import re

TMUA_SYLLABUS = """
## TMUA 考试结构
- Paper 1: Mathematical Thinking (数学思维) — 20题选择题，75分钟
- Paper 2: Mathematical Reasoning (数学推理) — 20题选择题，75分钟

## 知识点覆盖
### Paper 1 — Mathematical Thinking
1. Algebra (代数): 方程、不等式、函数、图像变换
2. Sequences & Series (数列与级数): 等差数列、等比数列、递推
3. Coordinate Geometry (坐标几何): 直线、圆、参数方程
4. Trigonometry (三角学): 三角恒等式、解三角形、弧度制
5. Exponentials & Logarithms (指数与对数): 指数函数、对数函数、方程
6. Differentiation (微分): 基本导数、链式法则、极值问题
7. Integration (积分): 不定积分、定积分、面积计算
8. Vectors (向量): 向量运算、点积、直线方程
9. Proof (证明): 直接证明、反证法、归纳法

### Paper 2 — Mathematical Reasoning
1. Logic (逻辑): 命题、蕴含、等价、逆否命题
2. Number Theory (数论): 质数、同余、整除性
3. Combinatorics (组合): 排列组合、二项式定理
4. Probability (概率): 条件概率、独立事件、期望
5. Statistics (统计): 平均数、方差、正态分布
6. Functions (函数): 定义域值域、复合函数、反函数
7. Graphs (图像): 函数图像分析、变换、渐近线
"""

# 常见公式速查
FORMULAS = {
    "trigonometry": [
        "sin²θ + cos²θ = 1",
        "tan θ = sin θ / cos θ",
        "sin(A±B) = sin A cos B ± cos A sin B",
        "cos(A±B) = cos A cos B ∓ sin A sin B",
        "sin 2θ = 2 sin θ cos θ",
        "cos 2θ = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ",
        "正弦定理: a/sin A = b/sin B = c/sin C = 2R",
        "余弦定理: a² = b² + c² - 2bc cos A",
    ],
    "calculus": [
        "d/dx(xⁿ) = nxⁿ⁻¹",
        "d/dx(sin x) = cos x, d/dx(cos x) = -sin x",
        "d/dx(eˣ) = eˣ, d/dx(ln x) = 1/x",
        "链式法则: d/dx[f(g(x))] = f'(g(x))·g'(x)",
        "乘积法则: d/dx(uv) = u'v + uv'",
        "∫xⁿ dx = xⁿ⁺¹/(n+1) + C (n≠-1)",
        "∫1/x dx = ln|x| + C",
        "定积分面积 = ∫ₐᵇ f(x)dx",
    ],
    "sequences": [
        "等差: aₙ = a₁ + (n-1)d, Sₙ = n/2(a₁+aₙ)",
        "等比: aₙ = a₁·rⁿ⁻¹, Sₙ = a₁(1-rⁿ)/(1-r)",
        "无穷等比: S∞ = a₁/(1-r), |r|<1",
    ],
    "statistics": [
        "均值 μ = Σx/n",
        "方差 σ² = Σ(x-μ)²/n",
        "标准差 σ = √(Σ(x-μ)²/n)",
        "P(A|B) = P(A∩B)/P(B)",
        "独立事件: P(A∩B) = P(A)·P(B)",
    ],
}

TOPIC_KEYWORDS = {
    "trigonometry": [r"\bsin\b", r"\bcos\b", r"\btan\b", "trig", "angle", "triangle", "sine", "cosine", "cosec", "sec", "cot", "radian", "degree"],
    "calculus": ["derivative", "integral", "differentiate", "integrate", "dy/dx", "gradient", "tangent", "rate of change", "area under", "stationary", "area", "turning point", "increasing", "decreasing", "minimum", "maximum", "enclosed", "curve", "normal", "inflection"],
    "sequences": ["sequence", "series", "arithmetic", "geometric", "sum", r"\bnth\b", "term", "progression", "sigma", "converge"],
    "algebra": ["equation", "inequality", "polynomial", "factor", "quadratic", "solve", "root", "expansion", "coefficient", "constant", "expression", "simplify", r"\bbinomial\b", "completing the square", "remainder theorem", "partial fraction"],
    "coordinate_geometry": ["coordinate", "circle", "parabola", "distance", "midpoint", "intersection", "gradient", "normal", "perpendicular", "parallel", "radius", "diameter", "centre"],
    "exponentials": [r"\blog\b", r"\bln\b", "exponent", "e^", "power", "growth", "decay", "logarithm"],
    "vectors": ["vector", "dot product", "magnitude", "direction", "scalar", "cross product", "position vector"],
    "probability": ["probability", "chance", "likelihood", "event", "outcome", "random", "independent", r"\bP(A", "conditional", "expected value", "variance", "standard deviation", "distribution", "binomial distribution", "normal distribution"],
    "combinatorics": ["combination", "permutation", "choose", "arrange", "selection", "ways", "order"],
    "logic": ["implies", "therefore", "if and only if", "contrapositive", "negation", "converse", "necessary", "sufficient", "true", "false", "statement"],
    "number_theory": ["prime", "integer", "divisible", "mod", "remainder", "gcd", "lcm", "even", "odd", r"\bdigit\b", "factor"],
}


# 知识点精细分类: 主 topic → 子 topic 列表
TOPIC_SUBTOPICS = {
    "calculus": [
        "differentiation_basics", "chain_rule", "product_rule", "quotient_rule",
        "stationary_points", "tangents_normals", "increasing_decreasing",
        "integration_basics", "definite_integrals", "area_under_curve",
        "trapezoidal_rule", "numerical_integration",
    ],
    "trigonometry": [
        "trig_identities", "trig_equations", "sine_cosine_rule",
        "radian_measure", "trig_graphs", "compound_angle_formulas",
        "double_angle_formulas",
    ],
    "algebra": [
        "quadratics", "polynomials", "inequalities", "remainder_theorem",
        "factor_theorem", "partial_fractions", "binomial_expansion",
        "completing_square", "discriminant",
    ],
    "sequences": [
        "arithmetic_sequences", "geometric_sequences", "infinite_series",
        "recurrence_relations", "sigma_notation", "convergence",
    ],
    "coordinate_geometry": [
        "distance_midpoint", "equation_of_line", "equation_of_circle",
        "intersections", "parametric_equations", "parallel_perpendicular",
    ],
    "exponentials": [
        "exponent_laws", "logarithm_laws", "log_equations", "exponential_equations",
        "change_of_base", "natural_log", "growth_decay",
    ],
    "logic": [
        "implication", "contrapositive", "converse_inverse",
        "quantifiers", "necessity_sufficiency", "truth_tables",
    ],
    "probability": [
        "basic_probability", "conditional_probability", "independence",
        "expectation", "variance", "binomial_distribution", "tree_diagrams",
    ],
    "combinatorics": [
        "permutations", "combinations", "binomial_theorem",
        "counting_principles", "arrangements_with_restrictions",
    ],
    "number_theory": [
        "prime_factorization", "divisibility", "gcd_lcm",
        "modular_arithmetic", "digits_place_value",
    ],
    "vectors": [
        "vector_operations", "dot_product", "magnitude",
        "position_vectors", "vector_equations_of_lines",
    ],
}

# 按子 topic 推荐练习题目 (year, paper, question_no)
SUGGESTED_PROBLEMS = {
    "differentiation_basics": [(2016, 1, 12), (2018, 1, 9), (2020, 1, 11)],
    "stationary_points": [(2017, 1, 16), (2019, 1, 13), (2021, 1, 14)],
    "integration_basics": [(2016, 1, 18), (2018, 1, 17), (2020, 1, 18)],
    "trapezoidal_rule": [(2019, 1, 15), (2021, 1, 10), (2023, 1, 15)],
    "area_under_curve": [(2017, 1, 19), (2020, 1, 19), (2022, 1, 17)],
    "trig_identities": [(2016, 1, 8), (2019, 1, 6), (2022, 1, 9)],
    "trig_equations": [(2017, 1, 9), (2018, 1, 6), (2021, 1, 7)],
    "sine_cosine_rule": [(2016, 1, 11), (2020, 1, 8)],
    "quadratics": [(2016, 1, 1), (2019, 1, 2), (2022, 1, 3)],
    "inequalities": [(2017, 1, 4), (2021, 1, 5)],
    "polynomials": [(2018, 1, 3), (2020, 1, 2)],
    "arithmetic_sequences": [(2016, 1, 14), (2020, 1, 4), (2021, 1, 3)],
    "geometric_sequences": [(2017, 1, 7), (2019, 1, 9), (2022, 1, 8)],
    "infinite_series": [(2018, 1, 8), (2023, 1, 18)],
    "equation_of_circle": [(2016, 1, 15), (2020, 1, 14), (2022, 1, 14)],
    "equation_of_line": [(2017, 1, 13), (2019, 1, 10)],
    "log_equations": [(2018, 1, 14), (2020, 1, 15), (2022, 1, 6)],
    "exponential_equations": [(2019, 1, 12), (2021, 1, 12)],
    "implication": [(2016, 2, 1), (2019, 2, 1), (2022, 2, 1)],
    "quantifiers": [(2017, 2, 2), (2020, 2, 1)],
    "conditional_probability": [(2016, 1, 7), (2019, 2, 12), (2021, 2, 3)],
    "expectation": [(2018, 2, 14), (2020, 2, 13)],
    "permutations": [(2017, 2, 20), (2018, 1, 5)],
    "combinations": [(2019, 2, 18), (2020, 2, 17)],
    "prime_factorization": [(2016, 2, 8), (2019, 2, 6)],
    "modular_arithmetic": [(2017, 2, 9), (2021, 2, 10)],
}


def get_subtopics(topic: str) -> list[str]:
    """获取某知识点的子话题列表"""
    return TOPIC_SUBTOPICS.get(topic, [])


def get_suggested_problems(topic: str, limit: int = 3) -> list[dict]:
    """获取某知识点的推荐练习题"""
    subtopics = TOPIC_SUBTOPICS.get(topic, [])
    problems = []
    for st in subtopics:
        if st in SUGGESTED_PROBLEMS:
            for (y, p, q) in SUGGESTED_PROBLEMS[st]:
                problems.append({"year": y, "paper": p, "question_no": q, "subtopic": st})
    return problems[:limit]


def detect_topic(text: str) -> str:
    """根据关键词自动判断题目知识点, 短词用词边界避免子串误匹配"""
    text_lower = text.lower()
    scores = {}
    for topic, keywords in TOPIC_KEYWORDS.items():
        score = 0
        for kw in keywords:
            if len(kw) <= 4 or kw.startswith("\\b"):
                if re.search(r'(?<![a-z])' + re.escape(kw.replace('\\b', '')) + r'(?![a-z])', text_lower):
                    score += 1
            elif kw in text_lower:
                score += 1
        if score > 0:
            scores[topic] = score
    if not scores:
        return "general"
    return max(scores, key=scores.get)


def get_formulas(topic: str) -> list[str]:
    """获取某知识点的相关公式"""
    return FORMULAS.get(topic, [])
