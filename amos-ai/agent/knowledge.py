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
