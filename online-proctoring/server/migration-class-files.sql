-- Class Files: teacher upload / student download
CREATE TABLE IF NOT EXISTS class_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id UUID DEFAULT auth.uid(),
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookup by class
CREATE INDEX IF NOT EXISTS idx_class_files_class ON class_files(class_id);

-- Allow teachers to insert/delete, students to select
ALTER TABLE class_files ENABLE ROW LEVEL SECURITY;

-- Teachers can insert their own files
CREATE POLICY "teachers_insert_files" ON class_files
  FOR INSERT WITH CHECK (
    auth.uid() = teacher_id
  );

-- Teachers can delete their own files
CREATE POLICY "teachers_delete_files" ON class_files
  FOR DELETE USING (
    auth.uid() = teacher_id
  );

-- Any authenticated user in the class can view files
CREATE POLICY "class_members_select_files" ON class_files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM class_students
      WHERE class_students.class_id = class_files.class_id
      AND class_students.student_id = auth.uid()
    )
    OR auth.uid() = teacher_id
  );
