# 老师端学生学情分析 PDF 下载

## 问题

教师查看学生考试详情时只能看到正确率和答题明细，缺少学情分析 PDF 报告。学生端有 "Download Report (PDF)" 按钮，老师端也需要相同的功能。

## 方案

### StudentDetail.tsx

1. `SessionDetail` 接口的 `papers` 字段增加 `duration_minutes: number`
2. Supabase select 查询中 `papers(title, paper_number, questions)` → `papers(title, paper_number, duration_minutes, questions)`
3. 导入 `generateExamReport` from `../utils/generateReport`
4. 在学生信息栏（分数和 Terminate 按钮之间）添加 "Download Report (PDF)" 按钮
5. 按钮点击时用 session 数据构建 `ReportData` 并调用 `generateExamReport`

数据映射：
| ReportData | 来源 |
|---|---|
| paperTitle | `session.papers.title` |
| paperDuration | `session.papers.duration_minutes` |
| completedAt | `session.ended_at \|\| new Date()` |
| totalQuestions | `questions.length` |
| score | `correctCount` |
| maxScore | `totalQuestions` |
| questionDetails | 从 questions/answers/question_times 构建 |

## 涉及文件

- `client/src/pages/StudentDetail.tsx`

## 验证

- 老师打开某个学生的考试详情页
- 点击 "Download Report (PDF)" → PDF 下载成功
- PDF 内容包含学情分析（得分、每题详情、时间分析等）
- 学生端 `/my-session/:sessionId` 也能看到并使用该按钮
