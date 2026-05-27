-- ============================================================
-- Migration: Add origin + class_id to exam_sessions
-- Enables teachers to only see their own class assignments
-- Run this in Supabase SQL Editor
-- ============================================================

ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS origin TEXT DEFAULT 'self_practice'
  CHECK (origin IN ('self_practice', 'class_assignment'));

ALTER TABLE exam_sessions ADD COLUMN IF NOT EXISTS class_id UUID REFERENCES classes(id);

CREATE INDEX IF NOT EXISTS idx_exam_sessions_origin ON exam_sessions(origin);
CREATE INDEX IF NOT EXISTS idx_exam_sessions_class_id ON exam_sessions(class_id);
