-- ============================================================
-- Migration: User Unlocks + Redeem XP RPC
-- ============================================================

-- ----------------------------------------
-- user_unlocks — tracks redeemed unlocks
-- ----------------------------------------
CREATE TABLE IF NOT EXISTS user_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  unlock_key TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, unlock_key)
);

CREATE INDEX IF NOT EXISTS idx_user_unlocks_user ON user_unlocks(user_id);

ALTER TABLE user_unlocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own unlocks" ON user_unlocks FOR SELECT
  USING (user_id = get_user_id());

CREATE POLICY "Users insert own unlocks" ON user_unlocks FOR INSERT
  WITH CHECK (user_id = get_user_id());

-- ----------------------------------------
-- redeem_unlock — atomic XP deduction + unlock
-- ----------------------------------------
CREATE OR REPLACE FUNCTION redeem_unlock(p_unlock_key TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id UUID;
  v_total_xp INT;
BEGIN
  SELECT id INTO v_user_id FROM public.users WHERE auth_id = auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'user_not_found');
  END IF;

  IF EXISTS (SELECT 1 FROM public.user_unlocks WHERE user_id = v_user_id AND unlock_key = p_unlock_key) THEN
    RETURN jsonb_build_object('success', false, 'error', 'already_unlocked');
  END IF;

  SELECT COALESCE(SUM(amount), 0) INTO v_total_xp
  FROM public.xp_transactions
  WHERE user_id = v_user_id;

  IF v_total_xp < 100 THEN
    RETURN jsonb_build_object('success', false, 'error', 'insufficient_xp', 'current_xp', v_total_xp);
  END IF;

  INSERT INTO public.user_unlocks (user_id, unlock_key) VALUES (v_user_id, p_unlock_key);
  INSERT INTO public.xp_transactions (user_id, amount, reason) VALUES (v_user_id, -100, 'redeem_unlock');

  RETURN jsonb_build_object('success', true, 'new_xp', v_total_xp - 100);
END;
$$;

-- ----------------------------------------
-- redeem_unlock_50 — 50 XP atomic redemption (astronaut, etc.)
-- ----------------------------------------
CREATE OR REPLACE FUNCTION redeem_unlock_50(p_unlock_key TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id UUID;
  v_total_xp INT;
BEGIN
  SELECT id INTO v_user_id FROM public.users WHERE auth_id = auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'user_not_found');
  END IF;

  IF EXISTS (SELECT 1 FROM public.user_unlocks WHERE user_id = v_user_id AND unlock_key = p_unlock_key) THEN
    RETURN jsonb_build_object('success', false, 'error', 'already_unlocked');
  END IF;

  SELECT COALESCE(SUM(amount), 0) INTO v_total_xp
  FROM public.xp_transactions
  WHERE user_id = v_user_id;

  IF v_total_xp < 50 THEN
    RETURN jsonb_build_object('success', false, 'error', 'insufficient_xp', 'current_xp', v_total_xp);
  END IF;

  INSERT INTO public.user_unlocks (user_id, unlock_key) VALUES (v_user_id, p_unlock_key);
  INSERT INTO public.xp_transactions (user_id, amount, reason) VALUES (v_user_id, -50, 'redeem_unlock');

  RETURN jsonb_build_object('success', true, 'new_xp', v_total_xp - 50);
END;
$$;
