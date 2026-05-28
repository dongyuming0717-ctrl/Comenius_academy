-- ============================================================
-- Add UPDATE and DELETE policies for exam_sessions
-- Teachers and admins can update/delete exam sessions
-- Run this in Supabase SQL Editor
-- ============================================================

-- Allow admins and teachers to UPDATE exam_sessions (e.g. terminate)
DROP POLICY IF EXISTS "Admins can update sessions" ON exam_sessions;
CREATE POLICY "Admins can update sessions" ON exam_sessions FOR UPDATE
  USING (current_user_role() IN ('admin', 'teacher'))
  WITH CHECK (current_user_role() IN ('admin', 'teacher'));

-- Allow admins and teachers to DELETE exam_sessions
DROP POLICY IF EXISTS "Admins can delete sessions" ON exam_sessions;
CREATE POLICY "Admins can delete sessions" ON exam_sessions FOR DELETE
  USING (current_user_role() IN ('admin', 'teacher'));

-- Allow admins and teachers to DELETE exam_logs
DROP POLICY IF EXISTS "Admins can delete exam logs" ON exam_logs;
CREATE POLICY "Admins can delete exam logs" ON exam_logs FOR DELETE
  USING (current_user_role() IN ('admin', 'teacher'));

-- Allow admins and teachers to UPDATE users (for role management)
DROP POLICY IF EXISTS "Admins can update users" ON users;
CREATE POLICY "Admins can update users" ON users FOR UPDATE
  USING (current_user_role() IN ('admin', 'teacher'))
  WITH CHECK (current_user_role() IN ('admin', 'teacher'));
