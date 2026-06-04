-- TMUA 2020 Paper 1 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2020 October Paper 1',
  1,
  2020,
  'October',
  75,
  20,
  ARRAY['coordinate_geometry', 'differentiation', 'exponentials_logs', 'functions', 'inequalities', 'integration', 'number_theory', 'quadratics_polynomials', 'sequences_series', 'transformations_graphs', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "Which of the following is an expression for the first derivative with respect to $x$ of\n$$\n\\frac{x^{3}-5 x^{2}}{2 x \\sqrt{x}}\n$$",
    "options": [
      "$-\\frac{\\sqrt{x}}{2}$",
      "$\\frac{\\sqrt{x}}{4}$",
      "$\\frac{3 x-5}{4 \\sqrt{x}}$",
      "$\\frac{3 \\sqrt{x}-5}{4 \\sqrt{x}}$",
      "$\\frac{3 \\sqrt{x}-10}{3 \\sqrt{x}}$",
      "$\\quad \\frac{3 x^{2}-10 x}{3 \\sqrt{x}}$"
    ],
    "answer": 2,
    "topic": "differentiation"
  },
  {
    "id": "q2",
    "text": "and $(x-2)$ are factors of $2 x^{3}+p x^{2}+q$\\\\\nWhat is the value of $2 p+q$ ?",
    "options": [
      "-10",
      "$-\\frac{38}{5}$",
      "$-\\frac{22}{3}$",
      "$\\quad \\frac{22}{3}$",
      "$\\frac{38}{5}$",
      "10"
    ],
    "answer": 2,
    "topic": "quadratics_polynomials"
  },
  {
    "id": "q3",
    "text": "Find the complete set of values of $x$ for which\n$$\n(x+4)(x+3)(1-x)>0 \\text { and }(x+2)(x-2)<0\n$$",
    "options": [
      "$1<x<2$",
      "$-2<x<1$",
      "$-2<x<2$",
      "$x<-2$ or $x>1$",
      "$x<-4$ or $x>2$",
      "$x<-4$ or $-3<x<1$",
      "$-4<x<-2$ or $x>1$"
    ],
    "answer": 1,
    "topic": "inequalities"
  },
  {
    "id": "q4",
    "text": "The $1^{\\text {st }}, 2^{\\text {nd }}$ and $3^{\\text {rd }}$ terms of a geometric progression are also the $1^{\\text {st }}, 4^{\\text {th }}$ and $6^{\\text {th }}$ terms, respectively, of an arithmetic progression.\nThe sum to infinity of the geometric progression is 12 .\\\\\nFind the $1^{\\text {st }}$ term of the geometric progression.",
    "options": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "answer": 3,
    "topic": "sequences_series"
  },
  {
    "id": "q5",
    "text": "The curve $S$ has equation\n$$\ny=p x^{2}+6 x-q\n$$\n\nwhere $p$ and $q$ are constants.\\\\\n$S$ has a line of symmetry at $x=-\\frac{1}{4}$ and touches the $x$-axis at exactly one point.\\\\\nWhat is the value of $p+8 q$ ?",
    "options": [
      "6",
      "18",
      "21",
      "25",
      "38"
    ],
    "answer": 0,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q6",
    "text": "Find the maximum value of the function\n$$\n\\mathrm{f}(x)=\\frac{1}{5^{2 x}-4\\left(5^{x}\\right)+7}\n$$",
    "options": [
      "$\\frac{1}{7}$",
      "$\\frac{1}{4}$",
      "$\\frac{1}{3}$",
      "3",
      "4",
      "7"
    ],
    "answer": 2,
    "topic": "functions"
  },
  {
    "id": "q7",
    "text": "Given that\n$$\n2^{3 x}=8^{(y+3)}\n$$\n\nand\n\n$$\n4^{(x+1)}=\\frac{16^{(y+1)}}{8^{(y+3)}}\n$$\n\nwhat is the value of $x+y$ ?",
    "options": [
      "-23",
      "-22",
      "-15",
      "-14",
      "-11",
      "-10"
    ],
    "answer": 0,
    "topic": "exponentials_logs"
  },
  {
    "id": "q8",
    "text": "The function f is defined for all real $x$ as\n$$\n\\mathrm{f}(x)=(p-x)(x+2)\n$$\n\nFind the complete set of values of $p$ for which the maximum value of $\\mathrm{f}(x)$ is less than 4 .",
    "options": [
      "$-2-4 \\sqrt{2}<p<-2+4 \\sqrt{2}$",
      "$-2-2 \\sqrt{2}<p<-2+2 \\sqrt{2}$",
      "$-2 \\sqrt{5}<p<2 \\sqrt{5}$",
      "$-6<p<2$",
      "$-4<p<0$",
      "$-2<p<2$"
    ],
    "answer": 3,
    "topic": "inequalities"
  },
  {
    "id": "q9",
    "text": "The quadratic expression $x^{2}-14 x+9$ factorises as $(x-\\alpha)(x-\\beta)$, where $\\alpha$ and $\\beta$ are positive real numbers.\nWhich quadratic expression can be factorised as $(x-\\sqrt{\\alpha})(x-\\sqrt{\\beta})$ ?",
    "options": [
      "$x^{2}-\\sqrt{10} x+3$",
      "$x^{2}-\\sqrt{14} x+3$",
      "$x^{2}-\\sqrt{20} x+3$",
      "$x^{2}-178 x+81$",
      "$x^{2}-176 x+81$",
      "$x^{2}+196 x+81$"
    ],
    "answer": 2,
    "topic": "quadratics_polynomials"
  },
  {
    "id": "q10",
    "text": "The following sequence of transformations is applied to the curve $y=4 x^{2}$\n\\begin{enumerate}\n  \\item Translation by $\\binom{3}{-5}$\n  \\item Reflection in the $x$-axis\n  \\item Stretch parallel to the $x$-axis with scale factor 2\n\\end{enumerate}\n\nWhat is the equation of the resulting curve?",
    "options": [
      "$y=-x^{2}+12 x-31$",
      "$y=-x^{2}+12 x-41$",
      "$y=x^{2}+12 x+31$",
      "$y=x^{2}+12 x+41$",
      "$y=-16 x^{2}+48 x-31$",
      "$y=-16 x^{2}+48 x-41$",
      "$y=16 x^{2}-48 x+31$",
      "$y=16 x^{2}-48 x+41$"
    ],
    "answer": 0,
    "topic": "transformations_graphs"
  },
  {
    "id": "q11",
    "text": "The quadratic function shown passes through $(2,0)$ and $(q, 0)$, where $q>2$.\\\\\n\nWhat is the value of $q$ such that the area of region $R$ equals the area of region $S$ ?",
    "options": [
      "$\\sqrt{6}$",
      "3",
      "$\\frac{18}{5}$",
      "4",
      "6",
      "$\\frac{33}{5}$"
    ],
    "answer": 4,
    "topic": "quadratics_polynomials",
    "image_url": "/question-images/2020-1_q11_fig1.jpg"
  },
  {
    "id": "q12",
    "text": "How many real solutions are there to the equation\n$$\n3 \\cos x=\\sqrt{x}\n$$\n\nwhere $x$ is in radians?",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "infinitely many"
    ],
    "answer": 3,
    "topic": "trigonometry"
  },
  {
    "id": "q13",
    "text": "Find the coefficient of $x^{2} y^{4}$ in the expansion of $\\left(1+x+y^{2}\\right)^{7}$",
    "options": [
      "6",
      "10",
      "21",
      "35",
      "105",
      "210"
    ],
    "answer": 5,
    "topic": "sequences_series"
  },
  {
    "id": "q14",
    "text": "The area enclosed between the line $y=m x$ and the curve $y=x^{3}$ is 6 .\\\\\nWhat is the value of $m$ ?",
    "options": [
      "2",
      "4",
      "$\\sqrt{3}$",
      "$\\sqrt{6}$",
      "$2 \\sqrt{3}$",
      "$2 \\sqrt{6}$"
    ],
    "answer": 4,
    "topic": "integration"
  },
  {
    "id": "q15",
    "text": "Find the positive difference between the two real values of $x$ for which\n$$\n\\left(\\log _{2} x\\right)^{4}+12\\left(\\log _{2}\\left(\\frac{1}{x}\\right)\\right)^{2}-2^{6}=0\n$$",
    "options": [
      "4",
      "16",
      "$\\frac{15}{4}$",
      "$\\frac{17}{4}$",
      "$\\frac{255}{16}$",
      "$\\quad \\frac{257}{16}$"
    ],
    "answer": 2,
    "topic": "exponentials_logs"
  },
  {
    "id": "q16",
    "text": "The circle $C_{1}$ has equation $(x+2)^{2}+(y-1)^{2}=3$\\\\\nThe circle $C_{2}$ has equation $(x-4)^{2}+(y-1)^{2}=3$\\\\\nThe straight line $l$ is a tangent to both $C_{1}$ and $C_{2}$ and has positive gradient.\\\\\nThe acute angle between $l$ and the $x$-axis is $\\theta$\\\\\nFind the value of $\\tan \\theta$",
    "options": [
      "$\\frac{1}{2}$",
      "2",
      "$\\frac{\\sqrt{2}}{2}$",
      "$\\sqrt{2}$",
      "$\\frac{\\sqrt{6}}{2}$",
      "$\\frac{\\sqrt{6}}{3}$",
      "$\\frac{\\sqrt{3}}{3}$",
      "$\\sqrt{3}$"
    ],
    "answer": 2,
    "topic": "trigonometry"
  },
  {
    "id": "q17",
    "text": "Find the complete set of values of $m$ in terms of $c$ such that the graphs of $y=m x+c$ and $y=\\sqrt{x}$ have two points of intersection.",
    "options": [
      "$0<m<\\frac{1}{4 c}$",
      "$0<m<4 c^{2}$",
      "$m>\\frac{1}{4 c}$",
      "$m<\\frac{1}{4 c}$",
      "$m>4 c^{2}$",
      "$m<4 c^{2}$"
    ],
    "answer": 0,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q18",
    "text": "Find the number of solutions and the sum of the solutions of the equation\n$$\n1-2 \\cos ^{2} x=|\\cos x|\n$$\n\nwhere $0 \\leq x \\leq 180^{\\circ}$",
    "options": [
      "Number of solutions $=2$ Sum of solutions $=180^{\\circ}$",
      "Number of solutions $=2$ Sum of solutions $=240^{\\circ}$",
      "Number of solutions $=3$ Sum of solutions $=180^{\\circ}$",
      "Number of solutions $=3$ Sum of solutions $=360^{\\circ}$",
      "Number of solutions $=4 \\quad$ Sum of solutions $=240^{\\circ}$",
      "Number of solutions $=4 \\quad$ Sum of solutions $=360^{\\circ}$"
    ],
    "answer": 0,
    "topic": "trigonometry"
  },
  {
    "id": "q19",
    "text": "Find the lowest positive integer for which $x^{2}-52 x-52$ is positive.",
    "options": [
      "26",
      "27",
      "51",
      "52",
      "53",
      "54"
    ],
    "answer": 4,
    "topic": "number_theory"
  },
  {
    "id": "q20",
    "text": "For how many values of $a$ is the equation\n$$\n(x-a)\\left(x^{2}-x+a\\right)=0\n$$\n\nsatisfied by exactly two distinct values of $x$ ?",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "more than 4\n\n alternatives and missing document structure.\n\n{admissionstesting@cambridgeassessment.org.uk} telling us your name, email address and requirements and we will respond within 15 working days.\n\n\\section*{TMUA／CTMUA}\n\\section*{PAPER 2}\nNovember 2020\n\nAdditional materials：Answer sheet\n\n\\section*{INSTRUCTIONS TO CANDIDATES}"
    ],
    "answer": 2,
    "topic": "quadratics_polynomials"
  }
]$json$
);
