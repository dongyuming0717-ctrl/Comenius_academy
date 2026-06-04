-- TMUA 2022 Paper 1 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2022 October Paper 1',
  1,
  2022,
  'October',
  75,
  20,
  ARRAY['coordinate_geometry', 'exponentials_logs', 'functions', 'inequalities', 'integration', 'sequences_series', 'transformations_graphs', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "How many real solutions are there to the equation\n$$",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "answer": 2,
    "topic": "trigonometry"
  },
  {
    "id": "q2",
    "text": "\\cos ^{4} \\theta-5 \\cos ^{2} \\theta+3=0\n$$\n\nin the interval $0 \\leq \\theta \\leq 2 \\pi$ ?",
    "options": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8\n\n2 Find the complete set of values of $p$ for which the equation\n\n$$\nx^{2}-2 p x+y^{2}-6 y-p^{2}+8 p+9=0\n$$\n\ndescribes a circle in the $x y$-plane.\\\\\nA $p<-\\frac{9}{4}$\\\\\nB $0<p<4$\\\\\nC $-1<p<9$\\\\\nD $p<0$ or $p>4$\\\\\nE $p<-1$ or $p>9$\\\\\nF all real values of $p$"
    ],
    "answer": 3,
    "topic": "inequalities"
  },
  {
    "id": "q3",
    "text": "Given the following statements about a function f\n\\begin{itemize}\n  \\item $\\mathrm{f}^{\\prime \\prime}(x)=a$ for all $x$\n  \\item $\\mathrm{f}(0)=1, \\mathrm{f}(1)=2$\n  \\item $\\int_{0}^{1} \\mathrm{f}(x) \\mathrm{d} x=1$\\\\",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F"
    ],
    "answer": 5,
    "topic": "functions"
  },
  {
    "id": "q4",
    "text": "find the value of $a$.\n\\end{itemize}",
    "options": [
      "-6",
      "-3",
      "-2",
      "2",
      "3",
      "6\n\nThese sectors of circles are similar.\n\nThe arc length of the smaller sector is 6 .\\\\\nThe difference between the areas of the sectors is 21 .\n\nFind the positive difference between the perimeters of the sectors.\\\\\nA 4.5\\\\\nB 7\\\\\nC 8\n\nD 9\\\\\nE 10.5\\\\\nF 14",
      "15"
    ],
    "answer": 2,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q5",
    "text": "The terms $x_{n}$ of a sequence follow the rule\n$$\nx_{n+1}=\\frac{x_{n}+p}{x_{n}+q}\n$$\n\nwhere $p$ and $q$ are real numbers.\\\\\nGiven that $x_{1}=3, x_{2}=5$, and $x_{3}=7$, find the value of $x_{4}$",
    "options": [
      "-5",
      "5",
      "$\\frac{51}{7}$",
      "$\\frac{15}{2}$",
      "$\\frac{23}{3}$",
      "$\\quad 9$",
      "11",
      "13"
    ],
    "answer": 7,
    "topic": "sequences_series"
  },
  {
    "id": "q6",
    "text": "Given that\n$$\n\\int_{\\log _{2} 5}^{\\log _{2} 20} x \\mathrm{~d} x=\\log _{2} M\n$$\n\nwhat is the value of $M$ ?",
    "options": [
      "4",
      "15",
      "16",
      "20",
      "25",
      "100",
      "10000"
    ],
    "answer": 5,
    "topic": "exponentials_logs"
  },
  {
    "id": "q7",
    "text": "Find the finite area enclosed between the line $y=0$ and the curve $y=x^{2}-4|x|-12$\\\\",
    "options": [
      "$\\frac{128}{3}$",
      "$\\frac{176}{3}$",
      "$\\frac{256}{3}$",
      "108",
      "144",
      "288"
    ],
    "answer": 4,
    "topic": "integration"
  },
  {
    "id": "q8",
    "text": "A geometric sequence has first term $a$ and common ratio $r$, where $a$ and $r$ are positive integers and $r$ is greater than 1.\nThe sum of the first $n$ terms of this sequence is denoted by $S_{n}$\\\\\nIt is given that the terms of the sequence satisfy\n\n$$\nS_{30}-S_{20}=k S_{10}\n$$\n\nfor some positive integer $k$.\\\\\nWhat is the smallest possible value of $k$ ?\\\\",
    "options": [
      "$2^{10}$",
      "$2^{20}$",
      "$2^{30}$",
      "$\\frac{2^{10}}{2^{10}-1}$",
      "$\\quad 2^{10}\\left(2^{10}-1\\right)$"
    ],
    "answer": 1,
    "topic": "sequences_series"
  },
  {
    "id": "q9",
    "text": "This question is about pairs of functions f and g that satisfy\n$$\n\\begin{aligned}\nf(x)-g(x) & =2 \\sin x \\\\\nf(x) g(x) & =\\cos ^{2} x\n\\end{aligned}\n$$\n\nfor all real numbers $x$.\\\\\nAcross all solutions for $\\mathrm{f}(x)$, what is the minimum value that $\\mathrm{f}(x)$ attains for any $x$ ?\\\\",
    "options": [
      "$1-\\sqrt{2}$",
      "$-1-\\sqrt{2}$",
      "0",
      "-1",
      "-2",
      "-3",
      "$\\quad-4$"
    ],
    "answer": 4,
    "topic": "trigonometry"
  },
  {
    "id": "q10",
    "text": "A sequence of translations is applied to the graph of $y=x^{3}$\\\\\nWhich of the following graphs could be the result of this sequence of translations?\n\n$$\n\\begin{array}{ll}\n\\text { I } & y=x^{3}-3 x^{2}+9 x-27 \\\\\n\\text { II } & y=x^{3}-9 x^{2}+27 x-3 \\\\\n\\text { III } & y=27 x^{3}-9 x^{2}+x-3\n\\end{array}\n$$",
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
    "topic": "transformations_graphs"
  },
  {
    "id": "q11",
    "text": "Evaluate\n$$\n\\sum_{n=1}^{100} \\log _{10}\\left(3^{1-n}\\right)\n$$",
    "options": [
      "$-4950 \\log _{10} 3$",
      "$4950 \\log _{10} 3$",
      "$-5050 \\log _{10} 3$",
      "$5050 \\log _{10} 3$",
      "$1-4950 \\log _{10} 3$",
      "$1+4950 \\log _{10} 3$",
      "$\\quad 1-5050 \\log _{10} 3$",
      "$\\quad 1+5050 \\log _{10} 3$"
    ],
    "answer": 0,
    "topic": "exponentials_logs"
  },
  {
    "id": "q12",
    "text": "A family of quadratic curves is given by\n$$\ny_{k}=2\\left(x-\\frac{k}{2}\\right)^{2}+\\frac{k^{2}}{2}+4 k+3\n$$\n\nwhere $k$ is any real number and $y_{k}$ is a function of $x$.\\\\\nAll these curves are sketched, and the point with the lowest $y$-coordinate among all the curves $y_{k}$ is $(a, b)$.\n\nFind the value of $a+b$",
    "options": [
      "-1",
      "-3",
      "-5",
      "-7",
      "-9"
    ],
    "answer": 3,
    "topic": "transformations_graphs"
  },
  {
    "id": "q13",
    "text": "Given that\n$$\n\\left(a^{3}+\\frac{2}{b^{3}}\\right)\\left(\\frac{2}{a^{3}}-b^{3}\\right)=\\sqrt{2}\n$$\n\nwhere $a$ and $b$ are real numbers, what is the least value of $a b$ ?\\\\",
    "options": [
      "$-\\sqrt{2}$",
      "$\\sqrt{2}$",
      "$-2 \\sqrt{2}$",
      "$2 \\sqrt{2}$",
      "$-\\frac{\\sqrt{2}}{2}$",
      "$\\quad \\frac{\\sqrt{2}}{2}$",
      "$-2^{\\frac{1}{6}}$",
      "$2^{\\frac{1}{6}}$"
    ],
    "answer": 0,
    "topic": "inequalities"
  },
  {
    "id": "q14",
    "text": "A circle has centre $O$ and radius 6 .\\\\\n$P, Q$ and $R$ are points on the circumference with angle $P O Q \\geq \\frac{\\pi}{2}$\\\\\nThe area of the triangle $P O Q$ is $9 \\sqrt{3}$\\\\\nWhat is the greatest possible area of triangle $P R Q$ ?\\\\",
    "options": [
      "$18+9 \\sqrt{3}$",
      "$18 \\sqrt{3}$",
      "$27+9 \\sqrt{3}$",
      "$27 \\sqrt{3}$",
      "$36+9 \\sqrt{3}$",
      "$36 \\sqrt{3}$"
    ],
    "answer": 3,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q15",
    "text": "A rectangle is drawn in the region enclosed by the curves $p$ and $q$, where\n$$\n\\begin{aligned}\n& p(x)=8-2 x^{2} \\\\\n& q(x)=x^{2}-2\n\\end{aligned}\n$$\n\nsuch that the sides of the rectangle are parallel to the $x$ - and $y$-axes.\\\\\nWhat is the maximum possible area of the rectangle?\\\\",
    "options": [
      "$\\frac{26}{9}$",
      "$\\frac{52}{9}$",
      "$\\frac{4 \\sqrt{6}}{3}$",
      "$\\frac{8 \\sqrt{6}}{3}$",
      "$\\quad 4 \\sqrt{2}$",
      "$8 \\sqrt{2}$",
      "$\\frac{20 \\sqrt{10}}{9}$",
      "$\\frac{40 \\sqrt{10}}{9}$"
    ],
    "answer": 7,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q16",
    "text": "The solutions to $7 x^{4}-6 x^{2}+1=0$ are $\\pm \\cos \\theta$ and $\\pm \\cos \\beta$.\\\\",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    "answer": 1,
    "topic": "trigonometry"
  },
  {
    "id": "q17",
    "text": "Which one of the following equations has solutions $\\pm \\sin \\theta$ and $\\pm \\sin \\beta$ ?\\\\\nA $\\quad 7 x^{4}-8 x^{2}-5=0$\\\\\nB $7 x^{4}-8 x^{2}+2=0$\\\\\nC $7 x^{4}-6 x^{2}-2=0$\\\\\nD $7 x^{4}-6 x^{2}+1=0$\\\\\nE $\\quad 7 x^{4}+6 x^{2}-1=0$\\\\\nF $\\quad 7 x^{4}+6 x^{2}+5=0$\n\nFind the complete set of values of $x$ for which there are two non-congruent triangles with the side lengths and angle as shown in the diagram.",
    "options": [
      "$1<x<3$",
      "$1<x<4$",
      "$1<x<5$",
      "$3<x<4$",
      "$3<x<5$",
      "$\\quad 4<x<5$"
    ],
    "answer": 3,
    "topic": "inequalities"
  },
  {
    "id": "q18",
    "text": "It is given that\n$$\n\\begin{aligned}\n& \\mathrm{f}(x)=x^{2}(x-1)^{2}(x-2) \\\\\n& \\mathrm{g}(x)=-p(x-q)^{2}(x-r)^{2}\n\\end{aligned}\n$$\n\nwhere $p, q$ and $r$ are positive and $q<r$\\\\\nFind the set of values of $q$ and $r$ that guarantees the greatest number of distinct real solutions of the equation $\\mathrm{f}(x)=\\mathrm{g}(x)$ for all $p$.",
    "options": [
      "$q<1$ and $r<1$",
      "$q<1$ and $1<r<2$",
      "$q<1$ and $r>2$",
      "$1<q<2$ and $1<r<2$",
      "$1<q<2$ and $r>2$",
      "$q>2$ and $r>2$"
    ],
    "answer": 1,
    "topic": "functions"
  },
  {
    "id": "q19",
    "text": "Circle $C_{1}$ is defined as $x^{2}+y^{2}=25$\\\\\nA second circle $C_{2}$ has radius 4 and centre $(a, b)$ where\n\n$$\n-2 \\leq a \\leq 2 \\text { and }-3 \\leq b \\leq 3\n$$\n\nIf the centre of $C_{2}$ is equally likely to be located anywhere within the given range, what is the probability that $C_{2}$ intersects $C_{1}$ ?",
    "options": [
      "$\\frac{1}{25}$",
      "$\\frac{9}{25}$",
      "$\\frac{16}{25}$",
      "$\\frac{6-\\pi}{6}$",
      "$\\frac{16-\\pi}{24}$",
      "$\\quad \\frac{24-\\pi}{24}$"
    ],
    "answer": 5,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q20",
    "text": "is the number of points of intersection of the graphs\n$$\ny=\\left|x^{2}-a^{2}\\right| \\text { and } y=a^{2}|x-1|\n$$\n\nwhere $a$ is a real number.\\\\\nWhat is the smallest value of $n$ that is not possible?\\\\",
    "options": [
      "$n=1$",
      "$n=2$",
      "$n=3$",
      "$n=4$",
      "$n=5$"
    ],
    "answer": 1,
    "topic": "coordinate_geometry"
  }
]$json$
);
