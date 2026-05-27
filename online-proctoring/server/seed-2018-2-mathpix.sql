-- TMUA 2018 Paper 2 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2018 October Paper 2',
  2,
  2018,
  'October',
  75,
  20,
  ARRAY['algebra', 'functions', 'inequalities', 'logic_proof', 'number_theory', 'quadratics_polynomials', 'sequences_series', 'transformations_graphs', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "The function f is given, for $x>0$, by\n$$\n\\mathrm{f}(x)=\\frac{x^{3}-4 x}{2 \\sqrt{x}}\n$$\n\nFind the value of $f^{\\prime}(4)$.",
    "options": [
      "3",
      "9",
      "$\\quad 9.5$",
      "12",
      "39.5",
      "88"
    ],
    "answer": 2,
    "topic": "functions"
  },
  {
    "id": "q2",
    "text": "Find the value of the constant term in the expansion of",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "answer": 1,
    "topic": "sequences_series"
  },
  {
    "id": "q3",
    "text": "$$\n\\left(x^{6}-\\frac{1}{x^{2}}\\right)^{12}\n$$",
    "options": [
      "-495",
      "-220",
      "-66",
      "66",
      "220",
      "495\n\nConsider the following statement:\n\nA car journey consists of two parts. In the first part, the average speed is $u \\mathrm{~km} / \\mathrm{h}$. In the second part, the average speed is $v \\mathrm{~km} / \\mathrm{h}$. Hence the average speed for the whole journey is $\\frac{1}{2}(u+v) \\mathrm{km} / \\mathrm{h}$.\n\nWhich of the following examples of car journeys provide(s) a counterexample to the statement?\n\nI In the first part of the journey, the car travels at a constant speed of $50 \\mathrm{~km} / \\mathrm{h}$ for 100 km . In the second part of the journey, the car travels at a constant speed of $40 \\mathrm{~km} / \\mathrm{h}$ for 100 km .\n\nII In the first part of the journey, the car travels at a constant speed of $50 \\mathrm{~km} / \\mathrm{h}$ for one hour. In the second part of the journey, the car travels at a constant speed of $40 \\mathrm{~km} / \\mathrm{h}$ for one hour.\n\nIII In the first part of the journey, the car travels at a constant speed of $50 \\mathrm{~km} / \\mathrm{h}$ for 80 km . In the second part of the journey, the car travels at a constant speed of $40 \\mathrm{~km} / \\mathrm{h}$ for 100 km .\n\nA none of them\\\\\nB I only\\\\\nC II only\\\\\nD III only\\\\\nE I and II only\\\\\nF I and III only",
      "II and III only",
      "I, II and III"
    ],
    "answer": 5,
    "topic": "logic_proof"
  },
  {
    "id": "q4",
    "text": "The non-zero real number $c$ is such that the equation $\\cos x=c$ has two solutions for $0<x<\\frac{3}{2} \\pi$.\nHow many solutions of the equation $\\cos ^{2} 2 x=c^{2}$ are there in the range $0<x<\\frac{3}{2} \\pi$ ?",
    "options": [
      "2",
      "3",
      "4",
      "6",
      "7",
      "8"
    ],
    "answer": 3,
    "topic": "trigonometry"
  },
  {
    "id": "q5",
    "text": "The two diagonals of the quadrilateral $Q$ are perpendicular.\\\\\nConsider the following statements:\\\\\nI One of the diagonals of $Q$ is a line of symmetry of $Q$.\\\\\nII The midpoints of the sides of $Q$ are the vertices of a square.\\\\\nWhich of these statements is/are necessarily true for the quadrilateral $Q$ ?",
    "options": [
      "neither of them",
      "I only",
      "II only",
      "I and II"
    ],
    "answer": 0,
    "topic": "logic_proof"
  },
  {
    "id": "q6",
    "text": "Which one of the following functions provides a counterexample to the statement: if $\\mathrm{f}^{\\prime}(x)>0$ for all real $x$, then $\\mathrm{f}(x)>0$ for all real $x$.",
    "options": [
      "$\\mathrm{f}(x)=x^{2}+1$",
      "$\\mathrm{f}(x)=x^{2}-1$",
      "$\\mathrm{f}(x)=x^{3}+x+1$",
      "$\\mathrm{f}(x)=1-x$",
      "$\\mathrm{f}(x)=2^{x}$"
    ],
    "answer": 2,
    "topic": "number_theory"
  },
  {
    "id": "q7",
    "text": "Sequence 1 is an arithmetic progression with first term 11 and common difference 3.\\\\\nSequence 2 is an arithmetic progression with first term 2 and common difference 5.\\\\\nSome numbers that appear in Sequence 1 also appear in Sequence 2. Let $N$ be the 20th such number.\n\nWhat is the remainder when $N$ is divided by 7 ?",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "answer": 1,
    "topic": "sequences_series"
  },
  {
    "id": "q8",
    "text": "The diagram shows an example of a mountain profile.\\\\\n\nThis consists of upstrokes which go upwards from left to right, and downstrokes which go downwards from left to right. The example shown has six upstrokes and six downstrokes. The horizontal line at the bottom is known as sea level.",
    "options": [
      "mountain profile of order $n$ consists of $n$ upstrokes and $n$ downstrokes, with the condition that the profile begins and ends at sea level and never goes below sea level (although it might reach sea level at any point). So the example shown is a mountain profile of order 6.\n\nMountain profiles can be coded by using U to indicate an upstroke and D to indicate a downstroke. The example shown has the code UDUUUDUDDUDD. A sequence of U's and D's obtained from a mountain profile in this way is known as a valid code.\n\nWhich of the following statements is/are true?\\\\\nI If a valid code is written in reverse order, the result is always a valid code.\n\nII If each $U$ in a valid code is replaced by $D$ and each $D$ by $U$, the result is always a valid code.\n\nIII If U is added at the beginning of a valid code and D is added at the end of the code, the result is always a valid code.\n\nA none of them",
      "I only",
      "II only",
      "III only",
      "I and II only",
      "I and III only",
      "II and III only",
      "I, II and III"
    ],
    "answer": 3,
    "topic": "sequences_series",
    "image_url": "/question-images/2018-2_q08_fig1.jpg"
  },
  {
    "id": "q9",
    "text": "Consider the following attempt to solve the equation $4 x \\sqrt{2 x-1}=10 x-5$ :\n\\begin{align*}\n4 x \\sqrt{2 x-1} & =10 x-5 \\\\\n4 x \\sqrt{2 x-1} & =5(2 x-1)  \\tag{I}\\\\\n16 x^{2}(2 x-1) & =25(2 x-1)^{2}  \\tag{II}\\\\\n16 x^{2} & =25(2 x-1)  \\tag{III}\\\\\n16 x^{2}-50 x+25 & =0  \\tag{IV}\\\\\n(8 x-5)(2 x-5) & =0 \\tag{V}\n\\end{align*}\n\nThe solutions of the original equation are $x=\\frac{5}{8}$ and $x=\\frac{5}{2}$.\n\nWhich one of the following is true?",
    "options": [
      "The solution is correct.",
      "Only one of $x=\\frac{5}{8}$ and $x=\\frac{5}{2}$ is correct and the error arises as a result of step (II).",
      "Only one of $x=\\frac{5}{8}$ and $x=\\frac{5}{2}$ is correct and the error arises as a result of step (III).",
      "Only one of $x=\\frac{5}{8}$ and $x=\\frac{5}{2}$ is correct and the error arises as a result of step (IV).",
      "There is another value of $x$ that satisfies the original equation and the error arises as a result of step (II).",
      "There is another value of $x$ that satisfies the original equation and the error arises as a result of step (III).",
      "There is another value of $x$ that satisfies the original equation and the error arises as a result of step (IV)."
    ],
    "answer": 5,
    "topic": "algebra"
  },
  {
    "id": "q10",
    "text": "The function $\\mathrm{f}(x)$ is defined for all real numbers.\\\\\nConsider the following three conditions, where $a$ is a real constant:\n\nI $\\quad \\mathrm{f}(a-x)=\\mathrm{f}(a+x)$ for all real $x$.\\\\\nII $\\quad \\mathrm{f}(2 a-x)=\\mathrm{f}(x)$ for all real $x$.\\\\\nIII $\\mathrm{f}(a-x)=\\mathrm{f}(x)$ for all real $x$.\n\nWhich of these conditions is/are necessary and sufficient for the graph of $y=\\mathrm{f}(x)$ to have reflection symmetry in the line $x=a$ ?",
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
    "topic": "transformations_graphs"
  },
  {
    "id": "q11",
    "text": "Consider the equation $2^{x}=m x+c$, where $m$ and $c$ are real constants.\\\\",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "answer": 0,
    "topic": "logic_proof"
  },
  {
    "id": "q12",
    "text": "Which of the following statements is/are true?\\\\\nI The equation has a negative real solution only if $c>1$.\\\\\nII The equation has two distinct real solutions if $c>1$.\\\\\nIII The equation has two distinct positive real solutions if and only if $c \\leq 1$.",
    "options": [
      "none of them",
      "I only",
      "II only",
      "III only",
      "I and II only",
      "I and III only",
      "II and III only",
      "I, II and III\n\nConsider the following statement:\n\nFor any positive integer $N$ there is a positive integer $K$ such that $N(K m+1)-1$ is not prime for any positive integer $m$.\n\nWhich one of the following is the negation of this statement?\n\nA For any positive integer $N$ there is a positive integer $K$ such that there is a positive integer $m$ for which $N(K m+1)-1$ is prime.\n\nB For any positive integer $N$ there is a positive integer $K$ such that there is a positive integer $m$ for which $N(K m+1)-1$ is not prime.\n\nC For any positive integer $N$ there is a positive integer $K$ such that for any positive integer $m, N(K m+1)-1$ is not prime.\n\nD For any positive integer $N$, any positive integer $K$ and any positive integer $m, N(K m+1)-1$ is not prime.\n\nE There is a positive integer $N$ such that for any positive integer $K$ there is a positive integer $m$ for which $N(K m+1)-1$ is not prime.\n\nF There is a positive integer $N$ such that for any positive integer $K$ there is a positive integer $m$ for which $N(K m+1)-1$ is prime.\n\nG There is a positive integer $N$ such that for any positive integer $K$ and any positive integer $m, N(K m+1)-1$ is prime.\n\nH There is a positive integer $N$ and a positive integer $K$ for which there is no positive integer $m$ for which $N(K m+1)-1$ is prime."
    ],
    "answer": 5,
    "topic": "number_theory"
  },
  {
    "id": "q13",
    "text": "The following is an attempted proof of the conjecture:\n$$\n\\text { if } \\tan \\theta>0, \\text { then } \\sin \\theta+\\cos \\theta>1 .\n$$\n\nSuppose $\\tan \\theta>0$, so in particular $\\cos \\theta \\neq 0$.\n\n\\begin{equation*}\n\\text { Since } \\tan \\theta=\\frac{\\sin \\theta}{\\cos \\theta} \\text {, then } \\sin \\theta \\cos \\theta=\\tan \\theta \\cos ^{2} \\theta>0 \\text {. } \\tag{I}\n\\end{equation*}\n\nIt follows that $1+2 \\sin \\theta \\cos \\theta>1$.\n\nTherefore $\\sin ^{2} \\theta+2 \\sin \\theta \\cos \\theta+\\cos ^{2} \\theta>1$,\\\\\nwhich factorises to give $(\\sin \\theta+\\cos \\theta)^{2}>1$.\n\nTherefore $\\sin \\theta+\\cos \\theta>1$.\n\nWhich one of the following is the case?",
    "options": [
      "The proof is correct.",
      "The proof is incorrect, and the first error occurs in line (I).",
      "The proof is incorrect, and the first error occurs in line (II).",
      "The proof is incorrect, and the first error occurs in line (III).",
      "The proof is incorrect, and the first error occurs in line (IV).",
      "The proof is incorrect, and the first error occurs in line (V)."
    ],
    "answer": 5,
    "topic": "trigonometry"
  },
  {
    "id": "q14",
    "text": "In the triangle $P Q R, P R=2, Q R=p$ and $\\angle R P Q=30^{\\circ}$.\\\\\nWhat is the set of all the values of $p$ for which this information uniquely determines the length of $P Q$ ?",
    "options": [
      "$p=1$",
      "$p=\\sqrt{3}$",
      "$\\quad 1 \\leq p<2$",
      "$\\sqrt{3} \\leq p<2$",
      "$p=1$ or $p \\geq 2$",
      "$p=\\sqrt{3}$ or $p \\geq 2$",
      "$p<2$",
      "$\\quad p \\geq 2$"
    ],
    "answer": 4,
    "topic": "inequalities"
  },
  {
    "id": "q15",
    "text": "It is given that $\\mathrm{f}(x)=x^{3}+3 q x^{2}+2$, where $q$ is a real constant.\\\\",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G"
    ],
    "answer": 6,
    "topic": "quadratics_polynomials"
  },
  {
    "id": "q16",
    "text": "x^{2}(2 x-1) & =25(2 x-1)^{2}  \\tag{II}\\\\\n16 x^{2} & =25(2 x-1)  \\tag{III}\\\\\n16 x^{2}-50 x+25 & =0  \\tag{IV}\\\\\n(8 x-5)(2 x-5) & =0 \\tag{V}\n\\end{align*}\n\nThe solutions of the original equation are $x=\\frac{5}{8}$ and $x=\\frac{5}{2}$.\n\nWhich one of the following is true?",
    "options": [
      "The solution is correct.",
      "Only one of $x=\\frac{5}{8}$ and $x=\\frac{5}{2}$ is correct and the error arises as a result of step (II).",
      "Only one of $x=\\frac{5}{8}$ and $x=\\frac{5}{2}$ is correct and the error arises as a result of step (III).",
      "Only one of $x=\\frac{5}{8}$ and $x=\\frac{5}{2}$ is correct and the error arises as a result of step (IV).",
      "There is another value of $x$ that satisfies the original equation and the error arises as a result of step (II).",
      "There is another value of $x$ that satisfies the original equation and the error arises as a result of step (III).",
      "There is another value of $x$ that satisfies the original equation and the error arises as a result of step (IV).\n\n10 The function $\\mathrm{f}(x)$ is defined for all real numbers.\\\\\nConsider the following three conditions, where $a$ is a real constant:\n\nI $\\quad \\mathrm{f}(a-x)=\\mathrm{f}(a+x)$ for all real $x$.\\\\\nII $\\quad \\mathrm{f}(2 a-x)=\\mathrm{f}(x)$ for all real $x$.\\\\\nIII $\\mathrm{f}(a-x)=\\mathrm{f}(x)$ for all real $x$.\n\nWhich of these conditions is/are necessary and sufficient for the graph of $y=\\mathrm{f}(x)$ to have reflection symmetry in the line $x=a$ ?\n\n11 Consider the equation $2^{x}=m x+c$, where $m$ and $c$ are real constants.\\\\\nWhich of the following statements is/are true?\\\\\nI The equation has a negative real solution only if $c>1$.\\\\\nII The equation has two distinct real solutions if $c>1$.\\\\\nIII The equation has two distinct positive real solutions if and only if $c \\leq 1$.\n\nA none of them\\\\\nB I only\\\\\nC II only\\\\\nD III only\\\\\nE I and II only\\\\\nF I and III only\\\\\nG II and III only",
      "I, II and III\n\nConsider the following statement:\n\nFor any positive integer $N$ there is a positive integer $K$ such that $N(K m+1)-1$ is not prime for any positive integer $m$.\n\nWhich one of the following is the negation of this statement?\n\nA For any positive integer $N$ there is a positive integer $K$ such that there is a positive integer $m$ for which $N(K m+1)-1$ is prime.\n\nB For any positive integer $N$ there is a positive integer $K$ such that there is a positive integer $m$ for which $N(K m+1)-1$ is not prime.\n\nC For any positive integer $N$ there is a positive integer $K$ such that for any positive integer $m, N(K m+1)-1$ is not prime.\n\nD For any positive integer $N$, any positive integer $K$ and any positive integer $m, N(K m+1)-1$ is not prime.\n\nE There is a positive integer $N$ such that for any positive integer $K$ there is a positive integer $m$ for which $N(K m+1)-1$ is not prime.\n\nF There is a positive integer $N$ such that for any positive integer $K$ there is a positive integer $m$ for which $N(K m+1)-1$ is prime.\n\nG There is a positive integer $N$ such that for any positive integer $K$ and any positive integer $m, N(K m+1)-1$ is prime.\n\nH There is a positive integer $N$ and a positive integer $K$ for which there is no positive integer $m$ for which $N(K m+1)-1$ is prime.\n\n13 The following is an attempted proof of the conjecture:\n\n$$\n\\text { if } \\tan \\theta>0, \\text { then } \\sin \\theta+\\cos \\theta>1 .\n$$\n\nSuppose $\\tan \\theta>0$, so in particular $\\cos \\theta \\neq 0$.\n\n\\begin{equation*}\n\\text { Since } \\tan \\theta=\\frac{\\sin \\theta}{\\cos \\theta} \\text {, then } \\sin \\theta \\cos \\theta=\\tan \\theta \\cos ^{2} \\theta>0 \\text {. } \\tag{I}\n\\end{equation*}\n\nIt follows that $1+2 \\sin \\theta \\cos \\theta>1$.\n\nTherefore $\\sin ^{2} \\theta+2 \\sin \\theta \\cos \\theta+\\cos ^{2} \\theta>1$,\\\\\nwhich factorises to give $(\\sin \\theta+\\cos \\theta)^{2}>1$.\n\nTherefore $\\sin \\theta+\\cos \\theta>1$.\n\nWhich one of the following is the case?\n\nA The proof is correct.\\\\\nB The proof is incorrect, and the first error occurs in line (I).\\\\\nC The proof is incorrect, and the first error occurs in line (II).\\\\\nD The proof is incorrect, and the first error occurs in line (III).\\\\\nE The proof is incorrect, and the first error occurs in line (IV).\\\\\nF The proof is incorrect, and the first error occurs in line (V).\n\n14 In the triangle $P Q R, P R=2, Q R=p$ and $\\angle R P Q=30^{\\circ}$.\\\\\nWhat is the set of all the values of $p$ for which this information uniquely determines the length of $P Q$ ?\n\nA $p=1$\\\\\nB $p=\\sqrt{3}$\\\\\nC $\\quad 1 \\leq p<2$\\\\\nD $\\sqrt{3} \\leq p<2$\\\\\nE $p=1$ or $p \\geq 2$\\\\\nF $p=\\sqrt{3}$ or $p \\geq 2$\\\\\nG $p<2$\\\\\nH $\\quad p \\geq 2$\n\n15 It is given that $\\mathrm{f}(x)=x^{3}+3 q x^{2}+2$, where $q$ is a real constant.\\\\\nThe equation $\\mathrm{f}(x)=0$ has 3 distinct real roots.\\\\\nWhich of the following statements is/are necessarily true?\n\nI The equation $\\mathrm{f}(x)+1=0$ has 3 distinct real roots.\\\\\nII The equation $\\mathrm{f}(x+1)=0$ has 3 distinct real roots.\\\\\nIII The equation $\\mathrm{f}(-x)-1=0$ has 3 distinct real roots.\n\nA none of them\\\\\nB I only\\\\\nC II only\\\\\nD III only\\\\\nE I and II only\\\\\nF I and III only\\\\\nG II and III only\\\\\nH I, II and III\n\n16 In this question, $x_{1}, x_{2}, x_{3}, \\ldots$ is an arithmetic progression, all of whose terms are integers.\n\nLet $n$ be a positive integer. If the median of the first $n$ terms of the sequence is an integer, which of the following three statements must be true?\n\nI The median of the first $n+2$ terms is an integer.\\\\\nII The median of the first $2 n$ terms is an integer.\\\\\nIII The median of $x_{2}, x_{4}, x_{6}, \\ldots, x_{2 n}$ is an integer.\n\nA none of them\\\\\nB I only\\\\\nC II only\\\\\nD III only\\\\\nE I and II only\\\\\nF I and III only\\\\\nG II and III only\\\\\nH I, II and III"
    ],
    "answer": 5,
    "topic": "number_theory"
  },
  {
    "id": "q17",
    "text": "A positive integer is called a squaresum if and only if it can be written as the sum of the squares of two integers. For example, 61 and 9 are both squaresums since $61=5^{2}+6^{2}$ and $9=3^{2}+0^{2}$.\nA prime number is called awkward if and only if it has a remainder of 3 when divided by 4 . For example, 23 is awkward since $23=5 \\times 4+3$.",
    "options": [
      "(true) theorem due to Fermat states that:\n\nA positive integer is a squaresum if and only if each of its awkward prime factors occurs to an even power in its prime factorisation.\n\nIt follows that $5 \\times 23^{2}$ is a squaresum, since 23 occurs to the power 2 , but $5 \\times 23^{3}$ is not, since 23 occurs to the power 3 .\n\nWhich one of the following statements is not true?\n\nA Every square number is a squaresum.",
      "If $N$ and $M$ are squaresums, then so is $N M$.",
      "If $N M$ is a squaresum, then $N$ and $M$ are squaresums.",
      "If $N$ is not a squaresum, then $k N$ is a squaresum for some number $k$ which is a product of awkward primes."
    ],
    "answer": 2,
    "topic": "number_theory"
  },
  {
    "id": "q18",
    "text": "is a polynomial function defined for all real $x$.\\\\\nWhich of the following is a necessary condition for the inequality\n\n$$\n\\frac{\\mathrm{f}(a)+\\mathrm{f}(b)}{2} \\geq \\mathrm{f}\\left(\\frac{a+b}{2}\\right)\n$$\n\nto be true for all real numbers $a$ and $b$ with $a<b$ ?",
    "options": [
      "$\\mathrm{f}(x) \\geq 0$ for all real $x$",
      "$\\quad \\mathrm{f}^{\\prime}(x) \\geq 0$ for all real $x$",
      "$\\mathrm{f}^{\\prime \\prime}(x) \\geq 0$ for all real $x$",
      "$\\mathrm{f}(x) \\leq 0$ for all real $x$",
      "$\\quad \\mathrm{f}^{\\prime}(x) \\leq 0$ for all real $x$",
      "$\\mathrm{f}^{\\prime \\prime}(x) \\leq 0$ for all real $x$"
    ],
    "answer": 2,
    "topic": "quadratics_polynomials"
  },
  {
    "id": "q19",
    "text": "Three real numbers $x, y$ and $z$ satisfy $x>y>z>1$.\\\\\nWhich one of the following statements must be true?\\\\",
    "options": [
      "$\\frac{2^{z+1}}{2^{x}}>\\frac{2^{x}+2^{z}}{2^{y}}$",
      "$2>\\frac{3^{x}+3^{z}}{3^{y}}$",
      "$\\frac{2 \\times 5^{x}}{5^{z}}>\\frac{5^{x}+5^{z}}{5^{y}}$",
      "$2<\\frac{7^{x}+7^{z}}{7^{y}}$"
    ],
    "answer": 2,
    "topic": "logic_proof"
  },
  {
    "id": "q20",
    "text": "It is given that the equation $\\sqrt{x+p}+\\sqrt{x}=p$ has at least one real solution for $x$, where $p$ is a real constant.\nWhat is the complete set of possible values for $p$ ?",
    "options": [
      "$p=0$ or $p=1$",
      "$p=0$ or $p \\geq 1$",
      "$p \\geq-x$",
      "$p \\geq \\sqrt{x}$",
      "$p \\geq 0$",
      "$p \\geq 1$"
    ],
    "answer": 1,
    "topic": "quadratics_polynomials"
  }
]$json$
);
