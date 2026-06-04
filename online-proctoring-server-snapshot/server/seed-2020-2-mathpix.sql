-- TMUA 2020 Paper 2 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2020 October Paper 2',
  2,
  2020,
  'October',
  75,
  20,
  ARRAY['coordinate_geometry', 'inequalities', 'integration', 'logic_proof', 'number_theory', 'quadratics_polynomials', 'sequences_series', 'transformations_graphs', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "Find the complete set of values of $k$ for which the line $y=x-2$ crosses or touches the curve $y=x^{2}+k x+2$",
    "options": [
      "$-1 \\leq k \\leq 3$",
      "$-3 \\leq k \\leq 5$",
      "$-4 \\leq k \\leq 4$",
      "$k \\leq-1$ or $k \\geq 3$",
      "$k \\leq-3$ or $k \\geq 5$",
      "$k \\leq-4$ or $k \\geq 4$"
    ],
    "answer": 4,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q2",
    "text": "Given that $\\tan \\theta=2$ and $180^{\\circ}<\\theta<360^{\\circ}$, find the value of $\\cos \\theta$",
    "options": [
      "$\\sqrt{3}$",
      "$-\\sqrt{3}$",
      "$\\frac{\\sqrt{3}}{2}$",
      "$-\\frac{\\sqrt{3}}{2}$",
      "$\\frac{\\sqrt{5}}{5}$",
      "$-\\frac{\\sqrt{5}}{5}$",
      "$\\frac{2 \\sqrt{5}}{5}$",
      "$-\\frac{2 \\sqrt{5}}{5}$"
    ],
    "answer": 5,
    "topic": "trigonometry"
  },
  {
    "id": "q3",
    "text": "A student makes the following claim:\\\\\nFor all integers $n$, the expression $4\\left(\\frac{9 n+1}{2}-\\frac{3 n-1}{2}\\right)$ is divisible by 3 .\\\\\nHere is the student's argument:\n\n\\begin{align*}\n4\\left(\\frac{9 n+1}{2}-\\frac{3 n-1}{2}\\right) & =2\\left(2\\left(\\frac{9 n+1}{2}-\\frac{3 n-1}{2}\\right)\\right)  \\tag{I}\\\\\n& =2(9 n+1-3 n-1)  \\tag{II}\\\\\n& =2(6 n)  \\tag{III}\\\\\n& =12 n  \\tag{IV}\\\\\n& =3(4 n) \\tag{V}\n\\end{align*}\n\nwhich is always a multiple of 3 .\n\nSo the expression $4\\left(\\frac{9 n+1}{2}-\\frac{3 n-1}{2}\\right)$ is always divisible by 3 .\n\nWhich one of the following is true?",
    "options": [
      "The argument is correct.",
      "The argument is incorrect, and the first error occurs on line (I).",
      "The argument is incorrect, and the first error occurs on line (II).",
      "The argument is incorrect, and the first error occurs on line (III).",
      "The argument is incorrect, and the first error occurs on line (IV).",
      "The argument is incorrect, and the first error occurs on line (V).",
      "The argument is incorrect, and the first error occurs on line (VI)."
    ],
    "answer": 2,
    "topic": "logic_proof"
  },
  {
    "id": "q4",
    "text": "Consider the following statement:\\\\\nEvery positive integer $N$ that is greater than 6 can be written as the sum of two non-prime integers that are greater than 1 .\n\nWhich of the following is/are counterexample(s) to this statement?\\\\\nI $N=5$\\\\\nII $\\quad N=7$\\\\\nIII $N=9$",
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
    "answer": 6,
    "topic": "number_theory"
  },
  {
    "id": "q5",
    "text": "Which one of the following shows the graph of\n$$\ny=\\frac{2^{x}}{1+2^{x}}\n$$\n\n(Dotted lines indicate asymptotes.)",
    "options": [
      "A",
      "D",
      "B",
      "C",
      "E",
      "F"
    ],
    "answer": 0,
    "topic": "transformations_graphs",
    "image_url": "/question-images/2020-2_q05_fig1.jpg"
  },
  {
    "id": "q6",
    "text": "The function $\\mathrm{f}(x)$ is defined for all real values of $x$.\\\\\nWhich of the following conditions on $\\mathrm{f}(x)$ is/are necessary to ensure that\n\n$$\n\\int_{-5}^{0} \\mathrm{f}(x) \\mathrm{d} x=\\int_{0}^{5} \\mathrm{f}(x) \\mathrm{d} x\n$$\n\nCondition I: $\\quad \\mathrm{f}(x)=\\mathrm{f}(-x)$ for $-5 \\leq x \\leq 5$\\\\\nCondition II: $\\mathrm{f}(x)=c$ for $-5 \\leq x \\leq 5$, where $c$ is a constant\\\\\nCondition III: $\\mathrm{f}(x)=-\\mathrm{f}(-x)$ for $-5 \\leq x \\leq 5$",
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
    "topic": "integration"
  },
  {
    "id": "q7",
    "text": "Consider the following conditions on a parallelogram $P Q R S$, labelled anticlockwise:\nI length of $P Q=$ length of $Q R$\\\\\nII The diagonal $P R$ intersects the diagonal $Q S$ at right angles\\\\\nIII $\\angle P Q R=\\angle Q R S$\\\\\nWhich of these conditions is/are individually sufficient for the parallelogram $P Q R S$ to be a square?",
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
    "answer": 7,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q8",
    "text": "A student is asked to prove whether the following statement (\\textit{) is true or false:\\\\\n(}) For all real numbers $a$ and $b,|a+b|<|a|+|b|$\n\nThe student's proof is as follows:\n\nStatement (*) is false. A counterexample is $a=3, b=4$, as $|3+4|=7$ and $|3|+|4|=7$, but $7<7$ is false.\n\nWhich of the following best describes the student's proof?",
    "options": [
      "The statement ( $*$ ) is true, and the student's proof is not correct.",
      "The statement (*) is false, but the student's proof is not correct: the counterexample is not valid.",
      "The statement (*) is false, but the student's proof is not correct: the student needs to give all the values of $a$ and $b$ where $|a+b|<|a|+|b|$ is false.",
      "The statement (*) is false, but the student's proof is not correct: the student should have instead stated that for all real numbers $a$ and $b,|a+b| \\leq|a|+|b|$.",
      "The statement (*) is false, and the student's proof is fully correct."
    ],
    "answer": 4,
    "topic": "logic_proof"
  },
  {
    "id": "q9",
    "text": "A student wishes to evaluate the function $\\mathrm{f}(x)=x \\sin x$, where $x$ is in radians, but has a calculator that only works in degrees.\nWhat could the student type into their calculator to correctly evaluate $\\mathrm{f}(4)$ ?",
    "options": [
      "$(\\pi \\times 4 \\div 180) \\times \\sin (4)$",
      "$(\\pi \\times 4 \\div 180) \\times \\sin (\\pi \\times 4 \\div 180)$",
      "$4 \\times \\sin (\\pi \\times 4 \\div 180)$",
      "$(180 \\times 4 \\div \\pi) \\times \\sin (4)$",
      "$\\quad(180 \\times 4 \\div \\pi) \\times \\sin (180 \\times 4 \\div \\pi)$",
      "$\\quad 4 \\times \\sin (180 \\times 4 \\div \\pi)$"
    ],
    "answer": 5,
    "topic": "trigonometry"
  },
  {
    "id": "q10",
    "text": "The real numbers $a, b, c$ and $d$ satisfy both\n$$\n0<a+b<c+d\n$$\n\nand\n\n$$\n0<a+c<b+d\n$$\n\nWhich of the following inequalities must be true?\n\nI $a<d$\\\\\nII $b<c$\\\\\nIII $a+b+c+d>0$",
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
    "topic": "inequalities"
  },
  {
    "id": "q11",
    "text": "A spiral line is drawn as shown.\\\\\n\nThis spiral pattern continues indefinitely.\\\\\nWhich one of the following points is not on the spiral line?",
    "options": [
      "$(99,100)$",
      "$(99,-100)$",
      "$(-99,100)$",
      "$(-99,-100)$",
      "$(100,99)$",
      "$(100,-99)$",
      "$(-100,99)$",
      "( $-100,-99$ )"
    ],
    "answer": 6,
    "topic": "coordinate_geometry",
    "image_url": "/question-images/2020-2_q11_fig1.jpg"
  },
  {
    "id": "q12",
    "text": "Which one of $\\mathbf{A}-\\mathbf{F}$ correctly completes the following statement?\\\\\nGiven that $a<b$, and $\\mathrm{f}(x)>0$ for all $x$ with $a<x<b$, the trapezium rule produces an overestimate for $\\int_{a}^{b} \\mathrm{f}(x) \\mathrm{d} x \\ldots$",
    "options": [
      "... if $\\mathrm{f}^{\\prime}(x)>0$ and $\\mathrm{f}^{\\prime \\prime}(x)<0$ for all $x$ with $a<x<b$",
      "... only if $\\mathrm{f}^{\\prime}(x)>0$ and $\\mathrm{f}^{\\prime \\prime}(x)<0$ for all $x$ with $a<x<b$",
      "... if and only if $\\mathrm{f}^{\\prime}(x)>0$ and $\\mathrm{f}^{\\prime \\prime}(x)<0$ for all $x$ with $a<x<b$",
      "... if $\\mathrm{f}^{\\prime}(x)<0$ and $\\mathrm{f}^{\\prime \\prime}(x)>0$ for all $x$ with $a<x<b$",
      "$\\ldots$ only if $\\mathrm{f}^{\\prime}(x)<0$ and $\\mathrm{f}^{\\prime \\prime}(x)>0$ for all $x$ with $a<x<b$",
      "... if and only if $\\mathrm{f}^{\\prime}(x)<0$ and $\\mathrm{f}^{\\prime \\prime}(x)>0$ for all $x$ with $a<x<b$"
    ],
    "answer": 3,
    "topic": "integration"
  },
  {
    "id": "q13",
    "text": "is a function for which\n$$\n\\int_{0}^{3}(\\mathrm{f}(x))^{2} \\mathrm{~d} x+\\int_{0}^{3} \\mathrm{f}(x) \\mathrm{d} x=\\int_{0}^{1} \\mathrm{f}(x) \\mathrm{d} x\n$$\n\nWhich of the following claims about $\\mathrm{f}(x)$ is/are necessarily true?\\\\\nI $\\mathrm{f}(x) \\leq 0$ for some $x$ with $1 \\leq x \\leq 3$\\\\\nII $\\int_{0}^{3} \\mathrm{f}(x) \\mathrm{d} x \\leq \\int_{0}^{1} \\mathrm{f}(x) \\mathrm{d} x$",
    "options": [
      "neither of them",
      "I only",
      "II only",
      "I and II"
    ],
    "answer": 3,
    "topic": "integration"
  },
  {
    "id": "q14",
    "text": "An arithmetic sequence $T$ has first term $a$ and common difference $d$, where $a$ and $d$ are non-zero integers.\nProperty P is:\n\nFor some positive integer $m$, the sum of the first $m$ terms of the sequence is equal to the sum of the first $2 m$ terms of the sequence.\n\nFor example, when $a=11$ and $d=-2$, the sequence $T$ has property P , because\n\n$$\n11+9+7+5=11+9+7+5+3+1+(-1)+(-3)\n$$\n\ni.e. the sum of the first 4 terms equals the sum of the first 8 terms.\\\\\nWhich of the following statements is/are true?\\\\\nI For $T$ to have property P , it is sufficient that $a d<0$.\\\\\nII For $T$ to have property P , it is necessary that $d$ is even.",
    "options": [
      "neither of them",
      "I only",
      "II only",
      "I and II"
    ],
    "answer": 0,
    "topic": "sequences_series"
  },
  {
    "id": "q15",
    "text": "Which one of the following is a necessary and sufficient condition for",
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
    "id": "q16",
    "text": "$$\n\\sum_{k=1}^{n} \\sin \\left(\\frac{k \\pi}{3}\\right)=\\frac{\\sqrt{3}}{2}\n$$\n\nto be true?",
    "options": [
      "$n=1$",
      "$n$ is a multiple of 3",
      "$n$ is a multiple of 6",
      "$n$ is 1 more than a multiple of 3",
      "$n$ is 1 more than a multiple of 6",
      "$n$ is 1 more than a multiple of 6 or $n$ is 2 more than a multiple of 6\n\nThe Fundamental Theorem of Calculus (FTC) tells us that for any polynomial f :\n\n$$\n\\frac{\\mathrm{d}}{\\mathrm{~d} x}\\left(\\int_{0}^{x} \\mathrm{f}(t) \\mathrm{d} t\\right)=\\mathrm{f}(x)\n$$\n\nA student calculates $\\frac{\\mathrm{d}}{\\mathrm{d} x}\\left(\\int_{x}^{2 x} t^{2} \\mathrm{~d} t\\right)$ as follows:\\\\\n(I) $\\quad \\int_{x}^{2 x} t^{2} \\mathrm{~d} t=\\int_{0}^{2 x} t^{2} \\mathrm{~d} t-\\int_{0}^{x} t^{2} \\mathrm{~d} t$\\\\\n(II) By FTC, $\\frac{\\mathrm{d}}{\\mathrm{d} x}\\left(\\int_{0}^{x} t^{2} \\mathrm{~d} t\\right)=x^{2}$\\\\\n(III) By FTC, $\\frac{\\mathrm{d}}{\\mathrm{d} x}\\left(\\int_{0}^{2 x} t^{2} \\mathrm{~d} t\\right)=(2 x)^{2}=4 x^{2}$\\\\\n(IV) So $\\frac{\\mathrm{d}}{\\mathrm{d} x}\\left(\\int_{x}^{2 x} t^{2} \\mathrm{~d} t\\right)=4 x^{2}-x^{2}$\\\\\n(V) giving $\\frac{\\mathrm{d}}{\\mathrm{d} x}\\left(\\int_{x}^{2 x} t^{2} \\mathrm{~d} t\\right)=3 x^{2}$\n\nWhich of the following best describes the student's calculation?\n\nA The calculation is completely correct.\\\\\nB The calculation is incorrect, and the first error occurs on line (I).\\\\\nC The calculation is incorrect, and the first error occurs on line (II).\\\\\nD The calculation is incorrect, and the first error occurs on line (III).\\\\\nE The calculation is incorrect, and the first error occurs on line (IV).\\\\\nF The calculation is incorrect, and the first error occurs on line (V)."
    ],
    "answer": 3,
    "topic": "integration"
  },
  {
    "id": "q17",
    "text": "A set of six distinct integers is split into two sets of three.\\\\\nThe first set of three integers has a mean of 10 and a median of 8 .\\\\\nThe second set of three integers has a mean of 12 and a median of 9 .\\\\\nWhat is the smallest possible range of the set of all six integers?",
    "options": [
      "8",
      "10",
      "11",
      "12",
      "14",
      "15"
    ],
    "answer": 4,
    "topic": "number_theory"
  },
  {
    "id": "q18",
    "text": "In this question, $\\mathrm{f}(x)=a x^{3}+b x^{2}+c x+d$ and $\\mathrm{g}(x)=p x^{3}+q x^{2}+r x+s$ are cubic polynomials.\nIf $f(x)-g(x)>0$ for every real $x$, which of the following is/are necessarily true?\n\nI $a>p$\\\\\nII if $b=q$ then $c=r$\\\\\nIII $d>s$",
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
    "answer": 6,
    "topic": "quadratics_polynomials"
  },
  {
    "id": "q19",
    "text": "Nine people are sitting in the squares of a 3 by 3 grid，one in each square，as shown． Two people are called neighbours if they are sitting in squares that share a side． （People in diagonally adjacent squares，which only have a point in common，are not called neighbours．）",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "answer": 4,
    "topic": "number_theory"
  },
  {
    "id": "q20",
    "text": "Each of the nine people in the grid is either a truth－teller who always tells the truth， or a liar who always lies．\nEvery person in the grid says：＇My neighbours are all liars＇．\\\\\nGiven only this information，what are the smallest number and the largest number of people who could be telling the truth？\n\n$x$ is a real number and f is a function.\\\\\nGiven that exactly one of the following statements is true, which one is it?",
    "options": [
      "$x \\geq 0$ only if $\\mathrm{f}(x)<0$",
      "$x<0$ if $\\mathrm{f}(x) \\geq 0$",
      "$\\quad x \\geq 0$ only if $\\mathrm{f}(x) \\geq 0$",
      "$\\mathrm{f}(x)<0$ if $x<0$",
      "$\\quad \\mathrm{f}(x) \\geq 0$ only if $x \\geq 0$",
      "$\\quad \\mathrm{f}(x) \\geq 0$ if and only if $x<0$\n\n alternatives and missing document structure.\n\n{admissionstesting@cambridgeassessment.org.uk} telling us your name, email address and requirements and we will respond within 15 working days.",
      "G",
      "H"
    ],
    "answer": 2,
    "topic": "logic_proof"
  }
]$json$
);
