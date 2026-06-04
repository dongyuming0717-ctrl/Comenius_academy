-- ============================================================
-- Class-Papers junction table + additional RLS policies
-- Run this in Supabase SQL Editor
-- Requires: migration-admin-fix.sql (for current_user_role() function)
-- ============================================================

-- 1. Class-Papers junction table
--    Links papers to classes so teachers can assign exams
CREATE TABLE IF NOT EXISTS class_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  due_at TIMESTAMPTZ,
  UNIQUE(class_id, paper_id)
);

ALTER TABLE class_papers ENABLE ROW LEVEL SECURITY;

-- Teachers/admins can manage papers in their own classes
CREATE POLICY "Teachers manage own class_papers" ON class_papers FOR ALL
  USING (class_id IN (SELECT id FROM classes WHERE teacher_id IN (SELECT id FROM users WHERE auth_id = auth.uid())))
  WITH CHECK (class_id IN (SELECT id FROM classes WHERE teacher_id IN (SELECT id FROM users WHERE auth_id = auth.uid())));

-- Students can read papers assigned to classes they belong to
CREATE POLICY "Students read assigned papers" ON class_papers FOR SELECT
  USING (class_id IN (SELECT class_id FROM class_students WHERE student_id IN (SELECT id FROM users WHERE auth_id = auth.uid())));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_class_papers_class ON class_papers(class_id);
CREATE INDEX IF NOT EXISTS idx_class_papers_paper ON class_papers(paper_id);

-- ============================================================
-- 2. Teacher/admin UPDATE policy on exam_sessions (for session termination)
-- ============================================================
CREATE POLICY "Admins and teachers can update exam sessions" ON exam_sessions FOR UPDATE
  USING (current_user_role() IN ('admin', 'teacher'));

-- ============================================================
-- 3. Teacher/admin policies on papers (for paper management CRUD)
-- ============================================================
CREATE POLICY "Admins and teachers can insert papers" ON papers FOR INSERT
  WITH CHECK (current_user_role() IN ('admin', 'teacher'));

CREATE POLICY "Admins and teachers can update papers" ON papers FOR UPDATE
  USING (current_user_role() IN ('admin', 'teacher'));

CREATE POLICY "Admins and teachers can delete papers" ON papers FOR DELETE
  USING (current_user_role() IN ('admin', 'teacher'));
