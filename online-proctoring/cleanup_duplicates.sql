
-- Remove duplicate papers: keep the earliest UUID for each (year, paper_number)
-- Remove duplicate papers and 2024 P1 (cascading FK order: logs → sessions → papers)
DELETE FROM exam_logs WHERE session_id IN (
  SELECT id FROM exam_sessions
  WHERE paper_id IN (
    'ec450f44-79e8-4bfd-9071-82d3408b6561',
    '068f52ee-7ce9-49ef-83fd-97b9386a681b',
    '565070d5-2b1e-4c9b-a61a-a57844c401aa',
    '44bad14c-facc-4016-ae96-b3a579c3a920'
  )
);

DELETE FROM exam_sessions WHERE paper_id IN (
  'ec450f44-79e8-4bfd-9071-82d3408b6561',
  '068f52ee-7ce9-49ef-83fd-97b9386a681b',
  '565070d5-2b1e-4c9b-a61a-a57844c401aa',
  '44bad14c-facc-4016-ae96-b3a579c3a920'
);

DELETE FROM papers WHERE id IN (
  'ec450f44-79e8-4bfd-9071-82d3408b6561',
  '068f52ee-7ce9-49ef-83fd-97b9386a681b',
  '565070d5-2b1e-4c9b-a61a-a57844c401aa',
  '44bad14c-facc-4016-ae96-b3a579c3a920'
);
