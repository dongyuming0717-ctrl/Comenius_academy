-- TMUA 2023 Paper 2 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2023 October Paper 2',
  2,
  2023,
  'October',
  75,
  20,
  ARRAY['algebra', 'coordinate_geometry', 'differentiation', 'exponentials_logs', 'integration', 'logic_proof', 'number_theory', 'quadratics_polynomials', 'transformations_graphs', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "Given that\n$$\n\\frac{1}{\\sqrt{x}-6}-\\frac{1}{\\sqrt{x}+6}=\\frac{3}{11}\n$$\n\nwhat is the value of $x$ ?",
    "options": [
      "$2 \\sqrt{15}$",
      "$4 \\sqrt{5}$",
      "$5 \\sqrt{2}$",
      "$\\sqrt{58}$",
      "50",
      "58",
      "60",
      "80"
    ],
    "answer": 7,
    "topic": "algebra"
  },
  {
    "id": "q2",
    "text": "Evaluate\n$$\n\\int_{9}^{16}\\left(\\frac{1}{\\sqrt{x}}+\\sqrt{x}\\right)^{2} \\mathrm{~d} x-\\int_{9}^{16}\\left(\\frac{1}{\\sqrt{x}}-\\sqrt{x}\\right)^{2} \\mathrm{~d} x\n$$",
    "options": [
      "0",
      "2",
      "4",
      "7",
      "14",
      "28",
      "75",
      "175"
    ],
    "answer": 5,
    "topic": "differentiation"
  },
  {
    "id": "q3",
    "text": "Consider the claim:\\\\\nFor all positive real numbers $x$ and $y$,\n\n$$\n\\sqrt{x^{y}}=x^{\\sqrt{y}}\n$$\n\nWhich of the following is/are a counterexample to the claim?\\\\\nI $x=1, y=16$\\\\\nII $x=2, y=8$\\\\\nIII $x=3, y=4$",
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
    "topic": "logic_proof"
  },
  {
    "id": "q4",
    "text": "A student attempts to answer the following question.\\\\\nWhat is the largest number of consecutive odd integers that are all prime?\\\\\nThe student's attempt is as follows:\\\\\nI There are two consecutive odd integers that are prime (for example: 17, 19).\\\\\nII Any three consecutive odd integers can be written in the form $n-2, n, n+2$ for some $n$.\n\nIII If $n$ is one more than a multiple of 3 , then $n+2$ is a multiple of 3 .\\\\\nIV If $n$ is two more than a multiple of 3 , then $n-2$ is a multiple of 3 .\\\\\nV The only other possibility is that $n$ is a multiple of 3 .\\\\\nVI In each case, one of the integers is a multiple of 3 , so not prime.\\\\\nVII Therefore the largest number of consecutive odd integers that are all prime is two.\n\nWhich of the following best describes this attempt?",
    "options": [
      "It is completely correct.",
      "It is incorrect, and the first error is on line I.",
      "It is incorrect, and the first error is on line II.",
      "It is incorrect, and the first error is on line III.",
      "It is incorrect, and the first error is on line IV.",
      "It is incorrect, and the first error is on line V.",
      "It is incorrect, and the first error is on line VI.",
      "It is incorrect, and the first error is on line VII."
    ],
    "answer": 6,
    "topic": "number_theory"
  },
  {
    "id": "q5",
    "text": "Consider the two statements\\\\\nR: $\\quad k$ is an integer multiple of $\\pi$\n\n$$\n\\mathrm{S}: \\quad \\int_{0}^{k} \\sin 2 x \\mathrm{~d} x=0\n$$\n\nWhich of the following statements is true?\\\\",
    "options": [
      "$R$ is necessary and sufficient for $S$.",
      "R is necessary but not sufficient for $S$.",
      "R is sufficient but not necessary for $S$.",
      "$R$ is not necessary and not sufficient for $S$."
    ],
    "answer": 0,
    "topic": "logic_proof"
  },
  {
    "id": "q6",
    "text": "Consider the following equation where $a$ is a real number and $a>1$ :\n$$\n(*) \\quad a^{x}=x\n$$\n\nWhich of the following equations must have the same number of real solutions as $(*)$ ?\\\\\nI $\\quad \\log _{a} x=x$\\\\\nII $\\quad a^{2 x}=x^{2}$\\\\\nIII $a^{2 x}=2 x$",
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
    "topic": "exponentials_logs"
  },
  {
    "id": "q7",
    "text": "The graph of the line $a x+b y=c$ is drawn, where $a, b$ and $c$ are real non-zero constants.\\\\\nWhich one of the following is a necessary but not sufficient condition for the line to have a positive gradient and a positive $y$-intercept?",
    "options": [
      "$\\frac{c}{b}>0$ and $\\frac{a}{b}<0$",
      "$\\frac{c}{b}<0$ and $\\frac{a}{b}>0$",
      "$a>b>c$",
      "$a<b<c$",
      "$\\quad a$ and $c$ have opposite signs",
      "$\\quad a$ and $c$ have the same sign"
    ],
    "answer": 4,
    "topic": "transformations_graphs"
  },
  {
    "id": "q8",
    "text": "A student draws a triangle that is acute-angled or obtuse-angled but not right-angled.\\\\\nThe student counts the number of straight lines that divide the triangle into two triangles, at least one of which is right-angled.\n\nWhich of the following statements is/are true?\\\\\nI The student can draw a triangle for which there is exactly 1 such straight line.\\\\\nII The student can draw a triangle for which there are exactly 2 such straight lines.\\\\\nIII The student can draw a triangle for which there are exactly 3 such straight lines.",
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
    "topic": "trigonometry"
  },
  {
    "id": "q9",
    "text": "Consider the following statement about a pentagon P:\\\\\n(*) If at least one of the interior angles in P is $108^{\\circ}$, then all the interior angles in P form an arithmetic sequence.\n\nWhich of the following is/are true?\\\\\nI The statement (\\textit{)\\\\\nII The contrapositive of (})\\\\\nIII The converse of (*)",
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
    "id": "q10",
    "text": "Here is an attempt to solve the inequality $x^{4}-2 x^{2}-3<0$ by completing the square:\n$$\nx^{4}-2 x^{2}-3<0\n$$\n\nI if and only if $x^{4}-2 x^{2}+1<4$\\\\\nII if and only if $\\left(x^{2}-1\\right)^{2}<4$\\\\\nIII if and only if $-2<x^{2}-1<2$\\\\\nIV if and only if $x^{2}-1<2$\\\\\nV if and only if $x^{2}<3$\\\\\nVI if and only if $-\\sqrt{3}<x<\\sqrt{3}$\n\nWhich of the following statements is true?",
    "options": [
      "The argument is completely correct.",
      "The first error occurs in line I.",
      "The first error occurs in line II.",
      "The first error occurs in line III.",
      "The first error occurs in line IV.",
      "The first error occurs in line V.",
      "The first error occurs in line VI."
    ],
    "answer": 0,
    "topic": "logic_proof"
  },
  {
    "id": "q11",
    "text": "In this question, $k$ is a positive integer.\\\\\nConsider the following theorem:\\\\\nIf $2^{k}+1$ is a prime, then $k$ is a power of $2 . \\quad(*)$\\\\\nWhich of the following statements, taken individually, is/are equivalent to (*)?\\\\\nI If $k$ is a power of 2 , then $2^{k}+1$ is prime.\\\\\nII $\\quad 2^{k}+1$ is not prime only if $k$ is not a power of 2 .\\\\\nIII A sufficient condition for $k$ to be a power of 2 is that $2^{k}+1$ is prime.",
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
    "answer": 6,
    "topic": "number_theory"
  },
  {
    "id": "q12",
    "text": "In this question, $p$ is a real constant.\\\\\nThe equation $\\sin x \\cos ^{2} x=p^{2} \\sin x$ has $n$ distinct solutions in the range $0 \\leq x \\leq 2 \\pi$ Which of the following statements is/are true?\n\nI $n=3$ is sufficient for $p>1$\\\\\nII $n=7$ only if $-1<p<1$",
    "options": [
      "none of them",
      "I only",
      "II only",
      "I and II"
    ],
    "answer": 2,
    "topic": "trigonometry"
  },
  {
    "id": "q13",
    "text": "Let $x$ be a real number.\\\\\nWhich one of the following statements is a sufficient condition for exactly three of the other four statements?",
    "options": [
      "$x \\geq 0$",
      "$x=1$",
      "$x=0$ or $x=1$",
      "$x \\geq 0$ or $x \\leq 1$",
      "$x \\geq 0$ and $x \\leq 1$"
    ],
    "answer": 2,
    "topic": "logic_proof"
  },
  {
    "id": "q14",
    "text": "Three lines are given by the equations:\n$$\n\\begin{aligned}\n& a x+b y+c=0 \\\\\n& b x+c y+a=0 \\\\\n& c x+a y+b=0\n\\end{aligned}\n$$\n\nwhere $a$, $b$ and $c$ are non-zero real numbers.\\\\\nWhich one of the following is correct?\\\\",
    "options": [
      "If two of the lines are parallel, then all three are parallel.",
      "If two of the lines are parallel, then the third is perpendicular to the other two.",
      "If two of the lines are parallel, then the third is parallel to $y=x$.",
      "If two of the lines are parallel, then the third is perpendicular to $y=x$.",
      "If two of the lines are perpendicular, then all three meet at a point.",
      "If two of the lines are perpendicular, then the third is parallel to $y=x$.",
      "If two of the lines are perpendicular, then the third is perpendicular to $y=x$."
    ],
    "answer": 5,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q15",
    "text": "The base 10 number 0.03841 has the value\n$$\n0 \\times 10^{-1}+3 \\times 10^{-2}+8 \\times 10^{-3}+4 \\times 10^{-4}+1 \\times 10^{-5}=0.03841\n$$\n\nSimilarly, the base 2 number 0.01101 has the value\n\n$$\n0 \\times 2^{-1}+1 \\times 2^{-2}+1 \\times 2^{-3}+0 \\times 2^{-4}+1 \\times 2^{-5}=\\frac{13}{32}\n$$\n\nWhat is the value of the recurring base 2 number $0 . \\dot{0} 01 \\dot{1}=0.001100110011 \\ldots$ ?\\\\",
    "options": [
      "$\\frac{1}{3}$",
      "$\\frac{1}{5}$",
      "$\\frac{1}{15}$",
      "$\\frac{2}{15}$",
      "$\\frac{4}{15}$",
      "$\\frac{3}{16}$",
      "$\\frac{5}{16}$",
      "$\\frac{6}{31}$"
    ],
    "answer": 1,
    "topic": "number_theory"
  },
  {
    "id": "q16",
    "text": "A sequence is defined by:\n$$\n\\begin{aligned}\nu_{1} & =a \\\\\nu_{2} & =b \\\\\nu_{n+2} & =u_{n}+u_{n+1} \\quad \\text { for } n \\geq 1\n\\end{aligned}\n$$\n\nwhere $a$ and $b$ are positive integers. The highest common factor of $a$ and $b$ is 7 .\\\\\nWhich of the following statements must be true?\\\\\nI $u_{2023}$ is a multiple of 7\\\\\nII If $u_{1}$ is not a factor of $u_{2}$, then $u_{1}$ is not a factor of $u_{n}$ for any $n>1$\\\\\nIII The highest common factor of $u_{1}$ and $u_{5}$ is 7",
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
    "topic": "number_theory"
  },
  {
    "id": "q17",
    "text": "The ceiling of $x$, written $[x]$, is defined to be the value of $x$ rounded up to the nearest integer.\\\\\nFor example: $\\quad\\lceil\\pi\\rceil=4, \\quad\\lceil 2.1\\rceil=3, \\quad\\lceil 8\\rceil=8$\\\\\nWhat is the value of the following integral?\n\n$$\n\\int_{0}^{99} 2^{\\lceil x\\rceil} d x\n$$",
    "options": [
      "$2^{99}$",
      "$\\quad 2^{99}-1$",
      "$2^{99}-2$",
      "$2^{100}$",
      "$\\quad 2^{100}-1$",
      "$\\quad 2^{100}-2$"
    ],
    "answer": 5,
    "topic": "integration"
  },
  {
    "id": "q18",
    "text": "The equation $x^{4}+b x^{2}+c=0$ has four distinct real roots if and only if which of the following conditions is satisfied?",
    "options": [
      "$b^{2}>4 c$",
      "$b^{2}<4 c$",
      "$c>0$ and $b>2 \\sqrt{c}$",
      "$c>0$ and $b<-2 \\sqrt{c}$",
      "$\\quad c<0$ and $b<0$",
      "$\\quad c<0$ and $b>0$"
    ],
    "answer": 3,
    "topic": "quadratics_polynomials"
  },
  {
    "id": "q19",
    "text": "In this question, $f(x)$ is a non-constant polynomial, and $g(x)=x f^{\\prime}(x)$\\\\\n$f(x)=0$ for exactly $M$ real values of $x$.\\\\\n$g(x)=0$ for exactly $N$ real values of $x$.\\\\\nWhich of the following statements is/are true?\\\\\nI It is possible that $M<N$\\\\\nII It is possible that $M=N$\\\\\nIII It is possible that $M>N$",
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
    "answer": 7,
    "topic": "quadratics_polynomials"
  },
  {
    "id": "q20",
    "text": "Let $f$ be a polynomial with real coefficients.\\\\\nThe integral $I_{p, q}$ where $p<q$ is defined by\n\n$$\nI_{p, q}=\\int_{p}^{q}(f(x))^{2}-(f(|x|))^{2} \\mathrm{~d} x\n$$\n\nWhich of the following statements must be true?\\\\\n$1 I_{p, q}=0$ only if $0<p$\\\\\n$2 f^{\\prime}(x)<0$ for all $x$ only if $I_{p, q}<0$ for all $p<q<0$\\\\\n$3 I_{p, q}>0$ only if $p<0$",
    "options": [
      "none of them",
      "1 only",
      "2 only",
      "3 only",
      "1 and 2 only",
      "1 and 3 only",
      "2 and 3 only",
      "1, 2 and 3"
    ],
    "answer": 3,
    "topic": "logic_proof"
  }
]$json$
);
