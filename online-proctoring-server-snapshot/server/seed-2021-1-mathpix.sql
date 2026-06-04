-- TMUA 2021 Paper 1 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2021 October Paper 1',
  1,
  2021,
  'October',
  75,
  20,
  ARRAY['coordinate_geometry', 'differentiation', 'exponentials_logs', 'functions', 'integration', 'number_theory', 'sequences_series', 'transformations_graphs', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "Two circles have the same radius.\\\\\nThe centre of one circle is $(-2,1)$.\\\\\nThe centre of the other circle is $(3,-2)$.\\\\\nThe circles intersect at two distinct points.\\\\\nWhat is the equation of the straight line through the two points at which the circles intersect?",
    "options": [
      "$3 x-5 y=4$",
      "$3 x+5 y=-1$",
      "$5 x-3 y=-4$",
      "$5 x-3 y=-1$",
      "$\\quad 5 x-3 y=1$",
      "$5 x-3 y=4$",
      "$5 x+3 y=1$"
    ],
    "answer": 5,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q2",
    "text": "The curve $y=x^{3}-6 x+3$ has turning points at $x=\\alpha$ and $x=\\beta$, where $\\beta>\\alpha$.\\\\\nFind\n\n$$\n\\int_{\\alpha}^{\\beta} x^{3}-6 x+3 \\mathrm{~d} x\n$$",
    "options": [
      "$-8 \\sqrt{2}$",
      "-10",
      "$-10+6 \\sqrt{2}$",
      "0",
      "$\\quad 12-8 \\sqrt{2}$",
      "$\\quad 6 \\sqrt{2}$",
      "12"
    ],
    "answer": 5,
    "topic": "differentiation"
  },
  {
    "id": "q3",
    "text": "An arithmetic progression and a convergent geometric progression each have first term $\\frac{1}{2}$\nThe sum of the second terms of the two progressions is $\\frac{1}{2}$\\\\\nThe sum of the third terms of the two progressions is $\\frac{1}{8}$\\\\\nWhat is the sum to infinity of the geometric progression?",
    "options": [
      "-2",
      "-1",
      "$-\\frac{1}{2}$",
      "$-\\frac{1}{3}$",
      "$\\frac{1}{3}$",
      "$\\quad \\frac{1}{2}$",
      "1",
      "2"
    ],
    "answer": 6,
    "topic": "sequences_series"
  },
  {
    "id": "q4",
    "text": "Find the minimum value of the function\n$$\n2^{2 x}-2^{x+3}+4\n$$",
    "options": [
      "-16",
      "-12",
      "-8",
      "0",
      "4",
      "20"
    ],
    "answer": 1,
    "topic": "functions"
  },
  {
    "id": "q5",
    "text": "The function f is such that\n$$\n\\mathrm{f}(m n)= \\begin{cases}\\mathrm{f}(m) \\mathrm{f}(n) & \\text { if } m n \\text { is a multiple of } 3 \\\\ m n & \\text { if } m n \\text { is not a multiple of } 3\\end{cases}\n$$\n\nfor all positive integers $m$ and $n$.\\\\\nGiven that $\\mathrm{f}(9)+\\mathrm{f}(16)-\\mathrm{f}(24)=0$, what is the value of $\\mathrm{f}(3)$ ?\\\\",
    "options": [
      "$\\frac{8}{3}$",
      "$2 \\sqrt{2}$",
      "3",
      "$\\frac{16}{5}$",
      "$3 \\sqrt{2}$",
      "4"
    ],
    "answer": 5,
    "topic": "number_theory"
  },
  {
    "id": "q6",
    "text": "The function f is given by\n$$\n\\mathrm{f}(x)=\\frac{\\cos x+3}{7+5 \\cos x-\\sin ^{2} x}\n$$\n\nFind the positive difference between the maximum and the minimum values of $\\mathrm{f}(x)$.",
    "options": [
      "0",
      "$\\frac{1}{3}$",
      "$\\frac{1}{2}$",
      "$\\frac{2}{3}$",
      "1",
      "2"
    ],
    "answer": 3,
    "topic": "trigonometry"
  },
  {
    "id": "q7",
    "text": "The function f is such that $\\mathrm{f}(0)=0$, and $x \\mathrm{f}(x)>0$ for all non-zero values of $x$. It is given that\n$$\n\\int_{-2}^{2} \\mathrm{f}(x) \\mathrm{d} x=4\n$$\n\nand\n\n$$\n\\int_{-2}^{2}|\\mathrm{f}(x)| \\mathrm{d} x=8\n$$\n\nEvaluate\n\n$$\n\\int_{-2}^{0} \\mathrm{f}(|x|) \\mathrm{d} x\n$$",
    "options": [
      "-8",
      "-6",
      "-4",
      "-2",
      "2",
      "$\\quad 4$",
      "6",
      "8"
    ],
    "answer": 6,
    "topic": "integration"
  },
  {
    "id": "q8",
    "text": "The line $y=2 x+3$ meets the curve $y=x^{2}+b x+c$ at exactly one point.\\\\\nThe line $y=4 x-2$ also meets the curve $y=x^{2}+b x+c$ at exactly one point.\\\\\nWhat is the value of $b-c$ ?",
    "options": [
      "-9",
      "-5.5",
      "-1",
      "5",
      "6",
      "14"
    ],
    "answer": 0,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q9",
    "text": "Find the area enclosed by the graph of\n$$\n|x|+|y|=1\n$$",
    "options": [
      "$\\frac{1}{2}$",
      "1",
      "2",
      "4",
      "$\\frac{1}{2} \\sqrt{2}$",
      "$\\quad \\sqrt{2}$",
      "$2 \\sqrt{2}$"
    ],
    "answer": 2,
    "topic": "integration"
  },
  {
    "id": "q10",
    "text": "Use the trapezium rule with 3 strips to estimate\n$$\n\\int_{\\frac{1}{2}}^{2} 2 \\log _{10} x \\mathrm{~d} x\n$$",
    "options": [
      "$\\log _{10} \\frac{\\sqrt{6}}{2}$",
      "$\\log _{10} \\frac{3}{2}$",
      "$\\log _{10} \\frac{9}{4}$",
      "$\\log _{10} 3$",
      "$\\quad \\log _{10} \\frac{81}{16}$",
      "$\\quad \\log _{10} \\frac{\\sqrt{23}}{2}$"
    ],
    "answer": 1,
    "topic": "exponentials_logs"
  },
  {
    "id": "q11",
    "text": "The function f is given by\n$$\n\\mathrm{f}(x)=x^{\\frac{1}{7}}\\left(x^{2}-x+1\\right)\n$$\n\nFind the fraction of the interval $0<x<1$ for which $\\mathrm{f}(x)$ is decreasing.",
    "options": [
      "$\\frac{2}{15}$",
      "$\\frac{1}{5}$",
      "$\\frac{1}{3}$",
      "$\\frac{1}{2}$",
      "$\\frac{2}{3}$",
      "$\\frac{4}{5}$",
      "$\\frac{13}{15}$"
    ],
    "answer": 0,
    "topic": "functions"
  },
  {
    "id": "q12",
    "text": "The minimum value of the function $x^{4}-p^{2} x^{2}$ is -9 $p$ is a real number.\nFind the minimum value of the function $x^{2}-p x+6$",
    "options": [
      "-3",
      "$6-\\frac{3 \\sqrt{2}}{2}$",
      "$\\frac{3}{2}$",
      "3",
      "$\\frac{9}{2}$",
      "$6+\\frac{3 \\sqrt{2}}{2}$"
    ],
    "answer": 4,
    "topic": "functions"
  },
  {
    "id": "q13",
    "text": "The function f is such that, for every integer $n$\n$$\n\\int_{n}^{n+1} \\mathrm{f}(x) \\mathrm{d} x=n+1\n$$\n\nEvaluate\n\n$$\n\\sum_{r=1}^{8}\\left(\\int_{0}^{r} \\mathrm{f}(x) \\mathrm{d} x\\right)\n$$",
    "options": [
      "36",
      "84",
      "120",
      "165",
      "204",
      "288"
    ],
    "answer": 2,
    "topic": "integration"
  },
  {
    "id": "q14",
    "text": "This question uses radians.\\\\\nFind the number of distinct values of $x$ that satisfy the equation\n\n$$\n(x+1)(3-x)=2(1-\\cos (\\pi x))\n$$",
    "options": [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "answer": 1,
    "topic": "trigonometry"
  },
  {
    "id": "q15",
    "text": "The diagram shows the graph of $y=\\mathrm{f}(x)$.\\\\\n\nThe graph consists of alternating straight-line segments of gradient 1 and -1 and continues in this way for all values of $x$.\n\nThe function g is defined as\n\n$$\n\\mathrm{g}(x)=\\sum_{r=1}^{10} f\\left(2^{r-1} x\\right)\n$$\n\nFind the value of\n\n$$\n\\int_{0}^{1} \\mathrm{~g}(x) \\mathrm{d} x\n$$",
    "options": [
      "$\\frac{1023}{1024}$",
      "$\\frac{1023}{512}$",
      "5",
      "10",
      "$\\frac{55}{2}$",
      "55"
    ],
    "answer": 2,
    "topic": "transformations_graphs",
    "image_url": "/question-images/2021-1_q15_fig1.jpg"
  },
  {
    "id": "q16",
    "text": "Consider the expansion of\n$$\n(a+b x)^{n}\n$$\n\nThe third term, in ascending powers of $x$, is $105 x^{2}$\\\\\nThe fourth term, in ascending powers of $x$, is $210 x^{3}$\\\\\nThe fourth term, in descending powers of $x$, is $210 x^{3}$\\\\\nFind the value of $\\frac{a}{b}{ }^{2}$\\\\",
    "options": [
      "$\\frac{1}{4}$",
      "$\\frac{4}{9}$",
      "$\\frac{25}{36}$",
      "$\\frac{5}{6}$",
      "1"
    ],
    "answer": 1,
    "topic": "sequences_series"
  },
  {
    "id": "q17",
    "text": "Which of the following sketches shows the graph of\n$$\n\\sin \\left(x^{2}+y^{2}\\right)=\\frac{1}{2}\n$$\n\nwhere $x^{2}+y^{2} \\leq 8 \\pi$ ?\\\\\n\\\\\n\\\\\n\\\\\n\\\\",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "answer": 0,
    "topic": "transformations_graphs",
    "image_url": "/question-images/2021-1_q17_fig1.jpg"
  },
  {
    "id": "q18",
    "text": "The curve with equation\n$$\nx=y^{2}-6 y+11\n$$\n\nis rotated $90^{\\circ}$ clockwise about the point $P$ to give the curve $C$.\\\\\n$P$ has $x$-coordinate -2 and $y$-coordinate 3 .\\\\\nWhat is the equation of $C$ ?",
    "options": [
      "$y=-x^{2}-4 x-3$",
      "$y=-x^{2}-4 x-5$",
      "$y=-x^{2}-6 x-7$",
      "$y=-x^{2}-6 x-11$",
      "$y=x^{2}-4 x+5$",
      "$y=x^{2}+4 x+3$",
      "$y=x^{2}-6 x+11$",
      "$y=x^{2}+6 x+7$"
    ],
    "answer": 1,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q19",
    "text": "The equation\n$$\n\\sin ^{2}\\left(4^{\\cos \\theta} \\times 60^{\\circ}\\right)=\\frac{3}{4}\n$$\n\nhas exactly three solutions in the range $0^{\\circ} \\leq \\theta \\leq x^{\\circ}$\\\\\nWhat is the range of all possible values of $x$ ?",
    "options": [
      "$90 \\leq x<120$",
      "$90 \\leq x<270$",
      "$120 \\leq x<240$",
      "$270 \\leq x<300$",
      "$\\quad 300 \\leq x<360$",
      "$\\quad 450 \\leq x<630$"
    ],
    "answer": 1,
    "topic": "trigonometry"
  },
  {
    "id": "q20",
    "text": "Find the length of the curve with equation\n$$\n2 \\log _{10}(x-y)=\\log _{10}(2-2 x)+\\log _{10}(y+5)\n$$",
    "options": [
      "5",
      "10",
      "15",
      "$3 \\pi$",
      "$9 \\pi$",
      "$12 \\pi$"
    ],
    "answer": 3,
    "topic": "exponentials_logs"
  }
]$json$
);
