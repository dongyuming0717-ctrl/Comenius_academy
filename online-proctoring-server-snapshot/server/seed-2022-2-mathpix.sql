-- TMUA 2022 Paper 2 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2022 October Paper 2',
  2,
  2022,
  'October',
  75,
  20,
  ARRAY['coordinate_geometry', 'differentiation', 'exponentials_logs', 'inequalities', 'integration', 'logic_proof', 'number_theory', 'sequences_series', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "Determine the number of stationary points on the curve with equation\n$$\ny=3 x^{4}+4 x^{3}+6 x^{2}-5\n$$",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": 1,
    "topic": "differentiation"
  },
  {
    "id": "q2",
    "text": "Find the coefficient of the $x^{5}$ term in the expansion of\n$$\n(1+x)^{5} \\times \\sum_{i=0}^{5} x^{i}\n$$",
    "options": [
      "1",
      "5",
      "16",
      "25",
      "32"
    ],
    "answer": 4,
    "topic": "sequences_series"
  },
  {
    "id": "q3",
    "text": "Consider the following statement about the positive integer $n$ if $n$ is prime, then $n^{2}+2$ is not prime\nWhich of the following is a counterexample to this statement?\\\\\nI $n=2$\\\\\nII $n=3$\\\\\nIII $n=4$",
    "options": [
      "none of them",
      "I only",
      "II only",
      "III only",
      "I and II only",
      "I and III only",
      "II and III only",
      "I, II and III"
    ],
    "answer": 2,
    "topic": "number_theory"
  },
  {
    "id": "q4",
    "text": "The point $P$ has coordinates $(p, q)$, and the equation of a circle is\n$$\nx^{2}+2 f x+y^{2}+2 g y+h=0\n$$\n\nwhere $f, g, h, p$ and $q$ are all real constants.\\\\\nLet $L$ be the distance between the centre of the circle and the point $P$.\\\\\nWhich one of the following is sufficient on its own to be able to calculate $L$ ?\\\\",
    "options": [
      "the values of $f, g$ and $h$",
      "the values of $f, g, p$ and $q$",
      "the values of $f, h, p$ and $q$",
      "the values of $g, h, p$ and $q$",
      "none of the options A-D is sufficient on its own"
    ],
    "answer": 1,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q5",
    "text": "A straight line $L$ passes through $(1,2)$.\\\\\nLet P be the statement\\\\\nif the $y$-intercept of $L$ is negative, then the $x$-intercept of $L$ is positive.\\\\\nWhich of the following statements must be true?\\\\\nI P\\\\\nII the converse of P\\\\\nIII the contrapositive of P",
    "options": [
      "none of them",
      "I only",
      "II only",
      "III only",
      "I and II only",
      "I and III only",
      "II and III only",
      "I, II and III"
    ],
    "answer": 5,
    "topic": "logic_proof"
  },
  {
    "id": "q6",
    "text": "A list consists of $n$ integers.\\\\\nConsider the following statements:\\\\\nP: $\\quad n$ is odd.\\\\\nQ: The median of the list is one of the numbers in the list.\\\\\nWhich one of the following is true?",
    "options": [
      "P is necessary and sufficient for Q.",
      "P is necessary but not sufficient for Q.",
      "P is sufficient but not necessary for Q.",
      "P is not necessary and not sufficient for Q."
    ],
    "answer": 2,
    "topic": "logic_proof"
  },
  {
    "id": "q7",
    "text": "Consider the following claim:\\\\\nThe difference between two consecutive positive cube numbers is always prime.\\\\\nHere is an attempted proof of this claim:\n\n$$\n\\text { I } \\quad(x+1)^{3}=x^{3}+3 x^{2}+3 x+1\n$$\n\nII Taking $x$ to be a positive integer, the difference between two consecutive cube numbers can be expressed as $(x+1)^{3}-x^{3}=3 x^{2}+3 x+1$\n\nIII It is impossible to factorise $3 x^{2}+3 x+1$ into two linear factors with integer coefficients because its discriminant is negative.\n\nIV Therefore for every positive integer value of $x$ the integer $3 x^{2}+3 x+1$ cannot be factorised.\n\nV Hence, the difference between two consecutive cube numbers will always be prime.\\\\\nWhich of the following best describes this proof?",
    "options": [
      "The proof is completely correct, and the claim is true.",
      "The proof is completely correct, but there are counterexamples to the claim.",
      "The proof is wrong, and the first error occurs on line I.",
      "The proof is wrong, and the first error occurs on line II.",
      "The proof is wrong, and the first error occurs on line III.",
      "The proof is wrong, and the first error occurs on line IV.",
      "The proof is wrong, and the first error occurs on line V."
    ],
    "answer": 5,
    "topic": "logic_proof"
  },
  {
    "id": "q8",
    "text": "A selection, $S$, of $n$ terms is taken from the arithmetic sequence $1,4,7,10, \\ldots, 70$.\\\\\nConsider the following statement:\\\\\n(*) There are two distinct terms in $S$ whose sum is 74 .\n\nWhat is the smallest value of $n$ for which (*) is necessarily true?",
    "options": [
      "12",
      "13",
      "14",
      "21",
      "22",
      "23"
    ],
    "answer": 2,
    "topic": "logic_proof"
  },
  {
    "id": "q9",
    "text": "Consider the following statement:\\\\\n(\\textit{) For all real numbers $x$, if $x<k$ then $x^{2}<k$\\\\\nWhat is the complete set of values of $k$ for which (}) is true?",
    "options": [
      "no real numbers",
      "$k>0$",
      "$k<1$",
      "$k \\leq 1$",
      "$\\quad 0<k<1$",
      "$0<k \\leq 1$",
      "all real numbers"
    ],
    "answer": 0,
    "topic": "inequalities"
  },
  {
    "id": "q10",
    "text": "Which of the following statements is/are true?",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "answer": 2,
    "topic": "number_theory"
  },
  {
    "id": "q11",
    "text": "I For all real numbers $x$ and for all positive integers $n, x<n$\\\\\nII For all real numbers $x$, there exists a positive integer $n$ such that $x<n$\\\\\nIII There exists a real number $x$ such that for all positive integers $n$, $x<n$",
    "options": [
      "none of them",
      "I only",
      "II only",
      "III only",
      "I and II only",
      "I and III only",
      "II and III only",
      "I, II and III\\\\\n\nThe diagram shows a kite $P Q R S$ whose diagonals meet at $O$.\n\n$$\n\\begin{aligned}\n& O P=x \\\\\n& O Q=y \\\\\n& O R=x \\\\\n& O S=z\n\\end{aligned}\n$$\n\nWhich of the following is necessary and sufficient for angle $S P Q$ to be a right angle?\\\\\nA $x=y=z$\\\\\nB $2 x=y+z$\\\\\nC $\\quad x^{2}=y z$\\\\\nD $y=z$\\\\\nE $y^{2}=x^{2}+z^{2}$"
    ],
    "answer": 2,
    "topic": "trigonometry",
    "image_url": "/question-images/2022-2_q11_fig1.jpg"
  },
  {
    "id": "q12",
    "text": "Place the following integrals in order of size, starting with the smallest.\n$$\n\\begin{aligned}\n& P=\\int_{0}^{1} 2^{\\sqrt{x}} \\mathrm{~d} x \\\\\n& Q=\\int_{0}^{1} 2^{x} \\mathrm{~d} x \\\\\n& R=\\int_{0}^{1}(\\sqrt{2})^{x} \\mathrm{~d} x\n\\end{aligned}\n$$",
    "options": [
      "$P<Q<R$",
      "$P<R<Q$",
      "$Q<P<R$",
      "$Q<R<P$",
      "$\\quad R<P<Q$",
      "$R<Q<P$"
    ],
    "answer": 5,
    "topic": "integration"
  },
  {
    "id": "q13",
    "text": "Consider the statement (\\textit{) about a real number $x$ :\\\\\n(}) There exists a real number $y$ such that $x-x y+y$ is negative.\\\\\nFor how many real values of $x$ is (*) true?\\\\",
    "options": [
      "no values of $x$",
      "exactly one value of $x$",
      "exactly two values of $x$",
      "all except exactly two values of $x$",
      "all except exactly one value of $x$",
      "all values of $x$"
    ],
    "answer": 4,
    "topic": "logic_proof"
  },
  {
    "id": "q14",
    "text": "Consider the two inequalities:\n$$\n\\begin{aligned}\n& |x+5|<|x+11| \\\\\n& |x+11|<|x+1|\n\\end{aligned}\n$$\n\nWhich one of the following is correct?\\\\",
    "options": [
      "There is no real number for which both inequalities are true.",
      "There is exactly one real number for which both inequalities are true.",
      "The real numbers for which both inequalities are true form an interval of length 1 .",
      "The real numbers for which both inequalities are true form an interval of length 2 .",
      "The real numbers for which both inequalities are true form an interval of length 3 .",
      "The real numbers for which both inequalities are true form an interval of length 4 .",
      "The real numbers for which both inequalities are true form an interval of length 5 ."
    ],
    "answer": 3,
    "topic": "inequalities"
  },
  {
    "id": "q15",
    "text": "The real numbers $x, y$ and $z$ are all greater than 1 , and satisfy the equations\n$$\n\\log _{x} y=z \\quad \\text { and } \\quad \\log _{y} z=x\n$$\n\nWhich one of the following equations for $\\log _{z} x$ must be true?\\\\",
    "options": [
      "$\\quad \\log _{z} x=y$",
      "$\\quad \\log _{z} x=\\frac{1}{y}$",
      "$\\log _{z} x=x y$",
      "$\\log _{z} x=\\frac{1}{x y}$",
      "$\\quad \\log _{z} x=x z$",
      "$\\log _{z} x=\\frac{1}{x z}$",
      "$\\log _{z} x=y z$",
      "$\\log _{z} x=\\frac{1}{y z}$"
    ],
    "answer": 5,
    "topic": "exponentials_logs"
  },
  {
    "id": "q16",
    "text": "In this question, $a_{1}, \\ldots, a_{100}$ and $b_{1}, \\ldots, b_{100}$ and $c_{1}, \\ldots, c_{100}$ are three sequences of integers such that\n$$\na_{n} \\leq b_{n}+c_{n}\n$$\n\nfor each $n$.\\\\\nWhich of the following statements must be true?\\\\\nI (minimum of $\\left.a_{1}, \\ldots, a_{100}\\right) \\leq$ (minimum of $\\left.b_{1}, \\ldots, b_{100}\\right)+\\left(\\right.$ minimum of $\\left.c_{1}, \\ldots, c_{100}\\right)$\\\\\nII (minimum of $\\left.a_{1}, \\ldots, a_{100}\\right) \\geq$ (minimum of $\\left.b_{1}, \\ldots, b_{100}\\right)+$ (minimum of $c_{1}, \\ldots, c_{100}$ )\\\\\nIII (maximum of $\\left.a_{1}, \\ldots, a_{100}\\right) \\leq$ (maximum of $\\left.b_{1}, \\ldots, b_{100}\\right)+$ (maximum of $c_{1}, \\ldots, c_{100}$ )",
    "options": [
      "none of them",
      "I only",
      "II only",
      "III only",
      "I and II only",
      "I and III only",
      "II and III only",
      "I, II and III"
    ],
    "answer": 3,
    "topic": "logic_proof"
  },
  {
    "id": "q17",
    "text": "A student answered the following question:\\\\\n$a$ and $b$ are non-zero real numbers.\\\\\nProve that the equation $x^{3}+a x^{2}+b=0$ has three distinct real roots if $27 b\\left(b+\\frac{4 a^{3}}{27}\\right)<0$\n\nHere is the student's solution:\\\\\nI We differentiate $y=x^{3}+a x^{2}+b$ to get $\\frac{\\mathrm{d} y}{\\mathrm{~d} x}=3 x^{2}+2 a x=x(3 x+2 a)$ Solving $\\frac{\\mathrm{d} y}{\\mathrm{~d} x}=0$ shows that the stationary points are at $(0, b)$ and $\\left(-\\frac{2 a}{3}, b+\\frac{4 a^{3}}{27}\\right)$\\\\\nII If $27 b\\left(b+\\frac{4 a^{3}}{27}\\right)<0$, then $b$ and $b+\\frac{4 a^{3}}{27}$ must have opposite signs, and so one of the stationary points is above the $x$-axis and one is below.\n\nIII If the cubic has three distinct real roots, then one of the stationary points is above the $x$-axis and one is below.\n\nIV Hence if $27 b\\left(b+\\frac{4 a^{3}}{27}\\right)<0$, then the equation has three distinct real roots.\n\nWhich one of the following options best describes the student's solution?\\\\",
    "options": [
      "It is a completely correct solution.",
      "The student has instead proved the converse of the statement in the question.",
      "The solution is wrong, because the student should have stated step II after step III.",
      "The solution is wrong, because the student should have shown the converse of the result in step II.",
      "The solution is wrong, because the student should have shown the converse of the result in step III."
    ],
    "answer": 4,
    "topic": "differentiation"
  },
  {
    "id": "q18",
    "text": "and S show the graphs of\n$$\ny=(\\cos x)^{\\cos x}, y=(\\sin x)^{\\sin x}, y=(\\cos x)^{\\sin x} \\text { and } y=(\\sin x)^{\\cos x}\n$$\n\nfor $0<x<\\frac{\\pi}{2}$ in some order.\n\n\\begin{figure}[h]\n\\begin{center}\n\\captionsetup{labelformat=empty}\n\\caption{P}\n  \n\\end{center}\n\\end{figure}\n\n\\begin{figure}[h]\n\\begin{center}\n\\captionsetup{labelformat=empty}\n\\caption{Q}\n  \n\\end{center}\n\\end{figure}\n\n\\begin{figure}[h]\n\\begin{center}\n\\captionsetup{labelformat=empty}\n\\caption{R}\n  \n\\end{center}\n\\end{figure}\n\n\\begin{figure}[h]\n\\begin{center}\n\\captionsetup{labelformat=empty}\n\\caption{S}\n  \n\\end{center}\n\\end{figure}\n\nWhich row in the following table correctly identifies the graphs?",
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
    "answer": 4,
    "topic": "trigonometry",
    "image_url": "/question-images/2022-2_q18_fig1.jpg"
  },
  {
    "id": "q19",
    "text": "A polygon has $n$ vertices, where $n \\geq 3$. It has the following properties:\n\\begin{itemize}\n  \\item Every vertex of the polygon lies on the circumference of a circle $C$.\n  \\item The centre of the circle $C$ is inside the polygon.\n  \\item The radii from the centre of the circle $C$ to the vertices of the polygon cut the polygon into $n$ triangles of equal area.\n\\end{itemize}\n\nFor which values of $n$ are these properties sufficient to deduce that the polygon is regular?\\\\",
    "options": [
      "no values of $n$",
      "$n=3$ only",
      "$n=3$ and $n=4$ only",
      "$\\quad n=3$ and $n \\geq 5$ only",
      "all values of $n$"
    ],
    "answer": 1,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q20",
    "text": "The functions $f_{1}$ to $f_{5}$ are defined on the real numbers by\n$$\n\\begin{aligned}\n& \\mathrm{f}_{1}(x)=\\cos x \\\\\n& \\mathrm{f}_{2}(x)=\\sin (\\cos x) \\\\\n& \\mathrm{f}_{3}(x)=\\cos (\\sin (\\cos x)) \\\\\n& \\mathrm{f}_{4}(x)=\\sin (\\cos (\\sin (\\cos x))) \\\\\n& \\mathrm{f}_{5}(x)=\\cos (\\sin (\\cos (\\sin (\\cos x))))\n\\end{aligned}\n$$\n\nwhere all numbers are taken to be in radians.\\\\\nThese functions have maximum values $m_{1}, m_{2}, m_{3}, m_{4}$ and $m_{5}$, respectively.\\\\\nWhich one of the following statements is true?\\\\",
    "options": [
      "$m_{1}, m_{2}, m_{3}, m_{4}$ and $m_{5}$ are all equal to 1",
      "$0<m_{5}<m_{4}<m_{3}<m_{2}<m_{1}=1$",
      "$\\quad m_{1}=m_{3}=m_{5}=1$ and $0<m_{2}=m_{4}<1$",
      "$m_{1}=m_{3}=m_{5}=1$ and $0<m_{4}<m_{2}<1$",
      "$m_{1}=m_{3}=1$ and $0<m_{2}=m_{4}<1$ and $0<m_{5}<1$",
      "$m_{1}=m_{3}=1$ and $0<m_{4}<m_{2}<1$ and $0<m_{5}<1$"
    ],
    "answer": 4,
    "topic": "trigonometry"
  }
]$json$
);
