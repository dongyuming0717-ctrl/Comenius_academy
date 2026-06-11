# Economics MCQ — 完整方案

## 现状

| 项目 | 数量 |
|------|------|
| QP 文件总计 | 66 套 (2015-2025) |
| QP + 有效 MS | 20 套 (600 道题) |
| 已上线 | 3 套 (2024 Spring, Winter v1/v2) |
| 缺少 MS | 46 套 |

## 数据处理流水线

每套卷子处理 4 步：

### Step 1: 提取答案 (MS PDF)

MS 文件格式固定：一页一个表格，Q1-30 + Key (ABCD)。用 fitz 提取文本，正则匹配字母。

```
Input:  0455_m24_ms_12.pdf
Output: { q1: "B", q2: "C", q3: "B", ..., q30: "A" }
```

### Step 2: 截图 (QP PDF → PNG)

每页转 200 DPI 的 PNG，去除封面和版权页。每页 3 道题，三等分裁剪（50px 重叠确保不断层）。

```
Input:  0455_m24_qp_12.pdf
Output: [q01.png, q02.png, ..., q30.png]
```

### Step 3: 提取文本 + keyword 分类 (QP PDF)

fitz 提取每页 text blocks → 按 y 坐标分到各题 → keyword 匹配 syllabus 6 大 Unit。

**Keyword 库（基于 IGCSE 0455 syllabus）：**

| Unit | 关键词 |
|------|--------|
| 1. Basic Economic Problem | scarcity, finite resources, unlimited wants, opportunity cost, PPC, production possibility, factors of production, economic goods, free goods |
| 2. Allocation of Resources | demand, supply, equilibrium, PED, price elasticity, market failure, externality, public good, subsidy, tax, price control, market system, price mechanism |
| 3. Micro Decision Makers | money, banking, wages, trade union, firm, merger, economies of scale, cost, revenue, profit, monopoly, competitive market, division of labour, specialisation |
| 4. Government & Macroeconomy | GDP, inflation, unemployment, fiscal policy, monetary policy, interest rate, tax, government spending, economic growth, recession, supply-side |
| 5. Economic Development | living standard, HDI, poverty, population, birth rate, death rate, developed country, developing country |
| 6. International Trade | trade, globalisation, tariff, exchange rate, balance of payments, current account, free trade, protectionism, MNC, multinational |

每条题选匹配得分最高的 Unit 作为分类。

### Step 4: 生成 seed SQL

把 Step 1-3 的结果组合成 INSERT 语句。

## 前端

- `EconMCQListPage.tsx` — 试卷列表，按年份/考季分组
- `EconMCQExamPage.tsx` — 答题页（练习向）
  - 左侧边栏：30 题导航，始终可见
  - 暂停按钮：隐藏题目内容，自动保存
  - 键盘快捷键：A/B/C/D 选答案，←/→ 切题
  - 计时器：可隐藏
  - 交卷自动判分

## 立即执行

1. 写一个自动化脚本 `process_econ_paper.py`，输入 QP PDF + MS PDF → 输出截图 + answer key + topic classification + SQL
2. 先跑 20 套完整的，验证准确率
3. 上传到 ECS
4. 46 套缺 MS 的后补

## 涉及文件

- `process_econ_paper.py` — 新建，自动化处理脚本
- `server/seed-econ-mcq.sql` — 更新，20 套完整数据
- `question-images/econ/` — 新增 20×30=600 张截图
- UI 页面已完成，无需修改
