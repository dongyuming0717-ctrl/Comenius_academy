-- TMUA 2021 Paper 2 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2021 October Paper 2',
  2,
  2021,
  'October',
  75,
  20,
  ARRAY['coordinate_geometry', 'exponentials_logs', 'functions', 'inequalities', 'integration', 'logic_proof', 'number_theory', 'quadratics_polynomials', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "Find the value of\n$$\n\\int_{1}^{4}\\left(3 \\sqrt{x}+\\frac{4}{x^{2}}\\right) \\mathrm{d} x\n$$",
    "options": [
      "-0.75",
      "7.125",
      "11",
      "17",
      "18",
      "21.875",
      "34.5"
    ],
    "answer": 3,
    "topic": "integration"
  },
  {
    "id": "q2",
    "text": "and $C(4,0)$ are opposite vertices of the square $A B C D$.\\\\\nWhat is the equation of the straight line through $B$ and $D$ ?",
    "options": [
      "$y=-2 x+5$",
      "$y=-\\frac{1}{2} x-3$",
      "$y=-\\frac{1}{2} x+2$",
      "$y=x$",
      "$y=2 x-3$",
      "$y=2 x+2$"
    ],
    "answer": 4,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q3",
    "text": "A student is chosen at random from a class. Each student is equally likely to be chosen.\nWhich of the following conditions is/are necessary for the probability that the student wears glasses to equal $\\frac{4}{15}$ ?\n\nI Exactly 11 students in the class do not wear glasses.\\\\\nII The number of students in the class is divisible by 3 .\\\\\nIII The class contains 30 students, and 8 of them wear glasses.",
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
    "text": "Consider the following claim about positive integers $a, b$ and $c$ :\\\\\nif $a$ is a factor of $b c$, then $a$ is a factor of $b$ or $a$ is a factor of $c$\n\nWhich of the following provide(s) a counterexample to this claim?\\\\\nI $a=5, b=10, c=20$\\\\\nII $\\quad a=8, b=4, c=4$\\\\\nIII $a=6, b=7, c=12$",
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
    "id": "q5",
    "text": "On which line is the first error in the following argument?",
    "options": [
      "$\\sin ^{2} x+\\cos ^{2} x=1$ for all values of $x$.",
      "Therefore $\\cos x=\\sqrt{1-\\sin ^{2} x}$ for all values of $x$.",
      "Hence $1+\\cos x=1+\\sqrt{1-\\sin ^{2} x}$ for all values of $x$.",
      "Thus $(1+\\cos x)^{2}=\\left(1+\\sqrt{1-\\sin ^{2} x}\\right)^{2}$ for all values of $x$.",
      "Substituting $x=\\pi$ gives $0=4$."
    ],
    "answer": 1,
    "topic": "trigonometry"
  },
  {
    "id": "q6",
    "text": "Consider the following two statements about the polynomial $\\mathrm{f}(x)$ :\\\\\n$P: \\quad \\mathrm{f}(x)=0$ for exactly three real values of $x$\\\\\n$Q: \\quad \\mathrm{f}^{\\prime}(x)=0$ for exactly two real values of $x$\\\\\nWhich one of the following is correct?\\\\",
    "options": [
      "$P$ is necessary but not sufficient for $Q$.",
      "$P$ is sufficient but not necessary for $Q$.",
      "$P$ is necessary and sufficient for $Q$.",
      "$P$ is not necessary and not sufficient for $Q$."
    ],
    "answer": 3,
    "topic": "quadratics_polynomials"
  },
  {
    "id": "q7",
    "text": "A circle has equation $(x-9)^{2}+(y+2)^{2}=4$\\\\\nA square has vertices at $(1,0),(1,2),(-1,2)$ and $(-1,0)$.\\\\\nA straight line bisects both the area of the circle and the area of the square.\\\\\nWhat is the $x$-coordinate of the point where this straight line meets the $x$-axis?",
    "options": [
      "2",
      "3",
      "4",
      "4.5",
      "5",
      "6",
      "The straight line is not uniquely determined by the information given, so there is more than one possible point of intersection.",
      "There is no straight line that bisects both the area of the circle and the area of the square."
    ],
    "answer": 1,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q8",
    "text": "Consider the following statement about the polynomial $\\mathrm{p}(x)$, where $a$ and $b$ are real numbers with $a<b$ :\\\\\n(*) There exists a number $c$ with $a<c<b$ such that $\\mathrm{p}^{\\prime}(c)=0$.\n\nWhich one of the following is true?",
    "options": [
      "The condition $\\mathrm{p}(a)=\\mathrm{p}(b)$ is necessary and sufficient for ( $*$ )",
      "The condition $\\mathrm{p}(a)=\\mathrm{p}(b)$ is necessary but not sufficient for (*)",
      "The condition $\\mathrm{p}(a)=\\mathrm{p}(b)$ is sufficient but not necessary for ( $*$ )",
      "The condition $\\mathrm{p}(a)=\\mathrm{p}(b)$ is not necessary and not sufficient for ( $*$ )"
    ],
    "answer": 2,
    "topic": "logic_proof"
  },
  {
    "id": "q9",
    "text": "Consider the following statements about a polynomial $\\mathrm{f}(x)$ :\\\\",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "answer": 2,
    "topic": "logic_proof"
  },
  {
    "id": "q10",
    "text": "I $\\mathrm{f}(x)=p x^{3}+q x^{2}+r x+s$, where $p \\neq 0$.\\\\\nII There is a real number $t$ for which $\\mathrm{f}^{\\prime}(t)=0$.\\\\\nIII There are real numbers $u$ and $v$ for which $\\mathrm{f}(u) \\mathrm{f}(v)<0$.\\\\\nWhich of these statements is/are sufficient for the equation $\\mathrm{f}(x)=0$ to have a real solution?\n\nThe first seven terms of a sequence of positive integers are:\n\n$$\n\\begin{aligned}\n& u_{1}=15 \\\\\n& u_{2}=21 \\\\\n& u_{3}=30 \\\\\n& u_{4}=37 \\\\\n& u_{5}=44 \\\\\n& u_{6}=51 \\\\\n& u_{7}=59\n\\end{aligned}\n$$\n\nConsider the following statement about this sequence:\\\\\n(*) If $n$ is a prime number, then $u_{n}$ is a multiple of 3 or $u_{n}$ is a multiple of 5 .\n\nWhat is the smallest value of $n$ that provides a counterexample to $(*)$ ?",
    "options": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "H"
    ],
    "answer": 4,
    "topic": "number_theory"
  },
  {
    "id": "q11",
    "text": "A student attempts to solve the following problem, where $a$ and $b$ are non-zero real numbers:\nShow that if $a^{2}-4 b^{3} \\geq 0$ then there exist real numbers $x$ and $y$ such that $a=x y(x+y)$ and $b=x y$.\n\nConsider the following attempt:\n\n\\begin{align*}\n& (x-y)^{2} \\geq 0  \\tag{I}\\\\\n& \\text { so } \\quad x^{2}+y^{2}-2 x y \\geq 0  \\tag{II}\\\\\n& \\text { so } \\quad(x+y)^{2}-4 x y \\geq 0  \\tag{III}\\\\\n& \\text { so } \\quad x^{2} y^{2}(x+y)^{2}-4 x^{3} y^{3} \\geq 0  \\tag{IV}\\\\\n& \\text { so } \\quad a^{2}-4 b^{3} \\geq 0 \\tag{V}\n\\end{align*}\n\nWhich of the following best describes this attempt?",
    "options": [
      "It is completely correct.",
      "It is incorrect, but it would be correct if written in the reverse order.",
      "It is incorrect, but the student has correctly proved the converse.",
      "It is incorrect because there is an error in line (II).",
      "It is incorrect because there is an error in line (III).",
      "It is incorrect because there is an error in line (IV)."
    ],
    "answer": 2,
    "topic": "logic_proof"
  },
  {
    "id": "q12",
    "text": "Which of the following statements about polynomials $f$ and $g$ is/are true?\nI If $\\mathrm{f}(x) \\geq \\mathrm{g}(x)$ for all $x \\geq 0$, then $\\int_{0}^{x} \\mathrm{f}(t) \\mathrm{d} t \\geq \\int_{0}^{x} \\mathrm{~g}(t) \\mathrm{d} t$ for all $x \\geq 0$.\n\nII If $\\mathrm{f}(x) \\geq \\mathrm{g}(x)$ for all $x \\geq 0$, then $\\mathrm{f}^{\\prime}(x) \\geq \\mathrm{g}^{\\prime}(x)$ for all $x \\geq 0$.\n\nIII If $\\mathrm{f}^{\\prime}(x) \\geq \\mathrm{g}^{\\prime}(x)$ for all $x \\geq 0$, then $\\mathrm{f}(x) \\geq \\mathrm{g}(x)$ for all $x \\geq 0$.",
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
    "answer": 1,
    "topic": "quadratics_polynomials"
  },
  {
    "id": "q13",
    "text": "A region $R$ in the ( $x, y$ )-plane is defined by the simultaneous inequalities\n$$\n\\begin{array}{r}\ny-x<3 \\\\\ny-x^{2}<1\n\\end{array}\n$$\n\nWhich of the following statements is/are true for every point in $R$ ?\n\nI $-1<x<2$\\\\\nII $\\quad(y-x)\\left(y-x^{2}\\right)<3$\\\\\nIII $y<5$",
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
    "answer": 0,
    "topic": "inequalities"
  },
  {
    "id": "q14",
    "text": "Consider the following simultaneous equations, where $p$ is a real number:\n$$\n\\begin{array}{r}\np 2^{x}+\\log _{2} y=2 \\\\\n2^{x}+\\log _{2} y=1\n\\end{array}\n$$\n\nWhat is the complete range of $p$ for which these simultaneous equations have a real solution $(x, y)$ ?",
    "options": [
      "$p<1$",
      "$p \\neq 1$",
      "$p>1$",
      "$p<1$ or $p>2$",
      "$\\quad p \\neq 1$ and $p<2$",
      "$p>1$ and $p<2$",
      "$p>2$",
      "All real values of $p$"
    ],
    "answer": 2,
    "topic": "exponentials_logs"
  },
  {
    "id": "q15",
    "text": "A circle has equation\n$$\nx^{2}+a x+y^{2}+b y+c=0\n$$\n\nwhere $a, b$ and $c$ are non-zero real constants.\\\\\nWhich one of the following is a necessary and sufficient condition for the circle to be tangent to the $y$-axis?",
    "options": [
      "$a^{2}=4 c$",
      "$b^{2}=4 c$",
      "$\\frac{a}{2}=\\sqrt{\\frac{a^{2}+b^{2}}{4}-c}$",
      "$\\frac{b}{2}=\\sqrt{\\frac{a^{2}+b^{2}}{4}-c}$",
      "$\\quad-\\frac{a}{2}=\\sqrt{\\frac{a^{2}+b^{2}}{4}-c}$",
      "$\\quad-\\frac{b}{2}=\\sqrt{\\frac{a^{2}+b^{2}}{4}-c}$"
    ],
    "answer": 1,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q16",
    "text": "and $q$ are real numbers, and the equation\n$$\nx|x|=p x+q\n$$\n\nhas exactly $k$ distinct real solutions for $x$.\\\\\nWhich one of the following is the complete list of possible values for $k$ ?",
    "options": [
      "$0,1,2$",
      "$0,1,2,3$",
      "$0,1,2,3,4$",
      "$0,2,4$",
      "1,2,3",
      "$1,2,3,4$"
    ],
    "answer": 4,
    "topic": "functions"
  },
  {
    "id": "q17",
    "text": "Consider the following functions defined for $x>1$ :\n$$\n\\begin{aligned}\n& \\mathrm{f}(x)=\\log _{2}\\left(\\log _{2} \\sqrt{x}\\right) \\\\\n& \\mathrm{g}(x)=\\log _{2}\\left(\\sqrt{\\log _{2} x}\\right)\n\\end{aligned}\n$$\n\nWhich one of the following is true for all values of $x>1$ ?",
    "options": [
      "$0 \\leq \\mathrm{f}(x) \\leq \\mathrm{g}(x)$ or $\\mathrm{g}(x) \\leq \\mathrm{f}(x) \\leq 0$",
      "$0 \\leq \\mathrm{g}(x) \\leq \\mathrm{f}(x)$ or $\\mathrm{f}(x) \\leq \\mathrm{g}(x) \\leq 0$",
      "$\\frac{1}{2} \\leq \\mathrm{f}(x) \\leq \\mathrm{g}(x)$ or $\\mathrm{g}(x) \\leq \\mathrm{f}(x) \\leq \\frac{1}{2}$",
      "$\\frac{1}{2} \\leq \\mathrm{g}(x) \\leq \\mathrm{f}(x)$ or $\\mathrm{f}(x) \\leq \\mathrm{g}(x) \\leq \\frac{1}{2}$",
      "$1 \\leq \\mathrm{f}(x) \\leq \\mathrm{g}(x)$ or $\\mathrm{g}(x) \\leq \\mathrm{f}(x) \\leq 1$",
      "$\\quad 1 \\leq \\mathrm{g}(x) \\leq \\mathrm{f}(x)$ or $\\mathrm{f}(x) \\leq \\mathrm{g}(x) \\leq 1$"
    ],
    "answer": 5,
    "topic": "exponentials_logs"
  },
  {
    "id": "q18",
    "text": "A student chooses two distinct real numbers $x$ and $y$ with $0<x<y<1$.\\\\\nThe student then attempts to draw a triangle $A B C$ with:\n\n$$\n\\begin{aligned}\nA B & =1 \\\\\n\\sin A & =x \\\\\n\\sin B & =y\n\\end{aligned}\n$$\n\nWhich of the following statements is/are correct?\n\nI For some choice of $x$ and $y$, there is exactly one triangle the student could draw.\n\nII For some choice of $x$ and $y$, there are exactly two different triangles the student could draw.\n\nIII For some choice of $x$ and $y$, there are exactly three different triangles the student could draw.\\\\\n(Note that congruent triangles are considered to be the same.)",
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
    "topic": "trigonometry"
  },
  {
    "id": "q19",
    "text": "The angle $\\theta$ can take any of the values $1^{\\circ}, 2^{\\circ}, 3^{\\circ}, \\ldots, 359^{\\circ}, 360^{\\circ}$.\\\\\nFor how many of these values of $\\theta$ is it true that\n\n$$\n\\sin \\theta \\sqrt{1+\\sin \\theta} \\sqrt{1-\\sin \\theta}+\\cos \\theta \\sqrt{1+\\cos \\theta} \\sqrt{1-\\cos \\theta}=0\n$$",
    "options": [
      "0",
      "1",
      "2",
      "4",
      "93",
      "182",
      "271",
      "360"
    ],
    "answer": 5,
    "topic": "trigonometry"
  },
  {
    "id": "q20",
    "text": "A sequence of functions $f_{1}, f_{2}, f_{3}, \\ldots$ is defined by\n$$\n\\begin{aligned}\n\\mathrm{f}_{1}(x) & =|x| \\\\\n\\mathrm{f}_{n+1}(x) & =\\left|\\mathrm{f}_{n}(x)+x\\right| \\quad \\text { for } n \\geq 1\n\\end{aligned}\n$$\n\nFind the value of\n\n$$\n\\int_{-1}^{1} \\mathrm{f}_{99}(x) \\mathrm{d} x\n$$",
    "options": [
      "0",
      "0.5",
      "1",
      "49.5",
      "50",
      "99",
      "99.5",
      "100"
    ],
    "answer": 4,
    "topic": "integration"
  }
]$json$
);
