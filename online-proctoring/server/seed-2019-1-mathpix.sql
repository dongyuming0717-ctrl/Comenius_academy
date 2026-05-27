-- TMUA 2019 Paper 1 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2019 October Paper 1',
  1,
  2019,
  'October',
  75,
  20,
  ARRAY['algebra', 'coordinate_geometry', 'differentiation', 'exponentials_logs', 'inequalities', 'integration', 'sequences_series', 'transformations_graphs', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "is a quadratic function in $x$.\\\\\nThe graph of $y=\\mathrm{f}(x)$ passes through the point $(1,-1)$ and has a turning point at $(-1,3)$.\n\nFind an expression for $\\mathrm{f}(x)$.",
    "options": [
      "$-x^{2}-2 x+2$",
      "$-x^{2}+2 x+3$",
      "$x^{2}-2 x$",
      "$x^{2}+2 x-4$",
      "$2 x^{2}+4 x+1$",
      "$-2 x^{2}-4 x+5$"
    ],
    "answer": 0,
    "topic": "transformations_graphs"
  },
  {
    "id": "q2",
    "text": "Find the complete set of values of the real constant $k$ for which the expression\n$$\nx^{2}+k x+2 x+1-2 k\n$$\n\nis positive for all real values of $x$.",
    "options": [
      "$-12<k<0$",
      "$k<-12$ or $k>0$",
      "$-\\sqrt{6}-3<k<\\sqrt{6}-3$",
      "$k<-\\sqrt{6}-3$ or $k>\\sqrt{6}-3$",
      "$\\quad-2<k<\\frac{1}{2}$",
      "$k<-2$ or $k>\\frac{1}{2}$",
      "$0<k<4$",
      "$k<0$ or $k>4$"
    ],
    "answer": 0,
    "topic": "inequalities"
  },
  {
    "id": "q3",
    "text": "Find the coefficient of $x$ in the expression:\n$$\n(1+x)^{0}+(1+x)^{1}+(1+x)^{2}+(1+x)^{3}+\\cdots+(1+x)^{79}+(1+x)^{80}\n$$",
    "options": [
      "80",
      "81",
      "324",
      "628",
      "3240",
      "3321",
      "6480",
      "6642"
    ],
    "answer": 4,
    "topic": "algebra"
  },
  {
    "id": "q4",
    "text": "The sequence $x_{n}$ is given by:\n$$\n\\begin{aligned}\nx_{1} & =10 \\\\\nx_{n+1} & =\\sqrt{x_{n}} \\text { for } n \\geq 1\n\\end{aligned}\n$$\n\nWhat is the value of $x_{100}$ ?\n[Note that $a^{b^{c}}$ means $a^{\\left(b^{c}\\right)}$ ]",
    "options": [
      "$10^{2^{99}}$",
      "$10^{2^{100}}$",
      "$10^{2^{-99}}$",
      "$10^{2^{-100}}$",
      "$10^{-2^{99}}$",
      "$\\quad 10^{-2^{100}}$",
      "$10^{-2^{-99}}$",
      "$\\quad 10^{-2^{-100}}$"
    ],
    "answer": 2,
    "topic": "sequences_series"
  },
  {
    "id": "q5",
    "text": "is a geometric sequence.\\\\\nThe sum of the first 6 terms of S is equal to 9 times the sum of the first 3 terms of S .\\\\\nThe $7^{\\text {th }}$ term of S is 360 .\\\\\nFind the $1^{\\text {st }}$ term of S .",
    "options": [
      "$\\frac{40}{27}$",
      "$\\frac{40}{9}$",
      "$\\frac{40}{3}$",
      "$\\frac{45}{16}$",
      "$\\frac{45}{8}$",
      "$\\frac{45}{4}$"
    ],
    "answer": 4,
    "topic": "sequences_series"
  },
  {
    "id": "q6",
    "text": "The circles with equations",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "answer": 2,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q7",
    "text": "$$\n\\begin{aligned}\n& (x+4)^{2}+(y+1)^{2}=64 \\quad \\text { and } \\\\\n& (x-8)^{2}+(y-4)^{2}=r^{2} \\quad \\text { where } r>0\n\\end{aligned}\n$$\n\nhave exactly one point in common.\\\\\nFind the difference between the two possible values of $r$.",
    "options": [
      "4",
      "10",
      "16",
      "26",
      "50\n\nA curve has equation\n\n$$\ny=\\left(2 q-x^{2}\\right)(2 q x+3)\n$$\n\nThe gradient of the curve at $x=-1$ is a function of $q$.\\\\\nFind the value of $q$ which minimises the gradient of the curve at $x=-1$.\n\nA -1\\\\\nB $-\\frac{3}{4}$\\\\\nC $-\\frac{1}{2}$\\\\\nD 0\\\\\nE $\\frac{1}{2}$",
      "$\\frac{3}{4}$",
      "1"
    ],
    "answer": 5,
    "topic": "differentiation"
  },
  {
    "id": "q8",
    "text": "The function f is such that $0<\\mathrm{f}(x)<1$ for $0 \\leq x \\leq 1$.\\\\\nThe trapezium rule with $n$ equal intervals is used to estimate $\\int_{0}^{1} \\mathrm{f}(x) \\mathrm{d} x$ and produces an underestimate.\n\nUsing the same number of equal intervals, for which one of the following does the trapezium rule produce an overestimate?",
    "options": [
      "$\\quad \\int_{0}^{1}(\\mathrm{f}(x)+1) \\mathrm{d} x$",
      "$\\int_{0}^{1} 2 \\mathrm{f}(x) \\mathrm{d} x$",
      "$\\quad \\int_{-1}^{0} \\mathrm{f}(x+1) \\mathrm{d} x$",
      "$\\quad \\int_{-1}^{0} \\mathrm{f}(-x) \\mathrm{d} x$",
      "$\\quad \\int_{0}^{1}(1-\\mathrm{f}(x)) \\mathrm{d} x$"
    ],
    "answer": 4,
    "topic": "integration"
  },
  {
    "id": "q9",
    "text": "is a positive constant.\\\\\nFind the area enclosed between the curves $y=p \\sqrt{x}$ and $x=p \\sqrt{y}$",
    "options": [
      "$\\frac{2}{3} p^{\\frac{5}{2}}-\\frac{1}{2} p^{2}$",
      "$\\frac{4}{3} p^{\\frac{5}{2}}-p^{2}$",
      "$\\quad \\frac{p^{4}}{6}$",
      "$\\frac{p^{4}}{3}$",
      "$\\quad \\frac{2}{3} p^{3}-\\frac{1}{2} p^{4}$",
      "$\\frac{4}{3} p^{3}-p^{4}$",
      "$2 p^{4}$"
    ],
    "answer": 3,
    "topic": "integration"
  },
  {
    "id": "q10",
    "text": "Evaluate\n$$\n\\int_{-1}^{3}|x|(1-x) \\mathrm{d} x\n$$",
    "options": [
      "$\\frac{17}{3}$",
      "$-\\frac{17}{3}$",
      "$\\frac{16}{3}$",
      "$-\\frac{16}{3}$",
      "$\\frac{11}{3}$",
      "$-\\frac{11}{3}$"
    ],
    "answer": 5,
    "topic": "integration"
  },
  {
    "id": "q11",
    "text": "Find the sum of the real values of $x$ that satisfy the simultaneous equations:\n$$\n\\begin{aligned}\n\\log _{3}\\left(x y^{2}\\right) & =1 \\\\\n\\left(\\log _{3} x\\right)\\left(\\log _{3} y\\right) & =-3\n\\end{aligned}\n$$",
    "options": [
      "$\\frac{1}{3}$",
      "1",
      "3",
      "$3 \\frac{1}{9}$",
      "$\\quad 9 \\frac{1}{27}$",
      "$\\quad 9 \\frac{1}{3}$",
      "27",
      "$\\quad 27 \\frac{1}{9}$"
    ],
    "answer": 7,
    "topic": "exponentials_logs"
  },
  {
    "id": "q12",
    "text": "It is given that\n$$\n\\frac{\\mathrm{d} V}{\\mathrm{~d} t}=\\frac{24 \\pi(t-1)}{(1+\\sqrt{t})} \\text { for } t \\geq 1\n$$\n\nand $V=7$ when $t=1$.\\\\\nFind the value of $V$ when $t=9$.",
    "options": [
      "$208 \\pi+7$",
      "$216 \\pi+7$",
      "$224 \\pi+7$",
      "$416 \\pi+7$",
      "$\\quad 608 \\pi+7$",
      "$\\quad 744 \\pi+7$"
    ],
    "answer": 2,
    "topic": "integration"
  },
  {
    "id": "q13",
    "text": "Find the maximum value of\n$$\n4^{\\sin x}-4 \\times 2^{\\sin x}+\\frac{17}{4}\n$$\n\nfor real $x$.\\\\",
    "options": [
      "$\\frac{1}{4}$",
      "$\\frac{5}{2}$",
      "$\\frac{13}{2}$",
      "$\\frac{21}{2}$",
      "$\\frac{65}{4}$",
      "There is no maximum value."
    ],
    "answer": 1,
    "topic": "trigonometry"
  },
  {
    "id": "q14",
    "text": "satisfies the simultaneous equations\n$$\n\\sin 2 x+\\sqrt{3} \\cos 2 x=-1\n$$\n\nand\n\n$$\n\\sqrt{3} \\sin 2 x-\\cos 2 x=\\sqrt{3}\n$$\n\nwhere $0^{\\circ} \\leq x \\leq 360^{\\circ}$.\\\\\nFind the sum of the possible values of $x$.",
    "options": [
      "$210^{\\circ}$",
      "$330^{\\circ}$",
      "$390^{\\circ}$",
      "$660^{\\circ}$",
      "$780^{\\circ}$",
      "$930^{\\circ}$"
    ],
    "answer": 1,
    "topic": "trigonometry"
  },
  {
    "id": "q15",
    "text": "Find the real non-zero solution to the equation\n$$\n\\frac{2^{\\left(9^{x}\\right)}}{8^{\\left(3^{x}\\right)}}=\\frac{1}{4}\n$$",
    "options": [
      "$\\log _{3} 2$",
      "$2 \\log _{3} 2$",
      "1",
      "2",
      "$\\quad \\log _{2} 3$",
      "$2 \\log _{2} 3$"
    ],
    "answer": 0,
    "topic": "exponentials_logs"
  },
  {
    "id": "q16",
    "text": "Given that\n$$\n2 \\int_{0}^{1} \\mathrm{f}(x) \\mathrm{d} x+5 \\int_{1}^{2} \\mathrm{f}(x) \\mathrm{d} x=14\n$$\n\nand\n\n$$\n\\int_{0}^{1} \\mathrm{f}(x+1) \\mathrm{d} x=6\n$$\n\nfind the value of\n\n$$\n\\int_{0}^{2} \\mathrm{f}(x) \\mathrm{d} x\n$$",
    "options": [
      "-8",
      "-4",
      "-2",
      "2",
      "4",
      "$\\frac{29}{5}$",
      "$\\frac{32}{5}$",
      "14"
    ],
    "answer": 2,
    "topic": "integration"
  },
  {
    "id": "q17",
    "text": "Find the fraction of the interval $0 \\leq \\theta \\leq \\pi$ for which the inequality\n$$\n\\left(\\sin (2 \\theta)-\\frac{1}{2}\\right)(\\sin \\theta-\\cos \\theta) \\geq 0\n$$\n\nis satisfied.",
    "options": [
      "$\\frac{1}{12}$",
      "$\\frac{1}{6}$",
      "$\\frac{1}{4}$",
      "$\\frac{5}{12}$",
      "$\\frac{7}{12}$",
      "$\\frac{3}{4}$",
      "$\\frac{5}{6}$",
      "$\\quad \\frac{11}{12}$"
    ],
    "answer": 2,
    "topic": "trigonometry"
  },
  {
    "id": "q18",
    "text": "Find the shortest distance between the curve $y=x^{2}+4$ and the line $y=2 x-2$.",
    "options": [
      "2",
      "$\\sqrt{5}$",
      "$\\frac{6 \\sqrt{5}}{5}$",
      "3",
      "$\\frac{5 \\sqrt{5}}{3}$",
      "5",
      "6"
    ],
    "answer": 1,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q19",
    "text": "Find the value of\n$$\n\\sum_{k=0}^{90} \\sin (10+90 k)^{\\circ}\n$$",
    "options": [
      "0",
      "$\\sin 10^{\\circ}$",
      "$\\sin 100^{\\circ}$",
      "$\\sin 190^{\\circ}$",
      "$\\sin 280^{\\circ}$",
      "1"
    ],
    "answer": 2,
    "topic": "trigonometry"
  },
  {
    "id": "q20",
    "text": "What is the complete range of values of $k$ for which the curves with equations\n$$\ny=x^{3}-12 x\n$$\n\nand\n\n$$\ny=k-(x-2)^{2}\n$$\n\nintersect at three distinct points, of which exactly two have positive $x$-coordinates?",
    "options": [
      "$-4<k<0$",
      "$-4<k<4$",
      "$-4<k<16$",
      "$-16<k<0$",
      "$\\quad-16<k<4$",
      "$-16<k<16$"
    ],
    "answer": 4,
    "topic": "coordinate_geometry"
  }
]$json$
);
