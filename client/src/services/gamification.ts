import { supabase } from '../supabase';

// ---- Types ----

export interface Achievement {
  id: string;
  key: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  freezeReward: number;
  earnedAt?: string;
}

export interface UserAchievement extends Achievement {
  earnedAt: string;
}

export interface CheckInResult {
  alreadyCheckedIn: boolean;
  streak: number;
  xpEarned: number;
  newAchievements: Achievement[];
  wasStreakFrozen: boolean;
}

export interface GamificationData {
  currentStreak: number;
  longestStreak: number;
  weeklyXP: number;
  totalXP: number;
  yesterdayXP: number;
  checkInDates: string[];
  achievements: UserAchievement[];
  allAchievements: Achievement[];
  freezeAvailable: number;
  checkedInToday: boolean;
}

export interface LeaderboardEntry {
  userId: string;
  fullName: string;
  xp: number;
  rank: number;
}

// ---- Helpers ----

function todayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a);
  const db = new Date(b);
  da.setHours(0, 0, 0, 0);
  db.setHours(0, 0, 0, 0);
  return Math.round((db.getTime() - da.getTime()) / (1000 * 60 * 60 * 24));
}

// ---- Core: Check In ----

export async function checkInToday(
  userId: string,
  source: 'exam_complete' | 'manual',
  examSessionId?: string,
): Promise<CheckInResult> {
  const today = todayDate();

  const { data: existing } = await supabase
    .from('check_ins')
    .select('id')
    .eq('user_id', userId)
    .eq('check_in_date', today)
    .maybeSingle();

  if (existing) {
    const { data: streakData } = await supabase
      .from('streaks')
      .select('current_streak')
      .eq('user_id', userId)
      .maybeSingle();
    return {
      alreadyCheckedIn: true,
      streak: streakData?.current_streak ?? 0,
      xpEarned: 0,
      newAchievements: [],
      wasStreakFrozen: false,
    };
  }

  // Insert check-in
  const checkInRow: Record<string, unknown> = {
    user_id: userId,
    check_in_date: today,
    source,
  };
  if (examSessionId) checkInRow.exam_session_id = examSessionId;

  await supabase.from('check_ins').insert(checkInRow);

  // Calculate streak
  const { data: streakRow } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  let newStreak = 1;
  let longestStreak = 1;
  let freezeAvailable = streakRow?.freeze_available ?? 0;
  let wasStreakFrozen = false;

  if (streakRow && streakRow.last_check_in_date) {
    const diff = daysBetween(streakRow.last_check_in_date, today);
    longestStreak = streakRow.longest_streak ?? 0;

    if (diff === 1) {
      newStreak = (streakRow.current_streak ?? 0) + 1;
    } else if (diff === 2 && freezeAvailable > 0) {
      newStreak = (streakRow.current_streak ?? 0);
      freezeAvailable -= 1;
      wasStreakFrozen = true;
      await supabase.from('streak_freezes').insert({
        user_id: userId,
        used_on_date: daysAgo(1),
        source: 'earned',
      });
    }
  }

  if (newStreak > longestStreak) longestStreak = newStreak;

  // XP calculation
  const xpEarned = 10 + Math.min(newStreak, 30) * 2 + (source === 'exam_complete' ? 10 : 0);

  // Insert XP transaction
  const { data: xpRow } = await supabase
    .from('xp_transactions')
    .insert({
      user_id: userId,
      amount: xpEarned,
      reason: source === 'exam_complete' ? 'exam_complete' : 'daily_checkin',
    })
    .select('id')
    .single();

  // Compute total XP
  const { data: xpSum } = await supabase
    .from('xp_transactions')
    .select('amount')
    .eq('user_id', userId);
  const totalXP = (xpSum ?? []).reduce((sum: number, r: { amount: number }) => sum + r.amount, 0);

  // Check and award achievements
  const newAchievements = await checkAchievements(userId, newStreak, totalXP);

  // Upsert streaks
  await supabase.from('streaks').upsert({
    user_id: userId,
    current_streak: newStreak,
    longest_streak: longestStreak,
    last_check_in_date: today,
    freeze_available: freezeAvailable,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });

  return {
    alreadyCheckedIn: false,
    streak: newStreak,
    xpEarned,
    newAchievements,
    wasStreakFrozen,
  };
}

// ---- Achievements ----

async function checkAchievements(
  userId: string,
  streak: number,
  totalXP: number,
): Promise<Achievement[]> {
  const { data: allAchievements } = await supabase
    .from('achievements')
    .select('*');

  const { data: earned } = await supabase
    .from('user_achievements')
    .select('achievement_id')
    .eq('user_id', userId);

  const earnedIds = new Set((earned ?? []).map((e: { achievement_id: string }) => e.achievement_id));

  const { count: examCount } = await supabase
    .from('exam_sessions')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'completed');

  const { count: checkInCount } = await supabase
    .from('check_ins')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId);

  const conditions: Record<string, boolean> = {
    'first_checkin': (checkInCount ?? 0) >= 1,
    'first_exam': (examCount ?? 0) >= 1,
    'streak_3': streak >= 3,
    'streak_7': streak >= 7,
    'streak_14': streak >= 14,
    'streak_30': streak >= 30,
    'streak_60': streak >= 60,
    'streak_100': streak >= 100,
    'streak_365': streak >= 365,
    'xp_500': totalXP >= 500,
    'xp_2000': totalXP >= 2000,
    'xp_10000': totalXP >= 10000,
  };

  const newlyEarned: Achievement[] = [];

  for (const ach of (allAchievements ?? [])) {
    if (earnedIds.has(ach.id)) continue;
    if (conditions[ach.key]) {
      await supabase.from('user_achievements').insert({
        user_id: userId,
        achievement_id: ach.id,
      });
      newlyEarned.push({
        id: ach.id,
        key: ach.key,
        title: ach.title_en,
        description: ach.description_en,
        icon: ach.icon,
        xpReward: ach.xp_reward,
        freezeReward: ach.freeze_reward ?? 0,
      });
    }
  }

  // Award XP for new achievements
  for (const ach of newlyEarned) {
    if (ach.xpReward > 0) {
      await supabase.from('xp_transactions').insert({
        user_id: userId,
        amount: ach.xpReward,
        reason: 'achievement',
        reference_id: ach.id,
      });
    }
    // Award freeze if achievement grants one
    if (ach.freezeReward > 0) {
      const { data: streakRow } = await supabase
        .from('streaks')
        .select('freeze_available')
        .eq('user_id', userId)
        .maybeSingle();
      const currentFreezes = streakRow?.freeze_available ?? 0;
      await supabase.from('streaks').upsert({
        user_id: userId,
        freeze_available: currentFreezes + ach.freezeReward,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
    }
  }

  return newlyEarned;
}

// ---- Get User Gamification Data ----

export async function getUserGamificationData(
  userId: string,
  locale: string = 'en',
): Promise<GamificationData> {
  const today = todayDate();

  // Streak
  const { data: streakRow } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  // XP — total and this week
  const weekStart = daysAgo(7);
  const { data: xpRows } = await supabase
    .from('xp_transactions')
    .select('amount, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  const totalXP = (xpRows ?? []).reduce((s: number, r: { amount: number }) => s + r.amount, 0);

  let weeklyXP = 0;
  let yesterdayXP = 0;
  const yesterdayStr = daysAgo(1);

  for (const row of (xpRows ?? [])) {
    const rowDate = (row.created_at as string).slice(0, 10);
    if (rowDate >= weekStart) weeklyXP += row.amount;
    if (rowDate === yesterdayStr) yesterdayXP += row.amount;
  }

  // Check-ins (last 365 days)
  const { data: checkIns } = await supabase
    .from('check_ins')
    .select('check_in_date')
    .eq('user_id', userId)
    .gte('check_in_date', daysAgo(365))
    .order('check_in_date', { ascending: false });

  const checkInDates = (checkIns ?? []).map((c: { check_in_date: string }) => c.check_in_date);

  // Checked in today?
  const checkedInToday = checkInDates.includes(today);

  // Achievements
  const { data: allAchievements } = await supabase.from('achievements').select('*');
  const { data: earnedAchievements } = await supabase
    .from('user_achievements')
    .select('achievement_id, earned_at')
    .eq('user_id', userId);

  const earnedIds = new Map(
    (earnedAchievements ?? []).map(
      (e: { achievement_id: string; earned_at: string }) => [e.achievement_id, e.earned_at],
    ),
  );

  const allAch: Achievement[] = (allAchievements ?? []).map((a: Record<string, unknown>) => ({
    id: a.id as string,
    key: a.key as string,
    title: (locale === 'zh' ? a.title_zh : a.title_en) as string,
    description: (locale === 'zh' ? a.description_zh : a.description_en) as string,
    icon: a.icon as string,
    xpReward: a.xp_reward as number,
    freezeReward: (a.freeze_reward as number) ?? 0,
  }));

  const userAch: UserAchievement[] = [];
  for (const a of allAch) {
    const ea = earnedIds.get(a.id);
    if (ea) {
      userAch.push({ ...a, earnedAt: ea });
    }
  }

  return {
    currentStreak: streakRow?.current_streak ?? 0,
    longestStreak: streakRow?.longest_streak ?? 0,
    weeklyXP,
    totalXP,
    yesterdayXP,
    checkInDates,
    achievements: userAch,
    allAchievements: allAch,
    freezeAvailable: streakRow?.freeze_available ?? 0,
    checkedInToday,
  };
}

// ---- Leaderboard ----

export async function getLeaderboard(
  type: 'weekly' | 'all_time',
  limit: number = 50,
  classId?: string,
): Promise<LeaderboardEntry[]> {
  let query = supabase.from('xp_transactions').select('user_id, amount, created_at');

  if (type === 'weekly') {
    query = query.gte('created_at', daysAgo(7) + 'T00:00:00Z');
  }

  const { data: xpRows } = await query;

  if (!xpRows || xpRows.length === 0) return [];

  // Aggregate XP by user
  const userXP: Record<string, number> = {};
  for (const row of xpRows) {
    const uid = row.user_id as string;
    userXP[uid] = (userXP[uid] ?? 0) + (row.amount as number);
  }

  // If classId provided, filter to class members
  let eligibleIds: Set<string> | null = null;
  if (classId) {
    const { data: members } = await supabase
      .from('class_students')
      .select('student_id')
      .eq('class_id', classId);
    eligibleIds = new Set((members ?? []).map((m: { student_id: string }) => m.student_id));
  }

  // Get user names
  const userIds = Object.keys(userXP);
  const { data: userRows } = await supabase
    .from('users')
    .select('id, full_name')
    .in('id', userIds);

  const nameMap: Record<string, string> = {};
  for (const u of (userRows ?? [])) {
    nameMap[u.id as string] = (u.full_name as string) || 'Unknown';
  }

  // Build and sort leaderboard
  let entries: LeaderboardEntry[] = [];
  for (const uid of userIds) {
    if (eligibleIds && !eligibleIds.has(uid)) continue;
    entries.push({
      userId: uid,
      fullName: nameMap[uid] ?? 'Unknown',
      xp: userXP[uid],
      rank: 0,
    });
  }

  entries.sort((a, b) => b.xp - a.xp);
  entries = entries.slice(0, limit);
  entries.forEach((e, i) => { e.rank = i + 1; });

  return entries;
}

// ---- Manual Freeze Usage ----

export async function useFreeze(userId: string): Promise<boolean> {
  const { data: streakRow } = await supabase
    .from('streaks')
    .select('freeze_available')
    .eq('user_id', userId)
    .maybeSingle();

  if (!streakRow || streakRow.freeze_available <= 0) return false;

  await supabase.from('streaks').update({
    freeze_available: streakRow.freeze_available - 1,
    updated_at: new Date().toISOString(),
  }).eq('user_id', userId);

  return true;
}
