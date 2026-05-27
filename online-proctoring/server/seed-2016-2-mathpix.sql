-- TMUA 2016 Paper 2 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2016 October Paper 2',
  2,
  2016,
  'October',
  75,
  20,
  ARRAY['coordinate_geometry', 'differentiation', 'functions', 'general', 'inequalities', 'integration', 'logic_proof', 'number_theory', 'transformations_graphs', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "Find the value of\n$$\n\\int_{1}^{2}\\left(x^{2}-\\frac{4}{x^{2}}\\right)^{2} d x\n$$",
    "options": [
      "$\\frac{43}{15}$",
      "3",
      "$\\frac{97}{15}$",
      "$\\frac{103}{15}$",
      "$\\frac{163}{15}$",
      "18"
    ],
    "answer": 0,
    "topic": "integration"
  },
  {
    "id": "q2",
    "text": "$$\nf(x)=\\frac{\\left(x^{2}+5\\right)(2 x)}{\\sqrt[4]{x^{3}}}, \\quad x>0\n$$\n\nWhich one of the following is equal to $f^{\\prime}(x)$ ?",
    "options": [
      "$8 x^{\\frac{9}{4}}+\\frac{40}{3} x^{\\frac{1}{4}}$",
      "$\\frac{9}{2} x^{\\frac{5}{4}}+\\frac{5}{2} x^{-\\frac{3}{4}}$",
      "$8 x^{\\frac{9}{4}}+\\frac{40}{3} x^{-\\frac{1}{4}}$",
      "$\\frac{8}{13} x^{\\frac{13}{4}}+8 x^{\\frac{5}{4}}$"
    ],
    "answer": 1,
    "topic": "trigonometry"
  },
  {
    "id": "q3",
    "text": "What is the value, in radians, of the largest angle $x$ in the range $0 \\leq x \\leq 2 \\pi$ that satisfies the equation $8 \\sin ^{2} x+4 \\cos ^{2} x=7$ ?",
    "options": [
      "$\\frac{2 \\pi}{3}$",
      "$\\frac{5 \\pi}{6}$",
      "$\\frac{4 \\pi}{3}$",
      "$\\frac{5 \\pi}{3}$",
      "$\\frac{7 \\pi}{4}$",
      "$\\frac{11 \\pi}{6}$"
    ],
    "answer": 3,
    "topic": "number_theory"
  },
  {
    "id": "q4",
    "text": "Five sealed urns, labelled P, Q, R, S, and T, each contain the same (non-zero) number of balls. The following statements are attached to the urns.\nUrn P This urn contains one or four balls.\\\\\nUrn Q This urn contains two or four balls.\\\\\nUrn R This urn contains more than two balls and fewer than five balls.\\\\\nUrn S This urn contains one or two balls.\\\\\nUrn T This urn contains fewer than three balls.\\\\\nExactly one of the urns has a true statement attached to it.\\\\\nWhich urn is it?",
    "options": [
      "Urn P",
      "Urn Q",
      "Urn R",
      "Urn S",
      "Urn T"
    ],
    "answer": 2,
    "topic": "differentiation"
  },
  {
    "id": "q5",
    "text": "Consider the statement:\\\\\n(\\textit{) A whole number $n$ is prime if it is 1 less or 5 less than a multiple of 6 .\\\\\nHow many counterexamples to (}) are there in the range $0<n<50$ ?",
    "options": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "answer": 2,
    "topic": "logic_proof"
  },
  {
    "id": "q6",
    "text": "The sequence of functions $f_{1}(x), f_{2}(x), f_{3}(x), \\ldots$ is defined as follows:\n$$\n\\begin{aligned}\nf_{1}(x) & =x^{10} \\\\\nf_{n+1}(x) & =x f_{n}^{\\prime}(x) \\text { for } n \\geq 1\n\\end{aligned}\n$$\n\nwhere $f_{n}^{\\prime}(x)=\\frac{d f_{n}(x)}{d x}$\\\\\nFind the value of\n\n$$\n\\sum_{n=1}^{20} f_{n}(x)\n$$",
    "options": [
      "$\\frac{x^{10}\\left(x^{20}-1\\right)}{x-1}$",
      "$\\frac{x^{10}\\left(x^{21}-1\\right)}{x-1}$",
      "$\\left(\\frac{10^{20}-1}{9}\\right) x^{10}$",
      "$\\left(\\frac{10^{21}-1}{9}\\right) x^{10}$",
      "$\\quad\\left(\\frac{(10 x)^{20}-1}{10 x-1}\\right) x^{10}$",
      "$\\quad\\left(\\frac{(10 x)^{21}-1}{10 x-1}\\right) x^{10}$",
      "$\\quad x^{10}+x^{9}+x^{8}+\\cdots+x+1$",
      "$x^{10}+10 x^{9}+(10 \\times 9) x^{8}+\\cdots+(10 \\times 9 \\times \\ldots \\times 2) x+(10 \\times 9 \\times \\ldots \\times 2 \\times 1)$"
    ],
    "answer": 2,
    "topic": "logic_proof"
  },
  {
    "id": "q7",
    "text": "The four real numbers $a, b, c$, and $d$ are all greater than 1 .\\\\\nSuppose that they satisfy the equation $\\log _{c} d=\\left(\\log _{a} b\\right)^{2}$.\\\\\nUse some of the lines given to construct a proof that, in this case, it follows that\n\n$$\n(*) \\log _{b} d=\\left(\\log _{a} b\\right)\\left(\\log _{a} c\\right)\n$$\n\n(1) Let $x=\\log _{a} b$ and $y=\\log _{a} c$\\\\\n(2) $d=\\left(c^{x}\\right)^{2}$\\\\\n(3) $d=c^{\\left(x^{2}\\right)}$\\\\\n(4) $d=b^{x y}$\\\\\n(5) $d=\\left(a^{y}\\right)^{\\left(x^{2}\\right)}$\\\\\n(6) $d=\\left(\\left(a^{y}\\right)^{x}\\right)^{2}$\\\\\n(7) $d=\\left(a^{x}\\right)^{x y}$\\\\\n(8) $d=a^{\\left(y^{2 x}\\right)}$\\\\\n(9) $d=a^{\\left(x^{2} y\\right)}$",
    "options": [
      "(1). Then (2), so (6), so (8), so (7), and therefore (4), hence (\\textit{) as required.",
      "(1). Then (2), so (7), so (8), so (6), and therefore (4), hence (}) as required.",
      "(1). Then (3), so (5), so (9), so (7), and therefore (4), hence (\\textit{) as required.",
      "(1). Then (3), so (7), so (9), so (5), and therefore (4), hence (}) as required.",
      "(1). Then (4), so (5), so (9), so (7), and therefore (3), hence (\\textit{) as required.",
      "(1). Then (4), so (6), so (8), so (7), and therefore (2), hence (}) as required.",
      "(1). Then (4), so (7), so (8), so (6), and therefore (2), hence (\\textit{) as required.",
      "(1). Then (4), so (7), so (9), so (5), and therefore (3), hence (}) as required."
    ],
    "answer": 2,
    "topic": "logic_proof"
  },
  {
    "id": "q8",
    "text": "A region is defined by the inequalities $x+y>6$ and $x-y>-4$\\\\\nConsider the three statements:\\\\\n$1 x>1$\\\\\n$2 y>5$\\\\\n$3(x+y)(x-y)>-24$\n\nWhich of the above statements is/are true for every point in the region?",
    "options": [
      "none",
      "1 only",
      "2 only",
      "3 only",
      "1 and 2 only",
      "1 and 3 only",
      "2 and 3 only",
      "1, 2 and 3"
    ],
    "answer": 1,
    "topic": "inequalities"
  },
  {
    "id": "q9",
    "text": "Triangles $A B C$ and $X Y Z$ have the same area.\\\\\nWhich of these extra conditions, taken independently, would imply that they are congruent?\\\\\n(1) $A B=X Y$ and $B C=Y Z$\\\\\n(2) $A B=X Y$ and $\\angle A B C=\\angle X Y Z$\\\\\n(3) $\\angle A B C=\\angle X Y Z$ and $\\angle B C A=\\angle Y Z X$",
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
    "answer": 3,
    "topic": "logic_proof"
  },
  {
    "id": "q10",
    "text": "In this question $x$ and $y$ are non-zero real numbers.\\\\\nWhich one of the following is sufficient to conclude that $x<y$ ?",
    "options": [
      "$x^{4}<y^{4}$",
      "$y^{4}<x^{4}$",
      "$x^{-1}<y^{-1}$",
      "$y^{-1}<x^{-1}$",
      "$x^{\\frac{3}{5}}<y^{\\frac{3}{5}}$",
      "$y^{\\frac{3}{5}}<x^{\\frac{3}{5}}$"
    ],
    "answer": 4,
    "topic": "logic_proof"
  },
  {
    "id": "q11",
    "text": "is a polynomial with real coefficients.\\\\\nThe equation $f(x)=0$ has exactly two real roots, $x=-p$ and $x=p$, where $p>0$.\\\\\nConsider the following three statements:\\\\\n$1 \\quad f^{\\prime}(x)=0$ for exactly one value of $x$ between $-p$ and $p$\\\\\n2 The area between the curve $y=f(x)$, the $x$-axis and the lines $x=-p$ and $x=p$ is given by $2 \\int_{0}^{p} f(x) \\mathrm{d} x$\\\\\n3 The graph of $y=-f(-x)$ intersects the $x$-axis at the points $x=-p$ and $x=p$ only\n\nWhich of the above statements must be true?",
    "options": [
      "none",
      "1 only",
      "2 only",
      "3 only",
      "1 and 2 only",
      "1 and 3 only",
      "2 and 3 only",
      "1, 2 and 3"
    ],
    "answer": 3,
    "topic": "number_theory"
  },
  {
    "id": "q12",
    "text": "The first term of an arithmetic sequence is $a$ and the common difference is $d$.\\\\\nThe sum of the first $n$ terms is denoted by $S_{n}$.\\\\\nIf $S_{8}>3 S_{6}$, what can be deduced about the sign of $a$ and the sign of $d$ ?",
    "options": [
      "both $a$ and $d$ are negative",
      "$a$ is positive, $d$ is negative",
      "$\\quad a$ is negative, $d$ is positive",
      "$a$ is negative, but the sign of $d$ cannot be deduced",
      "$d$ is negative, but the sign of $a$ cannot be deduced",
      "neither the sign of $a$ nor the sign of $d$ can be deduced"
    ],
    "answer": 5,
    "topic": "logic_proof"
  },
  {
    "id": "q13",
    "text": "In this question, $a, b$, and $c$ are positive integers.\\\\\nThe following is an attempted proof of the false statement:\\\\\nIf $a$ divides $b c$, then $a$ divides $b$ or $a$ divides $c$.\n[' $a$ divides $b c$ ' means ' $a$ is a factor of $b c$ ']\\\\\nWhich line contains the error in this proof?\n\n\\begin{enumerate}\n  \\item The statement is equivalent to if $a$ does not divide $b$ and $a$ does not divide $c$ then $a$ does not divide $b c^{\\prime}$.\n  \\item Suppose $a$ does not divide $b$ and $a$ does not divide $c$. Then the remainder when dividing $b$ by $a$ is $r$, where $0<r<a$, and the remainder when dividing $c$ by $a$ is $s$, where $0<s<a$.\n  \\item So $b=a x+r$ and $c=a y+s$ for some integers $x$ and $y$.\n  \\item Thus $b c=a(a x y+x s+y r)+r s$.\n  \\item So the remainder when dividing $b c$ by $a$ is $r s$.\n  \\item Since $r>0$ and $s>0$, it follows that $r s>0$.\n  \\item Hence $a$ does not divide $b c$.\n\\end{enumerate}",
    "options": [
      "Line 1",
      "Line 2",
      "Line 3",
      "Line 4",
      "Line 5",
      "Line 6"
    ],
    "answer": 4,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q14",
    "text": ", where $a, b, c, d$, and $e$ are real numbers.\\\\\nSuppose $f(x)=1$ has $p$ distinct real solutions, $f(x)=2$ has $q$ distinct real solutions, $f(x)=3$ has $r$ distinct real solutions, and $f(x)=4$ has $s$ distinct real solutions.\n\nWhich one of the following is not possible?",
    "options": [
      "$\\quad p=1, q=2, r=4$ and $s=3$",
      "$\\quad p=1, q=3, r=2$ and $s=4$",
      "$\\quad p=1, q=4, r=3$ and $s=2$",
      "$p=2, q=4, r=3$ and $s=1$",
      "$\\quad p=4, q=3, r=2$ and $s=1$"
    ],
    "answer": 1,
    "topic": "trigonometry"
  },
  {
    "id": "q15",
    "text": "Consider the quadratic $f(x)=x^{2}-2 p x+q$ and the statement:\\\\\n$\\left(^{*}\\right) f(x)=0$ has two real roots whose difference is greater than 2 and less than 4.\\\\\nWhich one of the following statements is true if and only if (*) is true?",
    "options": [
      "$q<p^{2}<q+4$",
      "$\\sqrt{q+1}<p<\\sqrt{q+4}$",
      "$\\quad q-3 \\leq p^{2}-4 \\leq q$",
      "$\\quad q<p^{2}-1<q+3$",
      "$\\quad q-2<p^{2}-3<q+2$"
    ],
    "answer": 3,
    "topic": "integration"
  },
  {
    "id": "q16",
    "text": "In the figure, $P Q R S$ is a trapezium with $P Q$ parallel to $S R$.\\\\\nThe diagonals of the trapezium meet at $X$.\\\\\n$U$ lies on $S P$ and $T$ lies on $R Q$ such that $U T$ is a line segment through $X$ parallel to $P Q$.\n\nThe length of $P Q$ is 12 cm and the length of $S R$ is 3 cm .\\\\\nWhat, in centimetres, is the length of UT?",
    "options": [
      "4.2",
      "4.5",
      "4.8",
      "5.25",
      "6"
    ],
    "answer": 2,
    "topic": "transformations_graphs",
    "image_url": "/question-images/2016-2_q16_fig1.jpg"
  },
  {
    "id": "q17",
    "text": "Consider these simultaneous equations, where $c$ is a constant:\n$$\n\\begin{aligned}\n& y=3 \\sin x+2 \\\\\n& y=x+c\n\\end{aligned}\n$$\n\nWhich of the following statements is/are true?\n\n1 For some value of $c$ : there is exactly one solution with $0 \\leq x \\leq \\pi$ and there is at least one solution with $-\\pi<x<0$.\n\n2 For some value of $c$ : there is exactly one solution with $0 \\leq x \\leq \\pi$ and there are no solutions with $-\\pi<x<0$.\\\\\n3 For some value of $c$ : there is exactly one solution with $0 \\leq x \\leq \\pi$ and there are no solutions with $x>\\pi$.",
    "options": [
      "none",
      "1 only",
      "2 only",
      "3 only",
      "1 and 2 only",
      "1 and 3 only",
      "2 and 3 only",
      "1, 2 and 3"
    ],
    "answer": 7,
    "topic": "trigonometry"
  },
  {
    "id": "q18",
    "text": "Consider this statement about a function $f(x)$ :\\\\\n$\\left(^{*}\\right)$ If $(f(x))^{2} \\leq 1$ for all $-1 \\leq x \\leq 1$ then $\\int_{-1}^{1}(f(x))^{2} \\mathrm{~d} x \\leq \\int_{-1}^{1} f(x) \\mathrm{d} x$ Which one of the following functions provides a counterexample to (*)?",
    "options": [
      "$f(x)=x+\\frac{1}{2}$",
      "$f(x)=x-\\frac{1}{2}$",
      "$f(x)=x+x^{3}$",
      "$f(x)=x-x^{3}$",
      "$f(x)=x^{2}+x^{4}$",
      "$f(x)=x^{2}-x^{4}$"
    ],
    "answer": 3,
    "topic": "functions"
  },
  {
    "id": "q19",
    "text": "Some identical unit cubes are used to construct a three-dimensional object by gluing them together face to face.\nSketches of this object are made by looking at it from the right-hand side, from the front and from above. These sketches are called the side elevation, the front elevation, and the plan view respectively.\\\\\n\nThis is the side elevation of the object.\\\\\n\nThis is the front elevation of the object.\\\\\n\nThis is the plan view of the object.\n\nHow many cubes were used to construct the object?",
    "options": [
      "exactly 6",
      "either 6 or 7",
      "exactly 7",
      "either 7 or 8",
      "exactly 8",
      "either 8 or 9",
      "exactly 9"
    ],
    "answer": 5,
    "topic": "coordinate_geometry",
    "image_url": "/question-images/2016-2_q19_fig1.jpg"
  },
  {
    "id": "q20",
    "text": "Each interior angle of a regular polygon with $n$ sides is $\\frac{3}{4}$ of each interior angle of a second regular polygon with $m$ sides.\nHow many pairs of positive integers $n$ and $m$ are there for which this statement is true?",
    "options": [
      "none",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "infinitely many"
    ],
    "answer": 4,
    "topic": "general",
    "image_url": "/question-images/2016-2_q20_fig1.jpg"
  }
]$json$
);
