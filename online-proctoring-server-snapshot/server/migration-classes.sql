-- ============================================================
-- Classes & Class Students tables for Comenius TMUA
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Classes table
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Class students join table
CREATE TABLE IF NOT EXISTS class_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(class_id, student_id)
);

-- 3. Function to generate a random 6-char class code
CREATE OR REPLACE FUNCTION gen_class_code()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT upper(substring(md5(gen_random_uuid()::text) from 1 for 6));
$$;

-- 4. RLS: enable
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_students ENABLE ROW LEVEL SECURITY;

-- 5. Policies for classes
-- Teachers can manage their own classes
CREATE POLICY "Teachers manage own classes" ON classes FOR ALL
  USING (teacher_id IN (SELECT id FROM users WHERE auth_id = auth.uid()))
  WITH CHECK (teacher_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Anyone authenticated can read classes (to join by code)
CREATE POLICY "Anyone can read classes" ON classes FOR SELECT
  USING (auth.role() = 'authenticated');

-- 6. Policies for class_students
-- Students can read their own enrollments
CREATE POLICY "Students read own enrollments" ON class_students FOR SELECT
  USING (student_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Teachers can read enrollments for their classes
CREATE POLICY "Teachers read class enrollments" ON class_students FOR SELECT
  USING (class_id IN (SELECT id FROM classes WHERE teacher_id IN (SELECT id FROM users WHERE auth_id = auth.uid())));

-- Students can insert themselves into a class
CREATE POLICY "Students join class" ON class_students FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- 7. Indexes
CREATE INDEX IF NOT EXISTS idx_classes_code ON classes(code);
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_class_students_class ON class_students(class_id);
CREATE INDEX IF NOT EXISTS idx_class_students_student ON class_students(student_id);
