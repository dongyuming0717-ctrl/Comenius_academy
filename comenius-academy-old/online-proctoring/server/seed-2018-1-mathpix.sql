-- TMUA 2018 Paper 1 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2018 October Paper 1',
  1,
  2018,
  'October',
  75,
  20,
  ARRAY['coordinate_geometry', 'differentiation', 'exponentials_logs', 'inequalities', 'integration', 'number_theory', 'quadratics_polynomials', 'sequences_series', 'transformations_graphs', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "Find the value of\n$$\n\\int_{1}^{4} \\frac{3-2 x}{x \\sqrt{x}} \\mathrm{~d} x\n$$",
    "options": [
      "$-\\frac{13}{2}$",
      "$-\\frac{85}{16}$",
      "$-\\frac{13}{8}$",
      "-1",
      "$-\\frac{1}{4}$",
      "$\\frac{7}{4}$",
      "7"
    ],
    "answer": 3,
    "topic": "integration"
  },
  {
    "id": "q2",
    "text": "An arithmetic progression has first term $a$ and common difference $d$.\\\\\nThe sum of the first 5 terms is equal to the sum of the first 8 terms.\\\\\nWhich one of the following expresses the relationship between $a$ and $d$ ?",
    "options": [
      "$a=-\\frac{38}{3} d$",
      "$a=-7 d$",
      "$a=-6 d$",
      "$a=6 d$",
      "$\\quad a=7 d$",
      "$a=\\frac{38}{3} d$"
    ],
    "answer": 2,
    "topic": "sequences_series"
  },
  {
    "id": "q3",
    "text": "Find the shortest distance between the two circles with equations:\n$$\n\\begin{aligned}\n& (x+2)^{2}+(y-3)^{2}=18 \\\\\n& (x-7)^{2}+(y+6)^{2}=2\n\\end{aligned}\n$$",
    "options": [
      "0",
      "4",
      "16",
      "$2 \\sqrt{2}$",
      "$5 \\sqrt{2}$"
    ],
    "answer": 4,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q4",
    "text": "Consider the simultaneous equations\n$$\n\\begin{array}{r}\n3 x^{2}+2 x y=4 \\\\\nx+y=a\n\\end{array}\n$$\n\nwhere $a$ is a real constant.\\\\\nFind the complete set of values of $a$ for which the equations have two distinct real solutions for $x$.",
    "options": [
      "There are no values of $a$.",
      "$-2<a<2$",
      "$-1<a<1$",
      "$a=0$",
      "$a<-1$ or $a>1$",
      "$a<-2$ or $a>2$",
      "All real values of $a$"
    ],
    "answer": 6,
    "topic": "inequalities"
  },
  {
    "id": "q5",
    "text": "The function f is defined by $\\mathrm{f}(x)=x^{3}+a x^{2}+b x+c$.\\\\\n$a, b$ and $c$ take the values 1,2 and 3 with no two of them being equal and not necessarily in this order.\n\nThe remainder when $\\mathrm{f}(x)$ is divided by ( $x+2$ ) is $R$.\\\\\nThe remainder when $\\mathrm{f}(x)$ is divided by $(x+3)$ is $S$.\\\\\nWhat is the largest possible value of $R-S$ ?",
    "options": [
      "-26",
      "5",
      "7",
      "17",
      "29"
    ],
    "answer": 3,
    "topic": "number_theory"
  },
  {
    "id": "q6",
    "text": "Find the number of solutions of the equation\n$$\nx \\sin 2 x=\\cos 2 x\n$$\n\nwith $0 \\leq x \\leq 2 \\pi$.",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": 4,
    "topic": "trigonometry"
  },
  {
    "id": "q7",
    "text": "The non-zero constant $k$ is chosen so that the coefficients of $x^{6}$ in the expansions of $\\left(1+k x^{2}\\right)^{7}$ and $(k+x)^{10}$ are equal.\nWhat is the value of $k$ ?",
    "options": [
      "$\\frac{1}{6}$",
      "6",
      "$\\frac{\\sqrt{6}}{6}$",
      "$\\sqrt{6}$",
      "$\\frac{\\sqrt{30}}{30}$",
      "$\\sqrt{30}$"
    ],
    "answer": 0,
    "topic": "sequences_series"
  },
  {
    "id": "q8",
    "text": "The sum to infinity of a geometric progression is 6 .\\\\\nThe sum to infinity of the squares of each term in the progression is 12 .\\\\\nFind the sum to infinity of the cubes of each term in the progression.",
    "options": [
      "8",
      "18",
      "24",
      "$\\quad \\frac{216}{7}$",
      "72",
      "216"
    ],
    "answer": 3,
    "topic": "sequences_series"
  },
  {
    "id": "q9",
    "text": "Find the complete set of values of the constant $c$ for which the cubic equation\n$$\n2 x^{3}-3 x^{2}-12 x+c=0\n$$\n\nhas three distinct real solutions.\\\\",
    "options": [
      "$-20<c<7$",
      "$-7<c<20$",
      "$c>7$",
      "$c>-7$",
      "$c<20$",
      "$c<-20$"
    ],
    "answer": 1,
    "topic": "quadratics_polynomials"
  },
  {
    "id": "q10",
    "text": "and $y$ satisfy $|2-x| \\leq 6$ and $|y+2| \\leq 4$.\\\\\nWhat is the greatest possible value of $|x y|$ ?",
    "options": [
      "16",
      "24",
      "32",
      "40",
      "48",
      "There is no greatest possible value."
    ],
    "answer": 4,
    "topic": "inequalities"
  },
  {
    "id": "q11",
    "text": "The line $y=m x+5$, where $m>0$, is normal to the curve $y=10-x^{2}$ at the point ( $p, q$ ).\nWhat is the value of $p$ ?",
    "options": [
      "$\\frac{\\sqrt{2}}{6}$",
      "$-\\frac{\\sqrt{2}}{6}$",
      "$\\frac{3 \\sqrt{2}}{2}$",
      "$-\\frac{3 \\sqrt{2}}{2}$",
      "$\\sqrt{5}$",
      "$-\\sqrt{5}$"
    ],
    "answer": 2,
    "topic": "differentiation"
  },
  {
    "id": "q12",
    "text": "A curve has equation $y=\\mathrm{f}(x)$, where\n$$\n\\mathrm{f}(x)=x(x-p)(x-q)(r-x)\n$$\n\nwith $0<p<q<r$.\\\\\nYou are given that:\n\n$$\n\\begin{aligned}\n& \\int_{0}^{r} \\mathrm{f}(x) \\mathrm{d} x=0 \\\\\n& \\int_{0}^{q} \\mathrm{f}(x) \\mathrm{d} x=-2 \\\\\n& \\int_{p}^{r} \\mathrm{f}(x) \\mathrm{d} x=-3\n\\end{aligned}\n$$\n\nWhat is the total area enclosed by the curve and the $x$-axis for $0 \\leq x \\leq r$ ?",
    "options": [
      "0",
      "1",
      "4",
      "5",
      "6",
      "10"
    ],
    "answer": 5,
    "topic": "integration"
  },
  {
    "id": "q13",
    "text": "The function $\\mathrm{f}(x)$ has derivative $\\mathrm{f}^{\\prime}(x)$.\\\\\nThe diagram below shows the graph of $y=f^{\\prime}(x)$.\\\\\nWhich point corresponds to a local minimum of $\\mathrm{f}(x)$ ?\\\\",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "answer": 2,
    "topic": "differentiation",
    "image_url": "/question-images/2018-1_q13_fig1.jpg"
  },
  {
    "id": "q14",
    "text": "The line $y=m x+4$ passes through the points ( $3, \\log _{2} p$ ) and ( $\\log _{2} p, 4$ ). What are the possible values of $p$ ?",
    "options": [
      "$p=1$ and $p=4$",
      "$p=1$ and $p=16$",
      "$\\quad p=\\frac{1}{4} \\quad$ and $\\quad p=4$",
      "$\\quad p=\\frac{1}{4} \\quad$ and $\\quad p=64$",
      "$\\quad p=\\frac{1}{64}$ and $p=4$",
      "$\\quad p=\\frac{1}{64}$ and $p=16$"
    ],
    "answer": 1,
    "topic": "exponentials_logs"
  },
  {
    "id": "q15",
    "text": "Find the sum of the real solutions of the equation:\n$$\n3^{x}-(\\sqrt{3})^{x+4}+20=0\n$$",
    "options": [
      "1",
      "4",
      "9",
      "$\\quad \\log _{3} 20$",
      "$\\quad 2 \\log _{3} 20$",
      "$\\quad 4 \\log _{3} 20$"
    ],
    "answer": 4,
    "topic": "exponentials_logs"
  },
  {
    "id": "q16",
    "text": "The curve $C$ has equation $y=x^{2}+b x+2$, where $b \\geq 0$.\\\\\nFind the value of $b$ that minimises the distance between the origin and the stationary point of the curve $C$.",
    "options": [
      "$\\quad b=0$",
      "$b=1$",
      "$b=2$",
      "$b=\\frac{\\sqrt{6}}{2}$",
      "$\\quad b=\\sqrt{2}$",
      "$\\quad b=\\sqrt{6}$"
    ],
    "answer": 5,
    "topic": "differentiation"
  },
  {
    "id": "q17",
    "text": "There are two sets of data: the mean of the first set is 15 , and the mean of the second set is 20 .\nOne of the pieces of data from the first set is exchanged with one of the pieces of data from the second set.\n\nAs a result, the mean of the first set of data increases from 15 to 16 , and the mean of the second set of data decreases from 20 to 17.\n\nWhat is the mean of the set made by combining all the data?",
    "options": [
      "$16 \\frac{1}{4}$",
      "$16 \\frac{1}{3}$",
      "$16 \\frac{1}{2}$",
      "$\\quad 16 \\frac{2}{3}$",
      "$16 \\frac{3}{4}$"
    ],
    "answer": 0,
    "topic": "number_theory"
  },
  {
    "id": "q18",
    "text": "What is the smallest positive value of $a$ for which the line $x=a$ is a line of symmetry of the graph of $y=\\sin \\left(2 x-\\frac{4 \\pi}{3}\\right)$ ?",
    "options": [
      "$\\frac{\\pi}{12}$",
      "$\\frac{5 \\pi}{12}$",
      "$\\frac{7 \\pi}{12}$",
      "$\\frac{11 \\pi}{12}$",
      "$\\frac{19 \\pi}{12}$"
    ],
    "answer": 1,
    "topic": "transformations_graphs"
  },
  {
    "id": "q19",
    "text": "A triangle $A B C$ is to be drawn with $A B=10 \\mathrm{~cm}, B C=7 \\mathrm{~cm}$ and the angle at $A$ equal to $\\theta$, where $\\theta$ is a certain specified angle.\nOf the two possible triangles that could be drawn, the larger triangle has three times the area of the smaller one.\n\nWhat is the value of $\\cos \\theta$ ?",
    "options": [
      "$\\frac{5}{7}$",
      "$\\frac{151}{200}$",
      "$\\frac{2 \\sqrt{2}}{5}$",
      "$\\frac{\\sqrt{17}}{5}$",
      "$\\quad \\frac{\\sqrt{51}}{8}$",
      "$\\frac{\\sqrt{34}}{8}$"
    ],
    "answer": 3,
    "topic": "trigonometry"
  },
  {
    "id": "q20",
    "text": "Find the value of\n$$\n\\sin ^{2} 0^{\\circ}+\\sin ^{2} 1^{\\circ}+\\sin ^{2} 2^{\\circ}+\\sin ^{2} 3^{\\circ}+\\cdots+\\sin ^{2} 87^{\\circ}+\\sin ^{2} 88^{\\circ}+\\sin ^{2} 89^{\\circ}+\\sin ^{2} 90^{\\circ}\n$$",
    "options": [
      "0.5",
      "1",
      "1.5",
      "45",
      "45.5",
      "46"
    ],
    "answer": 4,
    "topic": "trigonometry"
  }
]$json$
);
