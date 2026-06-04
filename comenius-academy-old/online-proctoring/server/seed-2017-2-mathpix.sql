-- TMUA 2017 Paper 2 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2017 November Paper 2',
  2,
  2017,
  'November',
  75,
  20,
  ARRAY['coordinate_geometry', 'exponentials_logs', 'functions', 'integration', 'logic_proof', 'number_theory', 'quadratics_polynomials', 'sequences_series', 'transformations_graphs', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "Given that $y=\\frac{(1-3 x)^{2}}{2 x^{\\frac{3}{2}}}$, which one of the following is a correct expression for $\\frac{d y}{d x}$ ?\\\\",
    "options": [
      "$\\frac{9}{4} x^{-\\frac{1}{2}}+\\frac{3}{2} x^{-\\frac{3}{2}}-\\frac{3}{4} x^{-\\frac{5}{2}}$",
      "$\\frac{9}{4} x^{-\\frac{1}{2}}-\\frac{3}{2} x^{-\\frac{3}{2}}+\\frac{3}{4} x^{-\\frac{5}{2}}$",
      "$\\frac{9}{4} x^{-\\frac{1}{2}}-\\frac{3}{2} x^{-\\frac{3}{2}}-\\frac{3}{4} x^{-\\frac{5}{2}}$",
      "$-\\frac{9}{4} x^{-\\frac{1}{2}}+\\frac{3}{2} x^{-\\frac{3}{2}}+\\frac{3}{4} x^{-\\frac{5}{2}}$",
      "$\\quad-\\frac{9}{4} x^{-\\frac{1}{2}}+\\frac{3}{2} x^{-\\frac{3}{2}}-\\frac{3}{4} x^{-\\frac{5}{2}}$",
      "$-\\frac{9}{4} x^{-\\frac{1}{2}}-\\frac{3}{2} x^{-\\frac{3}{2}}-\\frac{3}{4} x^{-\\frac{5}{2}}$"
    ],
    "answer": 0,
    "topic": "integration"
  },
  {
    "id": "q2",
    "text": "is a rectangle.\\\\\nThe coordinates of $P$ and $Q$ are $(0,6)$ and $(1,8)$ respectively.\\\\\nThe perpendicular to $P Q$ at $Q$ meets the $x$-axis at $R$.\\\\\nWhat is the area of $P Q R S$ ?",
    "options": [
      "$\\frac{5}{2}$",
      "$4 \\sqrt{10}$",
      "20",
      "$8 \\sqrt{10}$",
      "40"
    ],
    "answer": 4,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q3",
    "text": "The first term of a geometric progression is $2 \\sqrt{3}$ and the fourth term is $\\frac{9}{4}$ What is the sum to infinity of this geometric progression?",
    "options": [
      "$-2(2-\\sqrt{3})$",
      "$4(2 \\sqrt{3}-3)$",
      "$\\frac{16(8 \\sqrt{3}+9)}{37}$",
      "$\\frac{4(2 \\sqrt{3}-3)}{7}$",
      "$\\frac{4(2 \\sqrt{3}+3)}{7}$",
      "$\\quad 2(2+\\sqrt{3})$",
      "$4(2 \\sqrt{3}+3)$"
    ],
    "answer": 6,
    "topic": "sequences_series"
  },
  {
    "id": "q4",
    "text": "The following question appeared in an examination:\\\\\nGiven that $\\tan x=\\sqrt{3}$, find the possible values of $\\sin 2 x$.",
    "options": [
      "student gave the following answer:\n\n$$\n\\begin{aligned}\n& \\tan x=\\sqrt{3} \\text { so } x=60^{\\circ} \\text { and } 2 x=120^{\\circ} \\\\\n& \\text { therefore } \\sin 2 x=\\frac{\\sqrt{3}}{2}\n\\end{aligned}\n$$\n\nWhich one of the following statements is correct?\\\\\nA $\\frac{\\sqrt{3}}{2}$ is the only possible value, and this is fully supported by the reasoning given in the student's answer.",
      "$\\frac{\\sqrt{3}}{2}$ is the only possible value, but the reasoning given should consider other possible values of $x$ for which $\\tan x=\\sqrt{3}$.",
      "$\\frac{\\sqrt{3}}{2}$ is the only possible value, but the reasoning given should consider other possible values of $x$ for which $\\sin 2 x=\\frac{\\sqrt{3}}{2}$.",
      "$\\frac{\\sqrt{3}}{2}$ is not the only possible value because the reasoning given should have considered other possible values of $x$ for which $\\tan x=\\sqrt{3}$.",
      "$\\frac{\\sqrt{3}}{2}$ is not the only possible value because the reasoning given should have considered other possible values of $x$ for which $\\sin 2 x=\\frac{\\sqrt{3}}{2}$."
    ],
    "answer": 1,
    "topic": "trigonometry"
  },
  {
    "id": "q5",
    "text": "Consider the following three statements:\\\\\n$1 \\quad 10 p^{2}+1$ and $10 p^{2}-1$ are both prime when $p$ is an odd prime.\\\\\n2 Every prime greater than 5 is of the form $6 n+1$ for some integer $n$.\\\\\n3 No multiple of 7 greater than 7 is prime.\\\\\nThe result $91=7 \\times 13$ can be used to provide a counterexample to which of the above statements?",
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
    "answer": 1,
    "topic": "number_theory"
  },
  {
    "id": "q6",
    "text": "A sequence $u_{0}, u_{1}, u_{2}, \\ldots$ is defined as follows:\n$$\n\\begin{aligned}\n& u_{0}=1 \\\\\n& u_{n}=\\int_{0}^{1} 4 x u_{n-1} d x \\quad \\text { for } n \\geqslant 1\n\\end{aligned}\n$$\n\nWhat is the value of $u_{1000}$ ?",
    "options": [
      "$2^{1000}$",
      "$4^{1000}$",
      "$\\frac{4}{1000!}$",
      "$\\frac{4}{1001!}$",
      "$\\frac{2^{1000}}{1000!}$",
      "$\\frac{4^{1000}}{1000!}$",
      "$\\frac{2^{1000}}{1001!}$",
      "$\\frac{4^{1000}}{1001!}$"
    ],
    "answer": 0,
    "topic": "integration"
  },
  {
    "id": "q7",
    "text": "The graphs of two functions are shown here:\n\\begin{itemize}\n  \\item $y=a^{x}$ is shown with a solid line, where $a$ is a positive real number\n  \\item $y=f(x)$ is shown with a dashed line\\\\\n\n\\end{itemize}\n\nWhich of the following statements $(\\mathbf{1}, \\mathbf{2}, \\mathbf{3}, \\mathbf{4})$ could be true?\\\\\n$1 f(x)=b^{x}$ for some $b>a$\\\\\n$2 f(x)=b^{x}$ for some $b<a$\\\\\n$3 f(x)=a^{k x}$ for some $k>1$\\\\\n$4 f(x)=a^{k x}$ for some $k<1$",
    "options": [
      "$\\mathbf{1}$ only",
      "2 only",
      "3 only",
      "4 only",
      "1 and 3 only",
      "1 and 4 only",
      "2 and 3 only",
      "2 and 4 only"
    ],
    "answer": 4,
    "topic": "transformations_graphs",
    "image_url": "/question-images/2017-2_q07_fig1.jpg"
  },
  {
    "id": "q8",
    "text": "Which one of the following numbers is smallest in value?",
    "options": [
      "$\\quad \\log _{2} 7$",
      "$\\left(2^{-3}+2^{-2}\\right)^{-1}$",
      "$2^{(\\pi / 3)}$",
      "$\\frac{1}{4(\\sqrt{2}-1)^{3}}$",
      "$\\quad 4 \\sin ^{2}\\left(\\frac{\\pi}{4}\\right)$"
    ],
    "answer": 4,
    "topic": "trigonometry"
  },
  {
    "id": "q9",
    "text": "Consider the following attempt to prove this true theorem:\nTheorem: $a^{3}+b^{3}=c^{3}$ has no solutions with $a, b$ and $c$ positive integers.\\\\\nAttempted proof:\\\\\nSuppose that there are positive integers $a, b$ and $c$ such that $a^{3}+b^{3}=c^{3}$.\\\\\nI We have $a^{3}=c^{3}-b^{3}$.\\\\\nII $\\quad$ Hence $a^{3}=(c-b)\\left(c^{2}+c b+b^{2}\\right)$.\\\\\nIII It follows that $a=c-b$ and $a^{2}=c^{2}+c b+b^{2}$, since $a \\leqslant a^{2}$ and $c-b \\leqslant c^{2}+c b+b^{2}$.\n\nIV Eliminating $a$, we have $(c-b)^{2}=c^{2}+c b+b^{2}$.\\\\\nV Multiplying out, we have $c^{2}-2 c b+b^{2}=c^{2}+c b+b^{2}$.\\\\\nVI Hence $3 c b=0$ so one of $b$ and $c$ is zero.\\\\\nBut this is a contradiction to the original assumption that all of $a, b$ and $c$ are positive. It follows that the equation has no solutions.\n\nComment on this proof by choosing one of the following options:",
    "options": [
      "The proof is correct",
      "The proof is incorrect and the first mistake occurs on line I.",
      "The proof is incorrect and the first mistake occurs on line II.",
      "The proof is incorrect and the first mistake occurs on line III.",
      "The proof is incorrect and the first mistake occurs on line IV.",
      "The proof is incorrect and the first mistake occurs on line V.",
      "The proof is incorrect and the first mistake occurs on line VI."
    ],
    "answer": 3,
    "topic": "logic_proof"
  },
  {
    "id": "q10",
    "text": "is a function defined for all real values of $x$.\\\\\nWhich one of the following is a sufficient condition for $\\int_{1}^{3} f(x) d x=0$ ?",
    "options": [
      "$f(2)=0$",
      "$f(1)=f(3)=0$",
      "$f(-x)=-f(x)$ for all $x$",
      "$f(x+2)=-f(2-x)$ for all $x$",
      "$\\quad f(x-2)=-f(2-x)$ for all $x$"
    ],
    "answer": 3,
    "topic": "functions"
  },
  {
    "id": "q11",
    "text": "The function $f(x)$ is increasing and $f(0)=0$.\\\\\nThe positive constants $a$ and $b$ are such that $a<b$.\\\\\nThe area of the region enclosed by the curve $y=f(x)$, the $x$-axis and the lines $x=a$ and $x=b$ is denoted by $R$.\n\nThe function $g(x)$ is defined by $g(x)=f(x)+2 f(b)$.\\\\\nWhich of the following is an expression for the area enclosed by the curve $y=g(x)$, the $x$-axis and the lines $x=a$ and $x=b$ ?",
    "options": [
      "$\\quad R+(b-a) f(b)$",
      "$R+2(b-a) f(b)$",
      "$\\quad R+2 f(b)-f(a)$",
      "$R+2 f(b)$",
      "$\\quad R+(f(b))^{2}$",
      "$\\quad R+(f(b))^{2}-(f(a))^{2}$",
      "$\\quad R+2(f(b)-f(a)) f(b)$"
    ],
    "answer": 1,
    "topic": "integration"
  },
  {
    "id": "q12",
    "text": "The diagram shows the graphs of $y=\\sin 2 x$ and $y=\\cos 2 x$ for $-\\frac{\\pi}{2}<x<\\frac{\\pi}{2}$\\\\\n\nWhich one of the following is not true?",
    "options": [
      "$\\cos 2 x<\\sin 2 x<\\tan x$ for some real number $x$ with $-\\frac{\\pi}{2}<x<\\frac{\\pi}{2}$",
      "$\\cos 2 x<\\tan x<\\sin 2 x$ for some real number $x$ with $-\\frac{\\pi}{2}<x<\\frac{\\pi}{2}$",
      "$\\sin 2 x<\\cos 2 x<\\tan x$ for some real number $x$ with $-\\frac{\\pi}{2}<x<\\frac{\\pi}{2}$",
      "$\\sin 2 x<\\tan x<\\cos 2 x$ for some real number $x$ with $-\\frac{\\pi}{2}<x<\\frac{\\pi}{2}$",
      "$\\tan x<\\sin 2 x<\\cos 2 x$ for some real number $x$ with $-\\frac{\\pi}{2}<x<\\frac{\\pi}{2}$",
      "$\\tan x<\\cos 2 x<\\sin 2 x$ for some real number $x$ with $-\\frac{\\pi}{2}<x<\\frac{\\pi}{2}$"
    ],
    "answer": 2,
    "topic": "trigonometry",
    "image_url": "/question-images/2017-2_q12_fig1.jpg"
  },
  {
    "id": "q13",
    "text": "The positive real numbers $a \\times 10^{-3}, b \\times 10^{-2}$ and $c \\times 10^{-1}$ are each in standard form, and\n$$\n\\left(a \\times 10^{-3}\\right)+\\left(b \\times 10^{-2}\\right)=\\left(c \\times 10^{-1}\\right)\n$$\n\nWhich of the following statements (I, II, III, IV) must be true?\n\n$$\n\\begin{array}{ll}\n\\text { I } & a>9 \\\\\n\\text { II } & b>9 \\\\\n\\text { III } & a<c \\\\\n\\text { IV } & b<c\n\\end{array}\n$$",
    "options": [
      "I only",
      "II only",
      "I and II only",
      "I and III only",
      "I and IV only",
      "II and III only",
      "II and IV only",
      "I, II, III and IV"
    ],
    "answer": 1,
    "topic": "logic_proof"
  },
  {
    "id": "q14",
    "text": "The diagram below shows the graph of $y=x^{2}-2 b x+c$. The vertex of this graph is at the point $P$.\\\\\n\nWhich one of the following could be the graph of $y=x^{2}-2 B x+c$, where $B>b$ ?",
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
    "answer": 5,
    "topic": "transformations_graphs",
    "image_url": "/question-images/2017-2_q14_fig1.jpg"
  },
  {
    "id": "q15",
    "text": "The function $f$ is defined on the positive integers as follows:\n$$\n\\begin{array}{lll}\nf(1)=5, \\text { and for } n \\geqslant 1: & f(n+1)=3 f(n)+1 & \\text { if } f(n) \\text { is odd } \\\\\n& f(n+1)=\\frac{1}{2} f(n) & \\text { if } f(n) \\text { is even }\n\\end{array}\n$$\n\nThe function $g$ is defined on the positive integers as follows:\n\n$$\n\\begin{array}{ll}\ng(1)=3, \\text { and for } n \\geqslant 1: \\quad & g(n+1)=g(n)+5 \\\\\n& \\text { if } g(n) \\text { is odd } \\\\\ng(n+1)=\\frac{1}{2} g(n) & \\text { if } g(n) \\text { is even }\n\\end{array}\n$$\n\nWhat is the value of $f(1000)-g(1000)$ ?",
    "options": [
      "-6",
      "-5",
      "1",
      "2",
      "4",
      "8"
    ],
    "answer": 3,
    "topic": "number_theory"
  },
  {
    "id": "q16",
    "text": "Consider the following statement:\\\\\n(*) If $f(x)$ is an integer for every integer $x$, then $f^{\\prime}(x)$ is an integer for every integer $x$.\n\nWhich one of the following is a counterexample to (*)?\\\\",
    "options": [
      "$f(x)=\\frac{x^{3}+x+1}{4}$",
      "$f(x)=\\frac{x^{4}+x^{2}+x}{2}$",
      "$f(x)=\\frac{x^{4}+x^{3}+x^{2}+x}{2}$",
      "$f(x)=\\frac{x^{4}+2 x^{3}+x^{2}}{4}$"
    ],
    "answer": 2,
    "topic": "number_theory"
  },
  {
    "id": "q17",
    "text": "A set $S$ of whole numbers is called stapled if and only if for every whole number $a$ which is in $S$ there exists a prime factor of $a$ which divides at least one other number in $S$.\nLet $T$ be a set of whole numbers. Which of the following is true if and only if $T$ is not stapled?",
    "options": [
      "For every number $a$ which is in $T$, there is no prime factor of $a$ which divides every other number in $T$.",
      "For every number $a$ which is in $T$, there is no prime factor of $a$ which divides at least one other number in $T$.",
      "For every number $a$ which is in $T$, there is a prime factor of $a$ which does not divide any other number in $T$.",
      "For every number $a$ which is in $T$, there is a prime factor of $a$ which does not divide at least one other number in $T$.",
      "There exists a number $a$ which is in $T$ such that there is no prime factor of $a$ which divides every other number in $T$.",
      "There exists a number $a$ which is in $T$ such that there is no prime factor of $a$ which divides at least one other number in $T$.",
      "There exists a number $a$ which is in $T$ such that there is a prime factor of $a$ which does not divide any other number in $T$.",
      "There exists a number $a$ which is in $T$ such that there is a prime factor of $a$ which does not divide at least one other number in $T$."
    ],
    "answer": 5,
    "topic": "number_theory"
  },
  {
    "id": "q18",
    "text": "Consider the following problem:\\\\\nSolve the inequality $\\left(\\frac{1}{4}\\right)^{n}<\\left(\\frac{1}{32}\\right)^{10}$, where $n$ is a positive integer.\\\\\nA student produces the following argument:\n\n\\[\n\\begin{array}{rlrl}\n\\left(\\frac{1}{4}\\right)^{n} & <\\left(\\frac{1}{32}\\right)^{10} & & \\downarrow \\text { (I) }  \\tag{I}\\\\\n\\log _{\\frac{1}{2}}\\left(\\frac{1}{4}\\right)^{n} & <\\log _{\\frac{1}{2}}\\left(\\frac{1}{32}\\right)^{10} & & \\downarrow \\text { (II) } \\\\\nn \\log _{\\frac{1}{2}}\\left(\\frac{1}{4}\\right) & <10 \\log _{\\frac{1}{2}}\\left(\\frac{1}{32}\\right) & & \\downarrow \\text { (III) } \\\\\nn & <\\frac{10 \\log _{\\frac{1}{2}}\\left(\\frac{1}{32}\\right)}{\\log _{\\frac{1}{2}}\\left(\\frac{1}{4}\\right)} & & \\downarrow \\text { (IV) } \\\\\nn<\\frac{10 \\times 5}{2}=25 & & \\downarrow \\text { (V) } \\\\\n1 \\leqslant n \\leqslant 24 & &\n\\end{array}\n\\]\n\nWhich step (if any) in the argument is invalid?",
    "options": [
      "There are no invalid steps; the argument is correct",
      "Only step (I) is invalid; the rest are correct",
      "Only step (II) is invalid; the rest are correct",
      "Only step (III) is invalid; the rest are correct",
      "Only step (IV) is invalid; the rest are correct",
      "Only step (V) is invalid; the rest are correct"
    ],
    "answer": 1,
    "topic": "exponentials_logs"
  },
  {
    "id": "q19",
    "text": "Which one of the following is a sufficient condition for the equation $x^{3}-3 x^{2}+a=0$, where $a$ is a constant, to have exactly one real root?",
    "options": [
      "$a>0$",
      "$a \\leqslant 0$",
      "$\\quad a \\geqslant 4$",
      "$a<4$",
      "$\\quad|a|>4$",
      "$\\quad|a| \\leqslant 4$",
      "$\\quad a=\\frac{9}{4}$",
      "$\\quad|a|=\\frac{3}{2}$"
    ],
    "answer": 4,
    "topic": "quadratics_polynomials"
  },
  {
    "id": "q20",
    "text": "I have forgotten my 5-character computer password, but I know that it consists of the letters $\\mathrm{a}, \\mathrm{b}, \\mathrm{c}, \\mathrm{d}, \\mathrm{e}$ in some order. When I enter a potential password into the computer, it tells me exactly how many of the letters are in the correct position.\nWhen I enter abcde, it tells me that none of the letters are in the correct position. The same happens when I enter cdbea and eadbc.\n\nUsing the best strategy, how many further attempts must I make in order to guarantee that I can deduce the correct password?",
    "options": [
      "None: I can deduce it immediately",
      "One",
      "Two",
      "Three",
      "More than three"
    ],
    "answer": 1,
    "topic": "logic_proof"
  }
]$json$
);
