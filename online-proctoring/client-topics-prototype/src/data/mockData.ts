import type { Question, TopicMastery, TopicTag } from './types';

// 50 representative TMUA questions across all 14 topics
export const MOCK_QUESTIONS: Question[] = [
  // === Algebra (4) ===
  { id:'q1', text:'Solve for $x$: $3x^2 - 12x + 9 = 0$', options:['$x = 1, 3$','$x = -1, -3$','$x = 1, -3$','$x = -1, 3$'], answer:0, topics:['algebra'], primary_topic:'algebra', difficulty:'easy', year:2018, paperNumber:1, questionIndex:0 },
  { id:'q2', text:'The equation $x^2 + kx + 16 = 0$ has exactly one real root. Find $k$.', options:['$k = 4$ only','$k = \\pm 8$','$k = 8$ only','$k = -8$ only'], answer:1, topics:['algebra','quadratics_polynomials'], primary_topic:'algebra', difficulty:'easy', year:2019, paperNumber:1, questionIndex:1 },
  { id:'q3', text:'If $f(x) = 2x - 3$ and $g(x) = x^2 + 1$, find $f^{-1}(g(2))$.', options:['$3$','$4$','$5$','$2$'], answer:2, topics:['algebra','functions'], primary_topic:'algebra', difficulty:'medium', year:2020, paperNumber:1, questionIndex:2 },
  { id:'q4', text:'Find the sum of the roots of $2x^3 - 5x^2 + 3x - 1 = 0$.', options:['$\\frac{5}{2}$','$\\frac{3}{2}$','$2$','$\\frac{1}{2}$'], answer:0, topics:['algebra','quadratics_polynomials'], primary_topic:'algebra', difficulty:'medium', year:2021, paperNumber:1, questionIndex:3 },

  // === Quadratics & Polynomials (4) ===
  { id:'q5', text:'The quadratic $x^2 - 6x + a$ has roots $\\alpha$ and $\\beta$ where $\\alpha^2 + \\beta^2 = 20$. Find $a$.', options:['$8$','$16$','$10$','$12$'], answer:0, topics:['quadratics_polynomials'], primary_topic:'quadratics_polynomials', difficulty:'medium', year:2019, paperNumber:1, questionIndex:4 },
  { id:'q6', text:'Find the remainder when $x^4 - 3x^3 + 2x^2 - x + 5$ is divided by $x - 2$.', options:['$3$','$5$','$7$','$11$'], answer:0, topics:['quadratics_polynomials','algebra'], primary_topic:'quadratics_polynomials', difficulty:'easy', year:2020, paperNumber:1, questionIndex:5 },
  { id:'q7', text:'The equation $x^3 + px + q = 0$ has a repeated root. Find $4p^3 + 27q^2$.', options:['$0$','$1$','$-1$','$pq$'], answer:0, topics:['quadratics_polynomials'], primary_topic:'quadratics_polynomials', difficulty:'hard', year:2022, paperNumber:1, questionIndex:6 },
  { id:'q8', text:'Factorise $x^4 - 5x^2 + 4$ completely.', options:['$(x-1)(x+1)(x-2)(x+2)$','$(x^2-1)(x^2-4)$','$(x-1)(x+1)(x^2-4)$','$(x^2-4)^2$'], answer:0, topics:['quadratics_polynomials'], primary_topic:'quadratics_polynomials', difficulty:'easy', year:2018, paperNumber:1, questionIndex:7 },

  // === Inequalities (3) ===
  { id:'q9', text:'Solve $\\frac{x-2}{x+1} \\geq 0$.', options:['$x > -1$','$x < -1$ or $x \\geq 2$','$x < -1$','$-1 < x \\leq 2$'], answer:3, topics:['inequalities'], primary_topic:'inequalities', difficulty:'easy', year:2019, paperNumber:1, questionIndex:8 },
  { id:'q10', text:'Find the set of values of $x$ for which $|2x - 3| < x + 1$.', options:['$\\frac{2}{3} < x < 4$','$x > 4$','$x < \\frac{2}{3}$','$x > \\frac{2}{3}$'], answer:0, topics:['inequalities'], primary_topic:'inequalities', difficulty:'medium', year:2020, paperNumber:1, questionIndex:9 },
  { id:'q11', text:'Solve the inequality $x^2 - 5x + 6 < 0$.', options:['$2 < x < 3$','$x < 2$','$x > 3$','$x < 2$ or $x > 3$'], answer:0, topics:['inequalities','quadratics_polynomials'], primary_topic:'inequalities', difficulty:'easy', year:2021, paperNumber:1, questionIndex:10 },

  // === Functions (4) ===
  { id:'q12', text:'If $f(x) = \\frac{x}{x-1}$, find $f(f(x))$.', options:['$x$','$\\frac{x}{x-1}$','$\\frac{x^2}{(x-1)^2}$','$\\frac{x-1}{x}$'], answer:0, topics:['functions'], primary_topic:'functions', difficulty:'medium', year:2018, paperNumber:1, questionIndex:11 },
  { id:'q13', text:'The function $f(x) = \\ln(3x-6)$ is defined for:', options:['$x > 2$','$x > 0$','$x > 6$','$x \\geq 2$'], answer:0, topics:['functions','exponentials_logs'], primary_topic:'functions', difficulty:'easy', year:2019, paperNumber:1, questionIndex:12 },
  { id:'q14', text:'Find the range of $f(x) = 3 + 2\\sin x$.', options:['$[1, 5]$','$[0, 5]$','$[3, 5]$','$[1, 3]$'], answer:0, topics:['functions','trigonometry'], primary_topic:'functions', difficulty:'medium', year:2021, paperNumber:1, questionIndex:13 },
  { id:'q15', text:'If $f(x) = e^{2x}$ and $g(x) = \\ln x$, find $(f \\circ g)(x)$.', options:['$x^2$','$e^{2\\ln x}$','$\\ln(e^{2x})$','$2x$'], answer:0, topics:['functions','exponentials_logs'], primary_topic:'functions', difficulty:'easy', year:2022, paperNumber:1, questionIndex:14 },

  // === Transformations & Graphs (3) ===
  { id:'q16', text:'The graph of $y = f(x)$ is translated by $\\begin{pmatrix} 2 \\\\ -3 \\end{pmatrix}$. The new equation is:', options:['$y = f(x-2) - 3$','$y = f(x+2) - 3$','$y = f(x-2) + 3$','$y = f(x+2) + 3$'], answer:0, topics:['transformations_graphs'], primary_topic:'transformations_graphs', difficulty:'easy', year:2018, paperNumber:1, questionIndex:15 },
  { id:'q17', text:'The curve $y = \\frac{1}{x}$ is stretched by factor 2 parallel to the $y$-axis. Find the new equation.', options:['$y = \\frac{2}{x}$','$y = \\frac{1}{2x}$','$y = \\frac{1}{x+2}$','$y = \\frac{1}{x-2}$'], answer:0, topics:['transformations_graphs'], primary_topic:'transformations_graphs', difficulty:'medium', year:2021, paperNumber:1, questionIndex:16 },
  { id:'q18', text:'The graph of $y = (x-1)^2$ is reflected in the line $y = x$. Find the equation of the image.', options:['$y = \\sqrt{x} + 1$','$x = (y-1)^2$','$y = (x+1)^2$','$y = \\sqrt{x+1}$'], answer:1, topics:['transformations_graphs','functions'], primary_topic:'transformations_graphs', difficulty:'hard', year:2022, paperNumber:2, questionIndex:0 },

  // === Exponentials & Logarithms (3) ===
  { id:'q19', text:'Solve $2^x = 32$.', options:['$x = 4$','$x = 5$','$x = 16$','$x = 6$'], answer:1, topics:['exponentials_logs'], primary_topic:'exponentials_logs', difficulty:'easy', year:2018, paperNumber:1, questionIndex:17 },
  { id:'q20', text:'Solve $\\log_3(x+1) - \\log_3(x-1) = 1$.', options:['$x = 2$','$x = 3$','$x = 4$','$x = 1$'], answer:0, topics:['exponentials_logs'], primary_topic:'exponentials_logs', difficulty:'medium', year:2020, paperNumber:1, questionIndex:18 },
  { id:'q21', text:'Given that $2^{x+1} = 3^{x-1}$, find $x$ correct to 2 decimal places.', options:['$x = 3.52$','$x = 4.42$','$x = 2.52$','$x = 5.42$'], answer:1, topics:['exponentials_logs','algebra'], primary_topic:'exponentials_logs', difficulty:'hard', year:2022, paperNumber:2, questionIndex:1 },

  // === Trigonometry (4) ===
  { id:'q22', text:'Solve $\\sin x = \\frac{1}{2}$ for $0 \\leq x < 2\\pi$.', options:['$x = \\frac{\\pi}{6}, \\frac{5\\pi}{6}$','$x = \\frac{\\pi}{3}, \\frac{2\\pi}{3}$','$x = \\frac{\\pi}{6}$','$x = \\frac{\\pi}{6}, \\frac{7\\pi}{6}$'], answer:0, topics:['trigonometry'], primary_topic:'trigonometry', difficulty:'easy', year:2018, paperNumber:1, questionIndex:19 },
  { id:'q23', text:'Given $\\cos\\theta = \\frac{3}{5}$ and $\\theta$ is acute, find $\\sin 2\\theta$.', options:['$\\frac{24}{25}$','$\\frac{6}{25}$','$\\frac{8}{25}$','$\\frac{12}{25}$'], answer:0, topics:['trigonometry'], primary_topic:'trigonometry', difficulty:'medium', year:2019, paperNumber:2, questionIndex:2 },
  { id:'q24', text:'Solve $2\\sin^2 x - \\cos x = 1$ for $0 \\leq x < 2\\pi$.', options:['$x = 0, \\frac{2\\pi}{3}, \\frac{4\\pi}{3}$','$x = 0, \\pi$','$x = \\frac{\\pi}{3}, \\pi, \\frac{5\\pi}{3}$','$x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}$'], answer:0, topics:['trigonometry','quadratics_polynomials'], primary_topic:'trigonometry', difficulty:'hard', year:2022, paperNumber:2, questionIndex:3 },
  { id:'q25', text:'The angle $\\theta$ satisfies $\\tan\\theta = 2$. Find $\\sin\\theta$ for $0 < \\theta < \\frac{\\pi}{2}$.', options:['$\\frac{2}{\\sqrt{5}}$','$\\frac{1}{\\sqrt{5}}$','$\\frac{2}{\\sqrt{3}}$','$\\frac{1}{2}$'], answer:0, topics:['trigonometry'], primary_topic:'trigonometry', difficulty:'medium', year:2021, paperNumber:1, questionIndex:17 },

  // === Differentiation (4) ===
  { id:'q26', text:'Find $\\frac{dy}{dx}$ when $y = x^3\\ln x$.', options:['$x^2(3\\ln x + 1)$','$3x^2\\ln x$','$x^2\\ln x + x^2$','$3x^2\\ln x + x^2$'], answer:3, topics:['differentiation'], primary_topic:'differentiation', difficulty:'medium', year:2019, paperNumber:1, questionIndex:16 },
  { id:'q27', text:'Find the $x$-coordinate of the stationary point of $y = x^3 - 3x^2 + 2$.', options:['$x = 0, 2$','$x = 1, 2$','$x = 0, 1$','$x = 0$'], answer:0, topics:['differentiation'], primary_topic:'differentiation', difficulty:'easy', year:2020, paperNumber:1, questionIndex:17 },
  { id:'q28', text:'The gradient of the tangent to $y = e^{2x}\\cos x$ at $x = 0$ is:', options:['$2$','$1$','$0$','$e$'], answer:0, topics:['differentiation','trigonometry','exponentials_logs'], primary_topic:'differentiation', difficulty:'hard', year:2022, paperNumber:2, questionIndex:4 },
  { id:'q29', text:'Find the minimum value of $f(x) = x^4 - 4x^2 + 3$.', options:['$-1$','$0$','$3$','$-4$'], answer:0, topics:['differentiation'], primary_topic:'differentiation', difficulty:'medium', year:2021, paperNumber:1, questionIndex:18 },

  // === Integration (4) ===
  { id:'q30', text:'Evaluate $\\int_0^2 (3x^2 - 2x + 1) dx$.', options:['$6$','$4$','$8$','$10$'], answer:0, topics:['integration'], primary_topic:'integration', difficulty:'easy', year:2018, paperNumber:1, questionIndex:18 },
  { id:'q31', text:'Find the area between $y = x^2$ and $y = x$ from $x = 0$ to $x = 1$.', options:['$\\frac{1}{6}$','$\\frac{1}{3}$','$\\frac{1}{2}$','$\\frac{2}{3}$'], answer:0, topics:['integration'], primary_topic:'integration', difficulty:'medium', year:2019, paperNumber:2, questionIndex:5 },
  { id:'q32', text:'Use the trapezium rule with 4 strips to estimate $\\int_{-2}^2 \\sqrt{4-x^2}\\,dx$. Which is closest to the estimate?', options:['$\\pi$','$3.1$','$2.9$','$4.0$'], answer:1, topics:['integration','coordinate_geometry'], primary_topic:'integration', difficulty:'hard', year:2022, paperNumber:1, questionIndex:13 },
  { id:'q33', text:'$\\int \\frac{1}{x\\ln x}\\,dx = ?$', options:['$\\ln|\\ln x| + C$','$\\ln|x| + C$','$\\frac{1}{\\ln x} + C$','$\\ln|x\\ln x| + C$'], answer:0, topics:['integration','exponentials_logs'], primary_topic:'integration', difficulty:'medium', year:2021, paperNumber:1, questionIndex:19 },

  // === Sequences & Series (3) ===
  { id:'q34', text:'Find the 10th term of the arithmetic sequence: 3, 7, 11, 15, ...', options:['$39$','$43$','$35$','$47$'], answer:0, topics:['sequences_series'], primary_topic:'sequences_series', difficulty:'easy', year:2018, paperNumber:1, questionIndex:14 },
  { id:'q35', text:'The sum to infinity of the geometric series $6 + 2 + \\frac{2}{3} + ...$ is:', options:['$9$','$12$','$8$','$10$'], answer:0, topics:['sequences_series'], primary_topic:'sequences_series', difficulty:'medium', year:2020, paperNumber:1, questionIndex:15 },
  { id:'q36', text:'A sequence is defined by $u_{n+1} = 2u_n - 3$ with $u_1 = 4$. Find $u_5$.', options:['$19$','$35$','$13$','$67$'], answer:0, topics:['sequences_series'], primary_topic:'sequences_series', difficulty:'medium', year:2022, paperNumber:2, questionIndex:6 },

  // === Coordinate Geometry (3) ===
  { id:'q37', text:'Find the distance between the points $(1, 2)$ and $(4, 6)$.', options:['$5$','$25$','$3$','$\\sqrt{13}$'], answer:0, topics:['coordinate_geometry'], primary_topic:'coordinate_geometry', difficulty:'easy', year:2018, paperNumber:2, questionIndex:7 },
  { id:'q38', text:'Find the equation of the circle with centre $(2, -3)$ passing through $(5, 1)$.', options:['$(x-2)^2+(y+3)^2=25$','$(x+2)^2+(y-3)^2=25$','$(x-2)^2+(y+3)^2=5$','$(x-2)^2+(y-3)^2=25$'], answer:0, topics:['coordinate_geometry'], primary_topic:'coordinate_geometry', difficulty:'medium', year:2019, paperNumber:2, questionIndex:8 },
  { id:'q39', text:'Find the perpendicular distance from the point $(3, 4)$ to the line $2x - y + 3 = 0$.', options:['$\\frac{5}{\\sqrt{5}}$','$\\frac{7}{\\sqrt{5}}$','$\\sqrt{5}$','$\\frac{13}{\\sqrt{5}}$'], answer:0, topics:['coordinate_geometry'], primary_topic:'coordinate_geometry', difficulty:'medium', year:2021, paperNumber:2, questionIndex:9 },

  // === Number Theory (4) ===
  { id:'q40', text:'How many positive factors does 72 have?', options:['$12$','$10$','$8$','$6$'], answer:0, topics:['number_theory'], primary_topic:'number_theory', difficulty:'easy', year:2018, paperNumber:2, questionIndex:10 },
  { id:'q41', text:'Find the remainder when $7^{100}$ is divided by 5.', options:['$1$','$2$','$3$','$4$'], answer:0, topics:['number_theory'], primary_topic:'number_theory', difficulty:'medium', year:2019, paperNumber:2, questionIndex:11 },
  { id:'q42', text:'How many integers $n$ with $1 \\leq n \\leq 100$ satisfy $\\gcd(n, 30) = 1$?', options:['$26$','$33$','$40$','$20$'], answer:0, topics:['number_theory'], primary_topic:'number_theory', difficulty:'hard', year:2022, paperNumber:2, questionIndex:12 },
  { id:'q43', text:'Find the highest common factor of 84 and 126.', options:['$42$','$21$','$14$','$6$'], answer:0, topics:['number_theory'], primary_topic:'number_theory', difficulty:'easy', year:2020, paperNumber:2, questionIndex:13 },

  // === Logic & Proof (4) ===
  { id:'q44', text:'What is the contrapositive of "If $p$ then $q$"?', options:['If not $q$ then not $p$','If not $p$ then not $q$','If $q$ then $p$','Not $p$ and $q$'], answer:0, topics:['logic_proof'], primary_topic:'logic_proof', difficulty:'easy', year:2019, paperNumber:2, questionIndex:14 },
  { id:'q45', text:'Which of the following is a tautology?', options:['$(p \\Rightarrow q) \\vee (q \\Rightarrow p)$','$(p \\Rightarrow q) \\wedge q$','$\\neg p \\Rightarrow q$','$(p \\vee q) \\Rightarrow (p \\wedge q)$'], answer:0, topics:['logic_proof'], primary_topic:'logic_proof', difficulty:'hard', year:2021, paperNumber:2, questionIndex:15 },
  { id:'q46', text:'Prove by contradiction: if $n^2$ is even then $n$ is even. The key step is:', options:['Assume $n$ is odd, then $n^2$ is odd','Assume $n$ is even, then $n^2$ is even','Assume $n^2$ is odd','Use induction on $n$'], answer:0, topics:['logic_proof','algebra'], primary_topic:'logic_proof', difficulty:'medium', year:2022, paperNumber:2, questionIndex:16 },
  { id:'q47', text:'The negation of "$\\forall x > 0, f(x) > 0$" is:', options:['$\\exists x > 0: f(x) \\leq 0$','$\\forall x \\leq 0: f(x) > 0$','$\\exists x \\leq 0: f(x) > 0$','$\\forall x > 0: f(x) \\leq 0$'], answer:0, topics:['logic_proof','inequalities'], primary_topic:'logic_proof', difficulty:'medium', year:2020, paperNumber:2, questionIndex:17 },

  // === General (3) ===
  { id:'q48', text:'A bag contains 4 red and 6 blue balls. Two balls are drawn without replacement. Find the probability both are red.', options:['$\\frac{2}{15}$','$\\frac{4}{25}$','$\\frac{1}{5}$','$\\frac{2}{5}$'], answer:0, topics:['general'], primary_topic:'general', difficulty:'easy', year:2018, paperNumber:2, questionIndex:18 },
  { id:'q49', text:'The mean of 5 numbers is 8. Four of the numbers are 6, 9, 7, 10. Find the fifth number.', options:['$8$','$10$','$12$','$6$'], answer:0, topics:['general'], primary_topic:'general', difficulty:'easy', year:2020, paperNumber:2, questionIndex:19 },
  { id:'q50', text:'In how many ways can 5 people sit around a circular table?', options:['$24$','$120$','$60$','$5$'], answer:0, topics:['general'], primary_topic:'general', difficulty:'medium', year:2022, paperNumber:2, questionIndex:17 },
];

// Generate mock mastery data for a simulated student
export function generateMockMastery(): TopicMastery[] {
  const mastery: TopicMastery[] = [];
  for (const tag of ['algebra','quadratics_polynomials','inequalities','functions','transformations_graphs','exponentials_logs','trigonometry','differentiation','integration','sequences_series','coordinate_geometry','number_theory','logic_proof','general'] as TopicTag[]) {
    const totalAttempts = Math.floor(Math.random() * 25);
    const totalCorrect = Math.floor(Math.random() * (totalAttempts + 1));
    const confidence = Math.min(1, totalAttempts / 15);
    const rawAccuracy = totalAttempts > 0 ? totalCorrect / totalAttempts : 0;
    mastery.push({
      topic: tag,
      masteryLevel: Math.round(rawAccuracy * 100 * confidence),
      confidence,
      totalAttempts,
      totalCorrect,
    });
  }
  return mastery;
}

export const MOCK_MASTERY = generateMockMastery();
