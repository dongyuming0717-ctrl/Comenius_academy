# 指数与对数 (exponentials)

## 核心知识点
- **指数法则**: $a^m \cdot a^n = a^{m+n}$；$\frac{a^m}{a^n} = a^{m-n}$；$(a^m)^n = a^{mn}$；$a^0 = 1$ ($a \neq 0$)；$a^{-n} = \frac{1}{a^n}$
- **对数定义**: 若 $a^x = N$ ($a>0, a\neq 1$)，则 $x = \log_a N$。$\log_a 1 = 0$，$\log_a a = 1$
- **对数法则**: $\log_a(xy) = \log_a x + \log_a y$；$\log_a(\frac{x}{y}) = \log_a x - \log_a y$；$\log_a(x^n) = n \log_a x$
- **换底公式**: $\log_a b = \frac{\log_c b}{\log_c a}$。常用: $\log_a b = \frac{\ln b}{\ln a} = \frac{\log_{10} b}{\log_{10} a}$
- **自然对数**: $\ln x = \log_e x$ ($e \approx 2.718$)。$\frac{d}{dx}(\ln x) = \frac{1}{x}$，$\int \frac{1}{x} dx = \ln|x| + C$
- **指数与对数互为反函数**: $a^{\log_a x} = x$，$\log_a(a^x) = x$。$y = a^x$ 与 $y = \log_a x$ 的图像关于 $y=x$ 对称
- **特殊对数**: $\log_a \frac{1}{x} = -\log_a x$；$\log_a \sqrt[n]{x} = \frac{1}{n} \log_a x$

## 高频题型

### 题型1: 对数方程求解
- 代表题目: 2020 P1 Q15, 2023 P1 Q7
- 解题关键: 利用对数法则合并同类项 → 换元 ($t = \log_a x$) 将方程转为代数方程 (通常为二次方程) → 解出 t → 回代求 x。注意检验定义域 ($x>0$ 且底数 $>0, \neq 1$)
- 易错点: 解出 t 后忘记回代 $x = a^t$；忽略对数定义域导致增根

### 题型2: 指数方程求解
- 代表题目: 2022 P1 Q6
- 解题关键: 同底化 ($a^{f(x)} = a^{g(x)} \Rightarrow f(x)=g(x)$) 或两边取对数。二次型指数方程用换元 $t = a^x$ 化为 $t$ 的二次方程
- 易错点: $a^{f(x)} = b^{g(x)}$ 时需要先同底或同时取对数；解出 $t$ 后注意 $t = a^x > 0$ 的限制

### 题型3: 对数/指数函数的积分
- 代表题目: 2021 P1 Q10, 2022 P1 Q6
- 解题关键: $\int \frac{1}{x} dx = \ln|x| + C$；$\int \ln x dx = x\ln x - x + C$ (分部积分)。涉及 $\log_a x$ 先用换底公式转为 $\frac{\ln x}{\ln a}$
- 易错点: $\log_{10} x$ 的积分需先换底；定积分代入上下限注意 $\ln$ 的运算

### 题型4: 对数不等式与比较大小
- 代表题目: 2019 P2 Q15
- 解题关键: 当底数 $a>1$ 时 $\log_a x$ 单调递增，当 $0<a<1$ 时单调递减。比较不同底的对数用换底公式统一底数
- 易错点: 底数小于 1 时不等号方向反转；忽略定义域

## 解题策略
1. **对数方程先合并再换元** — 用 $\log_a x + \log_a y = \log_a(xy)$ 等法则把多项合并为一项，令 $t = \log_a x$ 化为代数方程
2. **指数方程统一底数** — 优先把 $a^{f(x)} = b^{g(x)}$ 两边取同底对数或化为同底指数
3. **不同底的对数 → 换底公式** — TMUA 最常见的是 $\ln$ 和 $\log_{10}$ 混用，统一换为 $\ln$
4. **涉及对数的积分先换底** — $\log_a x = \frac{\ln x}{\ln a}$，常数 $\frac{1}{\ln a}$ 提出积分号

## 公式速查
- $\log_a x + \log_a y = \log_a(xy)$
- $\log_a x - \log_a y = \log_a(\frac{x}{y})$
- $n\log_a x = \log_a(x^n)$
- $\log_a b = \frac{\ln b}{\ln a}$
- $a^{\log_a x} = x$，$\ln e^x = x$
- $\frac{d}{dx}(a^x) = a^x \ln a$，$\frac{d}{dx}(\log_a x) = \frac{1}{x \ln a}$
- $\int a^x dx = \frac{a^x}{\ln a} + C$

> 共 7 道真题，集中在 Paper 1。对数和指数的互逆关系是解题核心。
