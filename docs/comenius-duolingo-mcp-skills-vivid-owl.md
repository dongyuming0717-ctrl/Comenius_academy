# 合并 CheckIn + Leaderboard → "我的" 页面

## 背景

当前打卡 (`/checkin`)、排行榜 (`/leaderboard`)、个人资料 (`/profile`) 是三个独立页面，用户需要来回跳转。按照多邻国的设计，个人主页本身就是打卡和游戏化数据的中枢。本方案将三者整合到"我的"页面，在 heading 区域突出展示连续签到状态。

## 页面结构设计

```
┌─────────────────────────────┐
│  TopNav                      │
├─────────────────────────────┤
│  🔥 23 Days                  │  ← 大幅火焰 + 连续天数
│  You're on fire!             │
│                              │
│  最长 30 | XP 1,250 | 冻结 2  │  ← 三列小数字
│                              │
│  [ 今日已打卡 ✓ ]            │  ← 打卡按钮（或绿色已打卡状态）
│                              │
│  ████████░░ XP 本周 350/500  │  ← XP 进度条
│                              │
│  ┌─ 活动日历 ────────────┐   │
│  │ (热力图)               │   │
│  └────────────────────────┘  │
│                              │
│  ┌─ 成就 (3/12) ─────────┐   │
│  │ [⭐] [🔥] [👑] ...     │   │
│  └────────────────────────┘  │
│                              │
│  ┌─ 本周排行榜 ──────────┐   │
│  │ 🥇 Alice   1,200 XP   │   │
│  │ 🥈 You     1,150 XP   │   │
│  │ 🥉 Bob       850 XP   │   │
│  └────────────────────────┘  │
│                              │
│  ┌─ 个人信息 ────────────┐   │
│  │ 姓名 / 邮箱 / 目标大学 │   │
│  └────────────────────────┘  │
│                              │
│  ┌─ 修改密码 ────────────┐   │
│  │ ...                    │   │
│  └────────────────────────┘  │
└─────────────────────────────┘
```

## 修改清单

### 重写 1 个文件

**`client/src/pages/ProfilePage.tsx`** — 核心改动
- 用 `getUserGamificationData(profileId, locale)` 替换现有的简单 gamification 查询，获得完整数据（checkInDates, allAchievements, checkedInToday, weeklyXP 等）
- 新增 states：`checkingIn`, `celebration`, `toastAchievement`
- 页面标题改为 "我的"
- 重构 layout：
  1. **Hero 区域**：大幅 StreakFlame(lg) + 连续天数大字 + streakMessage + 最长/XP/冻结三列
  2. **打卡按钮**：`checkedInToday ? 绿色已打卡 : 脉冲蓝色签到按钮`，点击触发 `checkInToday` + `CheckInCelebration`
  3. **XP 进度条**：本周 XP / 500
  4. **活动日历**：CalendarHeatmap
  5. **成就网格**：AchievementCard 列表
  6. **排行榜**：LeaderboardCard (weekly)
  7. **个人信息表单**（保留原有）
  8. **修改密码**（保留原有）
- 添加 `CheckInCelebration` + `AchievementToast` 覆盖层

### 删除 2 个路由

**`client/src/App.tsx`**
- 移除 `/checkin` 和 `/leaderboard` 路由

### 修改 1 个导航

**`client/src/components/TopNav.tsx`**
- 下拉菜单中的 "Check-In" 和 "Leaderboard" 链接改为指向 `/profile`
- `PageKey` 类型可保留 `'checkin'` `'leaderboard'`（不去掉）

## 不删除的文件

`CheckInPage.tsx` 和 `LeaderboardPage.tsx` 保留不删（未来可能需要恢复独立页面），只是不再路由到它们。

## 验证

1. 登录学生账号，点击导航头像 → "Profile" → 进入"我的"页面
2. 页面顶部显示火焰 + 连续天数 + XP
3. 点击签到按钮 → 弹出庆祝动画
4. 日历热力图显示历史打卡记录
5. 成就网格显示已获得/未获得状态
6. 排行榜显示本周排名
7. 下方个人信息和修改密码功能正常
