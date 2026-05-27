-- TMUA 2016 Paper 1 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2016 October Paper 1',
  1,
  2016,
  'October',
  75,
  20,
  ARRAY['algebra', 'coordinate_geometry', 'differentiation', 'exponentials_logs', 'inequalities', 'integration', 'number_theory', 'sequences_series', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "It is given that the expansion of $(a x+b)^{3}$ is $8 x^{3}-p x^{2}+18 x-3 \\sqrt{3}$, where $a, b$ and $p$ are real constants.\nWhat is the value of $p$ ?",
    "options": [
      "$-12 \\sqrt{3}$",
      "$-6 \\sqrt{3}$",
      "$-4 \\sqrt{3}$",
      "$-\\sqrt{3}$",
      "$\\sqrt{3}$",
      "$\\quad 4 \\sqrt{3}$",
      "$6 \\sqrt{3}$",
      "$12 \\sqrt{3}$"
    ],
    "answer": 7,
    "topic": "algebra"
  },
  {
    "id": "q2",
    "text": "The expression $3 x^{3}+13 x^{2}+8 x+a$, where $a$ is a constant, has ( $x+2$ ) as a factor. Which one of the following is a complete factorisation of the expression?",
    "options": [
      "$(x+2)(x-1)(3 x-2)$",
      "$(x+2)(x+1)(3 x-2)$",
      "$(x+2)(x+1)(3 x+2)$",
      "$(x+2)(x-3)(3 x+2)$",
      "$(x+2)(x+3)(3 x-2)$",
      "$\\quad(x+2)(x+3)(3 x+2)$"
    ],
    "answer": 4,
    "topic": "differentiation"
  },
  {
    "id": "q3",
    "text": "A line is drawn normal to the curve $y=\\frac{2}{x^{2}}$ at the point on the curve where $x=1$.\\\\\nThis line cuts the $x$-axis at $P$ and the $y$-axis at $Q$.\\\\\nThe length of $P Q$ is",
    "options": [
      "$\\frac{3 \\sqrt{5}}{2}$",
      "$\\frac{3 \\sqrt{17}}{4}$",
      "$\\frac{7 \\sqrt{17}}{4}$",
      "$\\frac{35}{4}$",
      "$\\frac{35 \\sqrt{5}}{2}$",
      "$\\frac{3 \\sqrt{17}}{2}$"
    ],
    "answer": 2,
    "topic": "integration"
  },
  {
    "id": "q4",
    "text": "The sequence $a_{n}$ is defined by the rule:\n$$\na_{n}=(-1)^{n}-(-1)^{n-1}+(-1)^{n+2} \\text { for } n \\geq 1\n$$\n\nFind the value of\n\n$$\n\\sum_{n=1}^{39} a_{n}\n$$",
    "options": [
      "-39",
      "- 3",
      "-1",
      "0",
      "1",
      "3",
      "39"
    ],
    "answer": 1,
    "topic": "trigonometry"
  },
  {
    "id": "q5",
    "text": "What is the total area enclosed between the curve $y=x^{2}-1$, the $x$-axis and the lines $x=-2$ and $x=2$ ?",
    "options": [
      "$\\frac{4}{3}$",
      "$\\frac{8}{3}$",
      "4",
      "$\\frac{16}{3}$",
      "12",
      "16"
    ],
    "answer": 2,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q6",
    "text": ", and R are each mixtures of red and white paint.\\\\\nThe percentage by volume of red paint in P is $30 \\%$.\\\\\nThe percentage by volume of red paint in Q is 20\\%.\\\\\nThe mixtures $\\mathrm{P}, \\mathrm{Q}$, and R are combined in the proportion $12: 5: 3$ respectively.\\\\\nIf the resulting mixture contains $25 \\%$ by volume of red paint, what percentage by volume of mixture $R$ is red paint?",
    "options": [
      "$25 \\%$",
      "23\\%",
      "$13 \\frac{1}{3} \\%$",
      "$19 \\frac{1}{2} \\%$",
      "$\\quad 9 \\frac{3}{4} \\%$",
      "It is impossible to achieve this result."
    ],
    "answer": 2,
    "topic": "exponentials_logs"
  },
  {
    "id": "q7",
    "text": "of a sports club's members are women and the remainder are men.\\\\\nThis sports club offers the opportunity to play tennis or cricket. Every member plays exactly one of the two sports.\\\\\n$\\frac{2}{5}$ of the male members of the club play cricket;\\\\\n$\\frac{2}{3}$ of the cricketing members of the club are women.\\\\\nWhat is the probability that a member of the club, chosen at random, is a woman who plays tennis?",
    "options": [
      "$\\frac{1}{5}$",
      "$\\frac{7}{25}$",
      "$\\frac{1}{3}$",
      "$\\frac{11}{25}$",
      "$\\frac{3}{5}$"
    ],
    "answer": 1,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q8",
    "text": "Find the maximum angle $x$ in the range $0^{\\circ} \\leq x \\leq 360^{\\circ}$ which satisfies the equation\n$$\n\\cos ^{2}(2 x)+\\sqrt{3} \\sin (2 x)-\\frac{7}{4}=0\n$$",
    "options": [
      "$30^{\\circ}$",
      "$60^{\\circ}$",
      "$120^{\\circ}$",
      "$150^{\\circ}$",
      "$210^{\\circ}$",
      "$240^{\\circ}$",
      "$300^{\\circ}$",
      "$330^{\\circ}$"
    ],
    "answer": 5,
    "topic": "sequences_series"
  },
  {
    "id": "q9",
    "text": "The line segment joining the points $(3,3)$ and ( 7,5 ) is a diameter of a circle.\\\\\nThis circle is translated by 3 units in the negative $x$-direction, then reflected in the $x$-axis, and then enlarged by a scale factor of 4 about the centre of the resulting circle.\n\nThe equation of the final circle is",
    "options": [
      "$\\quad(x-2)^{2}+(y-4)^{2}=320$",
      "$(x-2)^{2}+(y+4)^{2}=320$",
      "$(x-2)^{2}+(y-4)^{2}=80$",
      "$(x-2)^{2}+(y+4)^{2}=80$",
      "$\\quad(x-2)^{2}+(y-4)^{2}=20$",
      "$\\quad(x-2)^{2}+(y+4)^{2}=20$"
    ],
    "answer": 3,
    "topic": "exponentials_logs"
  },
  {
    "id": "q10",
    "text": "How many solutions does the equation $x \\tan x=1$ have in the interval $-2 \\pi \\leq x \\leq 2 \\pi$ ?",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "answer": 4,
    "topic": "inequalities"
  },
  {
    "id": "q11",
    "text": "The real roots of the equation $4^{2 x}+12=2^{2 x+3}$ are $p$ and $q$, where $p>q$.\\\\\nThe value of $p-q$ can be expressed as",
    "options": [
      "$\\frac{3}{4}$",
      "1",
      "4",
      "$-\\frac{1}{2}+\\log _{10} \\frac{3}{2}$",
      "$\\frac{\\log _{10} 3}{\\log _{10} 4}$",
      "$\\frac{\\log _{10} 3}{\\log _{10} 2}$"
    ],
    "answer": 4,
    "topic": "sequences_series"
  },
  {
    "id": "q12",
    "text": "A right circular cylinder is contained within a sphere of radius 5 cm in such a way that the whole of the circumferences of both ends of the cylinder are in contact with the sphere.\nThe diagram shows a planar cross section through the centre of the sphere and cylinder.\\\\\n\nFind, in cubic centimetres, the maximum possible volume of the cylinder.",
    "options": [
      "$250 \\pi$",
      "$500 \\pi$",
      "$1000 \\pi$",
      "$\\frac{250 \\sqrt{3}}{3} \\pi$",
      "$\\quad \\frac{500 \\sqrt{3}}{9} \\pi$",
      "$\\frac{1000 \\sqrt{3}}{9} \\pi$"
    ],
    "answer": 4,
    "topic": "coordinate_geometry",
    "image_url": "/question-images/2016-1_q12_fig1.jpg"
  },
  {
    "id": "q13",
    "text": "How many real roots does the equation $3 x^{5}-10 x^{3}-120 x+30=0$ have?",
    "options": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "answer": 2,
    "topic": "sequences_series"
  },
  {
    "id": "q14",
    "text": "The terms of an infinite series $S$ are formed by adding together the corresponding terms in two infinite geometric series, T and U .\nThe first term of T and the first term of U are each 4.\\\\\nIn order, the first three terms of the combined series $S$ are 8,3 , and $\\frac{5}{4}$\\\\\nWhat is the sum to infinity of $S$ ?",
    "options": [
      "$\\frac{32}{5}$",
      "$\\frac{20}{3}$",
      "$\\frac{64}{5}$",
      "$\\frac{40}{3}$",
      "16",
      "32"
    ],
    "answer": 3,
    "topic": "number_theory"
  },
  {
    "id": "q15",
    "text": "The least possible value of the gradient of the curve $y=(2 x+a)(x-2 a)^{2}$ at the point where $x=1$, as $a$ varies, is",
    "options": [
      "$-\\frac{49}{4}$",
      "-8",
      "$-\\frac{25}{4}$",
      "$\\frac{7}{4}$",
      "$\\frac{47}{16}$"
    ],
    "answer": 2,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q16",
    "text": "Given the simultaneous equations\n$$\n\\begin{gathered}\n\\log _{10} 2+\\log _{10}(y-1)=2 \\log _{10} x \\\\\n\\log _{10}(y+3-3 x)=0\n\\end{gathered}\n$$\n\nthe values of $y$ are",
    "options": [
      "$\\frac{5}{2} \\pm \\frac{3 \\sqrt{5}}{2}$",
      "$3 \\pm \\sqrt{3}$",
      "$7 \\pm 3 \\sqrt{3}$",
      "3,9",
      "1,13"
    ],
    "answer": 2,
    "topic": "exponentials_logs"
  },
  {
    "id": "q17",
    "text": "It is given that\n$$\ny=(1+2 \\cos x) \\cos 2 x \\quad \\text { for } 0<x<\\pi\n$$\n\nThe complete set of values of $x$ for which $y$ is negative is",
    "options": [
      "$0<x<\\frac{\\pi}{4}, \\frac{2 \\pi}{3}<x<\\frac{3 \\pi}{4}$",
      "$0<x<\\frac{\\pi}{4}, \\frac{3 \\pi}{4}<x<\\pi$",
      "$\\quad 0<x<\\frac{2 \\pi}{3}, \\frac{3 \\pi}{4}<x<\\pi$",
      "$\\frac{\\pi}{4}<x<\\frac{2 \\pi}{3}, \\frac{3 \\pi}{4}<x<\\pi$",
      "$\\frac{\\pi}{4}<x<\\frac{2 \\pi}{3}$",
      "$\\quad \\frac{\\pi}{4}<x<\\frac{3 \\pi}{4}$"
    ],
    "answer": 3,
    "topic": "integration"
  },
  {
    "id": "q18",
    "text": "The function $\\frac{1-x}{\\sqrt[3]{x^{2}}}$ is defined for all $x \\neq 0$.\\\\\nThe complete set of values of $x$ for which the function is decreasing is",
    "options": [
      "$x \\leq-2, x>0$",
      "$-2 \\leq x<0$",
      "$x \\leq 1, x \\neq 0$",
      "$x \\geq 1$",
      "$\\quad-2 \\leq x \\leq 1, \\quad x \\neq 0$",
      "$x \\leq-2, x \\geq 1$"
    ],
    "answer": 0,
    "topic": "trigonometry"
  },
  {
    "id": "q19",
    "text": "The coefficient of $x^{3}$ in the expansion of $\\left(1+2 x+3 x^{2}\\right)^{6}$ is equal to twice the coefficient of $x^{4}$ in the expansion of $\\left(1-a x^{2}\\right)^{5}$.\nFind all possible values of the constant $a$.",
    "options": [
      "$\\pm 2 \\sqrt{2}$",
      "$\\pm \\sqrt{17}$",
      "$\\pm \\sqrt{34}$",
      "$\\pm 2 \\sqrt{17}$",
      "There are no possible values of $a$."
    ],
    "answer": 1,
    "topic": "number_theory"
  },
  {
    "id": "q20",
    "text": "The diagram shows a square-based pyramid with base $P Q R S$ and vertex $O$. All the edges of the pyramid are of length 20 metres.\\\\\n\nFind the shortest distance, in metres, along the outer surface of the pyramid from $P$ to the midpoint of $O R$.",
    "options": [
      "$10 \\sqrt{5-2 \\sqrt{3}}$",
      "$10 \\sqrt{3}$",
      "$10 \\sqrt{5}$",
      "$10 \\sqrt{7}$",
      "$\\quad 10 \\sqrt{5+2 \\sqrt{3}}$"
    ],
    "answer": 3,
    "topic": "differentiation",
    "image_url": "/question-images/2016-1_q20_fig1.jpg"
  }
]$json$
);
