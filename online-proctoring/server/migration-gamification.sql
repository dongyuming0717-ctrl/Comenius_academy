-- ============================================================
-- Migration: Gamification System
-- Adds check-ins, streaks, XP, achievements, and streak freezes
-- Run in Supabase SQL Editor
-- ============================================================

-- Helper function: resolve auth.uid() → public.users.id
CREATE OR REPLACE FUNCTION get_user_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT id FROM public.users WHERE auth_id = auth.uid();
$$;

-- ============================================================
-- check_ins — daily check-in records
-- ============================================================
CREATE TABLE IF NOT EXISTS check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  check_in_date DATE NOT NULL DEFAULT CURRENT_DATE,
  source TEXT NOT NULL DEFAULT 'exam_complete' CHECK (source IN ('exam_complete', 'manual')),
  exam_session_id UUID REFERENCES exam_sessions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, check_in_date)
);

CREATE INDEX IF NOT EXISTS idx_check_ins_user ON check_ins(user_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_date ON check_ins(user_id, check_in_date DESC);

ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own check_ins" ON check_ins FOR SELECT
  USING (user_id = get_user_id());

CREATE POLICY "Users insert own check_ins" ON check_ins FOR INSERT
  WITH CHECK (user_id = get_user_id());

-- ============================================================
-- streaks — current streak state per user
-- ============================================================
CREATE TABLE IF NOT EXISTS streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  current_streak INT NOT NULL DEFAULT 0,
  longest_streak INT NOT NULL DEFAULT 0,
  last_check_in_date DATE,
  freeze_available INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_streaks_user ON streaks(user_id);

ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own streak" ON streaks FOR SELECT
  USING (user_id = get_user_id());

CREATE POLICY "Users insert own streak" ON streaks FOR INSERT
  WITH CHECK (user_id = get_user_id());

CREATE POLICY "Users update own streak" ON streaks FOR UPDATE
  USING (user_id = get_user_id());

-- ============================================================
-- achievements — static reference data
-- ============================================================
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_zh TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'trophy',
  xp_reward INT NOT NULL DEFAULT 0,
  freeze_reward INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read achievements" ON achievements FOR SELECT USING (true);

-- Seed achievements
INSERT INTO achievements (key, title_en, title_zh, description_en, description_zh, icon, xp_reward, freeze_reward) VALUES
  ('first_checkin', 'First Steps', '第一步', 'Complete your first daily check-in.', '完成第一次每日打卡。', 'star', 50, 0),
  ('first_exam', 'Novice Examiner', '新手考生', 'Complete your first exam.', '完成第一次考试。', 'book', 100, 0),
  ('streak_3', 'Warming Up', '渐入佳境', 'Maintain a 3-day streak.', '连续打卡 3 天。', 'flame', 30, 0),
  ('streak_7', 'Weekly Warrior', '一周战士', 'Maintain a 7-day streak.', '连续打卡 7 天。', 'flame', 100, 0),
  ('streak_14', 'Fortnight Flame', '双周烈焰', 'Maintain a 14-day streak.', '连续打卡 14 天。', 'flame', 200, 0),
  ('streak_30', 'Monthly Master', '月度大师', 'Maintain a 30-day streak.', '连续打卡 30 天。', 'crown', 500, 1),
  ('streak_60', 'Unstoppable', '势不可挡', 'Maintain a 60-day streak.', '连续打卡 60 天。', 'crown', 1000, 0),
  ('streak_100', 'Century Streak', '百天连续', 'Maintain a 100-day streak.', '连续打卡 100 天。', 'diamond', 2500, 3),
  ('streak_365', 'Year of Dedication', '一年坚持', 'Maintain a 365-day streak.', '连续打卡一整年。', 'diamond', 10000, 5),
  ('xp_500', 'XP Apprentice', '经验学徒', 'Earn 500 total XP.', '累计获得 500 经验值。', 'bolt', 50, 0),
  ('xp_2000', 'XP Scholar', '经验学者', 'Earn 2000 total XP.', '累计获得 2000 经验值。', 'bolt', 150, 0),
  ('xp_10000', 'XP Legend', '经验传奇', 'Earn 10000 total XP.', '累计获得 10000 经验值。', 'bolt', 500, 0)
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- user_achievements — earned achievements per user
-- ============================================================
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX IF NOT EXISTS idx_user_achievements ON user_achievements(user_id);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own achievements" ON user_achievements FOR SELECT
  USING (user_id = get_user_id());

CREATE POLICY "Users insert own achievements" ON user_achievements FOR INSERT
  WITH CHECK (user_id = get_user_id());

-- ============================================================
-- xp_transactions — XP ledger
-- ============================================================
CREATE TABLE IF NOT EXISTS xp_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  amount INT NOT NULL,
  reason TEXT NOT NULL,
  reference_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_xp_user ON xp_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_user_week ON xp_transactions(user_id, created_at DESC);

ALTER TABLE xp_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own xp" ON xp_transactions FOR SELECT
  USING (user_id = get_user_id());

CREATE POLICY "Users insert own xp" ON xp_transactions FOR INSERT
  WITH CHECK (user_id = get_user_id());

-- ============================================================
-- streak_freezes — freeze usage log
-- ============================================================
CREATE TABLE IF NOT EXISTS streak_freezes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  used_on_date DATE NOT NULL,
  source TEXT NOT NULL DEFAULT 'earned' CHECK (source IN ('earned', 'purchased')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_freezes_user ON streak_freezes(user_id);

ALTER TABLE streak_freezes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own freezes" ON streak_freezes FOR SELECT
  USING (user_id = get_user_id());

CREATE POLICY "Users insert own freezes" ON streak_freezes FOR INSERT
  WITH CHECK (user_id = get_user_id());

-- Admin/teacher read access (following existing migration-admin.sql pattern)
CREATE POLICY "Admins read all check_ins" ON check_ins FOR SELECT
  USING ((SELECT role FROM users WHERE auth_id = auth.uid()) IN ('admin', 'teacher'));

CREATE POLICY "Admins read all streaks" ON streaks FOR SELECT
  USING ((SELECT role FROM users WHERE auth_id = auth.uid()) IN ('admin', 'teacher'));

CREATE POLICY "Admins read all user_achievements" ON user_achievements FOR SELECT
  USING ((SELECT role FROM users WHERE auth_id = auth.uid()) IN ('admin', 'teacher'));

CREATE POLICY "Admins read all xp" ON xp_transactions FOR SELECT
  USING ((SELECT role FROM users WHERE auth_id = auth.uid()) IN ('admin', 'teacher'));
