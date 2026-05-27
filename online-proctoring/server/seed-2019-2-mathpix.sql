-- TMUA 2019 Paper 2 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2019 October Paper 2',
  2,
  2019,
  'October',
  75,
  20,
  ARRAY['algebra', 'coordinate_geometry', 'exponentials_logs', 'inequalities', 'logic_proof', 'number_theory', 'quadratics_polynomials', 'sequences_series', 'transformations_graphs', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "Find the coefficient of the $x^{4}$ term in the expansion of\n$$\nx^{2}\\left(2 x+\\frac{1}{x}\\right)^{6}\n$$",
    "options": [
      "15",
      "30",
      "60",
      "120",
      "240"
    ],
    "answer": 4,
    "topic": "sequences_series"
  },
  {
    "id": "q2",
    "text": "and $(x-2)$ are factors of $2 x^{3}+p x^{2}+q$.\\\\\nWhat is the value of $2 p+q$ ?",
    "options": [
      "-10",
      "$-\\frac{38}{5}$",
      "$-\\frac{22}{3}$",
      "$\\frac{22}{3}$",
      "$\\frac{38}{5}$",
      "10"
    ],
    "answer": 2,
    "topic": "quadratics_polynomials"
  },
  {
    "id": "q3",
    "text": "and $c$ are real numbers.\\\\\nGiven that $a b=a c$, which of the following statements must be true?\\\\\nI $\\quad a=0$\\\\\nII $b=0$ or $c=0$\\\\\nIII $b=c$",
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
    "topic": "logic_proof"
  },
  {
    "id": "q4",
    "text": "Consider the following conjecture:",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "answer": 3,
    "topic": "number_theory"
  },
  {
    "id": "q5",
    "text": "If $N$ is a positive integer that consists of the digit 1 followed by an odd number of 0 digits and then a final digit 1 , then $N$ is a prime number.\nHere are three numbers:\\\\\nI $\\quad N=101$ (which is a prime number)\\\\\nII $\\quad N=1001$ (which equals $7 \\times 11 \\times 13$ )\\\\\nIII $N=10001$ (which equals $73 \\times 137$ )\\\\\nWhich of these provide(s) a counterexample to the conjecture?",
    "options": [
      "none of them",
      "I only",
      "II only",
      "III only",
      "I and II only",
      "I and III only",
      "II and III only",
      "I, II and III\n\nConsider the following statement about the positive integers $a, b$ and $n$ :\\\\\n(*): $a b$ is divisible by $n$\\\\\nThe condition 'either $a$ or $b$ is divisible by $n$ ' is:\n\nA necessary but not sufficient for (\\textit{)\\\\\nB sufficient but not necessary for (})\\\\\nC necessary and sufficient for (\\textit{)\\\\\nD not necessary and not sufficient for (})"
    ],
    "answer": 1,
    "topic": "number_theory"
  },
  {
    "id": "q6",
    "text": "A student attempts to solve the equation\n$$\n\\cos x+\\sin x \\tan x=2 \\sin x-1\n$$\n\nin the range $0 \\leq x \\leq 2 \\pi$.\\\\\nThe student's attempt is as follows:\\\\\n$\\cos x+\\sin x \\tan x=2 \\sin x-1$\\\\\nSo $\\quad \\cos x-\\sin x+\\sin x \\tan x-\\sin x=-1$\\\\\nSo $\\quad(\\sin x-\\cos x)(\\tan x-1)=-1$\\\\\nSo $\\quad \\sin x-\\cos x=-1$ or $\\tan x-1=-1$\\\\\nSo $\\quad(\\sin x-\\cos x)^{2}=1$ or $\\tan x=0$\\\\\nSo $\\quad 2 \\sin x \\cos x=0$ or tan $x=0$\\\\\nSo $x=0, \\frac{\\pi}{2}, \\pi, \\frac{3 \\pi}{2}, 2 \\pi$\\\\\nich of the following best describes this attempt?\\\\\nWhich of the following best describes this attempt?",
    "options": [
      "It is completely correct",
      "It is incorrect, and the first error occurs on line (I)",
      "It is incorrect, and the first error occurs on line (II)",
      "It is incorrect, and the first error occurs on line (III)",
      "It is incorrect, and the first error is that extra solutions were introduced on line (IV)",
      "It is incorrect, and the first error is that extra solutions were introduced on line (V)",
      "It is incorrect, and the first error is not eliminating the values where $\\tan x$ is undefined on line (VI)"
    ],
    "answer": 3,
    "topic": "trigonometry"
  },
  {
    "id": "q7",
    "text": "For which one of the following statements can the fact that $12^{2}+16^{2}=20^{2}$ be used to produce a counterexample?",
    "options": [
      "If $a, b$ and $c$ are positive integers which satisfy the equation $a^{2}+b^{2}=c^{2}$, and the three numbers have no common divisor, then two of them are odd and the other is even.",
      "The equation $a^{4}+b^{2}=c^{2}$ has no solutions for which $a, b$ and $c$ are positive integers.",
      "The equation $a^{4}+b^{4}=c^{4}$ has no solutions for which $a, b$ and $c$ are positive integers.",
      "If $a, b$ and $c$ are positive integers which satisfy the equation $a^{2}+b^{2}=c^{2}$, then one is the arithmetic mean of the other two."
    ],
    "answer": 1,
    "topic": "number_theory"
  },
  {
    "id": "q8",
    "text": "and $c$ are real numbers with $a<b<c<0$\\\\\nWhich of the following statements must be true?\n\nI $a c<a b<a^{2}$\\\\\nII $b(c+a)>0$\\\\\nIII $\\frac{c}{b}>\\frac{a}{b}$",
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
    "answer": 4,
    "topic": "logic_proof"
  },
  {
    "id": "q9",
    "text": "A large circular table has 40 chairs round it.\\\\\nWhat is the smallest number of people who can be sitting at the table already such that the next person to sit down must sit next to someone?",
    "options": [
      "9",
      "10",
      "13",
      "14",
      "19",
      "20"
    ],
    "answer": 3,
    "topic": "number_theory"
  },
  {
    "id": "q10",
    "text": "is a quadrilateral, labelled anticlockwise.\\\\\nWhich one of the following is a necessary but not sufficient condition for $P Q R S$ to be a parallelogram?",
    "options": [
      "$P Q=S R$ and $P S$ is parallel to $Q R$",
      "$P Q=S R$ and $P Q$ is parallel to $S R$",
      "$P Q=Q R=S R=P S$",
      "$P R=Q S$"
    ],
    "answer": 0,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q11",
    "text": "An arithmetic series has $n$ terms, all of which are integers.\\\\\nThe sum of the series is 20 .\\\\\nWhich of the following statements must be true?\\\\\nI The first term of the series is even.\\\\\nII $n$ is even.\\\\\nIII The common difference is even.",
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
    "topic": "sequences_series"
  },
  {
    "id": "q12",
    "text": "Most students in a large college study Mathematics. A teacher chooses three different students at random, one after the other.\nConsider these three probabilities:\\\\\n$R=\\mathrm{P}$ (At least one of the students chosen studies Mathematics)\\\\\n$S=\\mathrm{P}$ (The second student chosen studies Mathematics)\\\\\n$T=\\mathrm{P}$ (All three of the students chosen study Mathematics)\n\nWhich of the following is true?",
    "options": [
      "$R<S<T$",
      "$R<T<S$",
      "$S<R<T$",
      "$S<T<R$",
      "$T<R<S$",
      "$\\quad T<S<R$"
    ],
    "answer": 5,
    "topic": "number_theory"
  },
  {
    "id": "q13",
    "text": "A student approximates the integral $\\int_{a}^{b} \\sin ^{2} x \\mathrm{~d} x$ using the trapezium rule with 4 strips. The resulting approximation is an overestimate.\nWhich of the following is/are necessarily true?\\\\\nI If the student approximates $\\int_{-b}^{-a} \\sin ^{2} x \\mathrm{~d} x$ in the same way, the result will be an overestimate.\\\\\nII If the student approximates $\\int_{a}^{b} \\cos ^{2} x \\mathrm{~d} x$ in the same way, the result will be an underestimate.",
    "options": [
      "neither of them",
      "I only",
      "II only",
      "I and II"
    ],
    "answer": 3,
    "topic": "trigonometry"
  },
  {
    "id": "q14",
    "text": "Consider the following statements about the polynomial $\\mathrm{p}(x)$, where $a<b$ :\\\\\nI $\\quad \\mathrm{p}(a) \\leq \\mathrm{p}(b)$\\\\\nII $\\quad \\mathrm{p}^{\\prime}(a) \\leq \\mathrm{p}^{\\prime}(b)$\\\\\nIII $\\mathrm{p}^{\\prime \\prime}(a) \\leq \\mathrm{p}^{\\prime \\prime}(b)$\\\\\nWhich of these statements is a necessary condition for $\\mathrm{p}(x)$ to be increasing for $a \\leq x \\leq b$ ?",
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
    "topic": "logic_proof"
  },
  {
    "id": "q15",
    "text": "The numbers $a, b$ and $c$ are each greater than 1 .\\\\\nThe following logarithms are all to the same base:\n\n$$\n\\begin{aligned}\n\\log \\left(a b^{2} c\\right) & =7 \\\\\n\\log \\left(a^{2} b c^{2}\\right) & =11 \\\\\n\\log \\left(a^{2} b^{2} c^{3}\\right) & =15\n\\end{aligned}\n$$\n\nWhat is this base?",
    "options": [
      "$a$",
      "$b$",
      "$c$",
      "It is possible to determine the base, but the base is not $a, b$ or $c$.",
      "There is insufficient information given to determine the base."
    ],
    "answer": 1,
    "topic": "exponentials_logs"
  },
  {
    "id": "q16",
    "text": "The graph of the quadratic\n$$\ny=p x^{2}+q x+p\n$$\n\nwhere $p>0$, intersects the $x$-axis at two distinct points.\\\\\nIn which one of the following graphs does the shaded region show the complete set of possible values that $p$ and $q$ could take?",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E",
      "G",
      "H",
      "F"
    ],
    "answer": 5,
    "topic": "coordinate_geometry",
    "image_url": "/question-images/2019-2_q16_fig1.jpg"
  },
  {
    "id": "q17",
    "text": "A multiple-choice test question offered the following four options relating to a certain statement:",
    "options": [
      "The statement is true if and only if $x>1$",
      "The statement is true if $x>1$",
      "The statement is true if and only if $x>2$",
      "The statement is true if $x>2$\n\nGiven that exactly one of these options was correct, which one was it?"
    ],
    "answer": 3,
    "topic": "logic_proof"
  },
  {
    "id": "q18",
    "text": "Consider the following inequality:\\\\\n$(*): \\quad a|x|+1 \\leq|x-2|$\\\\\nwhere $a$ is a real constant.\\\\\nWhich one of the following describes the complete set of values of $a$ such that (*) is true for all real $x$ ?",
    "options": [
      "$a \\leq \\frac{3}{2}$",
      "$a \\leq 1$",
      "$\\quad a \\leq \\frac{1}{2}$",
      "$a \\leq 0$",
      "$\\quad a \\leq-\\frac{1}{2}$",
      "$\\quad a \\leq-1$",
      "$a \\leq-\\frac{3}{2}$",
      "There are no such values of $a$."
    ],
    "answer": 4,
    "topic": "inequalities"
  },
  {
    "id": "q19",
    "text": "Find the value of the expression\n$$\n\\sqrt{8-4 \\sqrt{2}+1}+\\sqrt{9-12 \\sqrt{2}+8}\n$$",
    "options": [
      "$\\sqrt{26-16 \\sqrt{2}}$",
      "$4 \\sqrt{2}-4$",
      "-2",
      "$4-4 \\sqrt{2}$",
      "2",
      "$\\sqrt{26}-4 \\sqrt{2}$",
      "1"
    ],
    "answer": 4,
    "topic": "algebra"
  },
  {
    "id": "q20",
    "text": "When the graph of the function $y=\\mathrm{f}(x)$, defined on the real numbers, is reflected in the $y$-axis and then translated by 2 units in the negative $x$-direction, the result is the graph of the function $y=\\mathrm{g}(x)$.\nWhen the graph of the same function $y=\\mathrm{f}(x)$ is translated by 2 units in the negative $x$-direction and then reflected in the $y$-axis, the result is the graph of the function $y=\\mathrm{h}(x)$.\n\nWhich one of the following conditions on $y=\\mathrm{f}(x)$ is necessary and sufficient for the functions $\\mathrm{g}(x)$ and $\\mathrm{h}(x)$ to be identical?",
    "options": [
      "$\\mathrm{f}(x)=\\mathrm{f}(x+2)$ for all $x$",
      "$\\mathrm{f}(x)=\\mathrm{f}(x+4)$ for all $x$",
      "$\\mathrm{f}(x)=\\mathrm{f}(x+8)$ for all $x$",
      "$\\mathrm{f}(x)=\\mathrm{f}(-x)$ for all $x$",
      "$\\quad \\mathrm{f}(x)=\\mathrm{f}(2-x)$ for all $x$",
      "$\\mathrm{f}(x)=\\mathrm{f}(4-x)$ for all $x$",
      "$\\mathrm{f}(x)=\\mathrm{f}(8-x)$ for all $x$\n\n\\section*{TMUA/CTMUA}\n\\section*{PAPER 1}\nNovember 2020\n\nAdditional materials: Answer sheet\n\n\\section*{INSTRUCTIONS TO CANDIDATES}"
    ],
    "answer": 1,
    "topic": "transformations_graphs"
  }
]$json$
);
