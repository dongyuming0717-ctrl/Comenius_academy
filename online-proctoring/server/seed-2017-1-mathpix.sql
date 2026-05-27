-- TMUA 2017 Paper 1 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2017 November Paper 1',
  1,
  2017,
  'November',
  75,
  20,
  ARRAY['coordinate_geometry', 'differentiation', 'exponentials_logs', 'functions', 'inequalities', 'integration', 'number_theory', 'sequences_series', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "Given that\n$$\n\\frac{d y}{d x}=3 x^{2}-\\frac{2-3 x}{x^{3}}, \\quad x \\neq 0\n$$\n\nand $y=5$ when $x=1$, find $y$ in terms of $x$.\\\\",
    "options": [
      "$y=\\frac{1}{3} x^{3}+x^{-2}-3 x^{-1}+6 \\frac{2}{3}$",
      "$y=x^{3}+\\frac{1}{2} x^{-2}-3 x^{-1}+6 \\frac{1}{2}$\\\\\nc $y=x^{3}+x^{-2}-3 x^{-1}+6$",
      "$y=x^{3}+x^{-2}-x^{-1}+4$",
      "$y=x^{3}+2 x^{-2}-x^{-1}+3$",
      "$y=3 x^{3}+x^{-2}-x^{-1}+2$"
    ],
    "answer": 2,
    "topic": "integration"
  },
  {
    "id": "q2",
    "text": "The function $f$ is given by\n$$\nf(x)=\\left(\\frac{2}{x}-\\frac{1}{2 x^{2}}\\right)^{2} \\quad(x \\neq 0)\n$$\n\nWhat is the value of $f^{\\prime \\prime}(1)$ ?\\\\",
    "options": [
      "-3",
      "-1",
      "5",
      "17",
      "29",
      "80"
    ],
    "answer": 2,
    "topic": "functions"
  },
  {
    "id": "q3",
    "text": "A line $l$ has equation $y=6-2 x$\\\\",
    "options": [
      "second line is perpendicular to $l$ and passes through the point $(-6,0)$.\\\\\nFind the area of the region enclosed by the two lines and the $x$-axis.\\\\\nA $16 \\frac{1}{5}$",
      "18",
      "$21 \\frac{3}{5}$",
      "27",
      "$\\quad 40 \\frac{1}{2}$"
    ],
    "answer": 0,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q4",
    "text": "When $\\left(3 x^{2}+8 x-3\\right)$ is multiplied by $(p x-1)$ and the resulting product is divided by $(x+1)$, the remainder is 24 .\nWhat is the value of $p$ ?\\\\",
    "options": [
      "-4",
      "2",
      "4",
      "$\\frac{8}{7}$",
      "$\\frac{11}{4}$"
    ],
    "answer": 1,
    "topic": "number_theory"
  },
  {
    "id": "q5",
    "text": "is the complete set of values of $x$ which satisfy both the inequalities\n$$\nx^{2}-8 x+12<0 \\text { and } 2 x+1>9\n$$\n\nThe set $S$ can also be represented as a single inequality.\\\\\nWhich one of the following single inequalities represents the set $S$ ?\\\\",
    "options": [
      "$\\left(x^{2}-8 x+12\\right)(2 x+1)<0$",
      "$\\left(x^{2}-8 x+12\\right)(2 x+1)>0$",
      "$x^{2}-10 x+24<0$",
      "$x^{2}-10 x+24>0$",
      "$\\quad x^{2}-6 x+8<0$",
      "$\\quad x^{2}-6 x+8>0$",
      "$x<2$",
      "$x>6$"
    ],
    "answer": 2,
    "topic": "inequalities"
  },
  {
    "id": "q6",
    "text": "A tangent to the circle $x^{2}+y^{2}=144$ passes through the point $(20,0)$ and crosses the positive $y$-axis.\nWhat is the value of $y$ at the point where the tangent meets the $y$-axis?\\\\",
    "options": [
      "12",
      "15",
      "$\\frac{49}{3}$",
      "20",
      "$\\frac{64}{3}$",
      "$\\frac{80}{3}$"
    ],
    "answer": 1,
    "topic": "trigonometry"
  },
  {
    "id": "q7",
    "text": "The first three terms of an arithmetic progression are $p, q$ and $p^{2}$ respectively, where $p<0$\nThe first three terms of a geometric progression are $p, p^{2}$ and $q$ respectively.\\\\\nFind the sum of the first 10 terms of the arithmetic progression.\\\\",
    "options": [
      "$\\frac{23}{8}$",
      "$\\frac{95}{8}$",
      "$\\frac{115}{8}$",
      "$\\frac{185}{8}$"
    ],
    "answer": 1,
    "topic": "sequences_series"
  },
  {
    "id": "q8",
    "text": "Find the complete set of values of $x$, with $0 \\leq x \\leq \\pi$, for which\n$$\n(1-2 \\sin x) \\cos x \\geq 0\n$$",
    "options": [
      "$0 \\leq x \\leq \\frac{\\pi}{6}, \\frac{\\pi}{2} \\leq x \\leq \\frac{5 \\pi}{6}$",
      "$0 \\leq x \\leq \\frac{\\pi}{6}, \\frac{5 \\pi}{6} \\leq x \\leq \\pi$",
      "$\\frac{\\pi}{6} \\leq x \\leq \\frac{\\pi}{2}, \\quad \\frac{5 \\pi}{6} \\leq x \\leq \\pi$",
      "$\\frac{\\pi}{6} \\leq x \\leq \\frac{5 \\pi}{6}$"
    ],
    "answer": 0,
    "topic": "trigonometry"
  },
  {
    "id": "q9",
    "text": "A circle has equation $x^{2}+y^{2}-18 x-22 y+178=0$\\\\",
    "options": [
      "regular hexagon is drawn inside this circle so that the vertices of the hexagon touch the circle.\n\nWhat is the area of the hexagon?\\\\\nA 6",
      "$6 \\sqrt{3}$",
      "18",
      "$18 \\sqrt{3}$",
      "36",
      "$36 \\sqrt{3}$",
      "48",
      "$48 \\sqrt{3}$"
    ],
    "answer": 5,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q10",
    "text": "A curve $C$ has equation $y=f(x)$ where\n$$\nf(x)=p^{3}-6 p^{2} x+3 p x^{2}-x^{3}\n$$\n\nand $p$ is real.\\\\\nThe gradient of the normal to the curve $C$ at the point where $x=-1$ is $M$.\\\\\nWhat is the greatest possible value of $M$ as $p$ varies?\\\\",
    "options": [
      "$-\\frac{3}{2}$",
      "$-\\frac{2}{3}$",
      "$-\\frac{1}{2}$",
      "$\\frac{1}{4}$",
      "$\\frac{2}{3}$",
      "$\\frac{3}{2}$"
    ],
    "answer": 4,
    "topic": "differentiation"
  },
  {
    "id": "q11",
    "text": "The sequence $x_{n}$ is defined by the rules\n$$\n\\begin{aligned}\nx_{1} & =7 \\\\\nx_{n+1} & =\\frac{23 x_{n}-53}{5 x_{n}+1}\n\\end{aligned}\n$$\n\nThe first three terms in the sequence are $7,3,1$\\\\\nWhat is the value of $x_{100}$ ?\\\\",
    "options": [
      "-5",
      "0",
      "1",
      "3",
      "7"
    ],
    "answer": 0,
    "topic": "sequences_series"
  },
  {
    "id": "q12",
    "text": "The polynomial function $f(x)$ is such that $f(x)>0$ for all values of $x$.\\\\\nGiven $\\int_{2}^{4} f(x) d x=A$, which one of the following statements must be correct?\\\\",
    "options": [
      "$\\int_{0}^{2}[f(x+2)+1] d x=A+1$",
      "$\\quad \\int_{0}^{2}[f(x+2)+1] d x=A+2$",
      "$\\int_{2}^{4}[f(x+2)+1] d x=A+1$",
      "$\\int_{2}^{4}[f(x+2)+1] d x=A+2$",
      "$\\quad \\int_{4}^{6}[f(x+2)+1] d x=A+1$",
      "$\\quad \\int_{4}^{6}[f(x+2)+1] d x=A+2$"
    ],
    "answer": 1,
    "topic": "integration"
  },
  {
    "id": "q13",
    "text": "In the expansion of $(a+b x)^{5}$ the coefficient of $x^{4}$ is 8 times the coefficient of $x^{2}$.\\\\\nGiven that $a$ and $b$ are non-zero positive integers, what is the smallest possible value of $a+b$ ?",
    "options": [
      "3",
      "4",
      "5",
      "9",
      "13",
      "17"
    ],
    "answer": 2,
    "topic": "sequences_series"
  },
  {
    "id": "q14",
    "text": "The solution of the simultaneous equations\n$$\n\\begin{array}{r}\n2^{x}+3 \\times 2^{y}=3 \\\\\n2^{2 x}-9 \\times 2^{2 y}=6\n\\end{array}\n$$\n\nis $x=p, y=q$.\\\\\nFind the value of $p-q$\\\\",
    "options": [
      "$\\frac{5}{12}$",
      "$\\frac{7}{3}$",
      "$\\log _{2} \\frac{5}{12}$",
      "$\\log _{2} \\frac{7}{3}$",
      "$\\log _{2} 9$",
      "$\\quad \\log _{2} 15$"
    ],
    "answer": 5,
    "topic": "exponentials_logs"
  },
  {
    "id": "q15",
    "text": "It is given that $f(x)=-2 x^{2}+10$\\\\\nConsider the following three curves:\\\\\n(1) $y=f(x)$\\\\\n(2) $y=f(x+1)$\\\\\n(3) the curve $y=f(x+1)$ reflected in the line $y=6$\n\nThe trapezium rule is used to estimate the area under each of these three curves between $x=0$ and $x=1$.\n\nState whether the trapezium rule gives an overestimate or underestimate for each of these areas.",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H"
    ],
    "answer": 1,
    "topic": "integration"
  },
  {
    "id": "q16",
    "text": "The functions $f$ and $g$ are given by $f(x)=3 x^{2}+12 x+4$ and $g(x)=x^{3}+6 x^{2}+9 x-8$. What is the complete set of values of $x$ for which one of the functions is increasing and the other decreasing?",
    "options": [
      "$x \\geq-1$",
      "$x \\leq-1$",
      "$\\quad-3 \\leq x \\leq-2, x \\geq-1$",
      "$x \\leq-2, x \\geq-1$",
      "$\\quad x \\leq-3,-2 \\leq x \\leq-1$",
      "$x \\leq-3, x \\geq-2$",
      "$\\quad-2 \\leq x \\leq-1$"
    ],
    "answer": 4,
    "topic": "inequalities"
  },
  {
    "id": "q17",
    "text": "The two functions $F(n)$ and $G(n)$ are defined as follows for positive integers $n$ :\n$$\n\\begin{aligned}\n& F(n)=\\frac{1}{n} \\int_{0}^{n}(n-x) d x \\\\\n& G(n)=\\sum_{r=1}^{n} F(r)\n\\end{aligned}\n$$\n\nWhat is the smallest positive integer $n$ such that $G(n)>150$ ?\\\\",
    "options": [
      "22",
      "23",
      "24",
      "25",
      "26"
    ],
    "answer": 3,
    "topic": "number_theory"
  },
  {
    "id": "q18",
    "text": "The graph of $y=\\log _{10} x$ is translated in the positive $y$-direction by 2 units. This translation is equivalent to a stretch of factor $k$ parallel to the $x$-axis. What is the value of $k$ ?",
    "options": [
      "0.01",
      "$\\log _{10} 2$",
      "$\\quad 0.5$",
      "2",
      "$\\quad \\log _{2} 10$",
      "100"
    ],
    "answer": 0,
    "topic": "exponentials_logs"
  },
  {
    "id": "q19",
    "text": "The set of solutions to the inequality $x^{2}+b x+c<0$ is the interval $p<x<q$ where $b, c, p$ and $q$ are real constants with $c<0$.\nIn terms of $p, q$ and $c$, what is the set of solutions to the inequality $x^{2}+b c x+c^{3}<0$ ?\\\\",
    "options": [
      "$\\frac{p}{c}<x<\\frac{q}{c}$",
      "$\\frac{q}{c}<x<\\frac{p}{c}$",
      "$p c<x<q c$",
      "$q c<x<p c$",
      "$p c^{2}<x<q c^{2}$",
      "$q c^{2}<x<p c^{2}$"
    ],
    "answer": 3,
    "topic": "inequalities"
  },
  {
    "id": "q20",
    "text": "The lengths of the sides $Q R, R P$ and $P Q$ in triangle $P Q R$ are $a, a+d$ and $a+2 d$ respectively, where $a$ and $d$ are positive and such that $3 d>2 a$.\nWhat is the full range, in degrees, of possible values for angle $P R Q$ ?\\\\",
    "options": [
      "0 < angle $P R Q<60$",
      "0 < angle $P R Q<120$",
      "60 < angle $P R Q<120$",
      "60 < angle $P R Q<180$",
      "120 < angle $P R Q<180$"
    ],
    "answer": 4,
    "topic": "trigonometry"
  }
]$json$
);
