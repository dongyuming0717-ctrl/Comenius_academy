-- ENGAA Papers (2016-2023) — LaTeX + Answer Keys
-- Generated automatically by generate_seed_sql.py


INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'ENGAA 2016 — Part A (27 Qs) + Part B (11 Qs)',
  1,
  2016,
  'November',
  80,
  38,
  ARRAY['mathematics', 'physics', 'advanced_mathematics', 'advanced_physics']::text[],
  $json$[
  {
    "id": "q1",
    "text": "1 Find the complete set of solutions to $- 8 < 6 - \\frac{x}{2}$",
    "options": [
      "$x < 4$",
      "$x > 4$",
      "$x < {20}$",
      "$x > {20}$",
      "$x < {22}$",
      "$x > {22}$",
      "$x < {28}$",
      "$x > {28}$"
    ],
    "answer": 6,
    "topic": "mathematics"
  },
  {
    "id": "q2",
    "text": "2 A nuclide ${}_{82}^{214}\\mathrm{\\;{Pb}}$ changes by radioactive decay into the nuclide ${}_{82}^{210}\\mathrm{\\;{Pb}}$ . Which combination of emissions produces this change?\n\n\n\nA 3 alpha\n\n\n\nB 2 alpha and 1 beta\n\n\n\n2 alpha and 2 beta\n\n\n\n1 alpha and 2 beta\n\n\n\n3 beta\n\n\n\n3 Which one of the following is a simplification of ${\\left( \\sqrt{3} - \\sqrt{2}\\right) }^{2}$ ?\n\n\n\n$\\begin{array}{ll} 8 & 1 - 2\\sqrt{3}\\sqrt{2} \\end{array}$",
    "options": [
      "$5 - 2\\sqrt{2}\\sqrt{3}$",
      "$2\\sqrt{3} - 2\\sqrt{2}$",
      "1",
      "$5 - \\sqrt{2}\\sqrt{3}$",
      "5"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q3",
    "text": "The graph shown of quantity $y$ against quantity $x$ represents the motion of a body.\n\n\n\n\n\n<img src=\"/question-images/engaa/4_587_239_555_437_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n(The scales on both axes are in the appropriate S.I. units, and the gravitational field strength $g$ is ${10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ .)\n\n\n\nWhich two of the following could the graph represent?\n\n\n\n1 kinetic energy against velocity for an object of mass ${10}\\mathrm{\\;{kg}}$ undergoing free-fall\n\n\n\n2 potential energy against height for an object of mass ${20}\\mathrm{\\;{kg}}$ being lifted by a constant external force\n\n\n\n3 velocity against time for an object of mass ${20}\\mathrm{\\;{kg}}$ being accelerated by a resultant force of ${100}\\mathrm{\\;N}$\n\n\n\n4 work done by an external force of $5\\mathrm{\\;N}$ against distance moved for an object of mass ${12}\\mathrm{\\;{kg}}$ being moved at constant speed by (and in the direction of) the external force",
    "options": [
      "1 and 2",
      "1 and 3",
      "1 and 4",
      "2 and 3",
      "2 and 4",
      "3 and 4"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q4",
    "text": "7\n\n\n\n5 The ratio of Q:R is 5:2 and the ratio of R:S is 3:10\n\n\n\nWhich one of the following gives the ratio Q:S in its simplest form?",
    "options": [
      "1:2",
      "2:1",
      "3:4",
      "3:25",
      "4:3",
      "25:3"
    ],
    "answer": 5,
    "topic": "physics"
  },
  {
    "id": "q5",
    "text": "6 A uranium-235 nucleus can undergo fission to produce two smaller nuclei.\n\n\n\nWhich of the diagrams, if any, could represent this process?\n\n\n\n\n\n<img src=\"/question-images/engaa/6_204_302_1042_704_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n",
    "options": [
      "none of them",
      "1 only",
      "2 only",
      "3 only",
      "1 and 2 only",
      "1 and 3 only",
      "2 and 3 only",
      "1,2 and 3"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q6",
    "text": "9\n\n\n\n7 The mean age of the twenty members of a running club is exactly 28.\n\n\n\nThe mean age increases by exactly 2 years when two new members join.\n\n\n\nWhat is the mean age of the two new members?",
    "options": [
      "20 years",
      "22 years",
      "30 years",
      "40 years",
      "50 years",
      "52 years"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q7",
    "text": "8 A circuit consists of a ${5.0\\Omega }$ resistor and a variable resistor connected in series with a 24 V battery. The variable resistor has a minimum resistance of ${3.0\\Omega }$ and a maximum resistance of ${15\\Omega }$ . The battery and the connecting wires have negligible resistance.\n\n\n\nWhat is the maximum power dissipated in the ${5.0\\Omega }$ resistor?",
    "options": [
      "7.2W",
      "18W",
      "27 W",
      "45 W",
      "72W",
      "75W"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q8",
    "text": "10\n\n\n\n9 A medical scanner is bought for £15000.\n\n\n\nThe value of the scanner depreciates by 20\\% every year.\n\n\n\nBy how much has the scanner reduced in value after 2 years?",
    "options": [
      "£600",
      "£3000",
      "£5400",
      "£6000",
      "£9000",
      "£9600",
      "£12000"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q9",
    "text": "10 The total power $P$ radiated by a star is given by:\n\n\n\n$$\n\nP = k{R}^{2}{T}^{4}\n\n$$\n\n\n\nwhere $R$ is the radius of the star, $T$ is its surface temperature and $k$ is a constant.\n\n\n\nThe power currently radiated by the Sun is ${4.0} \\times  {10}^{26}\\mathrm{\\;W}$ . Towards the end of the Sun’s life its radius will increase by a factor of a hundred and its surface temperature will decrease by a factor of two.\n\n\n\nWhat will be the power radiated by the Sun when these changes have occurred?",
    "options": [
      "${2.5} \\times  {10}^{27}\\mathrm{\\;W}$",
      "${1.0} \\times  {10}^{28}\\mathrm{\\;W}$",
      "${2.0} \\times  {10}^{28}\\mathrm{\\;W}$",
      "${2.5} \\times  {10}^{29}\\mathrm{\\;W}$",
      "${1.0} \\times  {10}^{30}\\mathrm{\\;W}$",
      "${2.0} \\times  {10}^{30}\\mathrm{\\;W}$",
      "${2.5} \\times  {10}^{33}\\mathrm{\\;W}$",
      "${1.0} \\times  {10}^{34}\\mathrm{\\;W}$"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q10",
    "text": "11\n\n\n\n11 The point A is $4\\mathrm{\\;{km}}$ due East of the point B.\n\n\n\nThe bearing of the point C from A is ${330}^{ \\circ  }$ and the bearing of C from B is ${060}^{ \\circ  }$\n\n\n\nFind the distance BC.",
    "options": [
      "$2\\mathrm{\\;{km}}$",
      "$2\\sqrt{3}\\mathrm{\\;{km}}$",
      "$4\\mathrm{\\;{km}}$",
      "$2\\sqrt{5}\\mathrm{\\;{km}}$",
      "$4\\sqrt{2}\\mathrm{\\;{km}}$"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q11",
    "text": "12 A transverse wave travelling through a medium has a frequency of ${5.0}\\mathrm{\\;{Hz}}$ , a wavelength of ${4.0}\\mathrm{\\;{cm}}$ and an amplitude of ${3.0}\\mathrm{\\;{cm}}$ .\n\n\n\nWhat is the total distance travelled by a particle of the medium in one minute?",
    "options": [
      "${900}\\mathrm{\\;{cm}}$",
      "${1200}\\mathrm{\\;{cm}}$",
      "${1800}\\mathrm{\\;{cm}}$",
      "${2400}\\mathrm{\\;{cm}}$",
      "${3600}\\mathrm{\\;{cm}}$",
      "4800 cm"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q12",
    "text": "13 The quantities $x$ and $y$ are positive.\n\n\n\n$x$ is inversely proportional to the square root of $y$ .\n\n\n\n$$\n\n\\text{ When }x = 8,y = 9\\text{ . }\n\n$$\n\n\n\nWhat is the value of $y$ when $x = 6$ ?",
    "options": [
      "$\\frac{3}{2}$",
      "2",
      "$\\frac{81}{16}$",
      "$\\frac{27}{14}$",
      "12",
      "16"
    ],
    "answer": 4,
    "topic": "physics"
  },
  {
    "id": "q13",
    "text": "14 A motor is used to lift a mass of ${5.0}\\mathrm{\\;{kg}}$ using a pulley system as shown in the diagram. The pulley is secured to the roof using a coupling.\n\n\n\n\n\n<img src=\"/question-images/engaa/11_493_266_727_595_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe motor needs to cause the mass to accelerate upwards at ${0.80}{\\mathrm{\\;{ms}}}^{-2}$ .\n\n\n\nWhat is the minimum tension force that the coupling must be able to withstand without breaking?\n\n\n\n(The gravitational field strength $g$ is ${10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ . The pulley system is frictionless and has negligible mass. The rope has negligible mass and is inextensible.)",
    "options": [
      "4.0N",
      "8.0N",
      "${46}\\mathrm{\\;N}$",
      "50N",
      "54 N",
      "92 N",
      "104N",
      "108N"
    ],
    "answer": 5,
    "topic": "mathematics"
  },
  {
    "id": "q14",
    "text": "15 In a trapezium ${PQRS}$ , the parallel sides are ${PQ}$ and ${RS}$ . ${PQ} = \\left( {x - 1}\\right) \\mathrm{{cm}},{RS} = \\left( {x + 5}\\right) \\mathrm{{cm}}$ and the vertical height ${QR} = x\\mathrm{\\;{cm}}$ .\n\n\n\n\n\n<img src=\"/question-images/engaa/12_209_315_389_234_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nThe area of the trapezium is ${120}{\\mathrm{\\;{cm}}}^{2}$ .\n\n\n\nWhat is the length of ${RS}$ ?",
    "options": [
      "9 cm",
      "10 cm",
      "11cm",
      "12cm",
      "15cm",
      "17 cm"
    ],
    "answer": 5,
    "topic": "physics"
  },
  {
    "id": "q15",
    "text": "16 A heater is connected in series with a resistor and a 6.0 V battery in the circuit shown.\n\n\n\n\n\n<img src=\"/question-images/engaa/13_568_236_592_427_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe total resistance of the circuit is ${15\\Omega }$ . In ${3.0}\\mathrm{\\;{minutes},{180}}\\mathrm{J}$ of electrical energy is transferred into other forms in the heater.\n\n\n\nHow much charge flows through the heater in the 3.0 minutes and what is the voltage across the heater?\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "mathematics"
  },
  {
    "id": "q16",
    "text": "\n\n\n\n17 Make $b$ the subject of the formula:\n\n\n\n$a = \\frac{{b}^{2} + 2}{3{b}^{2} - 1}$",
    "options": [
      "$b =  \\pm  \\sqrt{\\left( \\frac{a + 2}{{3a} + 1}\\right) }$",
      "$b =  \\pm  \\sqrt{\\left( \\frac{a + 2}{{3a} - 1}\\right) }$",
      "$b =  \\pm  \\sqrt{\\left( \\frac{2 - a}{{3a} + 1}\\right) }$",
      "$b =  \\pm  \\sqrt{\\left( \\frac{2 - a}{{3a} - 1}\\right) }$",
      "$b =  \\pm  \\sqrt{\\left( \\frac{3}{{3a} + 1}\\right) }$",
      "$\\;b =  \\pm  \\sqrt{\\left( \\frac{3}{{3a} - 1}\\right) }$"
    ],
    "answer": 5,
    "topic": "physics"
  },
  {
    "id": "q17",
    "text": "18 A cubic block has a hole through it with a square cross-section. The dimensions are shown on the diagram. The weight of the block is ${30}\\mathrm{\\;N}$ .\n\n\n\n\n\n<img src=\"/question-images/engaa/15_664_269_403_464_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhat is the density of the material from which the block is made?\n\n\n\n(The gravitational field strength $g$ is ${10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ .)",
    "options": [
      "${0.30}\\mathrm{g}{\\mathrm{\\;{cm}}}^{-3}$",
      "${0.40}\\;\\mathrm{g}{\\mathrm{\\;{cm}}}^{-3}$",
      "${0.60}\\mathrm{g}{\\mathrm{{cm}}}^{-3}$",
      "${1.2}\\mathrm{g}{\\mathrm{\\;{cm}}}^{-3}$",
      "3.0 $\\mathrm{g}{\\mathrm{\\;{cm}}}^{-3}$",
      "4.0gc ${\\mathrm{m}}^{-3}$",
      "${6.0}\\mathrm{g}{\\mathrm{\\;{cm}}}^{-3}$",
      "12gc ${\\mathrm{m}}^{-3}$"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q18",
    "text": "19 A thin rectangular sheet of metal ${10}\\mathrm{\\;m}$ by $5\\mathrm{\\;m}$ is made into an open ended cylinder by joining the edges ${PS}$ and ${QR}$ .\n\n\n\nThe height of the cylinder is ${10}\\mathrm{\\;m}$ .\n\n\n\nWhat is the volume, in cubic metres, enclosed by this cylinder?",
    "options": [
      "$\\frac{5}{2\\pi }$",
      "$\\frac{25}{4\\pi }$",
      "$\\frac{125}{2\\pi }$",
      "${62.5\\pi }$",
      "$\\frac{125}{\\pi }$"
    ],
    "answer": 4,
    "topic": "physics"
  },
  {
    "id": "q19",
    "text": "19\n\n\n\n20 The diagram shows four solid steel balls P, Q, R and S which are of identical size.\n\n\n\nBalls P and R have shiny surfaces. Balls Q and S have dull surfaces.\n\n\n\nBalls P and Q are in a room at ${20}^{ \\circ  }\\mathrm{C}$ . Balls R and S are in a room at ${40}^{ \\circ  }\\mathrm{C}$ .\n\n\n\nThe temperature of each ball at a given moment in time is shown on the diagram.\n\n\n\n\n\n<img src=\"/question-images/engaa/17_313_480_1109_451_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhich two balls lose thermal energy by convection, and which ball emits thermal radiation at the greatest rate?\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "mathematics"
  },
  {
    "id": "q20",
    "text": "\n\n\n\n21 Which one of the following is a simplification of $4 + \\frac{4 - {x}^{2}}{{x}^{2} - {2x}}$ ?",
    "options": [
      "$3 - \\frac{2}{x}$",
      "$3 + \\frac{2}{x}$",
      "$4 + \\frac{2}{x}$",
      "$5 - \\frac{2}{x}$",
      "$5 + \\frac{2}{x}$"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q21",
    "text": "22 The diagram shows the velocity-time graph for an object travelling in a straight line over a period of ${30}\\mathrm{\\;s}$ .\n\n\n\n\n\n<img src=\"/question-images/engaa/19_480_247_744_497_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhat total distance did the object travel in the ${30}\\mathrm{\\;s}$ , how far from its starting position was it at the end of the ${30}\\mathrm{\\;s}$ , and what was its average speed over the ${30}\\mathrm{\\;s}$ ?\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "mathematics"
  },
  {
    "id": "q22",
    "text": "\n\n\n\n23 During summer activities week 120 students each chose one activity from swimming, archery, and tennis.\n\n\n\n46 of the students were girls.\n\n\n\n36 of the students chose tennis, and $\\frac{2}{3}$ of these were boys; 25 girls chose swimming, and 27 students chose archery.\n\n\n\nA boy is picked at random. What is the probability that he chose swimming?",
    "options": [
      "$\\frac{3}{20}$",
      "$\\frac{9}{37}$",
      "$\\frac{4}{15}$",
      "$\\frac{16}{37}$",
      "$\\frac{32}{57}$"
    ],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q23",
    "text": "24 Bronze is a mixture of tin and copper.\n\n\n\nA particular sample of bronze contains 10\\% tin by volume. (In other words, 10\\% of the total volume of the sample is tin and 90\\% of it is copper.)\n\n\n\nWhat percentage of the mass of the sample is tin?\n\n\n\n(Density of tin $= Y$ and density of copper $= X$ .)",
    "options": [
      "$\\frac{X}{{9X} - Y} \\times  {100}$",
      "$\\frac{X}{{9Y} - X} \\times  {100}$",
      "$\\frac{Y}{{9X} - Y} \\times  {100}$",
      "$\\frac{Y}{{9Y} - X} \\times  {100}$",
      "$\\frac{X}{{9X} + Y} \\times  {100}$",
      "$\\frac{X}{{9Y} + X} \\times  {100}$",
      "$\\frac{Y}{{9X} + Y} \\times  {100}$",
      "$\\frac{Y}{{9Y} + X} \\times  {100}$"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q24",
    "text": "25 Which one of the following expressions is equivalent to $\\frac{{9}^{{2n} + 1} \\times  {3}^{4 - {3n}}}{{27}^{2 - n}}$ ?",
    "options": [
      "${3}^{9}$",
      "${3}^{-{2n}}$",
      "${3}^{2 - {2n}}$",
      "${3}^{4n}$",
      "${3}^{{6n} - 2}$",
      "${3}^{6}$"
    ],
    "answer": 5,
    "topic": "physics"
  },
  {
    "id": "q25",
    "text": "26 When a stationary uranium-238 nucleus decays by alpha emission it forms a nucleus of thorium-234. The total kinetic energy produced by the decay is $E$ .\n\n\n\n\n\n<img src=\"/question-images/engaa/22_378_268_876_720_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhat is the kinetic energy of the alpha particle?",
    "options": [
      "$\\frac{4E}{238}$",
      "$\\frac{4E}{234}$",
      "$\\frac{234E}{238}$"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q26",
    "text": "27 In the diagram below, PQRS is part of a regular polygon.\n\n\n\nThe polygon has $n$ sides.\n\n\n\nThe side ${PQ}$ is extended to $T$ such that ${PQT}$ is a straight line.\n\n\n\nThe length of ${RQ}$ is the same as the length of ${RT}$ .\n\n\n\n\n\n<img src=\"/question-images/engaa/23_475_456_667_542_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nFind an equation for $n$ in terms of $x$ , where $x$ is the size of angle $\\angle$ QRT in degrees.",
    "options": [
      "$n = \\frac{180}{x - {90}}$",
      "$n = \\frac{{180} - x}{720}$",
      "$\\;n = \\frac{{360} - x}{90}$",
      "$\\;n = \\frac{360}{{180} - x}$",
      "$\\;n = \\frac{720}{{180} - x}$",
      "$\\;n = \\frac{720}{{360} - x}$",
      "$n = \\frac{360}{{360} - x}$"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q27",
    "text": "28 A student carries out an experiment to measure the speed of sound. A loudspeaker that emits sound in all directions is placed between two buildings that are ${128}\\mathrm{\\;m}$ apart as shown. The student and loudspeaker are ${48}\\mathrm{\\;m}$ from one of the buildings.\n\n\n\n\n\n<img src=\"/question-images/engaa/24_292_334_1145_328_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe loudspeaker is connected to a signal generator that causes it to emit regular clicks. The student notices that each click results in two echoes, one from each building. The rate at which the clicks are produced is gradually increased from zero until each echo coincides with a new click being emitted by the loudspeaker.\n\n\n\nWhat is the frequency of emission of clicks when this happens?\n\n\n\n(The speed of sound in air $= {320}{\\mathrm{\\;{ms}}}^{-1}$ .)",
    "options": [
      "${2.0}\\mathrm{\\;{Hz}}$",
      "${2.5}\\mathrm{\\;{Hz}}$",
      "${3.3}\\mathrm{\\;{Hz}}$",
      "${4.0}\\mathrm{\\;{Hz}}$",
      "${5.3}\\mathrm{\\;{Hz}}$",
      "${6.7}\\mathrm{\\;{Hz}}$",
      "${10}\\mathrm{\\;{Hz}}$"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q28",
    "text": "NOTE: questions in this part that are not covered by the ESAT content specification are indicated by a cross through the question number.\n\n\n\n29 When $x = 2$ is substituted in the expression ${x}^{3} + p{x}^{2} + {qx} + {p}^{2}$ the result is 0 . When $x = 1$ is substituted into the same expression, the result is -3.5 . Find all possible value(s) of $p$ .\n\n\n\n$p =  - 1 \\pm  \\frac{\\sqrt{6}}{3}$\n\n\n\n$p = 1$ or $p =  - 3$\n\n\n\n$p = 1$\n\n\n\n$p = 1 \\pm  \\sqrt{7}$\n\n\n\nE there are no values for $p$\n\n\n\n30\n\n\n\n31 A square PQRS is drawn above the $x$ -axis with the side PQ on the $x$ -axis.\n\n\n\nP is the point $\\left( {-5,0}\\right)$ and $Q$ is the point $\\left( {1,0}\\right)$ .\n\n\n\nA circle is drawn inside the square with diameter equal in length to the side of the square.\n\n\n\nWhich one of the following is an equation of the circle?",
    "options": [
      "${x}^{2} + {y}^{2} - {4x} + {6y} + 4 = 0$",
      "${x}^{2} + {y}^{2} - {4x} + {6y} + 9 = 0$",
      "${x}^{2} + {y}^{2} + {4x} - {6y} + 4 = 0$",
      "${x}^{2} + {y}^{2} + {4x} - {6y} + 9 = 0$",
      "${x}^{2} + {y}^{2} - {6x} - {4y} + 9 = 0$",
      "${x}^{2} + {y}^{2} - {6x} + {4y} + 4 = 0$",
      "${x}^{2} + {y}^{2} + {6x} - {4y} + 4 = 0$",
      "${x}^{2} + {y}^{2} + {6x} + {4y} + 9 = 0$"
    ],
    "answer": 6,
    "topic": "advanced_physics"
  },
  {
    "id": "q29",
    "text": "33 The first term of a convergent geometric series is 8 .\n\n\n\nThe fifth term is 2.\n\n\n\nThe sixth term is real and positive.\n\n\n\nWhat is the sum to infinity of this series?\n\n\n\n(The sum to infinity of a convergent geometric series is given by $\\frac{a}{1 - r}$ , where $a$ is the first term and $r$ is the common ratio.)",
    "options": [
      "$8\\left( {1 + \\sqrt{2}}\\right)$",
      "$8\\left( {1 - \\sqrt{2}}\\right)$",
      "$8\\left( {2 + \\sqrt{2}}\\right)$",
      "$8\\left( {2 - \\sqrt{2}}\\right)$",
      "16",
      "$\\frac{8\\sqrt[5]{4}}{\\sqrt[5]{4} - 1}$",
      "$\\frac{8\\sqrt[5]{4}}{5\\sqrt[4]{4} + 1}$"
    ],
    "answer": 2,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q30",
    "text": "35 Tangents are drawn from a point $\\mathrm{P}$ to a circle of radius ${10}\\mathrm{\\;{cm}}$ .\n\n\n\nThe centre of the circle is $\\mathrm{C}$ and the distance $\\mathrm{{PC}}$ is ${20}\\mathrm{\\;{cm}}$ .",
    "options": [
      "$\\frac{100}{3}\\left( {3\\sqrt{3} - \\pi }\\right)$",
      "$\\frac{100}{3}\\left( {3\\sqrt{5} - \\pi }\\right)$",
      "$\\frac{50}{3}\\left( {6\\sqrt{5} - \\pi }\\right)$",
      "$\\frac{50}{3}\\left( {\\sqrt{3} - {2\\pi }}\\right)$",
      "$\\frac{50}{3}\\left( {{2\\pi } - \\sqrt{3}}\\right)$"
    ],
    "answer": 2,
    "topic": "advanced_physics"
  },
  {
    "id": "q31",
    "text": "\n\n<img src=\"/question-images/engaa/29_292_296_1144_553_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhich one of the following is an expression for the shaded area in square centimetres?\n\n\n\n\n\n<img src=\"/question-images/engaa/30_112_150_1431_1393_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nGiven that $7\\cos \\theta  - 3\\tan \\theta \\sin \\theta  = 1$ , which one of the following is true?",
    "options": [
      "$\\cos \\theta  =  - \\frac{3}{5}$ or $- \\frac{1}{2}$",
      "$\\cos \\theta  =  - \\frac{3}{5}$ or $\\frac{1}{2}$",
      "$\\cos \\theta  = \\frac{3}{5}$ or $\\frac{1}{2}$",
      "$\\;\\cos \\theta  = \\frac{3}{5}$ or $- \\frac{1}{2}$"
    ],
    "answer": 0,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q32",
    "text": "\n\n<img src=\"/question-images/engaa/31_112_148_1389_1123_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n39 The complete set of values of $a$ for which the equation $3{x}^{2} = \\left( {a + 2}\\right) x - 3$ has two real distinct roots is\n\n\n\nA no values of $a$\n\n\n\nB $- 4\\sqrt{2} < a < 4\\sqrt{2}$\n\n\n\n$2\\;a <  - 4\\sqrt{2},a > 4\\sqrt{2}$\n\n\n\n$- 4 < a < 8$\n\n\n\n$a <  - 4,a > 8$\n\n\n\n$- 8 < a < 4$\n\n\n\n$a <  - 8,a > 4$\n\n\n\nI all values of $a$\n\n\n\n41 The straight line with equation $y = {mx} + 3$ , where $m > 0,m \\neq  1$ , is perpendicular to the line with equation $y = {px} + 2$\n\n\n\nThe lines cut the $x$ -axis at the points L and M respectively. The length of LM is 5 units.\n\n\n\nWhat is the value of $m + p$ given that $m > 1$ ?",
    "options": [
      "$- \\frac{8}{3}$",
      "$- \\frac{13}{6}$",
      "$\\frac{5}{6}$",
      "$\\frac{13}{6}$",
      "$\\frac{8}{3}$"
    ],
    "answer": 4,
    "topic": "advanced_physics"
  },
  {
    "id": "q33",
    "text": "\n\n<img src=\"/question-images/engaa/32_383_444_963_544_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n43 $f\\left( x\\right)  = {x}^{3} - {a}^{2}x$ where $a$ is a positive constant.\n\n\n\nFind the complete set of values of $x$ for which $f\\left( x\\right)$ is an increasing function.",
    "options": [
      "$x \\leq   - a,x \\geq  a$",
      "$- a \\leq  x \\leq  a$",
      "$x \\leq   - a,0 \\leq  x \\leq  a$",
      "$- a \\leq  x \\leq  0,x \\geq  a$",
      "$x \\leq   - \\frac{a}{3},x \\geq  \\frac{a}{3}$",
      "$\\; - \\frac{a}{3} \\leq  x \\leq  \\frac{a}{3}$",
      "$\\;x \\leq   - \\frac{a}{3},x \\geq  \\frac{a}{3}$",
      "$\\; - \\frac{a}{3} \\leq  x \\leq  \\frac{a}{3}$"
    ],
    "answer": 1,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q34",
    "text": "\n\n<img src=\"/question-images/engaa/33_108_1048_1401_1004_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe curve $y = {x}^{2}$ is translated by the vector $\\left( \\begin{array}{l} 4 \\\\  3 \\end{array}\\right)$ and then reflected in the line $y =  - 1$ Which one of the following is an equation of the resulting curve?",
    "options": [
      "$y =  - 3 - {\\left( x - 4\\right) }^{2}$",
      "$y =  - 3 + {\\left( x + 4\\right) }^{2}$",
      "$y = 3 - {\\left( x + 4\\right) }^{2}$",
      "$y = 3 + {\\left( x - 4\\right) }^{2}$",
      "$y =  - 5 - {\\left( x - 4\\right) }^{2}$",
      "$y =  - 5 + {\\left( x + 4\\right) }^{2}$",
      "$\\;y = 5 - {\\left( x + 4\\right) }^{2}$",
      "$y = 5 + {\\left( x - 4\\right) }^{2}$"
    ],
    "answer": 1,
    "topic": "advanced_physics"
  },
  {
    "id": "q35",
    "text": "\n\n<img src=\"/question-images/engaa/34_87_964_1498_1107_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n7 The complete set of values of $x$ for which $2{x}^{4} - 9{x}^{2} + 4 > 0$ is",
    "options": [
      "$x < \\frac{1}{2},x > 4$",
      "$\\frac{1}{2} < x < 4$",
      "$x <  - 2, - \\frac{1}{\\sqrt{2}} < x < \\frac{1}{\\sqrt{2}},x > 2$",
      "$- 2 < x < \\frac{-1}{\\sqrt{2}},\\frac{1}{\\sqrt{2}} < x < 2$",
      "$- 2 < x < 2$"
    ],
    "answer": 0,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q36",
    "text": "\n\n<img src=\"/question-images/engaa/35_109_805_1420_810_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n49 A cursor starts at the point $\\left( {0,{10}}\\right)$ and moves parallel to the $x$ -axis in the negative direction.\n\n\n\nWhat is the minimum distance parallel to the $y$ -axis between the cursor and the graph of $y = 4{x}^{3} - {12}{x}^{2} - {36x} - {15}?$",
    "options": [
      "0",
      "5",
      "25",
      "69",
      "133"
    ],
    "answer": 4,
    "topic": "advanced_physics"
  },
  {
    "id": "q37",
    "text": "\n\n<img src=\"/question-images/engaa/36_113_775_1414_1291_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n51 What is the area enclosed by the line $x = 7$ and the curve $x = 3{\\left( y - 1\\right) }^{2} + 4$ ?",
    "options": [
      "4",
      "8",
      "10",
      "11",
      "14",
      "20"
    ],
    "answer": 4,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q38",
    "text": "\n\n<img src=\"/question-images/engaa/37_116_747_1447_810_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n53 A curve has equation $y = 3{x}^{4} - 4{x}^{3} - {12}{x}^{2} + {20}$\n\n\n\nWhat is the complete set of values of the constant $k$ for which the equation\n\n\n\n$$\n\n3{x}^{4} - 4{x}^{3} - {12}{x}^{2} + {20} = k\n\n$$\n\n\n\nhas exactly four distinct real roots?",
    "options": [
      "no values of $k$",
      "$- {12} < k < {15}$",
      "${15} < k < {20}$",
      "$\\;k > {20}$",
      "$\\;7 < k < {20}$",
      "all values of $k$"
    ],
    "answer": 0,
    "topic": "advanced_physics"
  }
]$json$
);


INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'ENGAA 2017 — Part A (26 Qs) + Part B (21 Qs)',
  1,
  2017,
  'November',
  80,
  47,
  ARRAY['mathematics', 'physics', 'advanced_mathematics', 'advanced_physics']::text[],
  $json$[
  {
    "id": "q1",
    "text": "1 Evaluate\n\n\n\n$\\frac{{\\left( \\sqrt{12} + \\sqrt{3}\\right) }^{2}}{{\\left( \\sqrt{12} - \\sqrt{3}\\right) }^{2}}$",
    "options": [
      "1",
      "3",
      "$\\frac{5}{3}$",
      "$\\frac{7}{3}$",
      "$3\\sqrt{3}$",
      "9"
    ],
    "answer": 5,
    "topic": "mathematics"
  },
  {
    "id": "q2",
    "text": "2 A car is travelling along a horizontal road in a straight line.\n\n\n\nThe graph is a velocity-time graph for part of the car's journey.\n\n\n\n\n\n<img src=\"/question-images/engaa/42_284_297_1303_610_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nDuring this part of the journey, what is the total distance that the car travels while it is decelerating?",
    "options": [
      "${400}\\mathrm{\\;m}$",
      "${500}\\mathrm{\\;m}$",
      "${550}\\mathrm{\\;m}$",
      "${600}\\mathrm{\\;m}$",
      "${750}\\mathrm{\\;m}$",
      "${1400}\\mathrm{\\;m}$",
      "1800 m",
      "1900 m"
    ],
    "answer": 1,
    "topic": "physics"
  },
  {
    "id": "q3",
    "text": "3 Solve fully the inequality\n\n\n\n$$\n\n2{x}^{2} \\geq  {15} - x\n\n$$",
    "options": [
      "$x \\leq   - 3$",
      "$x \\geq  {2.5}$",
      "$x \\leq   - {1.5},x \\geq  5$",
      "$- {1.5} \\leq  x \\leq  5$",
      "$x \\leq   - 3,x \\geq  {2.5}$",
      "$- 3 \\leq  x \\leq  {2.5}$"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q4",
    "text": "4 When a saucepan of water is heated from below, convection currents form and transfer heat through the liquid.\n\n\n\nHere are three statements about the water as it is heated:\n\n\n\n1 The mass of a fixed volume of the water increases.\n\n\n\n2 The density of a fixed mass of the water decreases.\n\n\n\n3 The volume of a fixed mass of the water increases.\n\n\n\nWhich of these statements help(s) to explain how convection currents are formed?\n\n\n\nA none of them\n\n\n\nB 1 only\n\n\n\n2 only\n\n\n\n3 only\n\n\n\n1 and 2 only\n\n\n\n1 and 3 only\n\n\n\nG 2 and 3 only\n\n\n\nH 1, 2 and 3\n\n\n\n5 The equation gives $y$ in terms of $x$ :\n\n\n\n$$\n\ny = 3{\\left( \\frac{x}{2} - 1\\right) }^{2} - 5\n\n$$\n\n\n\nWhich one of the following is a rearrangement for $x$ in terms of $y$ ?",
    "options": [
      "$x = 2 \\pm  2\\sqrt{\\frac{y - 5}{3}}$",
      "$x = 2 \\pm  2\\sqrt{\\frac{y + 5}{3}}$",
      "$\\;x = 2 \\pm  3\\sqrt{\\frac{y + 5}{3}}$",
      "$\\;x =  - 2 \\pm  2\\sqrt{\\frac{y + 5}{3}}$",
      "$\\;x =  - 2 \\pm  3\\sqrt{\\frac{y + 5}{2}}$",
      "$\\;x =  - 2 + 2{\\left( \\frac{y + 5}{3}\\right) }^{2}$"
    ],
    "answer": 5,
    "topic": "physics"
  },
  {
    "id": "q5",
    "text": "6 An electric motor is used to pull a broken-down car slowly from the road up a ramp on to the back of a breakdown truck.\n\n\n\nThe car has a mass of ${1200}\\mathrm{\\;{kg}}$ and is lifted through a vertical height of ${1.0}\\mathrm{\\;m}$ .\n\n\n\nThe total input energy to the motor is ${28}\\mathrm{\\;{kJ}}$ and it is ${75}\\%$ efficient.\n\n\n\nIn the process of lifting the car, energy is lost to the surroundings from the motor and from other causes.\n\n\n\nWhat is the total energy lost to the surroundings?\n\n\n\n\n\n<img src=\"/question-images/engaa/45_382_618_1128_381_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ )",
    "options": [
      "7.0kJ",
      "9.0kJ",
      "12kJ",
      "16kJ",
      "33kJ"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q6",
    "text": "9\n\n\n\n7 A fruit stall sells apples costing ${\\textsterling x}$ each, and pears costing ${\\textsterling y}$ each.\n\n\n\nSam bought 2 apples and 5 pears, and the total cost of these was ${\\textsterling P}$ .\n\n\n\nLesley bought 3 apples and 2 pears, and the total cost of these was ${\\textsterling Q}$ .\n\n\n\nWhich of the following is an expression for the cost, in pounds (£), of a pear?",
    "options": [
      "$\\frac{{2Q} - {3P}}{3}$",
      "$\\frac{{2Q} - {3P}}{11}$",
      "$\\frac{Q - P}{3}$",
      "$\\frac{Q - P}{11}$",
      "$\\frac{P - Q}{3}$",
      "$\\frac{{3P} - {2Q}}{3}$",
      "$\\frac{{3P} - {2Q}}{11}$"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q7",
    "text": "8 In one type of medical scanner a source is placed inside a patient's body. This source causes pairs of gamma-rays to be emitted simultaneously in opposite directions.\n\n\n\nDetectors on each side of the patient are used to detect the gamma-rays. The distance between the two detectors is ${3.0}\\mathrm{\\;m}$ . When the source is at Q, half-way between the detectors, the two gamma-rays arrive at the same time.\n\n\n\nIn a particular scan the gamma-rays arrive at the two detectors with a time difference of ${4.0} \\times  {10}^{-{10}}\\mathrm{\\;s}$ .\n\n\n\nAssume that, inside the patient, the gamma-rays travel at a speed of ${3.0} \\times  {10}^{8}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$ .\n\n\n\nHow far from Q, half-way between the detectors, is the gamma-ray source?",
    "options": [
      "${6.0}\\mathrm{\\;{mm}}$",
      "${12}\\mathrm{\\;{mm}}$",
      "${24}\\mathrm{\\;{mm}}$",
      "${6.0}\\mathrm{\\;{cm}}$",
      "12cm",
      "24cm"
    ],
    "answer": 5,
    "topic": "mathematics"
  },
  {
    "id": "q8",
    "text": "9 $P$ is directly proportional to $Q$ squared.\n\n\n\nWhen $P$ is 2, $Q$ is 4 .\n\n\n\n$Q$ is inversely proportional to $R$ .\n\n\n\nWhen $Q$ is $2,R$ is 5 .\n\n\n\nWhat is $P$ in terms of $R$ ?",
    "options": [
      "$P = \\frac{5}{R}$",
      "$P = \\frac{5}{4R}$",
      "$P = \\frac{1}{{800}{R}^{2}}$",
      "$P = \\frac{5}{4{R}^{2}}$",
      "$P = \\frac{25}{2{R}^{2}}$",
      "$\\;P = \\frac{800}{{R}^{2}}$",
      "$P = \\frac{{R}^{2}}{50}$"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q9",
    "text": "$H\\;P = \\frac{{25}{R}^{2}}{2}$\n\n\n\n10 When a plutonium-239 nucleus absorbs a neutron it undergoes nuclear fission. One particular fission reaction results in the creation of xenon and zirconium as daughter nuclei. The nuclear equation for this reaction is shown but with some non-zero integers replaced by the letters $w,x$ , $y$ and $z$ .\n\n\n\n$$\n\n{}_{0}^{1}\\mathrm{n} + {}_{94}^{239}\\mathrm{{Pu}} \\rightarrow  {}_{54}^{w}\\mathrm{{Xe}} + {}_{x}^{y}\\mathrm{{Zr}} + z{}_{0}^{1}\\mathrm{n}\n\n$$\n\n\n\nWhich equation is correct?",
    "options": [
      "$w + y = {240}$",
      "$z = {240} - \\left( {w + y}\\right)$",
      "$x = {40} - z$",
      "${94} = {54} + x + 1$",
      "${240} = {54} + x$",
      "${94} = w + y + 1$"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q10",
    "text": "11 Which one of the following is a simplification of\n\n\n\n$$\n\n2 - \\frac{{x}^{2}\\left( {9{x}^{2} - 4}\\right) }{{x}^{3}\\left( {2 - {3x}}\\right) }\n\n$$",
    "options": [
      "$- 1 - \\frac{2}{x}$",
      "$- 1 + \\frac{2}{x}$",
      "$5 - \\frac{2}{x}$",
      "$5 + \\frac{2}{x}$",
      "$5 - \\frac{3}{x}$",
      "$5 + \\frac{3}{x}$"
    ],
    "answer": 1,
    "topic": "physics"
  },
  {
    "id": "q11",
    "text": "12 An electric motor is connected to a constant ${12}\\mathrm{\\;V}$ d.c. supply. The motor is used to lift a mass of ${20}\\mathrm{\\;{kg}}$ by means of a rope and pulley. The mass is lifted vertically through a height of ${6.0}\\mathrm{\\;m}$ in a time of 5.0s. The complete lifting system (motor, rope and pulley) is 80\\% efficient.\n\n\n\n\n\n<img src=\"/question-images/engaa/49_705_306_438_424_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhat is the current in the electric motor?\n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ )",
    "options": [
      "1.6A",
      "2.0A",
      "2.5A",
      "16A",
      "20A",
      "25A"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q12",
    "text": "13 What is the value of $x$ that makes the following expression correct?\n\n\n\n$$\n\n{2}^{3 + {2x}}{4}^{x}{8}^{-x} = 4\\sqrt{2}\n\n$$",
    "options": [
      "-2.25",
      "-1.75",
      "-1.5",
      "-0.5",
      "-0.25"
    ],
    "answer": 4,
    "topic": "physics"
  },
  {
    "id": "q13",
    "text": "14 The nuclide ${}_{Q}^{P}X$ decays to the stable nuclide $Y$ . During this process four particles are emitted: an $\\alpha$ -particle and three ${\\beta }^{ - }$ particles.\n\n\n\nWhich of the following is not a nuclide that could be formed at any stage during this process?\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "mathematics"
  },
  {
    "id": "q14",
    "text": "\n\n\n\n15 There are 100 students in Year 10.\n\n\n\nEach student studies exactly one of French, German, and Spanish.\n\n\n\n$X$ girls study French and there are ${3X}$ girls in total.\n\n\n\n2Y boys study German.\n\n\n\nThere are 35 students studying Spanish of which $Y$ are boys.\n\n\n\nWhich of the following is an expression for the total number of students studying German?",
    "options": [
      "$X + {2Y}$",
      "$X + Y + {35}$",
      "$X + {3Y} - {35}$",
      "${2X} + {2Y}$",
      "${2X} + Y - {35}$",
      "${2X} + {3Y} - {35}$",
      "${2X} + Y + {35}$"
    ],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q15",
    "text": "16 The radius of an iron-56 atom is ${3.0} \\times  {10}^{4}$ times greater than the radius of an iron-56 nucleus. What is the value of density of an iron nucleus",
    "options": [
      "${\\left( {3.0} \\times  {10}^{4}\\right) }^{-3}$",
      "${\\left( {3.0} \\times  {10}^{4}\\right) }^{-2}$",
      "${\\left( {3.0} \\times  {10}^{4}\\right) }^{-1}$",
      "${\\left( {3.0} \\times  {10}^{4}\\right) }^{1}$"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q16",
    "text": "${\\left( {3.0} \\times  {10}^{4}\\right) }^{2}$\n\n\n\n${\\left( {3.0} \\times  {10}^{4}\\right) }^{3}$\n\n\n\n17 An exterior angle of a regular polygon with $n$ sides is ${4}^{ \\circ  }$ larger than an exterior angle of a regular polygon with $\\left( {n + 3}\\right)$ sides.\n\n\n\nWhat is the value of $n$ ?",
    "options": [
      "10",
      "12",
      "15",
      "18",
      "21",
      "24",
      "27"
    ],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q17",
    "text": "18 Graph 1 shows how the displacement of one of the particles of a medium varies with time in seconds as a wave travels through the medium.\n\n\n\n\n\n<img src=\"/question-images/engaa/52_297_274_1261_431_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nGraph 2 shows how the displacement varies with distance in metres at one time for the same wave.\n\n\n\n\n\n<img src=\"/question-images/engaa/52_299_854_1265_462_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhich expression gives the speed in $\\mathrm{m}{\\mathrm{s}}^{-1}$ of the wave?",
    "options": [
      "$\\frac{4\\left( {{x}_{2} - {x}_{1}}\\right) }{3\\left( {{t}_{2} - {t}_{1}}\\right) }$",
      "$\\frac{3\\left( {{x}_{2} - {x}_{1}}\\right) }{2\\left( {{t}_{2} - {t}_{1}}\\right) }$",
      "$\\frac{8\\left( {{x}_{2} - {x}_{1}}\\right) }{3\\left( {{t}_{2} - {t}_{1}}\\right) }$",
      "$\\frac{3\\left( {{x}_{2} - {x}_{1}}\\right) }{{t}_{2} - {t}_{1}}$",
      "$\\frac{6\\left( {{x}_{2} - {x}_{1}}\\right) }{{t}_{2} - {t}_{1}}$"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q18",
    "text": "16\n\n\n\n19 The bearing of a ship $R$ from a lighthouse $L$ is ${220}^{ \\circ  }$\n\n\n\nA canoe $C$ is due North of $R$ .\n\n\n\n$C$ is the same distance from the ship and the lighthouse.\n\n\n\nWhat is the bearing of $L$ from $C$ ?",
    "options": [
      "070 \\textdegree",
      "${080}^{ \\circ  }$",
      "${090}^{ \\circ  }$",
      "100 \\textdegree",
      "140 \\textdegree"
    ],
    "answer": 4,
    "topic": "physics"
  },
  {
    "id": "q19",
    "text": "20 A kettle is designed to work from a car's power socket. The kettle has a power rating of 150 W when a constant voltage of ${12.0}\\mathrm{\\;V}$ d.c. is applied across its element.\n\n\n\nHow much charge passes through the element of this kettle when the voltage of 12.0 V is applied across it for ${20}\\mathrm{\\;{minutes}}$ ?",
    "options": [
      "96C",
      "250C",
      "15000C",
      "36000C",
      "900000C",
      "2160000C"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q20",
    "text": "21 The hands of a 12-hour analogue clock move continuously. When the time on the clock is 4:00, the angle between the minute hand and the hour hand is ${120}^{ \\circ  }$ .\n\n\n\nWhat is the angle between the two hands at 4:40?",
    "options": [
      "80 \\textdegree",
      "100 \\textdegree",
      "110 \\textdegree",
      "120 \\textdegree",
      "140 \\textdegree"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q21",
    "text": "17\n\n\n\n22 A freight train travelling on a straight horizontal track at ${2.0}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$ collides with a passenger train travelling at ${5.0}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$ in the opposite direction. Both trains immediately come to a complete stop on the track.\n\n\n\nThe freight train has three locomotives of 130 tonnes each and seven container wagons of 30 tonnes each. The passenger train has two locomotives of 70 tonnes each and a number of passenger carriages of 10 tonnes each.\n\n\n\nHow many passenger carriages does the passenger train have?",
    "options": [
      "7",
      "9",
      "10",
      "24",
      "46"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q22",
    "text": "23 A pet shop has 4 female rabbits and $x$ male rabbits for sale.\n\n\n\nA customer buys 2 of the rabbits, chosen at random, and each rabbit is equally likely to be chosen.\n\n\n\nThe probability that both the chosen rabbits are male is $\\frac{1}{3}$ .\n\n\n\nWhat is the value of $x$ ?",
    "options": [
      "2",
      "4",
      "6",
      "8",
      "9",
      "11",
      "12"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q23",
    "text": "18\n\n\n\n24 Consider the following three statements about a parachutist of mass ${72}\\mathrm{\\;{kg}}$ falling vertically at a constant velocity of ${5.0}{\\mathrm{\\;{ms}}}^{-1}$ after the parachute has opened:\n\n\n\n1 The parachutist has a constant kinetic energy of ${1800}\\mathrm{\\;J}$ .\n\n\n\n2 The parachutist is losing gravitational potential energy at a rate of ${3600}\\mathrm{\\;J}{\\mathrm{\\;s}}^{-1}$ .\n\n\n\n3 Air resistance and the force of gravity acting on the parachutist are a Newton's third law pair of forces.\n\n\n\nWhich of the statements is/are correct?\n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ )",
    "options": [
      "none of them",
      "1 only",
      "2 only",
      "1 and 3 only",
      "2 and 3 only",
      "1,2 and 3"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q24",
    "text": "\n\n<img src=\"/question-images/engaa/56_626_93_621_685_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe diagram shows a square with side of length $x\\mathrm{\\;{cm}}$ . A circle is drawn with centre O which lies at the mid-point of one of the sides of the square. This side forms part of a diameter of the circle. The circle passes through two corners of the square as shown.\n\n\n\nWhat is the area, in ${\\mathrm{{cm}}}^{2}$ , of the shaded part of the semi-circle?",
    "options": [
      "$\\left( {\\pi  - 1}\\right) {x}^{2}$",
      "$\\;\\left( \\frac{\\pi  - 2}{2}\\right) {x}^{2}$",
      "$\\;\\left( \\frac{{3\\pi } - 4}{4}\\right) {x}^{2}$",
      "$\\;\\left( \\frac{{5\\pi } - 4}{4}\\right) {x}^{2}$",
      "$\\;\\left( \\frac{{5\\pi } - 8}{8}\\right) {x}^{2}$"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q25",
    "text": "26 Two radioactive sources X and Y have half-lives of 3.0 hours and 2.0 hours respectively. The product of the decay of both of the sources is a stable isotope of the element Z.\n\n\n\nSix hours ago a mixture contained the same number of atoms of both X and Y, and no other atoms.\n\n\n\nWhat fraction of the mixture is now made up of atoms of Z?",
    "options": [
      "$\\frac{10}{16}$",
      "$\\frac{11}{16}$",
      "$\\frac{12}{16}$",
      "$\\frac{13}{16}$",
      "$\\frac{14}{16}$",
      "16"
    ],
    "answer": 5,
    "topic": "mathematics"
  },
  {
    "id": "q26",
    "text": "27 A cylindrical hollow metal pipe is ${16}\\mathrm{\\;{cm}}$ long.\n\n\n\nIt has an external diameter of ${10}\\mathrm{\\;{cm}}$ and an internal diameter of $8\\mathrm{\\;{cm}}$ .\n\n\n\nThe density of the metal from which the pipe is made is $8\\mathrm{{grams}}$ per ${\\mathrm{{cm}}}^{3}$ .\n\n\n\n[diagram not to scale]\n\n\n\n\n\n<img src=\"/question-images/engaa/58_450_428_646_489_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhat is the mass of the pipe in grams?",
    "options": [
      "${8\\pi }$",
      "${16\\pi }$",
      "${18\\pi }$",
      "${72\\pi }$",
      "${128\\pi }$",
      "${512\\pi }$",
      "${1152\\pi }$",
      "4608π"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q27",
    "text": "NOTE: questions in this part that are not covered by the ESAT content specification are indicated by a cross through the question number.\n\n\n\n29 Which one of the following is a simplification of\n\n\n\n$$\n\n1 - {\\left( \\frac{3 + \\sqrt{3}}{6 - 2\\sqrt{3}}\\right) }^{2}\n\n$$",
    "options": [
      "$- \\frac{3}{4}$",
      "$\\frac{3}{4}$",
      "$\\frac{3}{4} - \\frac{\\sqrt{3}}{7}$",
      "$- \\frac{3}{4} - \\sqrt{3}$",
      "$\\frac{3}{4} - \\sqrt{3}$",
      "$- \\frac{\\sqrt{3}}{2}$",
      "$\\frac{\\sqrt{3}}{2}$"
    ],
    "answer": 6,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q28",
    "text": "The diagram shows a crane being used on a building site. The crane is perfectly balanced about P.\n\n\n\n\n\n<img src=\"/question-images/engaa/62_378_270_1129_671_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe load is now moved to the left by ${5.0}\\mathrm{\\;m}$ .\n\n\n\nTo keep the crane perfectly balanced about P, how far does the counterweight have to move, and in which direction?\n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ )",
    "options": [
      "${1.0}\\mathrm{\\;m}$ to the left",
      "${1.0}\\mathrm{\\;m}$ to the right",
      "${3.0}\\mathrm{\\;m}$ to the left"
    ],
    "answer": 2,
    "topic": "advanced_physics"
  },
  {
    "id": "q29",
    "text": "${3.0}\\mathrm{\\;m}$ to the right\n\n\n\n${4.0}\\mathrm{\\;m}$ to the left\n\n\n\n4.0m to the right\n\n\n\n26\n\n\n\n${31k}$ is the smallest positive value of $x$ which is a solution to both the equations $2\\sin x + 1 = 0$ and $2\\cos {2x} = 1$\n\n\n\nHow many values of $x$ in the range $0 \\leq  x \\leq  k$ are solutions to at least one of these equations?",
    "options": [
      "0",
      "2",
      "3",
      "4",
      "8"
    ],
    "answer": 2,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q30",
    "text": "27\n\n\n\nA ball is thrown vertically upwards in still air and is then caught at the same height when it comes back down.\n\n\n\nWhich velocity-time graph shows this complete motion?\n\n\n\n(Take upwards as positive, and ignore air resistance.)\n\n\n\n\n\n<img src=\"/question-images/engaa/64_260_435_1343_1145_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhich of the following is a solution to the equation ${3}^{\\left( 2x + 1\\right) } - 6\\left( {3}^{x}\\right)  = 0$ ?",
    "options": [
      "${\\log }_{2}3$",
      "${\\log }_{3}2$",
      "2",
      "${\\log }_{10}2$"
    ],
    "answer": 1,
    "topic": "advanced_physics"
  },
  {
    "id": "q31",
    "text": "$\\frac{2}{3}$\n\n\n\nAn aircraft is climbing at constant speed in a straight line at an angle of ${10}^{ \\circ  }$ to the horizontal. Which statement about the resultant force on the aircraft is correct?\n\n\n\nA It is parallel to its motion.\n\n\n\n3 It is perpendicular to its motion.\n\n\n\nIt is zero.\n\n\n\nIt is equal to its weight.\n\n\n\nIt is equal to the drag acting on the aircraft.\n\n\n\n35 The diagram shows the outline of a keyhole consisting of three straight sides and an arc from a circle.\n\n\n\nThe sides ${PQ}$ and ${RS}$ are both ${18}\\mathrm{\\;{mm}}$ in length and when extended meet at the centre of the circle $O$ forming an angle of $\\frac{\\pi }{6}$ radians.\n\n\n\nThe longer arc from $Q$ to $R$ has length ${22\\pi }\\mathrm{{mm}}$ .\n\n\n\n\n\n<img src=\"/question-images/engaa/66_606_507_323_544_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nWhat is the area, in ${\\mathrm{{mm}}}^{2}$ , of the keyhole as shaded in the diagram?",
    "options": [
      "${121\\pi } + \\frac{841}{4}$",
      "${121\\pi } + \\frac{{841}\\sqrt{3}}{4}$",
      "${132\\pi } + {225}\\sqrt{3}$",
      "${132\\pi } + {225}\\sqrt{3}$",
      "${144\\pi } + {225}$",
      "${144\\pi } + {225}\\sqrt{3}$"
    ],
    "answer": 2,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q32",
    "text": "A horizontal, uniform bar of mass ${60}\\mathrm{\\;{kg}}$ is ${4.0}\\mathrm{\\;m}$ long and is pivoted at one end. The bar is held in equilibrium by a force $F$ at the other end of the bar, acting at an angle of ${60}^{ \\circ  }$ to the horizontal.\n\n\n\n\n\n<img src=\"/question-images/engaa/67_474_299_906_246_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhich expression gives the magnitude of $F$ in newtons?\n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ )",
    "options": [
      "$\\frac{30}{\\sin {60}^{ \\circ  }}$",
      "$\\frac{30}{\\cos {60}^{ \\circ  }}$",
      "$\\frac{60}{\\cos {60}^{ \\circ  }}$",
      "$\\frac{300}{\\sin {60}^{ \\circ  }}$",
      "$\\frac{300}{\\cos {60}^{ \\circ  }}$",
      "$\\frac{600}{\\sin {60}^{ \\circ  }}$",
      "$\\frac{600}{\\cos {60}^{ \\circ  }}$"
    ],
    "answer": 5,
    "topic": "advanced_physics"
  },
  {
    "id": "q33",
    "text": "37 It is given that $y = {8}^{p}$ and $z = {\\left( \\frac{1}{2}\\right) }^{2q}$ where $p$ and $q$ are real numbers.\n\n\n\nWhich of the following expressions is a simplification of ${\\log }_{2}\\left( \\frac{{y}^{3}}{{z}^{2}}\\right)$ ?",
    "options": [
      "${6p} - {4q}$",
      "${6p} + {4q}$",
      "${6p} - {8q}$",
      "${6p} + {8q}$",
      "${9p} - {4q}$",
      "${9p} + {4q}$",
      "${9p} - {8q}$",
      "${9p} + {8q}$"
    ],
    "answer": 3,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q34",
    "text": "A ball starts at a speed of ${40.0}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$ . The ball is subject to a constant deceleration of ${14.4}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-2}$ as it travels a distance of ${20.0}\\mathrm{\\;m}$ in a straight line.\n\n\n\nWhat is the final speed of the ball?\n\n\n\nA ${16.0}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$\n\n\n\n${20.0}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$\n\n\n\n${25.6}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$\n\n\n\n${32.0}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$\n\n\n\n${36.2}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$\n\n\n\nF ${39.3}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$\n\n\n\n39 The graph of the function $y = {x}^{3} + p{x}^{2} + {qx} + 6$ , where $p$ and $q$ are real constants, has a local maximum when $x = 2$ and a local minimum when $x = 4$ .\n\n\n\nWhat are the values of $p$ and $q$ ?\n\n\n\nA $p =  - 3$ and $q =  - 8$\n\n\n\n$p =  - 3$ and $q = 8$\n\n\n\n$p = 3$ and $q =  - 8$\n\n\n\n$p =  - 9$ and $q = {24}$\n\n\n\n$p = 9$ and $q = {24}$\n\n\n\n$p = 9$ and $q =  - {24}$\n\n\n\nA block of mass ${1.0}\\mathrm{\\;{kg}}$ is at rest on a rough horizontal surface. The block is attached by a light inextensible string to a force meter. The other end of the force meter is attached by another light inextensible string via a frictionless pulley to a load of mass ${1.0}\\mathrm{\\;{kg}}$ . The block remains stationary.\n\n\n\n\n\n<img src=\"/question-images/engaa/70_454_338_938_444_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhat is the reading on the force meter?\n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ )",
    "options": [
      "0.0N",
      "0.5N",
      "1.0N",
      "2.0N",
      "5.0N",
      "10 N",
      "20 N"
    ],
    "answer": 3,
    "topic": "advanced_physics"
  },
  {
    "id": "q35",
    "text": "$$\n\n{PQ} = {4x}\\mathrm{\\;{cm}}\n\n$$\n\n\n\n$$\n\n{QR} = \\left( {8 - {3x}}\\right) \\mathrm{{cm}}\n\n$$\n\n\n\n$$\n\n\\angle {PQR} = {60}^{ \\circ  }\n\n$$\n\n\n\nWhat is the maximum value of the area, in ${\\mathrm{{cm}}}^{2}$ , of triangle ${PQR}$ ?",
    "options": [
      "$\\frac{8\\sqrt{3}}{3}$",
      "$\\frac{16}{3}$",
      "$\\frac{{69}\\sqrt{3}}{16}$",
      "$\\frac{{16}\\sqrt{3}}{3}$",
      "$\\frac{32}{3}$",
      "$\\frac{{32}\\sqrt{3}}{3}$"
    ],
    "answer": 4,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q36",
    "text": "An apple of mass ${100}\\mathrm{\\;g}$ , growing on a tree, falls vertically from a height of ${4.0}\\mathrm{\\;m}$ above the ground. It hits the ground with a speed of ${8.0}{\\mathrm{\\;{ms}}}^{-1}$ .\n\n\n\nHow much work does the apple do against resistive forces during its descent, before it hits the ground?\n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ )",
    "options": [
      "0.80 J",
      "3.6J",
      "4.0J",
      "7.2J",
      "8.0J"
    ],
    "answer": 0,
    "topic": "advanced_physics"
  },
  {
    "id": "q37",
    "text": "43 Given that $y = {\\left( 2 + 3x\\right) }^{6}$ , what is the coefficient of ${x}^{3}$ in $\\frac{\\mathrm{d}y}{\\mathrm{\\;d}x}$ ?",
    "options": [
      "240",
      "4320",
      "4860",
      "12960",
      "19440"
    ],
    "answer": 2,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q38",
    "text": "A stone is fired vertically upwards at a speed of ${13}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$ on a still day from the top of a ${6.0}\\mathrm{\\;m}$ high cliff. It then falls down and lands at the bottom of the cliff.\n\n\n\n[diagram not to scale]\n\n\n\n\n\n<img src=\"/question-images/engaa/72_558_833_451_503_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nFrom when the stone passes the top of the cliff on the way down, how long does it take to reach the ground at the bottom of the cliff?\n\n\n\n(air resistance can be ignored; gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ )",
    "options": [
      "0.40 s",
      "$\\frac{6.0}{6.5}\\mathrm{\\;s}$",
      "${0.60}\\mathrm{\\;s}$",
      "$\\sqrt{{1.2}\\mathrm{\\;s}}$",
      "1.3s",
      "2.0s",
      "2.5s",
      "3.0s"
    ],
    "answer": 0,
    "topic": "advanced_physics"
  },
  {
    "id": "q39",
    "text": "A geometric progression has first term equal to 1 and common ratio $\\frac{1}{2}\\sin {2x}$ The sum to infinity of the series is $\\frac{4}{3}$\n\n\n\nFind the possible values of $x$ in the range $\\pi  \\leq  x \\leq  {2\\pi }$",
    "options": [
      "$\\frac{13}{12}\\pi ,\\frac{17}{12}\\pi$",
      "$\\frac{7}{6}\\pi ,\\frac{4}{3}\\pi$",
      "$\\frac{7}{6}\\pi ,\\frac{11}{6}\\pi$",
      "$\\frac{5}{4}\\pi ,\\frac{7}{4}\\pi$",
      "there are no values of $x$ in this range"
    ],
    "answer": 4,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q40",
    "text": "An archer fires an arrow of mass ${0.024}\\mathrm{\\;{kg}}$ vertically upwards from a bow.\n\n\n\nThe graph shows how the force of the bowstring on the arrow varies with distance as the arrow moves upwards.\n\n\n\n\n\n<img src=\"/question-images/engaa/74_487_334_891_634_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe work done by the force of the bowstring is given by the area under the force-distance graph.\n\n\n\nWhen the arrow leaves the bow, what is the kinetic energy of the arrow, and what is the maximum height that it gains from this point?\n\n\n\n(Air resistance can be ignored. The effect of gravity as the arrow is fired is negligible compared to the force of the bowstring. The gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ .)\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "advanced_physics"
  },
  {
    "id": "q41",
    "text": "\n\n\n\n\\HRule\n\n\n\n47 The sequence of numbers ${u}_{1},{u}_{2},{u}_{3},\\ldots ,{u}_{n},\\ldots$ is given by\n\n\n\n$$\n\n{u}_{1} = 2\n\n$$\n\n\n\n$$\n\n{u}_{n + 1} = p{u}_{n} + 3\n\n$$\n\n\n\n where $p$ is an integer.\n\n\n\n The fourth term, ${u}_{4}$ , is equal to -7\n\n\n\n What is the value of ${u}_{1} + {u}_{2} + {u}_{3} + {u}_{4}$ ?\n\n\n\n A -10\n\n\n\n B -2\n\n\n\n C -1\n\n\n\n D 8\n\n\n\n E 26\n\n\n\n\\HRule\n\n\n\nA book of mass $m$ rests on a rough horizontal surface. The surface is now tilted as shown:\n\n\n\n\n\n<img src=\"/question-images/engaa/76_523_270_808_310_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhen the angle of tilt $\\theta$ is ${20}^{ \\circ  }$ , the book slides down the slope at a constant speed.\n\n\n\nWhat is the acceleration of the book down the slope when the angle of tilt is ${25}^{ \\circ  }$ ?\n\n\n\n(gravitational field strength $= g$ )",
    "options": [
      "$g\\left( {\\cos {20}^{ \\circ  } - \\sin {20}^{ \\circ  }\\tan {5}^{ \\circ  }}\\right)$",
      "$g\\left( {\\cos {20}^{ \\circ  } - \\sin {20}^{ \\circ  }\\tan {25}^{ \\circ  }}\\right)$",
      "$g\\left( {\\cos {25}^{ \\circ  } - \\sin {5}^{ \\circ  }\\tan {20}^{ \\circ  }}\\right)$",
      "$g\\left( {\\cos {25}^{ \\circ  } - \\sin {25}^{ \\circ  }\\tan {20}^{ \\circ  }}\\right)$",
      "$g\\left( {\\sin {20}^{ \\circ  } - \\cos {20}^{ \\circ  }\\tan {5}^{ \\circ  }}\\right)$",
      "$g\\left( {\\sin {20}^{ \\circ  } - \\cos {20}^{ \\circ  }\\tan {25}^{ \\circ  }}\\right)$",
      "$g\\left( {\\sin {25}^{ \\circ  } - \\cos {5}^{ \\circ  }\\tan {20}^{ \\circ  }}\\right)$",
      "$g\\left( {\\sin {25}^{ \\circ  } - \\cos {25}^{ \\circ  }\\tan {20}^{ \\circ  }}\\right)$"
    ],
    "answer": 0,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q42",
    "text": "49 Find the complete set of values of $x$ for which\n\n\n\n$$\n\n\\frac{{x}^{3} - 6{x}^{2} + {9x} - 4}{x} > 0\n\n$$",
    "options": [
      "$x < 0,x > 4$",
      "$0 < x < 4$",
      "$0 < x < 1,x > 4$",
      "$x < 0,1 < x < 4$",
      "$x < 1,x > 4$",
      "$1 < x < 4$"
    ],
    "answer": 0,
    "topic": "advanced_physics"
  },
  {
    "id": "q43",
    "text": "A A suitcase of mass $m$ is on a conveyor belt which moves upwards at a constant speed at an angle of $\\theta$ to the horizontal. The coefficient of friction between the suitcase and the slope is $\\mu$ . The suitcase does not slip, even if angle $\\theta$ is made slightly larger.\n\n\n\nWhich expression gives the friction force between the suitcase and the belt?\n\n\n\n(gravitational field strength $= g$ )",
    "options": [
      "${\\mu mg}$",
      "${mg}\\sin \\theta$",
      "${mg}\\cos \\theta$",
      "${\\mu mg}\\sin \\theta$",
      "${\\mu mg}\\cos \\theta$"
    ],
    "answer": 0,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q44",
    "text": "The curve $y = \\sin x$ is stretched by a scale factor of $\\frac{1}{2}$ parallel to the $x$ -axis and then translated by $\\frac{\\pi }{4}$ in the negative $x$ -direction.\n\n\n\nWhat is the equation of the new curve?",
    "options": [
      "$y = \\sin \\left( {\\frac{x}{2} - \\frac{\\pi }{4}}\\right)$",
      "$y = \\sin \\left( {\\frac{x}{2} + \\frac{\\pi }{4}}\\right)$",
      "$y = \\sin \\left( {\\frac{x}{2} - \\frac{\\pi }{8}}\\right)$",
      "$y = \\sin \\left( {\\frac{x}{2} + \\frac{\\pi }{8}}\\right)$",
      "$\\;y = \\sin \\left( {{2x} - \\frac{\\pi }{4}}\\right)$",
      "$\\;y = \\sin \\left( {{2x} + \\frac{\\pi }{4}}\\right)$",
      "$\\;y = \\sin \\left( {{2x} - \\frac{\\pi }{2}}\\right)$",
      "$\\;y = \\sin \\left( {{2x} + \\frac{\\pi }{2}}\\right)$"
    ],
    "answer": 0,
    "topic": "advanced_physics"
  },
  {
    "id": "q45",
    "text": "41\n\n\n\nX The graph shows how the horizontal force on a tennis ball of mass $m$ varies during a shot in a tennis match. The ball is initially travelling horizontally toward the racket with speed $u$ and leaves the racket horizontally travelling in the opposite direction with speed $v$ .\n\n\n\n\n\n<img src=\"/question-images/engaa/78_603_311_670_414_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhich expression gives the magnitude of the momentum of the ball as it leaves the racket?",
    "options": [
      "$F\\left( {{t}_{2} - {t}_{1}}\\right)$",
      "$F\\left( {{t}_{2} - {t}_{1}}\\right)  - {mu}$",
      "$F\\left( {{t}_{2} - {t}_{1}}\\right)  + {mu}$",
      "${mv} - {mu}$"
    ],
    "answer": 0,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q46",
    "text": "$F{t}_{2} - {mu}$\n\n\n\n3 The equations of two straight lines are $y = 3 + \\left( {2{p}^{2} - p}\\right) x$ and $y = 7 + \\left( {p - 2}\\right) x$ , where $p$ is a real constant.\n\n\n\nFor certain values of $p$ , the two lines are perpendicular.\n\n\n\nWhich of the following numbers is closest to the greatest such value of $p$ ?",
    "options": [
      "2.00",
      "1.75",
      "1.50",
      "1.00",
      "-0.25",
      "-0.50"
    ],
    "answer": 0,
    "topic": "advanced_physics"
  },
  {
    "id": "q47",
    "text": "( The acceleration versus time graph is for a ball dropped from rest, falling vertically and bouncing on the ground.\n\n\n\n\n\n<img src=\"/question-images/engaa/79_288_268_1295_979_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe time of contact with the ground can be ignored.\n\n\n\nWhat is the speed of the ball immediately after hitting the ground for the first time, and what is the maximum height reached by the ball after the first bounce?\n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ )\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "advanced_mathematics"
  }
]$json$
);


INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'ENGAA 2018 — Part A (28 Qs) + Part B (11 Qs)',
  1,
  2018,
  'November',
  80,
  39,
  ARRAY['mathematics', 'physics', 'advanced_mathematics', 'advanced_physics']::text[],
  $json$[
  {
    "id": "q1",
    "text": "1 A group of drivers, consisting of 200 women and 300 men, was asked if they passed their driving test at the first attempt.\n\n\n\nAltogether 167 of the group said they passed at the first attempt.\n\n\n\nOf the women, 143 said they did not pass at the first attempt.\n\n\n\nHow many of the men said they passed at the first attempt?",
    "options": [
      "10",
      "24",
      "33",
      "57",
      "110",
      "133",
      "157"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q2",
    "text": "2 An unstable nucleus X becomes a stable nucleus Y after a succession of decays, during which a total of 5 alpha particles and 2 beta $\\left( {\\beta }^{ - }\\right)$ particles are emitted.\n\n\n\nHow many fewer protons does nucleus Y contain than nucleus X?",
    "options": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16",
      "18",
      "20"
    ],
    "answer": 1,
    "topic": "physics"
  },
  {
    "id": "q3",
    "text": "3 A cuboid has sides of length $x,\\sqrt{2}x$ and ${2x}$ , measured in cm.\n\n\n\nThe volume, in ${\\mathrm{{cm}}}^{3}$ , of the cuboid is numerically equal to twice the total surface area, in ${\\mathrm{{cm}}}^{2}$ , of the cuboid.\n\n\n\nWhat is the value of $x$ ?",
    "options": [
      "10",
      "$6 + 2\\sqrt{2}$",
      "5",
      "$3 + \\sqrt{2}$",
      "$\\frac{5}{2}$",
      "$\\frac{3}{2} + \\frac{1}{2}\\sqrt{2}$"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q4",
    "text": "4 The diagram shows three resistors ${R}_{1},{R}_{2}$ and ${R}_{3}$ connected in series with a battery of constant voltage. The resistance of each resistor and the corresponding current are also shown.\n\n\n\n\n\n<img src=\"/question-images/engaa/84_624_267_436_527_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nResistor ${R}_{3}$ is now removed and the circuit is reconnected.\n\n\n\nWhat is the new current in the circuit?",
    "options": [
      "0.20 A",
      "0.22A",
      "0.33A",
      "0.40A",
      "0.50A",
      "2.0A",
      "6.0A"
    ],
    "answer": 1,
    "topic": "physics"
  },
  {
    "id": "q5",
    "text": "5 The line joining the points with coordinates $\\left( {p,p - 1}\\right)$ and $\\left( {1 - p,{2p}}\\right)$ is parallel to the line with equation ${2x} + {3y} + 1 = 0$\n\n\n\nWhat is the value of $p$ ?",
    "options": [
      "-1",
      "$- \\frac{1}{7}$",
      "$\\frac{1}{8}$",
      "1",
      "$\\frac{5}{4}$",
      "2",
      "5"
    ],
    "answer": 6,
    "topic": "mathematics"
  },
  {
    "id": "q6",
    "text": "6 When travelling in a vacuum, visible light has a wavelength between ${400}\\mathrm{\\;{nm}}$ and ${700}\\mathrm{\\;{nm}}$ .\n\n\n\nThe speed of light in a vacuum is ${3.0} \\times  {10}^{8}{\\mathrm{\\;{ms}}}^{-1}$ .\n\n\n\nWhat can be concluded about ultraviolet radiation from this information?",
    "options": [
      "It has a maximum frequency of ${2.7} \\times  {10}^{14}\\mathrm{\\;{Hz}}$",
      "It has a maximum frequency of ${4.3} \\times  {10}^{14}\\mathrm{\\;{Hz}}$",
      "It has a maximum frequency of ${7.5} \\times  {10}^{14}\\mathrm{\\;{Hz}}$",
      "It has a maximum frequency of ${1.0} \\times  {10}^{15}\\mathrm{\\;{Hz}}$",
      "It has a minimum frequency of ${2.7} \\times  {10}^{14}\\mathrm{\\;{Hz}}$",
      "It has a minimum frequency of ${4.3} \\times  {10}^{14}\\mathrm{\\;{Hz}}$",
      "It has a minimum frequency of ${7.5} \\times  {10}^{14}\\mathrm{\\;{Hz}}$",
      "It has a minimum frequency of ${1.0} \\times  {10}^{15}\\mathrm{\\;{Hz}}$"
    ],
    "answer": 6,
    "topic": "physics"
  },
  {
    "id": "q7",
    "text": "A rectangle PQRS is drawn inside a circle, with its vertices on the circumference of the circle.\n\n\n\n\n\n<img src=\"/question-images/engaa/86_579_232_570_565_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nThe ratio of the length of ${PQ}$ to the length of ${QR}$ is 2:1\n\n\n\nThe area of the rectangle PQRS is ${96}{\\mathrm{\\;{cm}}}^{2}$ .\n\n\n\nWhat is the radius, in cm, of the circle?",
    "options": [
      "$\\sqrt{6}$",
      "3",
      "$3\\sqrt{2}$",
      "$2\\sqrt{15}$",
      "$4\\sqrt{6}$",
      "12",
      "${12}\\sqrt{2}$",
      "$8\\sqrt{15}$"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q8",
    "text": "8 A filament lamp working at its operating voltage converts electrical energy at a rate of ${100}\\mathrm{\\;W}$ .\n\n\n\nThe lamp has an efficiency of 5.0\\%.\n\n\n\nHow much energy is wasted by the lamp in 10 minutes?",
    "options": [
      "50 J",
      "950J",
      "1000 J",
      "3000 J",
      "57000J",
      "60000J"
    ],
    "answer": 4,
    "topic": "physics"
  },
  {
    "id": "q9",
    "text": "\n\n<img src=\"/question-images/engaa/88_583_162_559_416_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nAt a cinema, drinks are sold in regular and large sizes.\n\n\n\nThe cups for these are mathematically similar.\n\n\n\nThe ratio of the heights of the cups and the ratio of the depths of the drinks are both 4:5\n\n\n\nThe volume of drink in a regular size cup is ${320}{\\mathrm{\\;{cm}}}^{3}$ .\n\n\n\nWhat is the volume, in ${\\mathrm{{cm}}}^{3}$ , of drink in a large size cup?",
    "options": [
      "384",
      "400",
      "500",
      "576",
      "625",
      "640"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q10",
    "text": "10 The potential difference across the motor in an electric car is ${400}\\mathrm{\\;V}$ and the current in the motor is 1250 A.\n\n\n\nThe car accelerates along a horizontal road from rest for ${4.0}\\mathrm{\\;s}$ .\n\n\n\nThe efficiency of the overall system is 45\\%.\n\n\n\nWhat is the kinetic energy of the car at the end of the 4.0 s?\n\n\n\n(Ignore energy losses due to air resistance and due to friction between the tyres and the road.)",
    "options": [
      "225000 J",
      "500000 J",
      "900000 J",
      "1250000 J",
      "2000000 J"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q11",
    "text": "11 The straight lines\n\n\n\n$$\n\n{5x} + {2y} = {20}\n\n$$\n\n\n\n$$\n\ny = {3x} - {23}\n\n$$\n\n\n\n$$\n\nx = 0\n\n$$\n\n\n\nenclose a region with area $K$ square units.\n\n\n\nWhat is the value of $K$ ?",
    "options": [
      "39",
      "78",
      "99",
      "129",
      "198",
      "258"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q12",
    "text": "12 The momentum of a small object moving in a straight line is ${24}\\mathrm{\\;{kg}}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$ and its kinetic energy is ${96}\\mathrm{\\;J}$ .\n\n\n\nWhat is the mass of the object?",
    "options": [
      "${3.0}\\mathrm{\\;{kg}}$",
      "${4.0}\\mathrm{\\;{kg}}$",
      "${6.0}\\mathrm{\\;{kg}}$",
      "8.0kg",
      "12kg"
    ],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q13",
    "text": "13 A scale model of a cylindrical pillar is to be made.\n\n\n\nThe full-sized pillar has a volume of ${12\\pi }{\\mathrm{m}}^{3}$ .\n\n\n\nThe model will use a length scale of 1:40\n\n\n\nThe model is to be a solid cylinder made of a plastic which has a density of $\\frac{4}{3}\\mathrm{\\;g}{\\mathrm{\\;{cm}}}^{-3}$ .\n\n\n\nWhat is the mass of the model in grams?",
    "options": [
      "$\\frac{9}{640}\\pi$",
      "$\\frac{1}{40}\\pi$",
      "${40\\pi }$",
      "$\\frac{1125}{8}\\pi$",
      "${250\\pi }$",
      "${10000\\pi }$",
      "${225000\\pi }$",
      "400000π"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q14",
    "text": "14 A radioactive isotope decays in a single step to a stable isotope.\n\n\n\nA radiation detector is placed very near to a sample of the radioactive isotope in a laboratory. The count rate on the detector changes as time elapses. The graph shows how the measured count rate changes with time.\n\n\n\n\n\n<img src=\"/question-images/engaa/91_336_372_1056_825_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhat is the background count rate and what is the half-life of the isotope?\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q15",
    "text": "\n\n\n\n\n\n<img src=\"/question-images/engaa/92_590_167_552_533_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nPQRST is a regular pentagon.\n\n\n\nRSU is an equilateral triangle.\n\n\n\nWhat is the size of angle STU?",
    "options": [
      "${48}^{ \\circ  }$",
      "${54}^{ \\circ  }$",
      "${60}^{ \\circ  }$",
      "66 \\textdegree",
      "84 \\textdegree"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q16",
    "text": "16 A rock falling vertically experiences an air resistance force of 12 N at an instant when its acceleration is ${2.0}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-2}$ downwards.\n\n\n\nWhat is the mass of the rock?\n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ )",
    "options": [
      "${1.0}\\mathrm{\\;{kg}}$",
      "${1.2}\\mathrm{\\;{kg}}$",
      "${1.5}\\mathrm{\\;{kg}}$",
      "${6.0}\\mathrm{\\;{kg}}$",
      "${10}\\mathrm{\\;{kg}}$",
      "${12}\\mathrm{\\;{kg}}$",
      "${15}\\mathrm{\\;{kg}}$",
      "60 kg"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q17",
    "text": "17 The original price of an item is $p$\n\n\n\nThe price is increased by 125\\%\n\n\n\nThe increased price is then decreased by ${40}\\%$ to $q$\n\n\n\nThe relationship between $p$ and $q$ can be expressed as ${mp} = q$\n\n\n\nWhat is the value of $m$ ?",
    "options": [
      "$\\frac{7}{20}$",
      "$\\frac{17}{20}$",
      "$\\frac{33}{20}$",
      "$\\frac{37}{20}$"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q18",
    "text": "18 A transverse wave with an amplitude of 4.0 cm and a frequency of 10 Hz travels along a rope at a speed of ${2.4}{\\mathrm{\\;{ms}}}^{-1}$ .\n\n\n\nWhat is the total distance travelled by a particle in the rope in a time of ${20}\\mathrm{\\;s}$ ?",
    "options": [
      "${2.4}\\mathrm{\\;m}$",
      "${4.8}\\mathrm{\\;m}$",
      "${8.0}\\mathrm{\\;m}$",
      "16 m",
      "32m",
      "48m"
    ],
    "answer": 4,
    "topic": "physics"
  },
  {
    "id": "q19",
    "text": "19 $Q$ is $5\\mathrm{\\;{km}}$ away from $P$ on a bearing of ${065}^{ \\circ  }$\n\n\n\n$R$ is $5\\mathrm{\\;{km}}$ away from $Q$ on a bearing of ${155}^{ \\circ  }$\n\n\n\nWhat is the bearing of $P$ from $R$ ?",
    "options": [
      "070 \\textdegree",
      "110 \\textdegree",
      "225 \\textdegree",
      "270 \\textdegree",
      "290 \\textdegree",
      "315 \\textdegree",
      "335 \\textdegree"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q20",
    "text": "20 A student places a measuring cylinder on a balance. She pours a volume $V$ of water into the measuring cylinder, and finds that the mass of the measuring cylinder and water together is 290g.\n\n\n\nShe then empties the measuring cylinder and dries it before putting it back on the balance.\n\n\n\nShe now pours the same volume $V$ of olive oil into the measuring cylinder, and finds that the mass of the measuring cylinder and olive oil together is ${270}\\mathrm{\\;g}$ .\n\n\n\nWhat is the mass of the measuring cylinder?\n\n\n\n(densities: olive oil $= {0.90}\\mathrm{\\;g}{\\mathrm{\\;{cm}}}^{-3}$ ; water $= {1.0}\\mathrm{\\;g}{\\mathrm{\\;{cm}}}^{-3}$ )",
    "options": [
      "18g",
      "20g",
      "90 g",
      "180g",
      "200g"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q21",
    "text": "\n\n<img src=\"/question-images/engaa/96_659_161_406_696_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nThe line segment ${RT}$ is a tangent at the point $S$ to a circle with centre $O$\n\n\n\n$Q$ and $P$ are points on the circumference of the circle such that ${QS} = {QP}$\n\n\n\nAngle PST $= {75}^{ \\circ  }$\n\n\n\nWhat is the size of angle QSO?",
    "options": [
      "15 \\textdegree",
      "30 \\textdegree",
      "37.5 \\textdegree",
      "45 \\textdegree",
      "52.5 \\textdegree",
      "60 \\textdegree",
      "67.5 \\textdegree",
      "75 \\textdegree"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q22",
    "text": "A skydiver of weight ${1000}\\mathrm{\\;N}$ falls vertically.\n\n\n\nThe distance-time graph for the skydiver is shown below.\n\n\n\n$$\n\nF = k{v}^{2}\n\n$$\n\n\n\n\n\n<img src=\"/question-images/engaa/97_210_299_1197_1013_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe air resistance $F$ (in N) acting on the skydiver travelling at velocity $v$ (in $\\mathrm{m}{\\mathrm{s}}^{-1}$ ) is given by the equation\n\n\n\nwhere $k$ (in $\\mathrm{N}{\\mathrm{m}}^{-2}{\\mathrm{\\;s}}^{2}$ ) is a constant.\n\n\n\nWhat is the numerical value of $k$ for the skydiver?",
    "options": [
      "0.050",
      "0.40",
      "0.63",
      "2.5",
      "20"
    ],
    "answer": 1,
    "topic": "physics"
  },
  {
    "id": "q23",
    "text": "\n\n<img src=\"/question-images/engaa/98_650_162_424_419_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nThe vertical height $h\\mathrm{\\;{cm}}$ of an isosceles triangle is $3\\mathrm{\\;{cm}}$ longer than the base length of $b\\mathrm{\\;{cm}}$ .\n\n\n\nThe sloping side is of length $s\\mathrm{\\;{cm}}$ .\n\n\n\nThe area of the triangle is ${14}{\\mathrm{\\;{cm}}}^{2}$ .\n\n\n\nThere is one value of $s$ which satisfies these conditions.\n\n\n\nWithin which range does this value of $s$ lie?",
    "options": [
      "$5 < s < 6$",
      "$6 < s < 7$",
      "$7 < s < 8$",
      "$8 < s < 9$",
      "$9 < s < {10}$",
      "${10} < s < {11}$"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q24",
    "text": "24 A neutron is absorbed by a uranium-235 ( ${}_{92}^{235}\\mathrm{U}$ ) nuclide.\n\n\n\nThe resulting nuclide undergoes fission to produce a bromine-88 ( ${}_{35}^{88}\\mathrm{{Br}}$ ) nuclide, a lanthanum-145 nuclide and some neutrons.\n\n\n\nThe lanthanum-145 nuclide is radioactive and emits a beta $\\left( {\\beta }^{ - }\\right)$ particle.\n\n\n\nHow many neutrons are emitted in the fission reaction and how many protons are there in the nuclide formed by the decay of lanthanum-145?\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q25",
    "text": "\n\n\n\n25 The first five terms of a sequence in order are:\n\n\n\n$$\n\n\\begin{array}{lllll} 2 & {17} & {42} & {77} & {122} \\end{array}\n\n$$\n\n\n\nThe ${n}^{\\text{ th }}$ term of this sequence is $p{n}^{2} + q$ where $p$ and $q$ are integers.\n\n\n\nWhat is the value of $\\frac{p - q}{p + q}$ ?",
    "options": [
      "$\\frac{1}{4}$",
      "$\\frac{1}{2}$",
      "1",
      "$\\frac{23}{17}$",
      "73",
      "2",
      "4",
      "14"
    ],
    "answer": 6,
    "topic": "mathematics"
  },
  {
    "id": "q26",
    "text": "The diagram shows a circuit containing a battery and three identical resistors X, Y and Z.\n\n\n\n\n\n<img src=\"/question-images/engaa/101_566_232_599_439_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe total power supplied by the battery is ${18}\\mathrm{\\;W}$ .\n\n\n\nWhat is the power dissipated as heat in resistor X?",
    "options": [
      "1.5W",
      "2.0W",
      "3.0 W",
      "4.5 W",
      "6.0W",
      "8.0W",
      "12W"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q27",
    "text": "27 A bag contains 6 red and 6 green sweets. The sweets are identical apart from their colour.\n\n\n\nA child takes a sweet at random from the bag.\n\n\n\nIf the sweet is red, the child stops taking sweets.\n\n\n\nIf the sweet is green, it is not replaced and the child takes another sweet.\n\n\n\nThis continues until a red sweet is taken at which point the child stops taking sweets.\n\n\n\nWhat is the probability that the child takes more green sweets than red sweets?",
    "options": [
      "$\\frac{3}{22}$",
      "$\\frac{5}{22}$",
      "$\\frac{3}{11}$",
      "$\\frac{1}{2}$",
      "$\\frac{8}{11}$",
      "$\\frac{17}{22}$"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q28",
    "text": "28 Three detectors X, Y and Z are separated by large distances.\n\n\n\nEach of the detectors records a seismic wave from the same earthquake whose epicentre (source) is very close to the surface of the Earth.\n\n\n\nThe wave travels out from the epicentre at ${4.0}\\mathrm{\\;{km}}{\\mathrm{\\;s}}^{-1}$ .\n\n\n\nDetectors $\\mathrm{X}$ and $\\mathrm{Y}$ start to detect the wave at the same time, but detector $\\mathrm{Z}$ starts to detect it one minute later.\n\n\n\nWhich of the following statements must be correct?\n\n\n\n1 The epicentre is at the midpoint of the line XY.\n\n\n\n2 Z is equidistant from X and Y.\n\n\n\n3 Z is no more than 240 km away from X and from Y.",
    "options": [
      "none of them",
      "1 only",
      "2 only",
      "3 only",
      "1 and 2 only",
      "1 and 3 only",
      "2 and 3 only",
      "1,2 and 3"
    ],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q29",
    "text": "NOTE: questions in this part that are not covered by the ESAT content specification are indicated by a cross through the question number.\n\n\n\n29 Curve $C$ has equation $y = 9 - {x}^{2}$\n\n\n\nLine $L$ has equation $y = 5$\n\n\n\nWhat is the area enclosed between $C$ and $L$ ?\n\n\n\nA $\\;\\begin{array}{r} {32} \\\\  3 \\end{array}$\n\n\n\nB62\n\n\n\n$$\n\n\\text{ C 32 }\n\n$$\n\n\n\n$$\n\n\\text{ D 32 }\n\n$$\n\n\n\n$$\n\n\\text{ E 152 }\n\n$$\n\n\n\n\n\n<img src=\"/question-images/engaa/105_112_967_1431_843_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nHow many solutions of the equation $2{\\sin }^{3}\\theta  = \\sin \\theta$ lie in the interval $- \\frac{\\pi }{2} \\leq  \\theta  \\leq  \\pi$ ?",
    "options": [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "answer": 0,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q30",
    "text": "\n\n<img src=\"/question-images/engaa/106_104_761_1450_948_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n3 The line $y = x + k$ , where $k$ is a constant, is a tangent to the curve $y = 3{x}^{2} - {2x} + 1$ What is the value of $k$ ?\n\n\n\nA -2\n\n\n\nB -1\n\n\n\nc 4\n\n\n\n1\n\n\n\n3\n\n\n\n1\n\n\n\n2\n\n\n\nF 4\n\n\n\nG 1\n\n\n\nH 2\n\n\n\n\n\n<img src=\"/question-images/engaa/107_108_1034_1438_874_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe angle of sector $S$ is increased by $\\frac{\\pi }{20}$ radians to form sector $T$ .\n\n\n\nThe total area of sector $T$ is $\\frac{25}{2}\\pi {\\mathrm{{cm}}}^{2}$ .\n\n\n\nWhat is the total arc length, in cm, of sector $T$ ?",
    "options": [
      "$\\frac{9\\sqrt{5}}{10}\\pi$",
      "$\\frac{5\\sqrt{2}}{4}\\pi$",
      "${2\\pi }$",
      "$\\frac{5}{2}\\pi$"
    ],
    "answer": 3,
    "topic": "advanced_physics"
  },
  {
    "id": "q31",
    "text": "\n\n<img src=\"/question-images/engaa/109_102_137_1396_1164_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n37 In a particular arithmetic progression:\n\n\n\n\\begin{itemize}\n\n\\item the ${13}^{\\text{ th }}$ term is six times the ${1}^{\\text{ st }}$ term\n\n\\end{itemize}\n\n\n\n\\begin{itemize}\n\n\\item the ${11}^{\\text{ th }}$ term is 1 less than twice the ${5}^{\\text{ th }}$ term\n\n\\end{itemize}\n\n\n\nWhat is the ${3}^{\\text{ rd }}$ term of the progression?",
    "options": [
      "-14.5",
      "-11",
      "29",
      "3.5",
      "11",
      "14.5"
    ],
    "answer": 2,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q32",
    "text": "\n\n<img src=\"/question-images/engaa/110_99_132_1465_1270_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n39 The first three terms of a geometric progression, whose terms are all greater than zero, are $\\left( {p - 2}\\right) ,\\left( {{2p} + 2}\\right)$ and $\\left( {{5p} + {14}}\\right)$\n\n\n\nWhat is the fifth term of the progression?",
    "options": [
      "324",
      "486",
      "1250",
      "1458",
      "3888"
    ],
    "answer": 3,
    "topic": "advanced_physics"
  },
  {
    "id": "q33",
    "text": "\n\n<img src=\"/question-images/engaa/111_110_132_1409_717_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n41 Evaluate\n\n\n\n$$\n\n{\\log }_{2}\\left( \\begin{array}{l} 5 \\\\  4 \\end{array}\\right)  + {\\log }_{2}\\left( \\begin{array}{l} 6 \\\\  5 \\end{array}\\right)  + {\\log }_{2}\\left( \\begin{array}{l} 7 \\\\  6 \\end{array}\\right)  + \\cdots  + {\\log }_{2}\\left( \\begin{array}{l} {64} \\\\  {63} \\end{array}\\right)\n\n$$",
    "options": [
      "-2",
      "3",
      "4",
      "6",
      "${\\log }_{2}\\left( {3!}\\right)$",
      "${\\log }_{2}{60}$"
    ],
    "answer": 4,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q34",
    "text": "\n\n<img src=\"/question-images/engaa/112_96_141_1476_835_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n43 Circle $C$ has equation ${\\left( x + 3\\right) }^{2} + {\\left( y - 2\\right) }^{2} = 5$\n\n\n\nThe length of the tangent from the circle $C$ to the point $P$ is $5/3$\n\n\n\nWhat is the shortest distance from $P$ to $C$ ?",
    "options": [
      "5",
      "5 $\\sqrt{3} + \\sqrt{5}$",
      "3 $\\sqrt{5}$",
      "5",
      "10"
    ],
    "answer": 1,
    "topic": "advanced_physics"
  },
  {
    "id": "q35",
    "text": "45 The points $A\\left( {-3,2}\\right) ,B\\left( {1,3}\\right)$ and $C\\left( {-1,u}\\right)$ are such that the distances ${AC}$ and ${AB}$ are related by:\n\n\n\n$$\n\n{AC} = {2AB}\n\n$$\n\n\n\nWhat are the possible values of $u$ ?",
    "options": [
      "2 and -6",
      "-2 and 6",
      "6 and -10"
    ],
    "answer": 2,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q36",
    "text": "-6 and 10\n\n\n\n$2 + 2\\sqrt{13}$ and $2 - 2\\sqrt{13}$\n\n\n\n$- 3 + 2\\sqrt{13}$ and $- 3 - 2\\sqrt{13}$\n\n\n\n\n\n<img src=\"/question-images/engaa/113_111_908_1440_1234_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n47 What is the coefficient of ${x}^{3}$ in the expansion of ${\\left( 1 - 2x\\right) }^{5}{\\left( 1 + 2x\\right) }^{5}$ ?",
    "options": [
      "-6400",
      "-640",
      "-80",
      "0",
      "80",
      "800",
      "960"
    ],
    "answer": 2,
    "topic": "advanced_physics"
  },
  {
    "id": "q37",
    "text": "\\HRule\n\n\n\n$$\n\n{\\int }_{0}^{2}{x}^{m}\\mathrm{\\;d}x = \\begin{matrix} {16}\\sqrt{2} \\\\  7 \\end{matrix}\n\n$$\n\n\n\nand\n\n\n\n$$\n\n{\\int }_{0}^{2}{x}^{m + 1}\\mathrm{\\;d}x = \\begin{matrix} {32}\\sqrt{2} \\\\  9 \\end{matrix}\n\n$$\n\n\n\nwhat is the value of $m$ ?\n\n\n\n\\HRule",
    "options": [
      "$- \\begin{matrix} {11} \\\\  2 \\end{matrix}$",
      "$- \\begin{matrix} 9 \\\\  2 \\end{matrix}$",
      "$- \\frac{22}{29}$"
    ],
    "answer": 2,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q38",
    "text": "$$\n\n\\text{ D }\n\n$$\n\n\n\n$$\n\n\\text{ E }\n\n$$\n\n\n\n$$\n\n\\text{ F 2 }\n\n$$\n\n\n\n\n\n<img src=\"/question-images/engaa/115_111_1267_1374_796_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n\\HRule\n\n\n\n$$\n\n{f}^{\\prime }\\left( x\\right)  = {ax} + g\\left( x\\right)\n\n$$\n\n\n\nwhere $a$ is a constant.\n\n\n\nGiven that\n\n\n\n$$\n\n{\\int }_{2}^{4}g\\left( x\\right) \\mathrm{d}x = {12}\n\n$$\n\n\n\nand\n\n\n\n$$\n\nf\\left( 4\\right)  = {18} + f\\left( 2\\right)\n\n$$\n\n\n\nwhat is the value of $a$ ?\n\n\n\n\\HRule",
    "options": [
      "1",
      "3",
      "5",
      "6",
      "15"
    ],
    "answer": 3,
    "topic": "advanced_physics"
  },
  {
    "id": "q39",
    "text": "53 The dimensions of a solid cuboid, in cm, are $x,{2x}$ and $y$\n\n\n\nThe volume of the cuboid is ${576}{\\mathrm{\\;{cm}}}^{3}$ .\n\n\n\nAt this volume, the surface area of the cuboid has its maximum value.\n\n\n\nWhat is the area, in ${\\mathrm{{cm}}}^{2}$ , of the face that has the largest area?\n\n\n\n2",
    "options": [
      "$2{\\left( {288}\\right) }^{3}$",
      "72",
      "96",
      "432",
      "$4{\\left( {144}\\right) }^{3}$"
    ],
    "answer": 4,
    "topic": "advanced_mathematics"
  }
]$json$
);


INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'ENGAA 2019 — Part A (20 Qs) + Part B (10 Qs)',
  1,
  2019,
  'November',
  80,
  30,
  ARRAY['mathematics', 'physics', 'advanced_mathematics', 'advanced_physics']::text[],
  $json$[
  {
    "id": "q1",
    "text": "1 Evaluate\n\n\n\n${\\left( \\sqrt{7} + \\sqrt{3}\\right) }^{2} - {\\left( \\sqrt{7} - \\sqrt{3}\\right) }^{2}$",
    "options": [
      "0",
      "$2\\sqrt{7}$",
      "$4\\sqrt{7}$",
      "$2\\sqrt{21}$",
      "10",
      "$4\\sqrt{21}$",
      "20"
    ],
    "answer": 5,
    "topic": "mathematics"
  },
  {
    "id": "q2",
    "text": "\n\n<img src=\"/question-images/engaa/121_376_233_971_821_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe diode is connected in series with a resistor and a 6.0 V battery. The current in the circuit is 8.0mA.\n\n\n\nWhat is the resistance of the resistor?\n\n\n\n(Assume that the battery has negligible resistance.)",
    "options": [
      "${0.15\\Omega }$",
      "${0.60\\Omega }$",
      "${0.75\\Omega }$",
      "${4.8\\Omega }$",
      "${150\\Omega }$",
      "${600\\Omega }$",
      "750Ω"
    ],
    "answer": 5,
    "topic": "physics"
  },
  {
    "id": "q3",
    "text": "3 The equation gives $y$ in terms of $x$ :\n\n\n\n$$\n\ny = 3 - 4{\\left( 1 - \\frac{x}{2}\\right) }^{2}\n\n$$\n\n\n\nWhich one of the following is a rearrangement for $x$ in terms of $y$ ?",
    "options": [
      "$x =  - 2 \\pm  2\\sqrt{\\frac{3 - y}{4}}$",
      "$x =  - 2 \\pm  2\\sqrt{\\frac{4 - y}{3}}$",
      "$\\;x = 1 \\pm  \\sqrt{\\frac{3 - y}{4}}$",
      "$\\;x = 1 \\pm  2\\sqrt{\\frac{3 - y}{4}}$",
      "$\\;x = 2 \\pm  2\\sqrt{\\frac{3 - y}{4}}$",
      "$\\;x = 2 \\pm  2\\sqrt{\\frac{4 - y}{3}}$",
      "$x = 2 \\pm  2\\sqrt{\\frac{3 + y}{4}}$"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q4",
    "text": "Two electromagnetic waves P and Q travel in a vacuum and the ratio of their wavelengths is:\n\n\n\n$$\n\n\\frac{\\text{ wavelength of }\\mathrm{P}}{\\text{ wavelength of }\\mathrm{Q}} = {1.0} \\times  {10}^{8}\n\n$$\n\n\n\nWhich row in the table shows the ratio of their speeds, the ratio of their frequencies, and identifies the possible natures of P and Q?\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q5",
    "text": "\n\n\n\n5 The resistance to the motion of a car is directly proportional to the square of the speed of the car.\n\n\n\nThe car increases its speed by 20\\%.\n\n\n\nWhat is the percentage increase in the resistance to the motion of the car?",
    "options": [
      "20\\%",
      "24\\%",
      "44\\%",
      "120\\%",
      "224\\%",
      "240\\%",
      "400\\%"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q6",
    "text": "6 A water-tight cylinder with a thin, freely moving piston contains ${2.0} \\times  {10}^{-3}{\\mathrm{\\;m}}^{3}$ of trapped air at atmospheric pressure of ${1.0} \\times  {10}^{5}\\mathrm{\\;{Pa}}$ .\n\n\n\nWhen the cylinder is submerged in water of constant density ${1000}\\mathrm{\\;{kg}}{\\mathrm{\\;m}}^{-3}$ , the volume of air in the cylinder decreases to ${4.0} \\times  {10}^{-4}{\\mathrm{\\;m}}^{3}$ .\n\n\n\nThe piston is at a depth $h$ below the surface of the water and the water surface is open to the atmosphere.\n\n\n\nWhat is the depth $h$ ?\n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ ; assume that the temperature of the air remains constant and that air is an ideal gas)",
    "options": [
      "${40}\\mathrm{\\;m}$",
      "${50}\\mathrm{\\;m}$",
      "${60}\\mathrm{\\;m}$",
      "${400}\\mathrm{\\;m}$",
      "${500}\\mathrm{\\;m}$",
      "${600}\\mathrm{\\;m}$"
    ],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q7",
    "text": "7 The equation of a curve is $y = p{x}^{2} + {qx}$ where $p$ and $q$ are constants.\n\n\n\nThe curve passes through the points $\\left( {2,6}\\right)$ and $\\left( {4, - 4}\\right)$ .\n\n\n\nWhat is the value of $q - p$ ?",
    "options": [
      "1",
      "2",
      "5",
      "6",
      "9",
      "16"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q8",
    "text": "8 The secondary coil of an ideal, 100\\% efficient transformer is connected to a resistor by cables of total resistance ${1500\\Omega }$ . The current in the primary coil is ${4.0}\\mathrm{\\;A}$ . There are 240 turns in the primary coil and 4800 turns in the secondary coil.\n\n\n\nWhat is the power produced as heat in the cables?",
    "options": [
      "60 W",
      "300W",
      "6000 W",
      "24000W",
      "120000W",
      "9600000W"
    ],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q9",
    "text": "9 Which of the following is a simplification of\n\n\n\n$$\n\n4 - \\frac{x\\left( {{3x} + 1}\\right) }{{x}^{2}\\left( {3{x}^{2} - {2x} - 1}\\right) }\n\n$$",
    "options": [
      "$\\frac{{12}{x}^{3} - 8{x}^{2} - {7x} - 1}{x\\left( {{3x} - 1}\\right) \\left( {x - 1}\\right) }$",
      "$\\frac{4{x}^{2} + {4x} - 1}{x\\left( {x + 1}\\right) }$",
      "$\\frac{4{x}^{2} + {4x} + 1}{x\\left( {x + 1}\\right) }$",
      "$\\frac{4{x}^{2} - {4x} - 1}{x\\left( {x - 1}\\right) }$",
      "$\\frac{4{x}^{2} - {4x} + 1}{x\\left( {x - 1}\\right) }$",
      "$\\frac{{12}{x}^{3} - 8{x}^{2} - x + 1}{x\\left( {{3x} - 1}\\right) \\left( {x - 1}\\right) }$"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q10",
    "text": "10 Two tanks of water are connected by a solid cylindrical copper bar of length $l$ and diameter $d$ .\n\n\n\nThe bar is insulated.\n\n\n\nOne tank contains water at ${90}^{ \\circ  }\\mathrm{C}$ and the other tank contains water at temperature $\\theta$ .\n\n\n\n\n\n<img src=\"/question-images/engaa/126_251_379_1213_366_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nFor which of the following conditions is thermal energy conducted along the bar at the lowest rate?\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q11",
    "text": "\n\n\n\n11 The ball for a garden game is a solid sphere of volume ${192}{\\mathrm{\\;{cm}}}^{3}$ .\n\n\n\nFor the children's version of the game the ball is a solid sphere made of the same material, but the radius is reduced by 25\\%.\n\n\n\nWhat is the volume, in ${\\mathrm{{cm}}}^{3}$ , of the children’s ball?",
    "options": [
      "48",
      "81",
      "96",
      "108",
      "144"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q12",
    "text": "12 The radioactive isotope $X$ becomes the stable isotope $Y$ after a succession of decays involving only the emission of alpha and beta $\\left( {\\beta }^{ - }\\right)$ particles.\n\n\n\nDuring the decay of one nucleus from $\\mathrm{X}$ to $\\mathrm{Y}$ , a total of seven particles are emitted. It is known that more of these particles are alpha particles than beta particles.\n\n\n\nThe atomic number of $X$ is $Z$ and the mass number of $X$ is $A$ .\n\n\n\nWhich row in the table could give the atomic number and the mass number of Y?\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q13",
    "text": "\n\n\n\nThe diagram shows a right-angled triangle, with sides of length $x + 4,{2x} + 2$ and ${3x}$ , all in cm.\n\n\n\n\n\n<img src=\"/question-images/engaa/128_615_237_495_478_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nWhat is the area, in ${\\mathrm{{cm}}}^{2}$ , of the triangle?",
    "options": [
      "10",
      "12",
      "28",
      "36",
      "40",
      "54",
      "70"
    ],
    "answer": 5,
    "topic": "mathematics"
  },
  {
    "id": "q14",
    "text": "14 The kinetic energy of an object of mass ${4.0}\\mathrm{\\;{kg}}$ , travelling in a straight line, increases from 32J to 200J in 3.0 seconds due to a constant resultant force.\n\n\n\nWhat is the value of this resultant force?",
    "options": [
      "2.0N",
      "4.0N",
      "8.0N",
      "24N",
      "28 N",
      "56 N"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q15",
    "text": "15 PR and QS are the diagonals of a rhombus PQRS.\n\n\n\n$$\n\n{PR} = \\left( {{3x} + 2}\\right) \\mathrm{{cm}}\n\n$$\n\n\n\n$$\n\n{QS} = \\left( {8 - {2x}}\\right) \\mathrm{{cm}}\n\n$$\n\n\n\nThe area of PQRS is ${11}{\\mathrm{\\;{cm}}}^{2}$ .\n\n\n\nWhat is the difference, in $\\mathrm{{cm}}$ , between the two possible lengths of PR?",
    "options": [
      "$2\\frac{2}{3}$",
      "$4\\frac{1}{2}$",
      "$5\\frac{1}{3}$",
      "8",
      "14"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q16",
    "text": "\n\n<img src=\"/question-images/engaa/130_484_229_759_570_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe reading on the voltmeter is ${1.0}\\mathrm{\\;V}$ .\n\n\n\nWhat is the voltage across the battery?",
    "options": [
      "4.0V",
      "5.0V",
      "6.0V",
      "7.0V",
      "8.0V",
      "9.0V",
      "10V"
    ],
    "answer": 4,
    "topic": "physics"
  },
  {
    "id": "q17",
    "text": "\n\n<img src=\"/question-images/engaa/131_362_163_1002_396_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe diagram shows two congruent right-angled triangles ${PQR}$ and ${TSR}$ with right angles at $Q$ and $S$ , respectively.\n\n\n\n$$\n\n{PQ} = {TS} = 3\\mathrm{\\;{cm}}\n\n$$\n\n\n\n$$\n\n{QR} = {SR} = 4\\mathrm{\\;{cm}}\n\n$$\n\n\n\nPRT is a straight line.\n\n\n\nWhat is the length, in cm, of QS?",
    "options": [
      "4",
      "$3\\sqrt{2}$",
      "5.2",
      "$4\\sqrt{2}$",
      "6.4",
      "8.2",
      "10"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q18",
    "text": "18 A block is designed with a cylindrical channel to accommodate a hot-water pipe. The block is 100 cm long and it has a square cross-section of side 22.0 cm with a cylindrical hole in the middle, as shown in the diagram:\n\n\n\n\n\n<img src=\"/question-images/engaa/132_407_302_917_634_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nThe diameter of the cylindrical hole is ${14.0}\\mathrm{\\;{cm}}$ and the density of the material from which the block is made is ${0.100}\\mathrm{g}{\\mathrm{{cm}}}^{-3}$ .\n\n\n\nWhat is the mass of the block?\n\n\n\n$$\n\n\\text{ (take }\\pi \\text{ to be }\\frac{22}{7}\\text{ ) }\n\n$$",
    "options": [
      "${1.32}\\mathrm{\\;{kg}}$",
      "${3.30}\\mathrm{\\;{kg}}$",
      "${13.2}\\mathrm{\\;{kg}}$",
      "${33.0}\\mathrm{\\;{kg}}$",
      "132kg",
      "330kg",
      "1320kg",
      "3300kg"
    ],
    "answer": 1,
    "topic": "physics"
  },
  {
    "id": "q19",
    "text": "\n\n<img src=\"/question-images/engaa/133_580_160_568_407_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nA solid pyramid has a square base of side length ${12}\\mathrm{\\;{cm}}$ and a vertical height of $h\\mathrm{\\;{cm}}$ .\n\n\n\nThe volume of the pyramid, in ${\\mathrm{{cm}}}^{3}$ , is equal to the total surface area of the pyramid, in ${\\mathrm{{cm}}}^{2}$ .\n\n\n\nWhat is the value of $h$ ?\n\n\n\n(volume of pyramid $= \\frac{1}{3} \\times$ area of base $\\times$ vertical height)",
    "options": [
      "$\\frac{72}{35}$",
      "$2\\sqrt{3}$",
      "6",
      "$\\frac{144}{23}$",
      "8",
      "$2\\sqrt{21}$"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q20",
    "text": "20 A sample initially contains equal numbers of atoms of a radioactive isotope X and a stable isotope Y.\n\n\n\nIsotope X has a half-life of 3 years and decays in a single stage to the stable isotope Y.\n\n\n\nWhat is the ratio\n\n\n\nnumber of atoms of X : number of atoms of Y\n\n\n\nin the sample 6 years later?\n\n\n\nA The sample contains only isotope Y.",
    "options": [
      "1:7",
      "1:4",
      "1:3",
      "7:4"
    ],
    "answer": 1,
    "topic": "physics"
  },
  {
    "id": "q21",
    "text": "NOTE: questions in this part that are not covered by the ESAT content specification are indicated by a cross through the question number.\n\n\n\n21 Find the area of the shape bounded by the four lines:\n\n\n\n$$\n\n{2y} + x = 4\n\n$$\n\n\n\n$$\n\nx =  - 6\n\n$$\n\n\n\n$$\n\nx = 0\n\n$$\n\n\n\n$$\n\ny = 0\n\n$$",
    "options": [
      "4",
      "12",
      "21",
      "25",
      "27",
      "30"
    ],
    "answer": 2,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q22",
    "text": "\n\n<img src=\"/question-images/engaa/136_104_1010_1461_856_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n23 The curve\n\n\n\n$$\n\ny = {x}^{3} + p{x}^{2} + {qx} + r\n\n$$\n\n\n\nhas a local maximum when $x =  - 1$ and a local minimum when $x = 3$\n\n\n\nWhat is the value of $p$ ?",
    "options": [
      "-9",
      "-3",
      "-1",
      "1",
      "3",
      "9"
    ],
    "answer": 1,
    "topic": "advanced_physics"
  },
  {
    "id": "q23",
    "text": "\n\n<img src=\"/question-images/engaa/137_30_952_1538_1114_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n25 When simplified, $\\frac{1}{{\\left( 1 - \\sqrt{2}\\right) }^{3}}$ is written in the form $a + b\\sqrt{2}$ where $a$ and $b$ are integers. What is the value of $b$ ?",
    "options": [
      "-7",
      "-5",
      "-1",
      "1",
      "5",
      "7"
    ],
    "answer": 1,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q24",
    "text": "\n\n<img src=\"/question-images/engaa/138_68_846_1455_773_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n$7\\cos x + \\tan x\\sin x = 5$\n\n\n\nwhere ${0}^{ \\circ  } < x < {90}^{ \\circ  }$\n\n\n\nWhat are the possible values of $\\tan x$ ?",
    "options": [
      "$\\frac{1}{2}\\text{ or }\\frac{1}{3}$",
      "$\\frac{1}{\\sqrt{3}}$ or $\\frac{1}{2\\sqrt{2}}$",
      "$\\sqrt{3}$ or $2\\sqrt{2}$",
      "3 or 2"
    ],
    "answer": 3,
    "topic": "advanced_physics"
  },
  {
    "id": "q25",
    "text": "29 An equilateral triangle of side $8\\mathrm{\\;{cm}}$ is drawn so that its vertices lie on the circumference of a circle, as shown in the diagram.\n\n\n\n\n\n<img src=\"/question-images/engaa/140_631_271_469_465_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhat is the total of the three areas shaded in the diagram, in ${\\mathrm{{cm}}}^{2}$ ?",
    "options": [
      "$8\\left( {{2\\pi } - 3}\\right)$",
      "${24}\\left( {\\pi  - \\sqrt{3}}\\right)$",
      "${48}\\left( {{4\\pi } - \\sqrt{3}}\\right)$",
      "$\\frac{16}{3}\\left( {{4\\pi } - 6 - 3\\sqrt{3}}\\right)$",
      "$\\frac{16}{3}\\left( {{4\\pi } - 3\\sqrt{3}}\\right)$"
    ],
    "answer": 4,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q26",
    "text": "31 Which one of the following is the real solution of the equation\n\n\n\n$$\n\n3 \\times  {5}^{{2x} + 1} - {5}^{x} - 2 = 0\n\n$$",
    "options": [
      "$x = {\\log }_{5}\\left( \\begin{array}{l} 1 \\\\  3 \\end{array}\\right)$",
      "$x = {\\log }_{5}\\left( \\begin{array}{l} 2 \\\\  5 \\end{array}\\right)$",
      "$x = {\\log }_{5}\\left( \\begin{array}{l} 3 \\\\  5 \\end{array}\\right)$",
      "$x = {\\log }_{5}\\left( \\begin{array}{l} 2 \\\\  3 \\end{array}\\right)$",
      "$\\;x = {\\log }_{5}\\left( \\begin{array}{l} 5 \\\\  3 \\end{array}\\right)$",
      "$x = {\\log }_{5}\\left( \\begin{array}{l} 5 \\\\  2 \\end{array}\\right)$"
    ],
    "answer": 1,
    "topic": "advanced_physics"
  },
  {
    "id": "q27",
    "text": "$$\n\n{\\int }_{-2}^{2}{2f}\\left( x\\right) \\mathrm{d}x + {\\int }_{2}^{4}f\\left( x\\right) \\mathrm{d}x = 4\n\n$$\n\n\n\n\n\n<img src=\"/question-images/engaa/141_119_1003_1455_690_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nand also:\n\n\n\n$$\n\n{\\int }_{-2}^{2}{5f}\\left( x\\right) \\mathrm{d}x - {\\int }_{-2}^{4}f\\left( x\\right) \\mathrm{d}x = 7\n\n$$\n\n\n\nFind the value of ${\\int }_{2}^{4}f\\left( x\\right) \\mathrm{d}x$",
    "options": [
      "$\\frac{1}{3}$",
      "$\\frac{11}{7}$",
      "$\\frac{11}{6}$",
      "$\\frac{13}{6}$",
      "$\\frac{13}{3}$"
    ],
    "answer": 0,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q28",
    "text": "Given that\n\n\n\n$$\n\nf\\left( x\\right)  = {\\int }_{0}^{x}{\\left( 3 + 2t\\right) }^{7}\\mathrm{\\;d}t\n\n$$\n\n\n\nwhat is the coefficient of ${x}^{4}$ in the expansion of $f\\left( x\\right)$ in powers of $x$ ?",
    "options": [
      "70",
      "162",
      "3024",
      "5670",
      "15120",
      "22680"
    ],
    "answer": 4,
    "topic": "advanced_physics"
  },
  {
    "id": "q29",
    "text": "\n\n<img src=\"/question-images/engaa/143_114_999_1415_808_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n37 The three internal angles in a triangle are $\\alpha ,\\beta$ and $\\theta$ , and\n\n\n\n$3\\tan \\alpha  - 2\\sin \\beta  = 2$\n\n\n\n$5\\tan \\alpha  + 6\\sin \\beta  = 8$\n\n\n\nWhat is the value of $\\theta$ in degrees?",
    "options": [
      "15",
      "45",
      "75",
      "105",
      "135"
    ],
    "answer": 3,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q30",
    "text": "\n\n<img src=\"/question-images/engaa/145_113_144_1459_1232_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n39 Find the complete set of values of $x$ for which\n\n\n\n$$\n\n{x}^{3} - 2{x}^{2} - {7x} - 4 > 0\n\n$$",
    "options": [
      "$x <  - 1$",
      "$x >  - 1$",
      "$- 1 < x < 4$",
      "$x <  - 1$ or $x > 4$",
      "$x < 4$",
      "$x > 4$"
    ],
    "answer": 5,
    "topic": "advanced_physics"
  }
]$json$
);


INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'ENGAA 2020 — Part A (20 Qs) + Part B (10 Qs)',
  1,
  2020,
  'November',
  80,
  30,
  ARRAY['mathematics', 'physics', 'advanced_mathematics', 'advanced_physics']::text[],
  $json$[
  {
    "id": "q1",
    "text": "1 The admission charge to a cinema is different for adults and children.\n\n\n\nAdmission for 2 adults and 3 children costs £20.\n\n\n\nAdmission for 4 adults and 4 children costs £34.\n\n\n\nWhat does admission cost for 6 adults and 2 children?",
    "options": [
      "£27",
      "£29",
      "£33",
      "£39",
      "£44",
      "£848",
      "£72"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q2",
    "text": "2 A soldering iron has a copper tip of mass 2.0 g.\n\n\n\nThe tip is heated with ${30}\\mathrm{\\;W}$ of thermal power. In ${50}\\mathrm{\\;s}$ , the temperature of the tip increases by ${200}^{ \\circ  }\\mathrm{C}$ .\n\n\n\nHow much energy is transferred from the tip to the surroundings in this time?\n\n\n\n(specific heat capacity of copper $= {400}\\mathrm{\\;J}{\\mathrm{\\;{kg}}}^{-1}{}^{ \\circ  }{\\mathrm{C}}^{-1}$ )",
    "options": [
      "160J",
      "500J",
      "1340 J",
      "1500 J",
      "1660 J",
      "1840 J",
      "2500 J"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q3",
    "text": "3 A fair spinner has eight equal sections.\n\n\n\nEach section has one number written on it, as shown.\n\n\n\n\n\n<img src=\"/question-images/engaa/149_573_302_576_577_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe spinner is spun twice, and the two numbers scored are added. What is the probability that the sum of the two numbers is 5?",
    "options": [
      "$\\frac{1}{8}$",
      "$\\frac{5}{8}$",
      "$\\frac{1}{16}$",
      "$\\frac{3}{16}$",
      "$\\frac{25}{64}$",
      "$\\frac{55}{64}$"
    ],
    "answer": 0,
    "topic": "mathematics"
  },
  {
    "id": "q4",
    "text": "4 Uranium-238 $\\left( {{}_{92}^{238}\\mathrm{U}}\\right)$ decays by a series of alpha and beta $\\left( {\\beta }^{ - }\\right)$ emissions to become the stable isotope lead-206 $\\left( {{}_{82}^{206}\\mathrm{\\;{Pb}}}\\right)$ .\n\n\n\nHow many beta $\\left( {\\beta }^{ - }\\right)$ particles are emitted in the decay of one uranium-238 nucleus to lead-206?",
    "options": [
      "6",
      "8",
      "10",
      "12",
      "14",
      "16"
    ],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q5",
    "text": "5 Consider the four lines with the following equations.\n\n\n\n${12x} + {6y} = 3$\n\n\n\n$2\\;{9y} = {3x} - 4$\n\n\n\n${32y} = {6x} + 3$\n\n\n\n$4\\;{4x} + {6y} - 9 = 0$\n\n\n\nWhich two lines are perpendicular?",
    "options": [
      "1 and 2",
      "1 and 3",
      "1 and 4",
      "2 and 3",
      "2 and 4",
      "3 and 4"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q6",
    "text": "6 A dc electricity transmission system uses an undersea cable to send electricity from one country to another. On a particular day, the first country supplies electricity at a voltage of ${400}\\mathrm{{kV}}$ and 2000 A to the transmission system. The second country receives electricity from the transmission system at ${160}\\mathrm{{kV}}$ and ${4000}\\mathrm{\\;A}$ .\n\n\n\nWhat is the percentage efficiency of the system and how much energy is wasted every minute?\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q7",
    "text": "\n\n\n\n7 Find the sum of the solutions of\n\n\n\n$$\n\n2{\\left( \\frac{x}{4} + 3\\right) }^{2} - \\left( {\\frac{x}{4} + 3}\\right)  - {36} = 0\n\n$$",
    "options": [
      "2",
      "$\\frac{3}{2}$",
      "-4",
      "-13",
      "-22",
      "-26",
      "-34"
    ],
    "answer": 5,
    "topic": "mathematics"
  },
  {
    "id": "q8",
    "text": "8 Two fixed horizontal metal rails are side by side and ${12}\\mathrm{\\;{cm}}$ apart. The rails are connected to a dc power supply by a switch that is initially open.\n\n\n\nA freely moveable metal rod of length ${20}\\mathrm{\\;{cm}}$ is placed on the rails as shown in the diagram. The diagram shows the arrangement seen from above.\n\n\n\nThe angle between the rod and the rails is ${90}^{ \\circ  }$ .\n\n\n\n\n\n<img src=\"/question-images/engaa/152_559_480_599_387_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe whole arrangement is placed in a uniform magnetic field of magnitude ${0.50}\\mathrm{\\;T}$ that is directed perpendicularly into the page.\n\n\n\nThe moveable rod has a weight of ${0.40}\\mathrm{\\;N}$ .\n\n\n\nThe switch is now closed. As a result, there is a current of 2.4 A in the circuit and the rod moves.\n\n\n\nWhat is the initial magnitude of the acceleration of the rod and what is its direction?\n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ )\n\n\n\n$$\n\n{\\left( 2x + 3\\right) }^{2} - {\\left( x - 3\\right) }^{2}\n\n$$\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q9",
    "text": "\n\n\n\nis written in the form $p{\\left( x + q\\right) }^{2} + r$ , where $p,q$ and $r$ are constants, what is the value of $r$ ?",
    "options": [
      "-27",
      "-9",
      "0",
      "3",
      "15"
    ],
    "answer": 0,
    "topic": "mathematics"
  },
  {
    "id": "q10",
    "text": "10 Two trolleys are moving towards each other along a straight horizontal track.\n\n\n\nOne trolley has mass ${8.0}\\mathrm{\\;{kg}}$ and is travelling to the right at ${4.0}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$ .\n\n\n\nThe other trolley has mass ${2.0}\\mathrm{\\;{kg}}$ and is travelling to the left at ${1.0}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$ .\n\n\n\nWhen the trolleys collide they stick together.\n\n\n\nHow much kinetic energy is transferred to other forms of energy in the collision?",
    "options": [
      "2.0 J",
      "18 J",
      "20 J",
      "28 J",
      "35J",
      "40 J",
      "45 J",
      "65J"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q11",
    "text": "11 The number of pairs of winter boots sold on a day is inversely proportional to the cube of the outside temperature on that day, measured in ${}^{ \\circ  }\\mathrm{C}$ .\n\n\n\nOn a day when the outside temperature is $8{}^{ \\circ  }\\mathrm{C},{250}$ pairs of boots are sold.\n\n\n\nThe next day, when the outside temperature is ${x}^{ \\circ  }\\mathrm{C}$ , the number of pairs of boots sold is 700\\% more than on the previous day.\n\n\n\nWhat is the value of $x$ ?",
    "options": [
      "2",
      "4",
      "$8\\sqrt[3]{7}$",
      "16"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q12",
    "text": "12 A car of mass ${800}\\mathrm{\\;{kg}}$ travels in a straight line along a horizontal road.\n\n\n\nThe car accelerates non-uniformly from rest for 5.0 seconds and then moves at constant speed, as shown in the distance-time graph:\n\n\n\n\n\n<img src=\"/question-images/engaa/155_300_370_1123_560_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhat is the average resultant force acting on the car over the time for which it is accelerating?",
    "options": [
      "320N",
      "480N",
      "${640}\\mathrm{\\;N}$",
      "${960}\\mathrm{\\;N}$",
      "1600N",
      "3200N",
      "4800N"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q13",
    "text": "13 In a sale, all prices are reduced by 25\\%.\n\n\n\nA customer calculates the pre-sale price of a bicycle incorrectly by increasing the marked sale price by 25\\%.\n\n\n\nThe customer's calculated pre-sale price is incorrect by £15.\n\n\n\nWhat is the correct pre-sale price of the bicycle?",
    "options": [
      "£180",
      "£195",
      "£210",
      "£225",
      "£240"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q14",
    "text": "14 P and Q are two fixed points on the surface of the ocean which are ${6.0}\\mathrm{\\;m}$ apart.\n\n\n\nAn ocean wave travels in the direction P to Q.\n\n\n\nThe wave has a frequency of ${0.50}\\mathrm{\\;{Hz}}$ and travels at a constant speed.\n\n\n\nA wave peak passes Q at time $t = 0\\mathrm{\\;s}$ .\n\n\n\nThe next wave peak travelling towards Q passes $P$ at time $t = {0.80}\\mathrm{\\;s}$ .\n\n\n\nWhat is the speed of the wave?",
    "options": [
      "${2.1}{\\mathrm{\\;{ms}}}^{-1}$",
      "${3.4}{\\mathrm{\\;{ms}}}^{-1}$",
      "${5.0}{\\mathrm{\\;{ms}}}^{-1}$",
      "${7.5}{\\mathrm{\\;{ms}}}^{-1}$",
      "${20}{\\mathrm{\\;{ms}}}^{-1}$"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q15",
    "text": "\n\n<img src=\"/question-images/engaa/157_600_164_542_613_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nIn the diagram, QS is perpendicular to PR.\n\n\n\n${PS} = x\\mathrm{\\;{cm}}$\n\n\n\n${PQ} = {ycm}$\n\n\n\n${QR} = {z\\mathrm{\\;{cm}}}$\n\n\n\nangle ${QRS} = {61}^{ \\circ  }$\n\n\n\nPSR is a straight line.\n\n\n\nWhich one of the following is an expression for the length $z$ , in $\\mathrm{{cm}}$ ?",
    "options": [
      "$\\sqrt{{y}^{2} + {x}^{2}}\\sin {61}^{ \\circ  }$",
      "$\\sqrt{{y}^{2} - {x}^{2}}\\sin {61}^{ \\circ  }$",
      "$\\sqrt{{y}^{2} - {x}^{2}}\\cos {61}^{ \\circ  }$",
      "$\\frac{\\sqrt{{y}^{2} + {x}^{2}}}{\\sin {61}^{ \\circ  }}$",
      "$\\frac{\\sqrt{{y}^{2} - {x}^{2}}}{\\sin {61}^{ \\circ  }}$",
      "$\\frac{\\sqrt{{y}^{2} + {x}^{2}}}{\\cos {61}^{ \\circ  }}$",
      "$\\frac{\\sqrt{{y}^{2} - {x}^{2}}}{\\cos {61}^{ \\circ  }}$"
    ],
    "answer": 5,
    "topic": "mathematics"
  },
  {
    "id": "q16",
    "text": "16 A parachutist of mass ${80.0}\\mathrm{\\;{kg}}$ drops from a plane travelling at ${40.0}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1},{2000}\\mathrm{\\;m}$ above the Earth's surface.\n\n\n\nThe parachutist hits the ground at a speed of ${5.00}{\\mathrm{\\;{ms}}}^{-1}$ .\n\n\n\nHow much work is done by the parachutist against drag forces during the fall?\n\n\n\n(Take the Earth’s gravitational field strength to be ${10.0}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ .)",
    "options": [
      "1535000 J",
      "1624000J",
      "1649000J",
      "1663000J",
      "1726000J"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q17",
    "text": "17 Two vertices of a square are at $\\left( {1,1}\\right)$ and $\\left( {3,5}\\right)$ .\n\n\n\nWhat is the difference between the perimeters of the largest and smallest possible squares that can be drawn with these points as two of their vertices?",
    "options": [
      "0",
      "$4\\sqrt{3}\\left( {2 - \\sqrt{2}}\\right)$",
      "$4\\sqrt{3}\\left( {\\sqrt{2} - 1}\\right)$",
      "$4\\sqrt{5}\\left( {2 - \\sqrt{2}}\\right)$",
      "$4\\sqrt{5}\\left( {\\sqrt{2} - 1}\\right)$",
      "$4\\sqrt{13}\\left( {2 - \\sqrt{2}}\\right)$",
      "$4\\sqrt{13}\\left( {\\sqrt{2} - 1}\\right)$",
      "$4\\sqrt{3}\\sqrt{5}\\left( {2 - \\sqrt{2}}\\right)$"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q18",
    "text": "18 A light spring of unstretched length ${0.10}\\mathrm{\\;m}$ has a spring constant of ${20}\\mathrm{\\;N}{\\mathrm{\\;m}}^{-1}$ . The spring is suspended so that it is vertical and a load of mass ${0.050}\\mathrm{\\;{kg}}$ is attached to the end of the spring.\n\n\n\nThe load is pulled vertically downwards until the length of the spring is ${0.30}\\mathrm{\\;m}$ . The load is then released.\n\n\n\nWhat is the speed of the load at the instant that the spring returns to its unstretched length? (gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ ; assume that resistive forces are negligible)",
    "options": [
      "$0\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$",
      "${4.0}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$",
      "${6.0}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$",
      "${12}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$",
      "${16}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$",
      "$\\sqrt{6}{\\mathrm{\\;{ms}}}^{-1}$",
      "$\\sqrt{12}{\\mathrm{\\;{ms}}}^{-1}$",
      "$\\sqrt{30}{\\mathrm{\\;{ms}}}^{-1}$"
    ],
    "answer": 6,
    "topic": "physics"
  },
  {
    "id": "q19",
    "text": "19 The quadratic equation $2{x}^{2} - {px} - 4 = 0$ , where $p$ is a positive constant, has two solutions that differ by 6 .\n\n\n\nWhat is the value of $p$ ?",
    "options": [
      "2",
      "$4\\sqrt{7}$",
      "12",
      "$4\\sqrt{11}$",
      "$4\\sqrt{34}$",
      "$6\\sqrt{30}$"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q20",
    "text": "20 A rocket travelling in space is burning its fuel at a constant rate. By expelling the burnt fuel through a nozzle, the engine is applying a constant force to the rocket.\n\n\n\nWhat is happening to the magnitude of the acceleration of the rocket?",
    "options": [
      "It is increasing at an increasing rate.",
      "It is increasing at a constant rate.",
      "It is increasing at a decreasing rate.",
      "It is not changing.",
      "It is decreasing at an increasing rate.",
      "It is decreasing at a constant rate.",
      "It is decreasing at a decreasing rate."
    ],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q21",
    "text": "NOTE: questions in this part that are not covered by the ESAT content specification are indicated by a cross through the question number.\n\n\n\n21 $\\left( {x - 1}\\right)$ and $\\left( {x - 2}\\right)$ are both factors of ${x}^{4} + a{x}^{3} + b{x}^{2} - {12x} + 4$ What are the values of $a$ and $b$ ?",
    "options": [
      "$a =  - 6$ and $b =  - {23}$",
      "$a =  - 6$ and $b = {13}$",
      "$a = 6$ and $b =  - {11}$",
      "$a = 6$ and $b = 1$"
    ],
    "answer": 1,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q22",
    "text": "\n\n<img src=\"/question-images/engaa/162_112_669_1434_1352_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n23 What is the area of the region enclosed between the curve $y = \\frac{1}{2}{x}^{2}$ , the line $y =  - x$ , and the lines $x = 1$ and $x = 3$ ?",
    "options": [
      "$\\frac{1}{3}$",
      "2",
      "4",
      "6",
      "$\\frac{25}{3}$",
      "$\\frac{28}{3}$"
    ],
    "answer": 4,
    "topic": "advanced_physics"
  },
  {
    "id": "q23",
    "text": "A line with non-zero gradient $m$ is reflected in the line $y = x$ What is the gradient of the reflected line?",
    "options": [
      "$m$",
      "$- m$",
      "$- \\frac{1}{m}$"
    ],
    "answer": 2,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q24",
    "text": "27 The sum of the first 20 terms of an arithmetic progression is 50. The sum of the next 20 terms of the arithmetic progression is -50 . What is the sum of the first 100 terms of the arithmetic progression?",
    "options": [
      "-750",
      "-350",
      "-50",
      "$- \\frac{159}{8}$",
      "$\\frac{159}{8}$",
      "50",
      "350",
      "750"
    ],
    "answer": 0,
    "topic": "advanced_physics"
  },
  {
    "id": "q25",
    "text": "The line L with equation $y = {mx} + c$ , where $m > 0$ and $c \\geq  0$ , passes through the point $\\left( {2,4}\\right)$ .\n\n\n\nA line is drawn through the point $\\left( {2,4}\\right)$ perpendicular to L.\n\n\n\nThe triangle enclosed between the two lines and the $y$ -axis has area 5 square units.\n\n\n\nWhat is the larger of the two possible values of $m$ ?",
    "options": [
      "-0.5",
      "0.5",
      "1.25",
      "2",
      "5"
    ],
    "answer": 3,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q26",
    "text": "31 P and Q are two different geometric progressions.\n\n\n\nThe ${3}^{\\text{ rd }}$ term of each geometric progression is 4 .\n\n\n\nThe ${5}^{\\text{ th }}$ term of each geometric progression is 2 .\n\n\n\nWhat is the modulus of the difference between the sums to infinity of $P$ and $Q$ ?",
    "options": [
      "0",
      "8",
      "$8\\sqrt{2}$",
      "16",
      "${16}\\sqrt{2}$",
      "32",
      "${32}\\sqrt{2}$"
    ],
    "answer": 4,
    "topic": "advanced_physics"
  },
  {
    "id": "q27",
    "text": "33 The curve\n\n\n\n$$\n\ny = {x}^{3} + 3\\sqrt{5}p{x}^{2} + {3px} + {13}\n\n$$\n\n\n\nhas two distinct turning points.\n\n\n\nWhat are all the possible values of $p$ ?",
    "options": [
      "$p < 0,p > {0.2}$",
      "$p \\leq  0,p \\geq  {0.2}$",
      "$0 < p < {0.2}$",
      "$0 \\leq  p \\leq  {0.2}$",
      "$p < 0,p > {1.2}$",
      "$p \\leq  0,p \\geq  {1.2}$",
      "$0 < p < {1.2}$",
      "$0 \\leq  p \\leq  {1.2}$"
    ],
    "answer": 0,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q28",
    "text": "\n\n<img src=\"/question-images/engaa/168_113_1090_1419_610_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n35 Find the number of solutions of the equation\n\n\n\n${14}{\\cos }^{3}x + {10}{\\sin }^{2}x\\cos x = {13}\\cos x$\n\n\n\nin the range $- {2\\pi } \\leq  x \\leq  {2\\pi }$",
    "options": [
      "4",
      "6",
      "8",
      "10",
      "12",
      "14"
    ],
    "answer": 4,
    "topic": "advanced_physics"
  },
  {
    "id": "q29",
    "text": "37 Find the product of the real roots of the equation\n\n\n\n$$\n\n{\\left( {\\log }_{10}{x}^{2}\\right) }^{2} + {\\log }_{10}x = 3\n\n$$",
    "options": [
      "${10}^{-\\frac{3}{2}}$",
      "${10}^{-1}$",
      "${10}^{-\\frac{1}{2}}$",
      "${10}^{-\\frac{1}{4}}$",
      "${10}^{\\frac{3}{5}}$",
      "${10}^{1}$"
    ],
    "answer": 3,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q30",
    "text": "9 Find the maximum value of the gradient of the curve with equation\n\n\n\n$$\n\ny = 2 - {4x} + 4{x}^{\\frac{3}{2}} - {x}^{2}\n\n$$\n\n\n\nwhere $x > 0$",
    "options": [
      "-4",
      "$- \\frac{8}{9}$",
      "$\\frac{1}{2}$",
      "2",
      "4"
    ],
    "answer": 2,
    "topic": "advanced_physics"
  }
]$json$
);


INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'ENGAA 2021 — Part A (19 Qs) + Part B (8 Qs)',
  1,
  2021,
  'November',
  80,
  27,
  ARRAY['mathematics', 'physics', 'advanced_mathematics', 'advanced_physics']::text[],
  $json$[
  {
    "id": "q1",
    "text": "${5x}{y}^{2} \\times  {\\left( 5{x}^{2}y\\right) }^{-3} \\times  5{x}^{2}y$\n\n\n\nwhere $x$ and $y$ are positive.",
    "options": [
      "$\\frac{1}{{125}{x}^{7}{y}^{2}}$",
      "$\\frac{1}{{125}{x}^{6}{y}^{2}}$",
      "$\\frac{1}{{25}{x}^{4}y}$",
      "$\\frac{1}{5{x}^{3}}$",
      "$\\frac{1}{5{x}^{2}}$",
      "$\\frac{y}{{x}^{2}}$",
      "${5x}{y}^{2}$"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q2",
    "text": "2 Air is trapped in a cylinder by a piston. The density of the air in the cylinder is $\\rho$ .\n\n\n\n\n\n<img src=\"/question-images/engaa/175_324_271_1080_294_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe piston is moved so that the pressure of the trapped air increases by 20\\%. The temperature of the trapped air does not change.\n\n\n\nWhat is the new density of the trapped air?\n\n\n\n(Assume that air is an ideal gas.)",
    "options": [
      "${0.69\\rho }$",
      "${0.80\\rho }$",
      "${0.83\\rho }$",
      "${1.00\\rho }$",
      "${1.20\\rho }$",
      "${1.44\\rho }$"
    ],
    "answer": 4,
    "topic": "physics"
  },
  {
    "id": "q3",
    "text": "$$\n\n\\frac{p}{2} + \\frac{3}{q} = \\frac{4}{r}\n\n$$\n\n\n\nso that $q$ is the subject?",
    "options": [
      "$q = \\frac{2r}{{24} - {3pr}}$",
      "$q = \\frac{3r}{{2r} - p}$",
      "$q = \\frac{6r}{4 - p}$",
      "$q = \\frac{6r}{8 - {pr}}$",
      "$q = \\frac{r - 2}{12p}$",
      "$q = \\frac{{3r} - 6}{4p}$",
      "$\\;q = \\frac{{pr} - 8}{12p}$",
      "$\\;q = \\frac{{3pr} - {24}}{4p}$"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q4",
    "text": "4 A non-ideal transformer has 100 turns on the primary coil and 25 turns on the secondary coil.\n\n\n\nIt is provided with ${3.0}\\mathrm{\\;{kW}}$ of electrical power at a current of ${12.5}\\mathrm{\\;A}$ .\n\n\n\nThe voltage output is the same as for an ideal transformer, but the current in the output coil is 40 A.\n\n\n\nWhat is the efficiency of the transformer?",
    "options": [
      "20\\%",
      "25\\%",
      "31\\%",
      "69\\%",
      "75\\%",
      "80\\%",
      "91\\%",
      "100\\%"
    ],
    "answer": 5,
    "topic": "physics"
  },
  {
    "id": "q5",
    "text": "\n\n<img src=\"/question-images/engaa/178_485_252_755_437_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nCylinder P has diameter $x$ and height $y$ .\n\n\n\nCylinder Q has diameter $y$ and height $x$ .\n\n\n\nWhat is the positive difference between the total surface areas of P and Q?",
    "options": [
      "0",
      "$\\frac{\\pi }{4}\\left( {{x}^{2} - {y}^{2}}\\right)$",
      "$\\frac{\\pi }{2}\\left( {{x}^{2} - {y}^{2}}\\right)$",
      "$\\pi \\left( {{x}^{2} - {y}^{2}}\\right)$",
      "${2\\pi }\\left( {{x}^{2} - {y}^{2}}\\right)$",
      "$\\frac{\\pi }{4}{xy}\\left( {x - y}\\right)$",
      "${\\pi xy}\\left( {x - y}\\right)$"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q6",
    "text": "6 A light spring has an uncompressed length of ${0.10}\\mathrm{\\;m}$ . When an object of mass ${0.5}\\mathrm{\\;{kg}}$ rests in equilibrium on top of the spring, the length of the spring reduces to ${0.08}\\mathrm{\\;m}$ as shown.\n\n\n\n\n\n<img src=\"/question-images/engaa/179_410_269_908_267_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhat is the energy stored in the spring due to the compression?\n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ ; the spring obeys Hooke’s law)",
    "options": [
      "0.005 J",
      "0.02 J",
      "0.05 J",
      "0.1 J",
      "0.2 J",
      "0.4 J"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q7",
    "text": "7 The price of item P is reduced by 10\\%. The next day, the new price is increased by 10\\%. The price of item Q is increased by 10\\%. The next day, the new price is reduced by 10\\%. How does the final price of each item compare to the original price of that item?\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "mathematics"
  },
  {
    "id": "q8",
    "text": "\n\n\n\n8 A set of decorative lights consists of 20 lamps connected in series to a dc supply of constant voltage.\n\n\n\nThe total power transferred by all the lamps is $P$ .\n\n\n\nThe set is designed so that if one of the lamps fails, that lamp becomes short-circuited and it then has zero resistance. The remaining lamps are still lit.\n\n\n\nIf this happens, with the set connected to the same supply, what is the new total power transferred by the remaining 19 lamps?\n\n\n\n(Assume that the resistance of each functioning lamp remains constant.)",
    "options": [
      "${\\left( \\frac{19}{20}\\right) }^{2}P$",
      "$\\left( \\frac{19}{20}\\right) P$",
      "$P$",
      "$\\left( \\frac{20}{19}\\right) P$",
      "${\\left( \\frac{20}{19}\\right) }^{2}P$"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q9",
    "text": "\n\n<img src=\"/question-images/engaa/181_512_164_704_482_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nSQT is a right-angled triangle with the right angle at Q.\n\n\n\nThe point $R$ is on ${SQ}$ such that ${SR} : {RQ} = 1 : 3$\n\n\n\nQRP is a right-angled triangle with the right angle at $Q$ .\n\n\n\n$$\n\n{PR} = {ST} = {8\\mathrm{\\;{cm}}}\n\n$$\n\n\n\n$$\n\n{QT} = {4\\mathrm{\\;{cm}}}\n\n$$\n\n\n\nWhat is the length of ${PQ}$ , in ${cm}$ ?",
    "options": [
      "$2\\sqrt{3}$",
      "$4\\sqrt{3}$",
      "$\\sqrt{19}$",
      "$\\sqrt{37}$",
      "$\\sqrt{55}$",
      "$\\sqrt{61}$"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q10",
    "text": "10 A train accelerates from rest along a straight, horizontal section of track.\n\n\n\nThe force exerted on the train due to its motors is constant and there is a constant friction force of ${1.8} \\times  {10}^{7}\\mathrm{\\;N}$ .\n\n\n\nThe graph shows how the momentum of the train changes with time.\n\n\n\nmomentum / ${10}^{6}\\mathrm{\\;{kg}}\\;{\\mathrm{{ms}}}^{-1}$\n\n\n\n\n\n<img src=\"/question-images/engaa/182_551_444_745_781_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhat is the force exerted on the train due to its motors?",
    "options": [
      "${3.0} \\times  {10}^{6}\\mathrm{\\;N}$",
      "${6.0} \\times  {10}^{6}\\mathrm{\\;N}$",
      "${1.2} \\times  {10}^{7}\\mathrm{\\;N}$",
      "${1.5} \\times  {10}^{7}\\mathrm{\\;N}$",
      "${2.1} \\times  {10}^{7}\\mathrm{\\;N}$",
      "${2.4} \\times  {10}^{7}\\mathrm{\\;N}$",
      "${3.0} \\times  {10}^{7}\\mathrm{\\;N}$",
      "${4.2} \\times  {10}^{7}\\mathrm{\\;N}$"
    ],
    "answer": 4,
    "topic": "physics"
  },
  {
    "id": "q11",
    "text": "11 The curve with equation $y = {x}^{2} - {4x} + 5$ meets the straight line with equation $y = {2x} + c$ at two points, which have $x$ -coordinates $p$ and $q$ , where $q > p$ .\n\n\n\nGiven that $q - p = 8$ , what is the value of the constant $c$ ?",
    "options": [
      "-43",
      "-12",
      "-2",
      "0",
      "2",
      "12",
      "43"
    ],
    "answer": 5,
    "topic": "mathematics"
  },
  {
    "id": "q12",
    "text": "12 A ship travels into a wave that is travelling in the opposite direction to the ship.\n\n\n\nThe ship has a horizontal speed of ${8.0}{\\mathrm{\\;{ms}}}^{-1}$ . The speed of the wave is ${3.0}{\\mathrm{\\;{ms}}}^{-1}$ .\n\n\n\nThe front of the ship rises and falls with a time period of ${8.0}\\mathrm{\\;s}$ .\n\n\n\nWhat is the wavelength of the wave?",
    "options": [
      "$\\frac{3}{8}\\mathrm{\\;m}$",
      "$\\frac{5}{8}\\mathrm{\\;m}$",
      "${1.0}\\mathrm{\\;m}$",
      "$\\frac{11}{8}\\mathrm{\\;m}$",
      "${24}\\mathrm{\\;m}$",
      "${40}\\mathrm{\\;m}$",
      "${64}\\mathrm{\\;m}$",
      "88m"
    ],
    "answer": 7,
    "topic": "physics"
  },
  {
    "id": "q13",
    "text": "$y = \\frac{\\sin {60}^{ \\circ  } - 1}{\\cos {60}^{ \\circ  }}$\n\n\n\nwhat is the value of ${y}^{3}$ ?",
    "options": [
      "$- \\frac{\\sqrt{3}}{9}$",
      "$- 5\\sqrt{2} + {10}$",
      "$3\\sqrt{3} - 8$",
      "$6\\sqrt{3} - {10}$",
      "${14}\\sqrt{2} - {20}$",
      "${15}\\sqrt{3} - {26}$",
      "${21}\\sqrt{3} - {38}$"
    ],
    "answer": 5,
    "topic": "mathematics"
  },
  {
    "id": "q14",
    "text": "14 A 6.0 V battery is connected to an ${8.0\\Omega }$ resistor and a filament lamp as shown in the circuit diagram.\n\n\n\n\n\n<img src=\"/question-images/engaa/185_605_287_520_363_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe reading on the ammeter is ${0.25}\\mathrm{\\;A}$ .\n\n\n\nWhich graph is a possible $V - I$ graph for the filament lamp?\n\n\n\n\n\n<img src=\"/question-images/engaa/185_192_893_1271_1221_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n15 Charlie has a bowl containing red sweets and green sweets only. The sweets are identical in all respects except colour.\n\n\n\nThere are nine sweets in total in the bowl.\n\n\n\nCharlie eats two sweets from the bowl at random.\n\n\n\nThe probability of Charlie not eating any green sweets is $\\frac{5}{12}$\n\n\n\nWhat is the probability that Charlie eats two green sweets?",
    "options": [
      "$\\frac{2}{27}$",
      "$\\frac{1}{12}$",
      "$\\frac{4}{27}$",
      "$\\frac{1}{6}$",
      "$\\frac{1}{4}$",
      "$\\frac{7}{12}$"
    ],
    "answer": 1,
    "topic": "physics"
  },
  {
    "id": "q15",
    "text": "6 A radioactive nuclide X decays in a single stage to a stable nuclide R.\n\n\n\nA radioactive nuclide Y decays in a single stage to a stable nuclide S.\n\n\n\nWhen a rock formed it contained equal numbers of atoms of all four nuclides X, Y, R and S.\n\n\n\nThe half-life of X is $T$ years and the half-life of Y is ${2T}$ years.\n\n\n\nWhat is the value of $\\frac{\\text{ number of atoms of }R}{\\text{ number of atoms of }S}$ at a time ${4T}$ years after the rock has formed?\n\n\n\n(Assume that no other processes add or remove X, Y, R or S from the rock during this time.)",
    "options": [
      "$\\frac{1}{4}$",
      "$\\frac{17}{20}$",
      "$\\frac{6}{5}$"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q16",
    "text": "$$\n\n\\text{ E 5 }\n\n$$\n\n\n\n$$\n\n\\text{ F 2 }\n\n$$\n\n\n\n17 The greatest diagonal distance between the two vertices of a cuboid, as shown in the diagram, is $\\sqrt{77}\\mathrm{\\;{cm}}$ .\n\n\n\n\n\n<img src=\"/question-images/engaa/188_614_310_500_308_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nA similar cuboid has all its lengths exactly half the lengths of the original cuboid.\n\n\n\nThe sides of this smaller cuboid are $2\\mathrm{\\;{cm}},3\\mathrm{\\;{cm}}$ and $x\\mathrm{\\;{cm}}$ .\n\n\n\nWhat is the value of $x$ , in $\\mathrm{{cm}}$ ?",
    "options": [
      "$\\frac{5}{2}$",
      "5",
      "$\\frac{5\\sqrt{2}}{2}$",
      "$5\\sqrt{2}$",
      "$\\frac{\\sqrt{102}}{2}$",
      "$\\sqrt{102}$"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q17",
    "text": "18 A beaker containing ${180}\\mathrm{\\;g}$ of water at ${25}^{ \\circ  }\\mathrm{C}$ has a ${20}\\mathrm{\\;g}$ ice cube at ${0}^{ \\circ  }\\mathrm{C}$ added to it.\n\n\n\nNo heat is transferred between the water and the surroundings (including the beaker).\n\n\n\nWhat is the final temperature of all the water in the beaker after all the ice has melted?\n\n\n\n(Take the specific heat capacity of water to be $4\\mathrm{\\;J}{\\mathrm{\\;g}}^{-1}{}^{ \\circ  }{\\mathrm{C}}^{-1}$ and the specific latent heat of fusion of water to be ${300}{\\mathrm{{Jg}}}^{-1}$ .)",
    "options": [
      "${2.5}{}^{ \\circ  }\\mathrm{C}$",
      "${8.3}{}^{ \\circ  }\\mathrm{C}$",
      "${10.0}{}^{ \\circ  }\\mathrm{C}$",
      "${15.0}{}^{ \\circ  }\\mathrm{C}$",
      "${16.7}{}^{ \\circ  }\\mathrm{C}$",
      "${22.5}{}^{ \\circ  }\\mathrm{C}$"
    ],
    "answer": 0,
    "topic": "mathematics"
  },
  {
    "id": "q18",
    "text": "19 A car journey is $m$ miles long.\n\n\n\nOne kilometre is equivalent to $x$ miles.\n\n\n\nThe car uses one litre of fuel to travel a distance of $f$ kilometres.\n\n\n\nFuel for the car costs $p$ pence per litre.\n\n\n\nWhich of the following expressions gives the cost of fuel for this journey, in pounds?\n\n\n\n(There are 100 pence in one pound.)",
    "options": [
      "100fmpx",
      "$\\frac{100fmp}{x}$",
      "$\\frac{100mp}{fx}$",
      "$\\frac{fmpx}{100}$",
      "$\\frac{fmp}{100x}$",
      "$\\frac{mpx}{100f}$",
      "$\\frac{mp}{100fx}$"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q19",
    "text": "20 A pulse of ultrasound travels from one end of a solid uniform rod of length $L$ , starting at time $t = 0$ .\n\n\n\nThe pulse is partially reflected by a crack in the rod and partially by the far end of the rod.\n\n\n\nThese two reflected pulses travel back along the rod, arriving at the end from which they started at times ${t}_{1}$ and ${t}_{2}$ , where ${t}_{2} > {t}_{1}$ .\n\n\n\nWhat is the distance between the crack and the far end of the rod?",
    "options": [
      "$\\frac{{t}_{1}}{{t}_{2}}\\text{ L }$",
      "$\\frac{{t}_{2}}{{t}_{1}}\\text{ L }$",
      "$\\frac{{t}_{1}}{2{t}_{2}}\\text{ L }$",
      "$\\frac{{t}_{2}}{2{t}_{1}}\\text{ L }$",
      "$\\frac{\\left( {t}_{2} - {t}_{1}\\right) }{{t}_{2}}L$",
      "$\\frac{\\left( {t}_{2} - {t}_{1}\\right) }{2{t}_{2}}L$"
    ],
    "answer": 5,
    "topic": "mathematics"
  },
  {
    "id": "q20",
    "text": "NOTE: questions in this part that are not covered by the ESAT content specification are indicated by a cross through the question number.\n\n\n\n$$\n\ny = {\\left( 2\\sqrt{x} - \\begin{matrix} 1 \\\\  2\\sqrt{x} \\end{matrix}\\right) }^{2}\n\n$$\n\n\n\nfind the value of $\\frac{\\mathrm{d}y}{\\mathrm{\\;d}x}$ when $x = \\begin{array}{l} 1 \\\\  2 \\end{array}$",
    "options": [
      "-12",
      "$- \\frac{1}{4}$",
      "3",
      "16",
      "5"
    ],
    "answer": 4,
    "topic": "advanced_physics"
  },
  {
    "id": "q21",
    "text": "\n\n<img src=\"/question-images/engaa/193_113_950_1420_1023_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n23 A particular arithmetic series has first term $a$ and common difference $d$ .\n\n\n\nThe sum of the first $k$ terms of this series is denoted by ${S}_{k}$\n\n\n\nWhich of the following is a simplification of ${S}_{n + 1} - {S}_{n - 1}$ ?",
    "options": [
      "$d$",
      "${2d}$",
      "${2a} + d$",
      "${2a} + {2d}$",
      "${2a} + {nd}$",
      "${2a} + {2nd}$",
      "${2a} + \\left( {{2n} - 1}\\right) d$",
      "${2a} + \\left( {{4n} - 2}\\right) d$"
    ],
    "answer": 6,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q22",
    "text": "$$\n\n{\\left( {x}^{2} + 4x + 3\\right) }^{2} = 1\n\n$$\n\n\n\n\n\n<img src=\"/question-images/engaa/195_109_130_1462_1278_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nFind how many distinct real solutions there are to the equation",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": 1,
    "topic": "advanced_physics"
  },
  {
    "id": "q23",
    "text": "27 The line $x = 1$ divides the circle ${x}^{2} + {y}^{2} = 4$ into two segments.\n\n\n\nWhat is the area of the smaller segment?",
    "options": [
      "$\\frac{2\\pi }{3} - \\frac{\\sqrt{3}}{2}$",
      "$\\frac{2\\pi }{3} - \\sqrt{3}$",
      "$\\frac{\\pi }{2} - \\frac{1}{2}$",
      "$\\frac{\\pi }{2} - 1$",
      "$\\pi  - \\frac{1}{2}$",
      "$\\pi  - 1$",
      "$\\frac{4\\pi }{3} - \\frac{\\sqrt{3}}{2}$",
      "$\\frac{4\\pi }{3} - \\sqrt{3}$"
    ],
    "answer": 3,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q24",
    "text": "\n\n<img src=\"/question-images/engaa/197_113_827_1396_1280_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n31 Which of the following is the largest in value?\n\n\n\n(All angles are in radians.)",
    "options": [
      "cos 0.5",
      "cos0.75",
      "$\\cos 1$",
      "sin0.5",
      "sin 0.75",
      "$\\sin 1$"
    ],
    "answer": 3,
    "topic": "advanced_physics"
  },
  {
    "id": "q25",
    "text": "\n\n<img src=\"/question-images/engaa/198_109_789_1434_900_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nA geometric progression has first term ${u}_{1} = a$ and common ratio $r$ .\n\n\n\nThe sum to infinity of the geometric progression is $\\begin{array}{l} 8 \\\\  5 \\end{array}$\n\n\n\nThe sum to infinity of the even-numbered terms $\\left( {{u}_{2} + {u}_{4} + {u}_{6} + \\cdots }\\right)$ is $\\begin{array}{l} 3 \\\\  5 \\end{array}$\n\n\n\nWhat is the value of $a + r$ ?\n\n\n\n$$\n\n\\text{ A 5 }\n\n$$\n\n\n\n$$\n\n\\text{ B 31 }\n\n$$\n\n\n\n$$\n\n\\text{ C 25 }\n\n$$\n\n\n\n$$\n\n\\text{ D 28 }\n\n$$\n\n\n\n$$\n\n\\text{ E 67 }\n\n$$\n\n\n\n\n\n<img src=\"/question-images/engaa/199_109_1069_1434_658_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n35 At how many distinct points do the following two curves meet?\n\n\n\n$$\n\ny = \\left( {x - 4}\\right) \\left( {{x}^{2} - {2x} - 8}\\right)\n\n$$\n\n\n\n$$\n\ny =  - {x}^{2} + {8x} - {16}\n\n$$",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "answer": 1,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q26",
    "text": "$$\n\n\\frac{3}{\\sqrt{27} + \\sqrt{21}} + \\frac{3}{\\sqrt{24} + \\sqrt{18}} + \\frac{3}{\\sqrt{21} + \\sqrt{15}} + \\cdots  + \\frac{3}{\\sqrt{9} + \\sqrt{3}}\n\n$$\n\n\n\n\n\n<img src=\"/question-images/engaa/200_112_868_1456_832_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n",
    "options": [
      "$3\\underset{2}{\\underline{2}}$",
      "$3\\underset{2}{\\underline{Z}}$",
      "$3\\underset{2}{\\widetilde{A}}$",
      "3",
      "$1 + 1/2$",
      "$3\\left( {1 + 1/2}\\right)$",
      "$\\;\\frac{\\sqrt{3}}{3}\\left( {1 + \\frac{\\sqrt{2}}{2}}\\right)$",
      "⧸ $3\\left( {1 + \\frac{\\sqrt{2}}{2}}\\right)$"
    ],
    "answer": 2,
    "topic": "advanced_physics"
  },
  {
    "id": "q27",
    "text": "\n\n<img src=\"/question-images/engaa/201_106_1127_1468_933_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n\n\n<img src=\"/question-images/engaa/202_411_161_904_568_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nPQRS is a rectangle.\n\n\n\n$P$ and $Q$ lie on the $x$ -axis.\n\n\n\n$Q$ and $R$ lie on the line $x = {15}$\n\n\n\nS lies on the curve $y = \\sqrt{x}$\n\n\n\nWhat is the maximum possible area of the rectangle?",
    "options": [
      "$5\\sqrt{5}$",
      "${10}\\sqrt{5}$",
      "50",
      "${25}\\sqrt{5}$",
      "100",
      "125"
    ],
    "answer": 3,
    "topic": "advanced_mathematics"
  }
]$json$
);


INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'ENGAA 2022 — Part A (20 Qs) + Part B (9 Qs)',
  1,
  2022,
  'November',
  80,
  29,
  ARRAY['mathematics', 'physics', 'advanced_mathematics', 'advanced_physics']::text[],
  $json$[
  {
    "id": "q1",
    "text": "$$\n\ny{\\left( \\frac{3{x}^{\\frac{1}{2}}z}{{y}^{3}}\\right) }^{2}\n\n$$",
    "options": [
      "$\\frac{{3x}{z}^{2}}{{y}^{4}}$",
      "$\\frac{{3x}{z}^{2}}{{y}^{5}}$",
      "$\\frac{{9x}{z}^{2}}{{y}^{4}}$",
      "$\\frac{{9x}{z}^{2}}{{y}^{5}}$",
      "$\\frac{9{x}^{\\frac{5}{2}}{z}^{2}}{{y}^{5}}$"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q2",
    "text": "2 There is a constant current in a conducting wire. A charge of ${20}\\mathrm{C}$ passes through the wire in 1.5 minutes.\n\n\n\nAn ${18}\\mathrm{\\;{cm}}$ straight section of this wire lies in a uniform magnetic field. This section of wire is perpendicular to the direction of the field. The magnetic field strength is ${0.15}\\mathrm{\\;T}$ .\n\n\n\nWhat is the magnitude of the magnetic force on this section of wire?",
    "options": [
      "0.0060N",
      "0.36N",
      "${0.60}\\mathrm{\\;N}$",
      "0.81N",
      "36N",
      "49N",
      "81N",
      "4900 N"
    ],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q3",
    "text": "Find the complete set of values of $x$ that satisfy the inequality\n\n\n\n$$\n\n\\frac{3}{4}\\left( {5 - x}\\right)  - \\frac{1}{2}\\left( {6 - x}\\right)  - x < 0\n\n$$",
    "options": [
      "$x < \\frac{1}{3}$",
      "$x > \\frac{1}{3}$",
      "$x < \\frac{3}{5}$",
      "$x > \\frac{3}{5}$",
      "$x < \\frac{3}{4}$",
      "$\\;x > \\frac{3}{4}$",
      "$\\;x < \\frac{3}{2}$",
      "$\\;x > \\frac{3}{2}$"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q4",
    "text": "4 Two identical resistors are connected in parallel to a 6.0 V battery. The two resistors dissipate a total power of 0.15 W.\n\n\n\nOne of these resistors is removed from the circuit and connected to a 12 V battery.\n\n\n\nHow much charge passes through this resistor in 6.0 minutes?",
    "options": [
      "0.025 C",
      "0.050 C",
      "0.15C",
      "0.30C",
      "0.75C",
      "1.5C",
      "9.0C",
      "18C"
    ],
    "answer": 6,
    "topic": "physics"
  },
  {
    "id": "q5",
    "text": "5 Rob keeps a record of what he earns each day.\n\n\n\nOn Monday, he earned 50\\% less than he earned on Sunday.\n\n\n\nOn Tuesday, he earned 20\\% more than he earned on Monday.\n\n\n\nOn Wednesday, he earned 30\\% less than he earned on Tuesday.\n\n\n\nOn Wednesday, he earned £84.\n\n\n\nHow much did Rob earn on Sunday?",
    "options": [
      "£15.12",
      "£35.28",
      "£117.60",
      "£200",
      "£210",
      "£300",
      "£1200"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q6",
    "text": "6 Ultrasound is used to find a crack inside a cuboid block of metal. An ultrasound probe is held in contact with the top surface of the metal block and perpendicular to the surface. A short pulse of ultrasound is sent into the metal block at time $t = 0\\mathrm{\\;{ms}}$ and reflects from both the crack and the bottom surface of the metal block.\n\n\n\n\n\n<img src=\"/question-images/engaa/208_768_340_418_248_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe times between the emission of the ultrasound pulse and the return of the reflections to the probe, and the strengths of the reflected pulses, are measured. The results are shown on the graph.\n\n\n\n\n\n<img src=\"/question-images/engaa/208_432_753_658_372_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe speed of ultrasound in the metal is ${5000}{\\mathrm{\\;{ms}}}^{-1}$ .\n\n\n\nWhat is the distance between the bottom surface of the metal block and the crack?",
    "options": [
      "${0.2}\\mathrm{\\;m}$",
      "${0.3}\\mathrm{\\;m}$",
      "${0.4}\\mathrm{\\;m}$",
      "${0.5}\\mathrm{\\;m}$",
      "${0.6}\\mathrm{\\;m}$",
      "${1.0}\\mathrm{\\;m}$"
    ],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q7",
    "text": "$$\n\n\\frac{5{x}^{2} - {17x} - {12}}{{25}{x}^{2} - 9} \\div  \\frac{{x}^{2} + x - {12}}{{x}^{2} - x - 6}\n\n$$",
    "options": [
      "$\\frac{\\left( {x - 4}\\right) \\left( {x + 2}\\right) }{\\left( {x - 3}\\right) \\left( {x + 4}\\right) }$",
      "$\\frac{\\left( {x - 3}\\right) \\left( {x + 2}\\right) }{\\left( {{5x} - 3}\\right) \\left( {x + 3}\\right) }$",
      "$\\frac{\\left( {x - 4}\\right) \\left( {x + 2}\\right) }{\\left( {{5x} - 3}\\right) \\left( {x + 4}\\right) }$",
      "$\\frac{\\left( {x - 4}\\right) \\left( {x - 3}\\right) }{\\left( {{5x} - 3}\\right) \\left( {x - 6}\\right) }$",
      "$\\frac{\\left( x + 2\\right) }{\\left( 5x + 3\\right) }$",
      "$\\frac{\\left( {x + 4}\\right) \\left( {x - 6}\\right) }{\\left( {{5x} + 3}\\right) \\left( {x + 2}\\right) }$",
      "$\\frac{\\left( {x - 3}\\right) \\left( {x + 2}\\right) }{\\left( {{5x} + 3}\\right) \\left( {x + 3}\\right) }$"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q8",
    "text": "8 Power is supplied to an electric motor at ${0.800}\\mathrm{{kW}}$ .\n\n\n\nThe motor has an efficiency of 60\\% and is switched on for half an hour.\n\n\n\nHow much energy is wasted during this time?",
    "options": [
      "0.160 J",
      "0.240 J",
      "160 J",
      "240 J",
      "576J",
      "864J",
      "576000J",
      "864000J"
    ],
    "answer": 6,
    "topic": "physics"
  },
  {
    "id": "q9",
    "text": "A rectangle PQRS has length $\\left( {{2x} - 1}\\right) \\mathrm{{cm}}$ and width $\\left( {x + 1}\\right) \\mathrm{{cm}}$ as shown on the diagram.\n\n\n\nA larger rectangle is made by adding $3\\mathrm{\\;{cm}}$ to both the length and the width of PQRS, as shown.\n\n\n\nThe larger rectangle has an area of ${360}{\\mathrm{\\;{cm}}}^{2}$ .\n\n\n\n\n\n<img src=\"/question-images/engaa/210_509_407_635_364_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nWhat is the ratio of ${PQ}$ to ${PS}$ ?",
    "options": [
      "1:2",
      "4:7",
      "5:8",
      "7:11",
      "10:17",
      "17:31"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q10",
    "text": "potential difference /V\n\n\n\n\n\n<img src=\"/question-images/engaa/211_573_234_609_695_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe lamp and the resistor are connected in parallel with each other to a 6.0 V power supply and the current in the lamp, $I$ , is recorded.\n\n\n\nIn a second circuit, the lamp and the resistor are now connected in series with each other to the same power supply, and the current in the resistor is 0.18 A. The potential difference across the lamp, $V$ , is recorded.\n\n\n\nWhat are the values of $I$ in the first circuit and $V$ in the second circuit?\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q11",
    "text": "\n\n\n\n\n\n<img src=\"/question-images/engaa/212_542_234_641_306_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\n$\\tan {RSQ} = \\frac{5}{8}$\n\n\n\nWhat is the length of ${PS}$ , in metres?",
    "options": [
      "45",
      "65",
      "80",
      "120",
      "${25} + \\frac{{40}\\sqrt{3}}{3}$",
      "${40} + \\frac{{64}\\sqrt{3}}{3}$",
      "${25} + {40}\\sqrt{3}$",
      "${64} + {40}\\sqrt{3}$"
    ],
    "answer": 6,
    "topic": "mathematics"
  },
  {
    "id": "q12",
    "text": "12 A transverse wave on a string has a speed of ${500}{\\mathrm{\\;{ms}}}^{-1}$ .\n\n\n\nThe horizontal distance between two points $P$ and $Q$ on the wave is ${4.0}\\mathrm{\\;m}$ , as shown in the diagram.\n\n\n\n\n\n<img src=\"/question-images/engaa/213_500_342_728_328_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nAt time $t = 0\\mathrm{\\;{ms}}$ , point $\\mathrm{X}$ on the string is at its maximum displacement of ${6.0}\\mathrm{\\;{mm}}$ above equilibrium.\n\n\n\nWhat is the displacement of point $\\mathrm{X}$ at time $t = {7.0}\\mathrm{\\;{ms}}$ ?",
    "options": [
      "${6.0}\\mathrm{\\;{mm}}$ above equilibrium",
      "between $0\\mathrm{\\;{mm}}$ and ${6.0}\\mathrm{\\;{mm}}$ above equilibrium",
      "0 mm"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q13",
    "text": "between $0\\mathrm{\\;{mm}}$ and ${6.0}\\mathrm{\\;{mm}}$ below equilibrium\n\n\n\n6.0 mm below equilibrium\n\n\n\n13 A solid cylinder has radius $r\\mathrm{\\;{cm}}$ and height $h\\mathrm{\\;{cm}}$ .\n\n\n\nA cube has side length ${3r}\\mathrm{\\;{cm}}$ .\n\n\n\nThe total surface area of the cylinder is equal to four times the total surface area of the cube.\n\n\n\nWhich of the following is an expression for $h$ in terms of $r$ ?",
    "options": [
      "$\\left( {\\frac{18}{\\pi } - 2}\\right) r$",
      "$\\left( {\\frac{18}{\\pi } - 1}\\right) r$",
      "$\\left( {\\frac{27}{\\pi } - 1}\\right) r$",
      "$\\left( {\\frac{27}{4\\pi } - 1}\\right) r$",
      "$\\frac{108r}{\\pi }$",
      "$\\;\\left( {\\frac{108}{\\pi } - 1}\\right) r$",
      "$\\;\\left( {\\frac{108}{\\pi } - \\frac{1}{2}}\\right) r$"
    ],
    "answer": 6,
    "topic": "mathematics"
  },
  {
    "id": "q14",
    "text": "14 A piece of metal of mass ${50}\\mathrm{\\;g}$ is at thermal equilibrium in a hot liquid at temperature $T$ .\n\n\n\nThe metal is removed from the liquid and immediately placed in ${100}\\mathrm{\\;g}$ of water that is at ${20}^{ \\circ  }\\mathrm{C}$ .\n\n\n\nThe water is stirred and reaches a final temperature of ${26}^{ \\circ  }\\mathrm{C}$ .\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q15",
    "text": "\n\n\n\nWhat is the temperature $T$ of the hot liquid?\n\n\n\n(Assume that heat transfers to or from the surroundings are negligible.)",
    "options": [
      "${38}^{ \\circ  }\\mathrm{C}$",
      "${51}{}^{ \\circ  }\\mathrm{C}$",
      "${150}{}^{ \\circ  }\\mathrm{C}$",
      "${170}{}^{ \\circ  }\\mathrm{C}$",
      "$\\;{480}{}^{ \\circ  }\\mathrm{C}$"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q16",
    "text": "15 The variables $x$ and $y$ are related by the equation:\n\n\n\n$$\n\nx = 5 - \\frac{2{y}^{3} + 1}{1 - 2{y}^{3}}\n\n$$\n\n\n\nWhich of the following is a rearrangement to make $y$ the subject?",
    "options": [
      "$y = \\sqrt[3]{\\frac{x - 4}{{8x} - {48}}}$",
      "$y = \\sqrt[3]{\\frac{x - 6}{{8x} - {32}}}$",
      "$y = \\sqrt[3]{\\frac{x - 2}{x - 6}}$",
      "$y = \\sqrt[3]{\\frac{x - 3}{x - 4}}$",
      "$y = \\sqrt[3]{\\frac{x - 4}{{2x} - {12}}}$",
      "$\\;y = \\sqrt[3]{\\frac{x - 6}{{2x} - 8}}$"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q17",
    "text": "16 A bar magnet is placed at position X close to one end of a coil and on the axis of the coil as shown.\n\n\n\nThe graph shows how the velocity of the magnet varies as it is then moved rapidly to position Y and back to position X.\n\n\n\n\n\n<img src=\"/question-images/engaa/217_205_374_1320_288_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe magnetic field of the bar magnet still affects the coil when the magnet is at position Y.\n\n\n\nWhich graph represents how the induced voltage in the coil changes as the magnet moves?\n\n\n\n\n\n<img src=\"/question-images/engaa/217_189_850_1274_843_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n17 Three different numbers are chosen at random from $\\sqrt{1},\\sqrt{2},\\sqrt{3},\\sqrt{4},\\sqrt{5}$ .\n\n\n\nWhat is the probability that the three numbers form the three sides of a right-angled triangle?",
    "options": [
      "$\\frac{1}{15}$",
      "$\\frac{1}{10}$",
      "$\\frac{3}{10}$",
      "$\\frac{1}{3}$",
      "$\\frac{2}{5}$",
      "$\\frac{2}{3}$",
      "$\\frac{4}{5}$"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q18",
    "text": "18 A small slider of mass ${30}\\mathrm{\\;g}$ is at rest near the bottom of a frictionless slope and in contact with a light uncompressed spring as shown.\n\n\n\n\n\n<img src=\"/question-images/engaa/219_533_264_660_313_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nThe spring is compressed by ${5.0}\\mathrm{\\;{cm}}$ and the slider remains in contact with it.\n\n\n\nThe spring is released and causes the slider to rise up the slope to a maximum vertical height of ${20}\\mathrm{\\;{cm}}$ .\n\n\n\nThe slider is replaced with one of mass ${20}\\mathrm{\\;g}$ .\n\n\n\nThe spring is now compressed by ${15}\\mathrm{\\;{cm}}$ , and the new slider remains in contact with it.\n\n\n\nTo what maximum vertical height does this new slider rise after it is released?\n\n\n\n(the spring obeys Hooke's law; assume that air resistance is negligible)",
    "options": [
      "${40}\\mathrm{\\;{cm}}$",
      "${60}\\mathrm{\\;{cm}}$",
      "${90}\\mathrm{\\;{cm}}$",
      "${120}\\mathrm{\\;{cm}}$",
      "${180}\\mathrm{\\;{cm}}$",
      "270cm"
    ],
    "answer": 5,
    "topic": "physics"
  },
  {
    "id": "q19",
    "text": "19 The point $\\left( {-1,5}\\right)$ is translated to the point $\\left( {3,2}\\right)$ by two successive translations.\n\n\n\nThe first translation is by the vector $\\left( \\begin{array}{r} {3p} \\\\   - {4p} \\end{array}\\right)$\n\n\n\nThe second translation is by the vector $\\left( \\begin{matrix} q \\\\   - {2q} \\end{matrix}\\right)$\n\n\n\nWhat is the value of $p + q$ ?",
    "options": [
      "-14",
      "-7",
      "-5",
      "-1",
      "1",
      "5",
      "7",
      "14"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q20",
    "text": "20 A tall, smooth cylinder contains air at atmospheric pressure of ${1.00} \\times  {10}^{5}\\mathrm{\\;{Pa}}$ . The density of the air in the cylinder is ${1.20}\\mathrm{\\;{kg}}{\\mathrm{\\;m}}^{-3}$ .\n\n\n\nA heavy piston is now placed in the top of the cylinder and allowed to fall slowly downwards, compressing the air until the piston rests in equilibrium.\n\n\n\nThe mass of the piston is ${50.0}\\mathrm{\\;{kg}}$ and its cross-sectional area is ${0.0200}{\\mathrm{\\;m}}^{2}$ .\n\n\n\nWhat is the density of the air in the cylinder when the piston rests in equilibrium?\n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ ; assume that the air behaves as an ideal gas and that the temperature remains constant)",
    "options": [
      "${0.960}\\mathrm{\\;{kg}}{\\mathrm{\\;m}}^{-3}$",
      "${1.20}\\;\\mathrm{{kg}}\\;{\\mathrm{m}}^{-3}$",
      "${1.25}\\;\\mathrm{{kg}\\;{m}^{-3}}$",
      "${4.80}\\mathrm{\\;{kg}}{\\mathrm{\\;m}}^{-3}$"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q21",
    "text": "NOTE: questions in this part that are not covered by the ESAT content specification are indicated by a cross through the question number.\n\n\n\n${\\int }_{1}^{4}2{x}^{2} - 3{\\int }_{1}^{2}{\\sin }^{2}\\sin x$\n\n\n\n19\n\n\n\n3\n\n\n\n37\n\n\n\n3\n\n\n\n53\n\n\n\n3\n\n\n\nD 73\n\n\n\n81\n\n\n\n4\n\n\n\n87\n\n\n\n4\n\n\n\n\n\n<img src=\"/question-images/engaa/222_124_1026_1332_992_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n\n\n<img src=\"/question-images/engaa/223_338_240_1052_637_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe triangle has vertices at $\\left( {0,0}\\right) ,\\left( {{10},0}\\right)$ and $\\left( {x,y}\\right)$ .\n\n\n\n$\\left( {x,y}\\right)$ is a point on the arc of the semicircle.\n\n\n\nWhich of the following is an expression in terms of $x$ for the area of this triangle?",
    "options": [
      "$5\\sqrt{{10x} - {x}^{2}}$",
      "${5x}\\sqrt{{10} - x}$",
      "${5x}\\sqrt{{10x} - {x}^{2} - {20}}$",
      "${15x}$",
      "${25x}$",
      "${5x}\\left( {{10} - x}\\right)$"
    ],
    "answer": 0,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q22",
    "text": "25 Four mathematically similar solids, W, X, Y and Z, have the following properties:\n\n\n\n\\begin{itemize}\n\n\\item The ratio of the lengths of $W$ to the lengths of $X$ is 1:2\n\n\\end{itemize}\n\n\n\n\\begin{itemize}\n\n\\item The ratio of the surface area of $X$ to the surface area of $Y$ is 2:1\n\n\\end{itemize}\n\n\n\n\\begin{itemize}\n\n\\item The ratio of the volume of $Y$ to the volume of $Z$ is 1:2\n\n\\end{itemize}\n\n\n\nWhat is the order of the solids when arranged in increasing volume?",
    "options": [
      "WYXZ",
      "WYZX",
      "WZYX",
      "YWXZ",
      "YWZX",
      "YZWX"
    ],
    "answer": 0,
    "topic": "advanced_physics"
  },
  {
    "id": "q23",
    "text": "$$\n\n\\frac{{\\left( 2 + \\sqrt{20}\\right) }^{2}}{{\\left( 1 + \\sqrt{5}\\right) }^{3}}\n\n$$\n\n\n\n$$\n\n\\begin{array}{ll} 8 & \\sqrt{5} - 1 \\end{array}\n\n$$",
    "options": [
      "$\\frac{\\sqrt{5} - 1}{2}$",
      "$\\frac{3\\left( {5\\sqrt{5} - 1}\\right) }{31}$",
      "$\\frac{-{22} + {10}\\sqrt{2} + {11}\\sqrt{5} - 4\\sqrt{10}}{2}$",
      "$\\frac{-{22} + {10}\\sqrt{2} + {11}\\sqrt{5} - 4\\sqrt{10}}{4}$"
    ],
    "answer": 1,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q24",
    "text": "$\\mathop{\\sum }\\limits_{{r = 2}}^{\\infty }\\left( {{2}^{r} + {3}^{r} + {4}^{r}}\\right)$",
    "options": [
      "40",
      "$\\begin{array}{l} 3 \\\\  4 \\end{array}$",
      "157"
    ],
    "answer": 0,
    "topic": "advanced_physics"
  },
  {
    "id": "q25",
    "text": "\n\n<img src=\"/question-images/engaa/226_114_1017_1409_897_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n31 What is the complete set of real values of $x$ for which\n\n\n\n$$\n\n{x}^{2}\\left( {{x}^{2} + 4}\\right)  < {21}\n\n$$",
    "options": [
      "$- \\sqrt{3} < x < \\sqrt{3}$",
      "$- \\sqrt{7} < x < \\sqrt{7}$",
      "$x <  - \\sqrt{3}$ or $x > \\sqrt{3}$",
      "$x <  - \\sqrt{7}$ or $x > \\sqrt{7}$",
      "$- \\sqrt{7} < x <  - \\sqrt{3}$ or $\\sqrt{3} < x < \\sqrt{7}$",
      "$x <  - \\sqrt{7}$ or $- \\sqrt{3} < x < \\sqrt{3}$ or $x > \\sqrt{7}$"
    ],
    "answer": 1,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q26",
    "text": "33 A sector of a circle has perimeter 24.\n\n\n\nFor what value of the radius does the sector have the maximum possible area?",
    "options": [
      "$3\\sqrt{2}$",
      "$2\\sqrt{6}$",
      "$3\\sqrt{6}$",
      "6",
      "12",
      "18",
      "36"
    ],
    "answer": 0,
    "topic": "advanced_physics"
  },
  {
    "id": "q27",
    "text": "\n\n<img src=\"/question-images/engaa/228_116_860_1445_925_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n35 The curve $y = {x}^{2} - x - 6$ intersects the $x$ -axis at the points $A$ and $B$ , and has a minimum at the point $C$ .\n\n\n\nThe rectangle ${ABDE}$ has two of its vertices at $A$ and $B$ .\n\n\n\nThe point $C$ lies on the edge ${DE}$ , between $D$ and $E$ .\n\n\n\nWhat is the area of the rectangle ${ABDE}$ ?",
    "options": [
      "6",
      "6.25",
      "30",
      "31.25",
      "35",
      "36.75",
      "42",
      "43.75"
    ],
    "answer": 3,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q28",
    "text": "A straight line passes through the points $\\left( {0,{2a}}\\right)$ and $\\left( {a,0}\\right)$ , where $a$ is a positive constant. What is the perpendicular distance of the point $P\\left( {a,{2a}}\\right)$ from this line?",
    "options": [
      "$\\;\\frac{5}{5}a$",
      "$\\frac{\\sqrt{5}}{2}a$",
      "$\\frac{2\\sqrt{5}}{5}a$",
      "$\\frac{4\\sqrt{5}}{5}a$",
      "$\\frac{3\\sqrt{10}}{5}a$"
    ],
    "answer": 3,
    "topic": "advanced_physics"
  },
  {
    "id": "q29",
    "text": "\n\n<img src=\"/question-images/engaa/230_99_916_1469_1139_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n39 Find the sum of the real solutions to the equation\n\n\n\n$$\n\n{2}^{x} - {\\left( \\sqrt{2}\\right) }^{x + 6} + {12} = 0\n\n$$",
    "options": [
      "8",
      "16",
      "2 ${}^{2}$",
      "$1 + \\frac{1}{2}{\\log }_{2}3$",
      "$4 + 2{\\log }_{2}3$"
    ],
    "answer": 2,
    "topic": "advanced_mathematics"
  }
]$json$
);


INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions)
VALUES (
  'ENGAA 2023 — Part A (19 Qs) + Part B (9 Qs)',
  1,
  2023,
  'November',
  80,
  28,
  ARRAY['mathematics', 'physics', 'advanced_mathematics', 'advanced_physics']::text[],
  $json$[
  {
    "id": "q1",
    "text": "1 The surface area of a solid sphere of radius $R$ is equal to the total surface area of 10 solid closed cylinders of radius $r$ and height ${4r}$ .\n\n\n\nWhich of the following is an expression for $R$ in terms of $r$ ?\n\n\n\n(The surface area of a sphere of radius $R$ is ${4\\pi }{R}^{2}$ .)\n\n\n\n${AR} = {5r}$",
    "options": [
      "$R = {12r}$",
      "$\\;R = 2\\sqrt{5}r$",
      "$\\;R = \\frac{1}{2}\\sqrt{10}r$",
      "$\\;R = \\sqrt{10}r$",
      "$\\;R = \\frac{3}{2}\\sqrt{10}r$",
      "$\\;R = \\sqrt{15}r$"
    ],
    "answer": 0,
    "topic": "mathematics"
  },
  {
    "id": "q2",
    "text": "2 A spaceship of mass ${10000}\\mathrm{\\;{kg}}$ is moving at ${2.0}\\mathrm{\\;m}{\\mathrm{\\;s}}^{-1}$ relative to a space station.\n\n\n\nThe spaceship is captured by a robotic arm attached to the space station and brought to rest by a force of ${1000}\\mathrm{\\;N}$ .\n\n\n\nHow far will the spaceship move in its initial direction relative to the space station while the force is being applied?\n\n\n\n(Assume that the acceleration of the space station is negligible.)",
    "options": [
      "${0.050}\\mathrm{\\;m}$",
      "${0.10}\\mathrm{\\;m}$",
      "${0.20}\\mathrm{\\;m}$",
      "${5.0}\\mathrm{\\;m}$",
      "${10}\\mathrm{\\;m}$",
      "${20}\\mathrm{\\;m}$"
    ],
    "answer": 5,
    "topic": "physics"
  },
  {
    "id": "q3",
    "text": "3 Which of the following is a correct rearrangement of\n\n\n\n$$\n\ny = p - \\frac{q - r}{s - x}\n\n$$\n\n\n\nto make $x$ the subject?",
    "options": [
      "$x = s - \\frac{q - r}{p + y}$",
      "$x = \\frac{q - r}{p + y} - s$",
      "$\\;x = s - \\frac{q - r}{p - y}$",
      "$\\;x = \\frac{q - r}{p - y} - s$",
      "$x = s - \\frac{q - r}{y - p}$"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q4",
    "text": "$$\n\n\\mathbf{F}\\;x = \\frac{q - r}{y - p} - s\n\n$$\n\n\n\n4 A circuit is set up as shown. All three resistors are identical.\n\n\n\nWhen the switch is open, the reading on the ammeter is 1.0 A and the power transferred from the battery is 1.0 W.\n\n\n\n\n\n<img src=\"/question-images/engaa/236_580_335_567_335_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe switch is now closed.\n\n\n\nWhat is the new reading on the ammeter and what is the new power transferred from the battery?\n\n\n\n",
    "options": [],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q5",
    "text": "\n\n\n\n\n\n<img src=\"/question-images/engaa/237_562_160_604_611_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nWXYZ is a square of side length 1.\n\n\n\n$$\n\n{WM} : {MX} = 1 : 2\n\n$$\n\n\n\n$$\n\n{XN} : {NY} = 3 : 1\n\n$$\n\n\n\n$$\n\n{YP} : {PZ} = 4 : 1\n\n$$\n\n\n\nWhat is the area of triangle ${MNP}$ ?",
    "options": [
      "$\\frac{1}{3}$",
      "$\\frac{2}{5}$",
      "$\\frac{9}{20}$",
      "$\\frac{1}{30}$",
      "$\\frac{19}{60}$",
      "$\\frac{23}{60}$"
    ],
    "answer": 5,
    "topic": "mathematics"
  },
  {
    "id": "q6",
    "text": "6 A spring is initially unstretched. A force $F$ is used to stretch the spring. The extension $x$ and the energy $E$ stored in the stretched spring are measured for different values of $F$ .\n\n\n\nThe graph shows how the energy $E$ , in $\\mathrm{J}$ , varies with the extension squared, ${x}^{2}$ , in ${\\mathrm{{cm}}}^{2}$ .\n\n\n\n\n\n<img src=\"/question-images/engaa/238_534_342_544_398_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhat is the magnitude of $F$ when the spring stores ${0.015}\\mathrm{\\;J}$ of energy?",
    "options": [
      "${0.30}\\mathrm{\\;N}$",
      "${0.60}\\mathrm{\\;N}$",
      "1.2N",
      "1.5N",
      "2.4N",
      "3.0N",
      "30N",
      "60N"
    ],
    "answer": 1,
    "topic": "physics"
  },
  {
    "id": "q7",
    "text": "7 Given that\n\n\n\n$$\n\n\\frac{{27}^{2\\left( {x - 2}\\right) }}{{9}^{\\left( 2x - 3\\right) }} = {\\left( {81}\\right) }^{\\frac{3}{2}}\n\n$$\n\n\n\nwhat is the value of $x$ ?",
    "options": [
      "0",
      "2.5",
      "3",
      "6",
      "7.5",
      "9",
      "10.5",
      "12"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q8",
    "text": "8 A solid, cylindrical metal bar has a uniform cross-sectional area of ${12}{\\mathrm{\\;{cm}}}^{2}$ and a volume of ${180}{\\mathrm{\\;{cm}}}^{3}$ .\n\n\n\nThe bar rests on a horizontal surface on one of its circular faces.\n\n\n\nThe pressure on the surface due to the bar is ${0.45}\\mathrm{\\;N}{\\mathrm{\\;{cm}}}^{-2}$ .\n\n\n\nWhat is the density of the metal, in ${\\mathrm{{gcm}}}^{-3}$ ?\n\n\n\n(gravitational field strength $= {10}\\mathrm{\\;N}{\\mathrm{\\;{kg}}}^{-1}$ )",
    "options": [
      "${2.5}\\mathrm{g}{\\mathrm{{cm}}}^{-3}$",
      "${3.0}\\mathrm{g}{\\mathrm{{cm}}}^{-3}$",
      "${3.75}\\mathrm{g}{\\mathrm{{cm}}}^{-3}$",
      "${7.5}\\mathrm{g}{\\mathrm{\\;{cm}}}^{-3}$",
      "${15}\\mathrm{g}{\\mathrm{{cm}}}^{-3}$",
      "${33}\\mathrm{g}{\\mathrm{{cm}}}^{-3}$"
    ],
    "answer": 1,
    "topic": "physics"
  },
  {
    "id": "q9",
    "text": "9 Last year, the salary of the coach of a football club was 80\\% of the salary of the star player.\n\n\n\nAt the start of the new year, the coach received a 15\\% increase in salary and the star player received a 38\\% increase in salary.\n\n\n\nWhat percentage of the star player's new salary is the coach's new salary?",
    "options": [
      "46\\%",
      "57\\%",
      "${61}\\frac{3}{5}\\%$",
      "${66}\\frac{2}{3}\\%$",
      "77\\%",
      "83 $\\frac{1}{3}\\%$"
    ],
    "answer": 3,
    "topic": "mathematics"
  },
  {
    "id": "q10",
    "text": "10 Two samples of pure radioactive isotopes X and Y decay with half-lives of 2 days and 3 days, respectively.\n\n\n\nBoth X and Y decay in a single step into different stable isotopes.\n\n\n\nInitially the number of atoms of $X$ is twice the number of atoms of $Y$ .\n\n\n\nAfter how many days are the expected numbers of atoms of $X$ and $Y$ equal to each other?\n\n\n\nA The expected numbers of atoms of $X$ and $Y$ are never equal.",
    "options": [
      "2 days",
      "3 days",
      "4 days",
      "6 days",
      "12 days"
    ],
    "answer": 4,
    "topic": "physics"
  },
  {
    "id": "q11",
    "text": "11 An athlete's training session consists of several complete repetitions of a three-part programme:\n\n\n\n1. Walk ${100}\\mathrm{\\;m}$ at an average speed of $6\\mathrm{\\;{km}}{\\mathrm{\\;h}}^{-1}$\n\n\n\n2. Jog 200 m at an average speed of ${10}\\mathrm{\\;{km}}{\\mathrm{\\;h}}^{-1}$\n\n\n\n3. Run ${100}\\mathrm{\\;m}$ at an average speed of ${20}\\mathrm{\\;{km}}{\\mathrm{\\;h}}^{-1}$\n\n\n\nWhat is the athlete’s average speed for the complete training session, in ${\\mathrm{{kmh}}}^{-1}$ ?",
    "options": [
      "7.2",
      "9.6",
      "11.5",
      "12",
      "14.4"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q12",
    "text": "12 A large, flat, metal plate is coated on one side with a layer of thermally insulating material of the same thickness $a$ as the metal plate.\n\n\n\nThe uninsulated top surface of the metal plate is maintained at a constant temperature ${T}_{1}$ .\n\n\n\nThe bottom surface of the insulating material is maintained at a constant, lower temperature ${T}_{2}$ .\n\n\n\nThe system is in equilibrium.\n\n\n\nThe diagram shows this arrangement.\n\n\n\n\n\n<img src=\"/question-images/engaa/242_548_562_635_285_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nWhich graph could show how the temperature varies with distance from the top surface of the metal plate to the bottom surface of the insulating material?\n\n\n\n\n\n<img src=\"/question-images/engaa/242_193_1008_1256_1069_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n13 Two objects $X$ and $Y$ are similar.\n\n\n\nThe surface area of object $Y$ is double the surface area of object $X$ .\n\n\n\nThe volume of object $Y$ is $7\\sqrt{2}{\\mathrm{\\;{cm}}}^{3}$ more than the volume of object $X$ .\n\n\n\nWhat is the volume of object $X$ , in ${\\mathrm{{cm}}}^{3}$ ?",
    "options": [
      "${14} - 7\\sqrt{2}$",
      "${14} + 7\\sqrt{2}$",
      "$\\frac{{42} + 7\\sqrt{2}}{17}$",
      "$\\frac{7\\sqrt{2}}{3}$",
      "$7\\sqrt{2}$",
      "$4 - \\sqrt{2}$",
      "$4 + \\sqrt{2}$"
    ],
    "answer": 0,
    "topic": "physics"
  },
  {
    "id": "q13",
    "text": "14 The voltage output of a power station is stepped up using a transformer before the power is transmitted to a distant town. The primary coil of this transformer has 300 turns and the secondary coil has 1500 turns.\n\n\n\nIn the town, a step-down transformer reduces the voltage supplied by the transmission cables to ${33000}\\mathrm{\\;V}$ for distribution within the town. The step-down transformer supplies a current of 1500 A.\n\n\n\nThe current in the transmission cables is ${450}\\mathrm{\\;A}$ and both transformers are ideal and ${100}\\%$ efficient.\n\n\n\nWhat is the voltage output of the power station?\n\n\n\n(Assume that the resistance of the transmission cables is negligible.)",
    "options": [
      "1980V",
      "6600V",
      "22000 V",
      "110000 V",
      "550000 V"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q14",
    "text": "15 The equation\n\n\n\n$$\n\n{\\left( \\frac{a \\times  {10}^{4} + {2a} \\times  {10}^{3}}{3 \\times  {10}^{-1}}\\right) }^{2} = 8 \\times  {10}^{9}\n\n$$\n\n\n\nhas two solutions for $a$ .\n\n\n\nWhat is the positive difference between these two solutions?",
    "options": [
      "0",
      "$2\\sqrt{5}$",
      "$4\\sqrt{5}$",
      "${20}\\sqrt{5}$",
      "${40}\\sqrt{5}$",
      "${200}\\sqrt{5}$"
    ],
    "answer": 2,
    "topic": "physics"
  },
  {
    "id": "q15",
    "text": "16 A transverse wave with an amplitude of ${3.0}\\mathrm{\\;{cm}}$ travels along a stretched string. The wave has a frequency of ${12}\\mathrm{\\;{Hz}}$ and a wavelength of ${0.25}\\mathrm{\\;m}$ .\n\n\n\nWhat is the average speed of a particle in the string as the string oscillates during a time of 2.0s?",
    "options": [
      "${36}\\mathrm{\\;{cm}}{\\mathrm{\\;s}}^{-1}$",
      "${72}\\mathrm{\\;{cm}}{\\mathrm{\\;s}}^{-1}$",
      "${125}\\mathrm{\\;{cm}}{\\mathrm{\\;s}}^{-1}$",
      "${144}\\mathrm{\\;{cm}}{\\mathrm{\\;s}}^{-1}$",
      "${300}\\mathrm{\\;{cm}}{\\mathrm{\\;s}}^{-1}$"
    ],
    "answer": 1,
    "topic": "mathematics"
  },
  {
    "id": "q16",
    "text": "${17X}$ and $Y$ are the end-points of a line segment.\n\n\n\nPoint $P$ has coordinates $\\left( {-8,5}\\right)$ .\n\n\n\n$P$ lies on the line segment ${XY}$ such that ${XP} : {PY}$ is $1 : 2$ and $\\overrightarrow{XP} = \\left( \\begin{matrix} 4 \\\\   - 3 \\end{matrix}\\right)$\n\n\n\nA point $Q$ is such that $\\overrightarrow{QY} = \\left( \\begin{array}{l} 7 \\\\  6 \\end{array}\\right)$\n\n\n\nWhat are the coordinates of point $Q$ ?",
    "options": [
      "$\\left( {7,5}\\right)$",
      "$\\left( {3,8}\\right)$",
      "$\\left( {1, - {12}}\\right)$",
      "$\\left( {-3, - {10}}\\right)$",
      "(-11,-4)"
    ],
    "answer": 3,
    "topic": "physics"
  },
  {
    "id": "q17",
    "text": "\n\n<img src=\"/question-images/engaa/246_582_229_564_275_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nThe power transferred by the battery is $6\\mathrm{\\;W}$ .\n\n\n\nThe resistance of $X$ is ${10\\Omega }$ .\n\n\n\nThe voltage across $Y$ is ${4V}$ .\n\n\n\nWhat is the current in the circuit?",
    "options": [
      "$\\frac{2}{5}$ A",
      "$\\frac{3}{5}A$",
      "$\\frac{3}{4}A$",
      "1A",
      "$\\sqrt{\\frac{3}{10}}A$",
      "$\\sqrt{\\frac{3}{5}}A$"
    ],
    "answer": 4,
    "topic": "mathematics"
  },
  {
    "id": "q18",
    "text": "$$\n\n{2}^{\\sin x} \\times  {3}^{-\\sin x}\n\n$$\n\n\n\nwhere ${0}^{ \\circ  } \\leq  x \\leq  {360}^{ \\circ  }$",
    "options": [
      "$\\frac{2}{3}$",
      "1",
      "2",
      "3",
      "6"
    ],
    "answer": 1,
    "topic": "physics"
  },
  {
    "id": "q19",
    "text": "20 A diver at the bottom of a lake of depth $d$ fills a syringe with an ideal gas and seals the nozzle. The piston remains free to move. The volume of the gas in the syringe at the bottom of the lake is ${90}{\\mathrm{\\;{cm}}}^{3}$ .\n\n\n\nAs the diver returns to the surface, the temperature of the gas does not change. At the surface of the lake the gas in the syringe is at atmospheric pressure and the volume of the gas is ${720}{\\mathrm{\\;{cm}}}^{3}$ .\n\n\n\nWhat is the volume of the gas in the syringe at a depth $\\frac{d}{2}$ ?",
    "options": [
      "${160}{\\mathrm{\\;{cm}}}^{3}$",
      "${180}{\\mathrm{\\;{cm}}}^{3}$",
      "${206}{\\mathrm{\\;{cm}}}^{3}$",
      "${225}{\\mathrm{\\;{cm}}}^{3}$",
      "${288}{\\mathrm{\\;{cm}}}^{3}$",
      "${315}{\\mathrm{\\;{cm}}}^{3}$",
      "${360}{\\mathrm{\\;{cm}}}^{3}$",
      "${405}{\\mathrm{\\;{cm}}}^{3}$"
    ],
    "answer": 2,
    "topic": "mathematics"
  },
  {
    "id": "q20",
    "text": "NOTE: questions in this part that are not covered by the ESAT content specification are indicated by a cross through the question number.\n\n\n\n21 ${x}^{2} - x - 6$ is a factor of ${x}^{3} + a{x}^{2} + {2x} + b$ , where $a$ and $b$ are real constants.\n\n\n\nWhat is the value of $a + b$ ?",
    "options": [
      "-39",
      "-21",
      "-3",
      "$- \\frac{3}{5}$",
      "5",
      "3",
      "21",
      "39"
    ],
    "answer": 0,
    "topic": "advanced_physics"
  },
  {
    "id": "q21",
    "text": "\n\n<img src=\"/question-images/engaa/249_104_993_1430_759_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n23 An arithmetic progression has first term $a$ and common difference $d$ .\n\n\n\nThe sum of the first 9 terms plus the sum of the first 10 terms is equal to the sum of the first 11 terms.\n\n\n\nWhich of the following is a correct expression for $a$ in terms of $d$ ?",
    "options": [
      "$a =  - \\frac{13}{4}d$",
      "$a =  - \\frac{15}{4}d$",
      "$a =  - \\frac{16}{3}d$",
      "$a =  - \\frac{19}{3}d$",
      "$a =  - {7d}$",
      "$a =  - {8d}$"
    ],
    "answer": 3,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q22",
    "text": "\n\n<img src=\"/question-images/engaa/250_109_989_1470_953_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n5 The first three terms of a convergent geometric progression are:\n\n\n\n$$\n\n{2p},p - 3,p - 7\n\n$$\n\n\n\nWhat is the sum to infinity of this progression?",
    "options": [
      "-54",
      "-27",
      "$- {13}\\frac{1}{2}$",
      "-2",
      "2",
      "13",
      "27",
      "54"
    ],
    "answer": 3,
    "topic": "advanced_physics"
  },
  {
    "id": "q23",
    "text": "\n\n<img src=\"/question-images/engaa/251_113_986_1386_1029_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n\n\n<img src=\"/question-images/engaa/252_500_231_728_721_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n[diagram not to scale]\n\n\n\nWhat is the value of $x$ ?",
    "options": [
      "${40}^{ \\circ  }$",
      "${50}^{ \\circ  }$",
      "${55}^{ \\circ  }$",
      "70 \\textdegree",
      "75 \\textdegree",
      "80 \\textdegree"
    ],
    "answer": 2,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q24",
    "text": "$$\n\nf\\left( x\\right)  = \\sqrt{2}{x}^{2} - {6x} + 4\n\n$$\n\n\n\ncan be written in the form\n\n\n\n$$\n\nf\\left( x\\right)  = p{\\left( x + q\\right) }^{2} + r\n\n$$\n\n\n\nwhere $p,q$ and $r$ are constants.\n\n\n\nWhat is the value of $p\\left( {r - q}\\right)$ ?",
    "options": [
      "2",
      "7",
      "$3 - \\frac{\\sqrt{2}}{2}$",
      "$3 - 7\\sqrt{2}$",
      "$4 - 3\\sqrt{2}$",
      "$4\\sqrt{2} - 6$",
      "$4\\sqrt{2} - {12}$",
      "$7\\sqrt{2} - {18}$"
    ],
    "answer": 4,
    "topic": "advanced_physics"
  },
  {
    "id": "q25",
    "text": "$$\n\n{\\int }_{-\\left( {3 - \\sqrt{5}}\\right) }^{3 - \\sqrt{5}}\\frac{{x}^{2}}{3 - \\sqrt{5}}\\mathrm{\\;d}x\n\n$$\n\n\n\n$$\n\n\\text{ A 0 }\n\n$$",
    "options": [
      "${}_{3}^{2}$",
      "${}_{3}^{8}$",
      "4",
      "${28} - {12}\\sqrt{5}$"
    ],
    "answer": 1,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q26",
    "text": "$$\n\nf\\left( x\\right)  = \\frac{a}{x} + \\frac{b}{{x}^{2}}\n\n$$\n\n\n\n\n\n<img src=\"/question-images/engaa/254_115_946_1442_1148_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\nwhere $a$ and $b$ are constants.\n\n\n\nIt is given that ${f}^{\\prime }\\left( 1\\right)  = 2$ and ${f}^{\\prime \\prime }\\left( {-1}\\right)  =  - 2$\n\n\n\nWhat is the value of $a + b$ ?",
    "options": [
      "-5",
      "-4",
      "-1",
      "9",
      "2",
      "$\\frac{14}{5}$",
      "3"
    ],
    "answer": 1,
    "topic": "advanced_physics"
  },
  {
    "id": "q27",
    "text": "5 Find the real value of $x$ that satisfies\n\n\n\n$$\n\n{\\log }_{3}\\left( {{x}^{2} + {3x} + 2}\\right)  = 2 + {\\log }_{3}\\left( {{x}^{2} + {2x}}\\right)\n\n$$\n\n\n\n$$\n\n\\text{ A 1 }\n\n$$\n\n\n\n$$\n\n\\text{ B 7 }\n\n$$\n\n\n\n$$\n\n\\text{ C 6 }\n\n$$\n\n\n\n$$\n\n\\text{ D 1 }\n\n$$\n\n\n\nE 2\n\n\n\nF 7\n\n\n\n\n\n<img src=\"/question-images/engaa/256_121_908_1426_774_0.jpg\" alt=\"diagram\" style=\"max-width:100%;margin:12px 0;\">\n\n\n\n \n\n\n\n7 What is the constant term in the simplified binomial expansion of ${\\left( \\frac{2}{x} + \\frac{x}{4}\\right) }^{8}$ ?",
    "options": [
      "$\\frac{7}{2}$",
      "$\\frac{35}{8}$",
      "$\\frac{1}{16}$",
      "$\\frac{7}{256}$",
      "$\\frac{35}{1024}$",
      "$\\frac{1}{2048}$"
    ],
    "answer": 5,
    "topic": "advanced_mathematics"
  },
  {
    "id": "q28",
    "text": "Given that\n\n\n\n$$\n\n{x}^{2} + {y}^{2} = 1\n\n$$\n\n\n\nwhat is the greatest possible value of ${2x} + {3y}$ ?",
    "options": [
      "$\\begin{array}{l} 7 \\\\  2 \\end{array}$",
      "3",
      "$\\sqrt{7}$",
      "$\\sqrt{10}$",
      "$\\begin{matrix} {13}\\sqrt{10} \\\\  {10} \\end{matrix}$"
    ],
    "answer": 4,
    "topic": "advanced_physics"
  }
]$json$
);

