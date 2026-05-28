-- ============================================================
-- Teacher Dashboard RPC functions for Comenius
-- Run in Supabase SQL Editor
-- ============================================================

-- IMPORTANT: Run these DROP + CREATE statements to update existing functions

-- 1. Get aggregated teacher stats (classes, students, papers, active exams)
--    is_admin=true returns stats for ALL classes
DROP FUNCTION IF EXISTS get_teacher_stats(teacher_id UUID);
CREATE OR REPLACE FUNCTION get_teacher_stats(teacher_id UUID, is_admin BOOLEAN DEFAULT FALSE)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  class_count INT;
  student_count INT;
  paper_count INT;
  active_exam_count INT;
BEGIN
  IF is_admin THEN
    SELECT COUNT(*) INTO class_count FROM classes;
    SELECT COUNT(*) INTO student_count FROM class_students;
    SELECT COUNT(DISTINCT cp.paper_id) INTO paper_count FROM class_papers cp;
    SELECT COUNT(*) INTO active_exam_count FROM exam_sessions es WHERE es.status = 'active';
  ELSE
    SELECT COUNT(*) INTO class_count FROM classes WHERE teacher_id = $1;
    SELECT COUNT(*) INTO student_count
    FROM class_students cs
    JOIN classes c ON c.id = cs.class_id
    WHERE c.teacher_id = $1;
    SELECT COUNT(DISTINCT cp.paper_id) INTO paper_count
    FROM class_papers cp
    JOIN classes c ON c.id = cp.class_id
    WHERE c.teacher_id = $1;
    SELECT COUNT(*) INTO active_exam_count
    FROM exam_sessions es
    JOIN classes c ON c.id = es.class_id
    WHERE c.teacher_id = $1 AND es.status = 'active';
  END IF;

  RETURN jsonb_build_object(
    'class_count', class_count,
    'student_count', student_count,
    'paper_count', paper_count,
    'active_exam_count', active_exam_count
  );
END;
$$;

-- 2. Get enriched class list with stats (replaces N+1 queries)
--    is_admin=true returns ALL classes
DROP FUNCTION IF EXISTS get_teacher_classes_enriched(teacher_id UUID);
CREATE OR REPLACE FUNCTION get_teacher_classes_enriched(teacher_id UUID, is_admin BOOLEAN DEFAULT FALSE)
RETURNS TABLE(
  id UUID,
  title TEXT,
  name TEXT,
  code TEXT,
  created_at TIMESTAMPTZ,
  student_count BIGINT,
  assigned_paper_count BIGINT,
  completed_count BIGINT,
  avg_score NUMERIC,
  last_active TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.title,
    c.name,
    c.code,
    c.created_at,
    COUNT(DISTINCT cs.student_id) AS student_count,
    COUNT(DISTINCT cp.paper_id) AS assigned_paper_count,
    COUNT(DISTINCT es.id) FILTER (WHERE es.status = 'completed') AS completed_count,
    ROUND(AVG(es.score) FILTER (WHERE es.status = 'completed')::numeric, 1) AS avg_score,
    MAX(es.ended_at) AS last_active
  FROM classes c
  LEFT JOIN class_students cs ON cs.class_id = c.id
  LEFT JOIN class_papers cp ON cp.class_id = c.id
  LEFT JOIN exam_sessions es ON es.class_id = c.id
  WHERE (is_admin OR c.teacher_id = $1)
  GROUP BY c.id
  ORDER BY c.created_at DESC;
END;
$$;

-- 3. Get recent activity feed for a teacher
--    is_admin=true returns activity from ALL classes
DROP FUNCTION IF EXISTS get_teacher_activity(teacher_id UUID, limit_count INT);
CREATE OR REPLACE FUNCTION get_teacher_activity(teacher_id UUID, limit_count INT DEFAULT 10, is_admin BOOLEAN DEFAULT FALSE)
RETURNS TABLE(
  event_type TEXT,
  event_time TIMESTAMPTZ,
  student_name TEXT,
  class_name TEXT,
  detail TEXT,
  score NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  (
    -- Exam completions
    SELECT
      'exam_completed'::TEXT AS event_type,
      es.ended_at AS event_time,
      COALESCE(u.full_name, u.email) AS student_name,
      c.name AS class_name,
      p.title AS detail,
      es.score
    FROM exam_sessions es
    JOIN users u ON u.id = es.user_id
    JOIN papers p ON p.id = es.paper_id
    JOIN classes c ON c.id = es.class_id
    WHERE (is_admin OR c.teacher_id = $1) AND es.status = 'completed'
    ORDER BY es.ended_at DESC NULLS LAST
    LIMIT $2
  )
  UNION ALL
  (
    -- High-severity violations
    SELECT
      'high_violation'::TEXT AS event_type,
      el.recorded_at AS event_time,
      COALESCE(u.full_name, u.email) AS student_name,
      c.name AS class_name,
      el.event_type::TEXT AS detail,
      NULL::NUMERIC AS score
    FROM exam_logs el
    JOIN exam_sessions es ON es.id = el.session_id
    JOIN users u ON u.id = es.user_id
    JOIN classes c ON c.id = es.class_id
    WHERE (is_admin OR c.teacher_id = $1) AND el.severity = 'high'
    ORDER BY el.recorded_at DESC NULLS LAST
    LIMIT $2
  )
  UNION ALL
  (
    -- New students joining classes
    SELECT
      'student_joined'::TEXT AS event_type,
      cs.joined_at AS event_time,
      COALESCE(u.full_name, u.email) AS student_name,
      c.name AS class_name,
      NULL::TEXT AS detail,
      NULL::NUMERIC AS score
    FROM class_students cs
    JOIN users u ON u.id = cs.student_id
    JOIN classes c ON c.id = cs.class_id
    WHERE (is_admin OR c.teacher_id = $1)
    ORDER BY cs.joined_at DESC NULLS LAST
    LIMIT $2
  )
  ORDER BY event_time DESC NULLS LAST
  LIMIT $2;
END;
$$;
