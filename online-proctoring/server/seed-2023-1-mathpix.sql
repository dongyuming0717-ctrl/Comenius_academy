-- TMUA 2023 Paper 1 (Mathpix LaTeX)
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'TMUA 2023 October Paper 1',
  1,
  2023,
  'October',
  75,
  20,
  ARRAY['coordinate_geometry', 'differentiation', 'exponentials_logs', 'functions', 'integration', 'number_theory', 'sequences_series', 'transformations_graphs', 'trigonometry']::text[],
  $json$[
  {
    "id": "q1",
    "text": "Given that\n$$\n\\int_{0}^{1}(a x+b) \\mathrm{d} x=1\n$$\n\nand\n\n$$\n\\int_{0}^{1} x(a x+b) \\mathrm{d} x=1\n$$\n\nfind the value of $a+b$.",
    "options": [
      "-1",
      "0",
      "1",
      "2",
      "3",
      "4",
      "$\\quad 5$"
    ],
    "answer": 5,
    "topic": "differentiation"
  },
  {
    "id": "q2",
    "text": "The graphs of $y=x^{2}+5 x+6$ and $y=m x-3$, where $m$ is a constant, are plotted on the same set of axes.\nGiven that the graphs do not meet, what is the complete range of possible values of $m$ ?",
    "options": [
      "$-1<m<11$",
      "$m<-1, m>11$",
      "$-\\sqrt{11}<m<\\sqrt{11}$",
      "$m<-\\sqrt{11}, m>\\sqrt{11}$",
      "$-11<m<1$",
      "$m<-11, m>1$"
    ],
    "answer": 0,
    "topic": "transformations_graphs"
  },
  {
    "id": "q3",
    "text": "For any integer $n \\geq 0$,\n$$\n\\int_{n}^{n+1} f(x) \\mathrm{d} x=n+1\n$$\n\nEvaluate\n\n$$\n\\int_{0}^{3} f(x) \\mathrm{d} x+\\int_{1}^{3} f(x) \\mathrm{d} x+\\int_{2}^{3} f(x) \\mathrm{d} x+\\int_{4}^{3} f(x) \\mathrm{d} x+\\int_{5}^{3} f(x) \\mathrm{d} x\n$$",
    "options": [
      "-2",
      "0",
      "1",
      "4",
      "18",
      "$\\quad 27$"
    ],
    "answer": 2,
    "topic": "number_theory"
  },
  {
    "id": "q4",
    "text": "Evaluate\n$$\n\\sum_{n=0}^{\\infty} \\frac{\\sin \\left(n \\pi+\\frac{\\pi}{3}\\right)}{2^{n}}\n$$",
    "options": [
      "0",
      "$\\frac{1}{3}$",
      "$\\frac{\\sqrt{3}}{3}$",
      "$\\sqrt{3}$",
      "3"
    ],
    "answer": 2,
    "topic": "trigonometry"
  },
  {
    "id": "q5",
    "text": "The following shape has two lines of reflectional symmetry.\\\\\n\n\\\\\n$M N O P$ is a square of perimeter 40 cm .\\\\\nThe vertices of rectangle $R S T U$ lie on the edge of square $M N O P$.\\\\\n$M R$ has length $x \\mathrm{~cm}$.\\\\\nWhat is the largest possible value of $x$ such that RSTU has area $20 \\mathrm{~cm}^{2}$ ?\\\\",
    "options": [
      "$\\sqrt{2}$",
      "$\\sqrt{10}$",
      "$2 \\sqrt{15}$",
      "$10 \\sqrt{2}$",
      "$5+\\sqrt{5}$",
      "$\\quad 5+\\sqrt{15}$"
    ],
    "answer": 5,
    "topic": "transformations_graphs",
    "image_url": "/question-images/2023-1_q05_fig1.jpg"
  },
  {
    "id": "q6",
    "text": "In the simplified expansion of $(2+3 x)^{12}$, how many of the terms have a coefficient that is divisible by 12 ?",
    "options": [
      "0",
      "2",
      "5",
      "10",
      "11",
      "12",
      "13"
    ],
    "answer": 4,
    "topic": "sequences_series"
  },
  {
    "id": "q7",
    "text": "and $Q(x)$ are defined as follows:\n$$\n\\begin{aligned}\n& \\mathrm{P}(x)=2^{x}+4 \\\\\n& \\mathrm{Q}(x)=2^{(2 x-2)}-2^{(x+2)}+16\n\\end{aligned}\n$$\n\nFind the largest value of $x$ such that $\\mathrm{P}(x)$ and $\\mathrm{Q}(x)$ are in the ratio $4: 1$, respectively.\\\\",
    "options": [
      "5",
      "12",
      "32",
      "$\\quad \\log _{2} 3$",
      "$\\quad \\log _{2} 5$",
      "$\\quad \\log _{2} 12$",
      "$\\quad \\log _{2} 20$"
    ],
    "answer": 5,
    "topic": "exponentials_logs"
  },
  {
    "id": "q8",
    "text": "A triangle $X Y Z$ is called fun if it has the following properties:\n$$\n\\begin{aligned}\n& \\text { angle } Y X Z=30^{\\circ} \\\\\n& X Y=\\sqrt{3} a \\\\\n& Y Z=a\n\\end{aligned}\n$$\n\nwhere $a$ is a constant.\\\\\nFor a given value of $a$, there are two distinct fun triangles $S$ and $T$, where the area of $S$ is greater than the area of $T$.\n\nFind the ratio\\\\\narea of $S$ : area of $T$\\\\",
    "options": [
      "$1: 1$",
      "2:1",
      "$2: \\sqrt{3}$",
      "$\\sqrt{3}: 1$",
      "$3: 1$"
    ],
    "answer": 1,
    "topic": "trigonometry"
  },
  {
    "id": "q9",
    "text": "How many solutions are there to\n$$\n(1+3 \\cos 3 \\theta)^{2}=4\n$$\n\nin the interval $0^{\\circ} \\leq \\theta \\leq 180^{\\circ}$ ?",
    "options": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "answer": 4,
    "topic": "trigonometry"
  },
  {
    "id": "q10",
    "text": "The trapezium rule with 4 strips is used to estimate the integral:\n$$\n\\int_{-2}^{2} \\sqrt{4-x^{2}} d x\n$$\n\nWhat is the positive difference between the estimate and the exact value of the integral?\\\\",
    "options": [
      "$2(\\pi-2-2 \\sqrt{3})$",
      "$2(\\pi-1-\\sqrt{3})$",
      "$2(2 \\pi-1-\\sqrt{3})$",
      "$\\quad 4(\\pi-1-\\sqrt{3})$",
      "$2 \\pi-3 \\sqrt{3}$",
      "$\\quad 4 \\pi-6 \\sqrt{3}$"
    ],
    "answer": 1,
    "topic": "integration"
  },
  {
    "id": "q11",
    "text": "It is given that $f(x)=x^{2}-6 x$\\\\\nThe curves $y=f(k x)$ and $y=f(x-c)$ have the same minimum point, where $k>0$ and $c>0$ Which of the following is a correct expression for $k$ in terms of $c$ ?",
    "options": [
      "$k=\\frac{3-c}{3}$",
      "$k=\\frac{3}{c+3}$",
      "$k=\\frac{c-6}{6}$",
      "$\\quad k=\\frac{6}{6-c}$",
      "$k=\\frac{c+9}{9}$",
      "$\\quad k=\\frac{9}{c-9}$"
    ],
    "answer": 1,
    "topic": "transformations_graphs"
  },
  {
    "id": "q12",
    "text": "How many solutions are there to the equation\n$$\n\\frac{2^{\\tan ^{2} x}}{4^{\\sin ^{2} x}}=1\n$$\n\nin the range $0 \\leq x \\leq 2 \\pi$ ?",
    "options": [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8"
    ],
    "answer": 5,
    "topic": "trigonometry"
  },
  {
    "id": "q13",
    "text": "Point $P$ lies on the circle with equation $(x-2)^{2}+(y-1)^{2}=16$\\\\\nPoint $Q$ lies on the circle with equation $(x-4)^{2}+(y+5)^{2}=16$\\\\\nWhat is the maximum possible length of $P Q$ ?\\\\",
    "options": [
      "10",
      "14",
      "16",
      "$2 \\sqrt{34}$",
      "$10 \\sqrt{2}$",
      "$8+2 \\sqrt{10}$",
      "$16+2 \\sqrt{6}$"
    ],
    "answer": 5,
    "topic": "coordinate_geometry"
  },
  {
    "id": "q14",
    "text": "The function\n$$\nf(x)=\\frac{2}{3} x^{3}+2 m x^{2}+n, \\quad m>0\n$$\n\nhas three distinct real roots.\\\\\nWhat is the complete range of possible values of $n$, in terms of $m$ ?\\\\",
    "options": [
      "$-\\frac{8}{3} m^{3}<n<0$",
      "$-\\frac{4}{3} m^{3}<n<0$",
      "$0<n<\\frac{3}{2} m^{2}$",
      "$0<n<\\frac{40}{3} m^{3}$",
      "$n<-\\frac{8}{3} m^{3}$",
      "$n<\\frac{3}{2} m^{2}$",
      "$n>-\\frac{4}{3} m^{3}$",
      "$n>\\frac{40}{3} m^{3}$"
    ],
    "answer": 0,
    "topic": "functions"
  },
  {
    "id": "q15",
    "text": "The difference between the maximum and minimum values of the function $f(x)=a^{\\cos x}$, where $a>0$ and $x$ is real, is 3 .\nFind the sum of the possible values of $a$.\\\\",
    "options": [
      "0",
      "$\\frac{3}{2}$",
      "$\\frac{5}{2}$",
      "3",
      "$\\sqrt{10}$",
      "$\\sqrt{13}$"
    ],
    "answer": 5,
    "topic": "trigonometry"
  },
  {
    "id": "q16",
    "text": "A right-angled triangle has vertices at $(2,3),(9,-1)$ and $(5, k)$.\\\\\nFind the sum of all the possible values of $k$.\\\\",
    "options": [
      "-8",
      "-6",
      "0.25",
      "2",
      "2.25",
      "8.25",
      "$\\quad 10.25$"
    ],
    "answer": 4,
    "topic": "trigonometry"
  },
  {
    "id": "q17",
    "text": "A circle $C_{n}$ is defined by\n$$\nx^{2}+y^{2}=2 n(x+y)\n$$\n\nwhere $n$ is a positive integer.\\\\\n$C_{1}$ and $C_{2}$ are drawn and the area between them is shaded.\\\\\nNext, $C_{3}$ and $C_{4}$ are drawn and the area between them is shaded.\\\\\nThis is shown in the diagram.\\\\\n\n\\\\\nThis process continues until 100 circles have been drawn.\\\\\nWhat is the total shaded area?",
    "options": [
      "$100 \\pi$",
      "$500 \\pi$",
      "$2500 \\pi$",
      "$5050 \\pi$",
      "$10100 \\pi$",
      "$40400 \\pi$"
    ],
    "answer": 4,
    "topic": "integration",
    "image_url": "/question-images/2023-1_q17_fig1.jpg"
  },
  {
    "id": "q18",
    "text": "You are given that\n$$\nS=4+\\frac{8 k}{7}+\\frac{16 k^{2}}{49}+\\frac{32 k^{3}}{343}+\\cdots+4\\left(\\frac{2 k}{7}\\right)^{n}+\\cdots\n$$\n\nThe value for $k$ is chosen as an integer in the range $-5 \\leq k \\leq 5$\\\\\nAll possible values for $k$ are equally likely to be chosen.\\\\\nWhat is the probability that the value of $S$ is a finite number greater than 3 ?\\\\",
    "options": [
      "$\\frac{1}{11}$",
      "$\\frac{1}{10}$",
      "$\\frac{3}{11}$",
      "$\\frac{3}{10}$",
      "$\\frac{5}{11}$",
      "$\\frac{1}{2}$",
      "$\\frac{7}{11}$",
      "$\\frac{7}{10}$"
    ],
    "answer": 4,
    "topic": "functions"
  },
  {
    "id": "q19",
    "text": "The solution to the differential equation\n$$\n\\frac{\\mathrm{d} y}{\\mathrm{~d} x}=|-6 x| \\quad \\text { for all } x\n$$\n\nis $y=f(x)+c$, where $c$ is a constant.\\\\\nWhich one of the following is a correct expression for $f(x)$ ?\\\\",
    "options": [
      "$-\\frac{6 x}{|x|}$",
      "$\\frac{6 x}{|x|}$",
      "$-3 x|x|$",
      "$3 x|x|$",
      "$-3 x^{2}$",
      "$3 x^{2}$",
      "$-x^{3}$",
      "$x^{3}$"
    ],
    "answer": 3,
    "topic": "transformations_graphs"
  },
  {
    "id": "q20",
    "text": "The diagram shows the graph of $y=f(x)$\\\\\nThe function $f$ attains its maximum value of 2 at $x=1$, and its minimum value of -2 at $x=-1$\\\\\n\nFind the difference between the maximum and minimum values of $(f(x))^{2}-f(x)$\\\\",
    "options": [
      "2",
      "$\\frac{9}{4}$",
      "4",
      "$\\frac{17}{4}$",
      "6",
      "$\\frac{25}{4}$",
      "8",
      "$\\frac{33}{4}$"
    ],
    "answer": 5,
    "topic": "transformations_graphs",
    "image_url": "/question-images/2023-1_q20_fig1.jpg"
  }
]$json$
);
