# Economics MCQ Templates

AI must follow exactly one of these 5 templates. Do NOT invent new formats.

---

## Template 1: Plain Text Question

Most common (~60% of questions).

```markdown
### Q1
What is an advantage of competitive markets?

- A) Competition causes inequalities of wealth.
- B) Competition encourages the efficient use of resources.
- C) The economic problem of scarcity is eliminated.
- D) The right quantity of merit goods is guaranteed.

> Answer: B
```

---

## Template 2: Question with Data Table

Has a markdown table before the options.

```markdown
### Q7
The table shows the demand and supply schedules for a product.

| Price ($) | Quantity Demanded | Quantity Supplied |
|-----------|-------------------|-------------------|
| 10 | 100 | 300 |
| 8  | 150 | 250 |
| 6  | 200 | 200 |
| 4  | 250 | 150 |
| 2  | 300 | 100 |

What is the equilibrium price?

- A) $2
- B) $4
- C) $6
- D) $8

> Answer: C
```

---

## Template 3: Question with Image/Diagram

Image placed between question text and options.

```markdown
### Q3
The diagram shows a production possibility curve for an economy.

![PPC curve showing capital vs consumer goods](images/ppc_diagram.jpg)

Which point represents inefficient use of resources?

- A) Point W (inside the curve)
- B) Point X (on the curve)
- C) Point Y (on the curve)
- D) Point Z (outside the curve)

> Answer: A
```

---

## Template 4: Question with Image + Table

Image AND table, in that order, before options.

```markdown
### Q12
The diagram below illustrates the market for a good after a tax is imposed.

![tax_diagram](images/tax_shift.jpg)

The table shows the price changes:

| Before Tax | After Tax | Change |
|------------|-----------|--------|
| $5 | $7 | +$2 |

After the tax, the consumer burden is:

- A) P₂ − P₁
- B) P₃ − P₁
- C) P₃ − P₂
- D) P₁ − P₃

> Answer: C
```

---

## Template 5: Multi-part Stem Question

Longer question text with multiple sentences before the actual question.

```markdown
### Q15
A government is considering three policy options to reduce income inequality:

1. Increase progressive taxation
2. Introduce a minimum wage
3. Provide universal basic income

The government has limited budget and wants maximum impact per dollar spent.

Which combination of policies would be most effective?

- A) Policy 1 only
- B) Policies 1 and 2
- C) Policies 2 and 3
- D) All three policies

> Answer: B
```

---

## Quick Reference Card (for AI prompt)

```
Templates:
  T1: Text only           → ### QN \n question \n \n - A) ... \n > Answer: X
  T2: Text + Table        → ### QN \n question \n \n | col | col | \n \n - A) ...
  T3: Text + Image        → ### QN \n question \n ![](images/x.jpg) \n - A) ...
  T4: Text + Image+Table  → ### QN \n question \n ![](x.jpg) \n |col| \n - A) ...
  T5: Multi-part stem     → ### QN \n paragraph \n numbered list \n question \n - A) ...

Rules:
  - Exactly 4 options (A/B/C/D), ALWAYS
  - Every question MUST end with > Answer: X
  - Images: ![description](images/filename.jpg)
  - Tables: standard markdown | pipe | syntax |
  - No bare LaTeX commands — convert to plain text or markdown
  - No page numbers — they are NOT part of questions
  - Question numbers must be sequential (1-30)
```
