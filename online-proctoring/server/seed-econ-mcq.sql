-- CIE IGCSE Economics (0455) Multiple Choice — Seed Data
-- Auto-generated from all_papers_data.json
-- Delete existing econ papers first
DELETE FROM papers WHERE subject = 'economics';

-- ============================================================
-- Economics 0455/12 — Spring 2017
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/12 — Spring 2017',
  1,
  2017,
  'Spring',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '2. The Allocation of Resources', '3. Microeconomic Decision Makers', '5. Economic Development', '4. Government and the Macroeconomy', '6. International Trade and Globalisation'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q01.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q02.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q3", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q03.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q4", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q04.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "1. The Basic Economic Problem"},
    {"id": "q5", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q05.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q6", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q06.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q7", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q07.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q8", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q08.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q9", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q09.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q10", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q10.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q11", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q11.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q12", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q12.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q13", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q13.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q14", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q14.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q15", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q15.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q16", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q16.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q17", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q17.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q18", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q18.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q19", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q19.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "5. Economic Development"},
    {"id": "q20", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q20.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q21", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q21.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q22", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q22.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q23", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q23.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "5. Economic Development"},
    {"id": "q24", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q24.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "5. Economic Development"},
    {"id": "q25", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q25.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "5. Economic Development"},
    {"id": "q26", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q26.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "6. International Trade and Globalisation"},
    {"id": "q27", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q27.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q28", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q28.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q29", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q29.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q30", "image_url": "/question-images/econ/2017_Spring_v12/2017_Spring_v12_q30.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/12 — Winter 2017
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/12 — Winter 2017',
  1,
  2017,
  'Winter',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '4. Government and the Macroeconomy', '2. The Allocation of Resources', '3. Microeconomic Decision Makers', '5. Economic Development', '6. International Trade and Globalisation'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q01.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q02.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q3", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q03.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q4", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q04.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q5", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q05.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q6", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q06.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q7", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q07.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q8", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q08.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q9", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q09.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q10", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q10.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q11", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q11.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q12", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q12.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q13", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q13.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q14", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q14.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q15", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q15.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q16", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q16.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q17", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q17.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q18", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q18.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q19", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q19.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q20", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q20.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "5. Economic Development"},
    {"id": "q21", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q21.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "5. Economic Development"},
    {"id": "q22", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q22.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "5. Economic Development"},
    {"id": "q23", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q23.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "5. Economic Development"},
    {"id": "q24", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q24.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "5. Economic Development"},
    {"id": "q25", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q25.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q26", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q26.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "6. International Trade and Globalisation"},
    {"id": "q27", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q27.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q28", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q28.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q29", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q29.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2017_Winter_v12/2017_Winter_v12_q30.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/13 — Winter 2017
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/13 — Winter 2017',
  1,
  2017,
  'Winter',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '4. Government and the Macroeconomy', '2. The Allocation of Resources', '3. Microeconomic Decision Makers', '5. Economic Development', '6. International Trade and Globalisation'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q01.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q02.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q3", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q03.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q4", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q04.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q5", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q05.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q6", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q06.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q7", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q07.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q8", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q08.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q9", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q09.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q10", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q10.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q11", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q11.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q12", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q12.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q13", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q13.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q14", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q14.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "5. Economic Development"},
    {"id": "q15", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q15.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "5. Economic Development"},
    {"id": "q16", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q16.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q17", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q17.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "5. Economic Development"},
    {"id": "q18", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q18.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "5. Economic Development"},
    {"id": "q19", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q19.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "5. Economic Development"},
    {"id": "q20", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q20.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "5. Economic Development"},
    {"id": "q21", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q21.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q22", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q22.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q23", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q23.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "6. International Trade and Globalisation"},
    {"id": "q24", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q24.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "6. International Trade and Globalisation"},
    {"id": "q25", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q25.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q26", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q26.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q27", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q27.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q28", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q28.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q29", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q29.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2017_Winter_v13/2017_Winter_v13_q30.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/11 — Summer 2018
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/11 — Summer 2018',
  1,
  2018,
  'Summer',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '3. Microeconomic Decision Makers', '2. The Allocation of Resources', '4. Government and the Macroeconomy', '5. Economic Development', '6. International Trade and Globalisation'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q01.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q02.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q3", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q03.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q4", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q04.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q5", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q05.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q6", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q06.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q7", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q07.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q8", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q08.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q9", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q09.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q10", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q10.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q11", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q11.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q12", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q12.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q13", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q13.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q14", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q14.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q15", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q15.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q16", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q16.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q17", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q17.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q18", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q18.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q19", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q19.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q20", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q20.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "5. Economic Development"},
    {"id": "q21", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q21.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "5. Economic Development"},
    {"id": "q22", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q22.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "6. International Trade and Globalisation"},
    {"id": "q23", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q23.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "6. International Trade and Globalisation"},
    {"id": "q24", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q24.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q25", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q25.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q26", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q26.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q27", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q27.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q28", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q28.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q29", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q29.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2018_Summer_v11/2018_Summer_v11_q30.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/11 — Winter 2018
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/11 — Winter 2018',
  1,
  2018,
  'Winter',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '2. The Allocation of Resources', '3. Microeconomic Decision Makers', '4. Government and the Macroeconomy', '5. Economic Development'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q01.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q02.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "1. The Basic Economic Problem"},
    {"id": "q3", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q03.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q4", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q04.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q5", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q05.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q6", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q06.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q7", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q07.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q8", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q08.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q9", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q09.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q10", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q10.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q11", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q11.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q12", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q12.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q13", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q13.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q14", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q14.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q15", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q15.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q16", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q16.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q17", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q17.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q18", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q18.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q19", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q19.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q20", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q20.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q21", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q21.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q22", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q22.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "5. Economic Development"},
    {"id": "q23", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q23.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q24", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q24.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q25", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q25.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q26", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q26.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q27", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q27.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q28", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q28.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q29", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q29.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2018_Winter_v11/2018_Winter_v11_q30.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/12 — Winter 2018
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/12 — Winter 2018',
  1,
  2018,
  'Winter',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '2. The Allocation of Resources', '3. Microeconomic Decision Makers', '4. Government and the Macroeconomy', '6. International Trade and Globalisation'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q01.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q02.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "1. The Basic Economic Problem"},
    {"id": "q3", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q03.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q4", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q04.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q5", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q05.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q6", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q06.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q7", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q07.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q8", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q08.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q9", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q09.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q10", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q10.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q11", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q11.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q12", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q12.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q13", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q13.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q14", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q14.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q15", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q15.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q16", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q16.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q17", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q17.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q18", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q18.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q19", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q19.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q20", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q20.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q21", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q21.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q22", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q22.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q23", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q23.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q24", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q24.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q25", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q25.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "6. International Trade and Globalisation"},
    {"id": "q26", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q26.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q27", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q27.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q28", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q28.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q29", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q29.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2018_Winter_v12/2018_Winter_v12_q30.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/13 — Winter 2018
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/13 — Winter 2018',
  1,
  2018,
  'Winter',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '2. The Allocation of Resources', '3. Microeconomic Decision Makers', '4. Government and the Macroeconomy', '5. Economic Development', '6. International Trade and Globalisation'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q01.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q02.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "1. The Basic Economic Problem"},
    {"id": "q3", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q03.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q4", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q04.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q5", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q05.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q6", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q06.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q7", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q07.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q8", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q08.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q9", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q09.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q10", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q10.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q11", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q11.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q12", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q12.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q13", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q13.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q14", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q14.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q15", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q15.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q16", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q16.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q17", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q17.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q18", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q18.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q19", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q19.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q20", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q20.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "5. Economic Development"},
    {"id": "q21", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q21.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q22", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q22.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "6. International Trade and Globalisation"},
    {"id": "q23", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q23.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q24", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q24.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q25", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q25.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q26", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q26.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q27", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q27.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q28", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q28.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q29", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q29.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2018_Winter_v13/2018_Winter_v13_q30.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/12 — Summer 2019
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/12 — Summer 2019',
  1,
  2019,
  'Summer',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '2. The Allocation of Resources', '3. Microeconomic Decision Makers', '4. Government and the Macroeconomy', '5. Economic Development'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q01.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q02.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "1. The Basic Economic Problem"},
    {"id": "q3", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q03.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q4", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q04.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q5", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q05.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q6", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q06.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q7", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q07.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q8", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q08.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q9", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q09.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q10", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q10.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q11", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q11.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q12", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q12.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q13", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q13.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q14", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q14.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q15", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q15.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q16", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q16.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q17", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q17.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q18", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q18.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q19", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q19.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q20", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q20.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q21", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q21.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "5. Economic Development"},
    {"id": "q22", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q22.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "5. Economic Development"},
    {"id": "q23", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q23.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "5. Economic Development"},
    {"id": "q24", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q24.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q25", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q25.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q26", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q26.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q27", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q27.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q28", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q28.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q29", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q29.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2019_Summer_v12/2019_Summer_v12_q30.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/13 — Summer 2019
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/13 — Summer 2019',
  1,
  2019,
  'Summer',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '3. Microeconomic Decision Makers', '2. The Allocation of Resources', '4. Government and the Macroeconomy', '5. Economic Development', '6. International Trade and Globalisation'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q01.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q02.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q3", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q03.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q4", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q04.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q5", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q05.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q6", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q06.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q7", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q07.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q8", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q08.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q9", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q09.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q10", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q10.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q11", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q11.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q12", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q12.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q13", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q13.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q14", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q14.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q15", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q15.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "5. Economic Development"},
    {"id": "q16", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q16.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q17", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q17.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q18", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q18.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "5. Economic Development"},
    {"id": "q19", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q19.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "6. International Trade and Globalisation"},
    {"id": "q20", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q20.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q21", "image_url": "/question-images/econ/2019_Summer_v13/2019_Summer_v13_q21.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/11 — Winter 2019
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/11 — Winter 2019',
  1,
  2019,
  'Winter',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '4. Government and the Macroeconomy', '2. The Allocation of Resources', '3. Microeconomic Decision Makers', '5. Economic Development', '6. International Trade and Globalisation'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q01.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q02.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q3", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q03.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q4", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q04.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "1. The Basic Economic Problem"},
    {"id": "q5", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q05.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q6", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q06.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q7", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q07.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q8", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q08.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q9", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q09.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q10", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q10.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q11", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q11.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q12", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q12.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q13", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q13.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q14", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q14.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q15", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q15.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q16", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q16.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q17", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q17.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q18", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q18.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q19", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q19.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q20", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q20.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q21", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q21.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q22", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q22.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q23", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q23.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q24", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q24.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q25", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q25.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "5. Economic Development"},
    {"id": "q26", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q26.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q27", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q27.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "1. The Basic Economic Problem"},
    {"id": "q28", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q28.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "6. International Trade and Globalisation"},
    {"id": "q29", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q29.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2019_Winter_v11/2019_Winter_v11_q30.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/12 — Winter 2019
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/12 — Winter 2019',
  1,
  2019,
  'Winter',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '2. The Allocation of Resources', '4. Government and the Macroeconomy', '6. International Trade and Globalisation', '3. Microeconomic Decision Makers', '5. Economic Development'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q01.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q02.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "1. The Basic Economic Problem"},
    {"id": "q3", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q03.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q4", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q04.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "1. The Basic Economic Problem"},
    {"id": "q5", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q05.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q6", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q06.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q7", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q07.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q8", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q08.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q9", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q09.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q10", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q10.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q11", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q11.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "6. International Trade and Globalisation"},
    {"id": "q12", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q12.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "6. International Trade and Globalisation"},
    {"id": "q13", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q13.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q14", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q14.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q15", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q15.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q16", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q16.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q17", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q17.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q18", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q18.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q19", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q19.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q20", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q20.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q21", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q21.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q22", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q22.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q23", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q23.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "5. Economic Development"},
    {"id": "q24", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q24.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q25", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q25.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q26", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q26.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q27", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q27.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q28", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q28.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q29", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q29.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2019_Winter_v12/2019_Winter_v12_q30.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/11 — Winter 2021
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/11 — Winter 2021',
  1,
  2021,
  'Winter',
  45,
  30,
  ARRAY['General'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q01.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q2", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q02.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q3", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q03.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q4", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q04.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q5", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q05.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q6", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q06.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q7", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q07.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q8", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q08.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q9", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q09.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q10", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q10.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q11", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q11.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q12", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q12.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q13", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q13.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q14", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q14.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q15", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q15.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q16", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q16.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q17", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q17.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q18", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q18.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q19", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q19.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q20", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q20.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q21", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q21.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q22", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q22.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q23", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q23.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q24", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q24.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q25", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q25.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q26", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q26.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q27", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q27.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q28", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q28.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q29", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q29.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2021_Winter_v11/2021_Winter_v11_q30.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/12 — Winter 2021
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/12 — Winter 2021',
  1,
  2021,
  'Winter',
  45,
  30,
  ARRAY['3. Microeconomic Decision Makers'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q01.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q2", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q02.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q3", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q03.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q4", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q04.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q5", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q05.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q6", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q06.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q7", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q07.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q8", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q08.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q9", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q09.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q10", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q10.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q11", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q11.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q12", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q12.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q13", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q13.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q14", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q14.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q15", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q15.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q16", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q16.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q17", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q17.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q18", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q18.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q19", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q19.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q20", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q20.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q21", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q21.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q22", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q22.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q23", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q23.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q24", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q24.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q25", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q25.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q26", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q26.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q27", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q27.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q28", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q28.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q29", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q29.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2021_Winter_v12/2021_Winter_v12_q30.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/12 — Summer 2022
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/12 — Summer 2022',
  1,
  2022,
  'Summer',
  45,
  30,
  ARRAY['General'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q01.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q2", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q02.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q3", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q03.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q4", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q04.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q5", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q05.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q6", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q06.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q7", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q07.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q8", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q08.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q9", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q09.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q10", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q10.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q11", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q11.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q12", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q12.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q13", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q13.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q14", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q14.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q15", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q15.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q16", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q16.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q17", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q17.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q18", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q18.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q19", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q19.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q20", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q20.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q21", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q21.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q22", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q22.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q23", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q23.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q24", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q24.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q25", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q25.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q26", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q26.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q27", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q27.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q28", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q28.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q29", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q29.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2022_Summer_v12/2022_Summer_v12_q30.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/12 — Spring 2024
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/12 — Spring 2024',
  1,
  2024,
  'Spring',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '2. The Allocation of Resources', '3. Microeconomic Decision Makers', '4. Government and the Macroeconomy', '5. Economic Development', '6. International Trade and Globalisation'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q01.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q02.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "1. The Basic Economic Problem"},
    {"id": "q3", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q03.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q4", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q04.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q5", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q05.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q6", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q06.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q7", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q07.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q8", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q08.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q9", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q09.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q10", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q10.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q11", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q11.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q12", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q12.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q13", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q13.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q14", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q14.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q15", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q15.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q16", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q16.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q17", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q17.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q18", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q18.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q19", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q19.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q20", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q20.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q21", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q21.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "5. Economic Development"},
    {"id": "q22", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q22.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "5. Economic Development"},
    {"id": "q23", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q23.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q24", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q24.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q25", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q25.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q26", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q26.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "6. International Trade and Globalisation"},
    {"id": "q27", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q27.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q28", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q28.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q29", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q29.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2024_Spring_v12/2024_Spring_v12_q30.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/11 — Winter 2024
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/11 — Winter 2024',
  1,
  2024,
  'Winter',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '2. The Allocation of Resources', '3. Microeconomic Decision Makers', '4. Government and the Macroeconomy', '5. Economic Development', '6. International Trade and Globalisation'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q01.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q02.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "1. The Basic Economic Problem"},
    {"id": "q3", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q03.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "1. The Basic Economic Problem"},
    {"id": "q4", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q04.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q5", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q05.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q6", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q06.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q7", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q07.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q8", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q08.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q9", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q09.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q10", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q10.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q11", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q11.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q12", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q12.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q13", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q13.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q14", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q14.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q15", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q15.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q16", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q16.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q17", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q17.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q18", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q18.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q19", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q19.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q20", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q20.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q21", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q21.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q22", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q22.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q23", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q23.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "5. Economic Development"},
    {"id": "q24", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q24.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "1. The Basic Economic Problem"},
    {"id": "q25", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q25.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q26", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q26.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q27", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q27.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q28", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q28.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "6. International Trade and Globalisation"},
    {"id": "q29", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q29.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q30", "image_url": "/question-images/econ/2024_Winter_v11/2024_Winter_v11_q30.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/12 — Winter 2024
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/12 — Winter 2024',
  1,
  2024,
  'Winter',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '4. Government and the Macroeconomy', '2. The Allocation of Resources', '3. Microeconomic Decision Makers', '6. International Trade and Globalisation', '5. Economic Development'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q01.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q02.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "1. The Basic Economic Problem"},
    {"id": "q3", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q03.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q4", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q04.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q5", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q05.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q6", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q06.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q7", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q07.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q8", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q08.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q9", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q09.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q10", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q10.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "2. The Allocation of Resources"},
    {"id": "q11", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q11.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "6. International Trade and Globalisation"},
    {"id": "q12", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q12.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q13", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q13.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q14", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q14.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q15", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q15.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q16", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q16.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q17", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q17.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q18", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q18.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q19", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q19.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q20", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q20.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q21", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q21.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q22", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q22.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "5. Economic Development"},
    {"id": "q23", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q23.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "5. Economic Development"},
    {"id": "q24", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q24.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q25", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q25.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q26", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q26.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "6. International Trade and Globalisation"},
    {"id": "q27", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q27.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "Unclassified"},
    {"id": "q28", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q28.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "6. International Trade and Globalisation"},
    {"id": "q29", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q29.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "6. International Trade and Globalisation"},
    {"id": "q30", "image_url": "/question-images/econ/2024_Winter_v12/2024_Winter_v12_q30.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"}
  ]$$,
  'economics'
);

-- ============================================================
-- Economics 0455/12 — Summer 2025
-- ============================================================
INSERT INTO papers (title, paper_number, year, sitting, duration_minutes, total_marks, topics, questions, subject)
VALUES (
  'Economics 0455/12 — Summer 2025',
  1,
  2025,
  'Summer',
  45,
  30,
  ARRAY['1. The Basic Economic Problem', '3. Microeconomic Decision Makers', '2. The Allocation of Resources', '4. Government and the Macroeconomy', '6. International Trade and Globalisation'],
  $$[
    {"id": "q1", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q01.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "1. The Basic Economic Problem"},
    {"id": "q2", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q02.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "1. The Basic Economic Problem"},
    {"id": "q3", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q03.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q4", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q04.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q5", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q05.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q6", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q06.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q7", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q07.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q8", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q08.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "Unclassified"},
    {"id": "q9", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q09.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Unclassified"},
    {"id": "q10", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q10.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "2. The Allocation of Resources"},
    {"id": "q11", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q11.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "2. The Allocation of Resources"},
    {"id": "q12", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q12.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "Unclassified"},
    {"id": "q13", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q13.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q14", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q14.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q15", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q15.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q16", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q16.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q17", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q17.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q18", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q18.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "3. Microeconomic Decision Makers"},
    {"id": "q19", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q19.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q20", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q20.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q21", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q21.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "4. Government and the Macroeconomy"},
    {"id": "q22", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q22.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q23", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q23.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q24", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q24.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "4. Government and the Macroeconomy"},
    {"id": "q25", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q25.png", "options": ["A", "B", "C", "D"], "answer": 3, "topic": "2. The Allocation of Resources"},
    {"id": "q26", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q26.png", "options": ["A", "B", "C", "D"], "answer": 0, "topic": "4. Government and the Macroeconomy"},
    {"id": "q27", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q27.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "6. International Trade and Globalisation"},
    {"id": "q28", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q28.png", "options": ["A", "B", "C", "D"], "answer": 2, "topic": "6. International Trade and Globalisation"},
    {"id": "q29", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q29.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "4. Government and the Macroeconomy"},
    {"id": "q30", "image_url": "/question-images/econ/2025_Summer_v12/2025_Summer_v12_q30.png", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "6. International Trade and Globalisation"}
  ]$$,
  'economics'
);
