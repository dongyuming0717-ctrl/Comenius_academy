import { useEffect, useRef } from 'react';

interface MathTextProps {
  text: string;
}

// KaTeX renderer — uses katex global loaded via CDN <script>
// Handles $...$ (inline) and $$...$$ (display)
export function MathText({ text }: MathTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const katex = (window as any).katex;
    if (!katex) {
      // KaTeX CDN not loaded yet — retry once after a short delay
      ref.current.textContent = text;
      const id = setTimeout(() => {
        const k2 = (window as any).katex;
        if (k2 && ref.current) renderMath(ref.current, text, k2);
      }, 500);
      return () => clearTimeout(id);
    }
    renderMath(ref.current, text, katex);
  }, [text]);

  return <span ref={ref} />;
}

function renderMath(el: HTMLElement, input: string, katex: any) {
  try {
    const parts = parseMath(input);
    el.innerHTML = '';
    for (const part of parts) {
      if (part.type === 'text') {
        el.appendChild(document.createTextNode(part.content));
      } else {
        const span = document.createElement('span');
        try {
          katex.render(part.content, span, {
            displayMode: part.type === 'display',
            throwOnError: false,
          });
        } catch {
          span.textContent = part.type === 'display'
            ? `$$${part.content}$$`
            : `$${part.content}$`;
        }
        el.appendChild(span);
      }
    }
  } catch {
    el.textContent = input;
  }
}

function parseMath(input: string): Array<{ type: 'text' | 'display' | 'inline'; content: string }> {
  const parts: ReturnType<typeof parseMath> = [];
  let remaining = input;

  while (remaining.length > 0) {
    const displayStart = remaining.indexOf('$$');
    if (displayStart !== -1) {
      if (displayStart > 0) parts.push({ type: 'text', content: remaining.slice(0, displayStart) });
      const displayEnd = remaining.indexOf('$$', displayStart + 2);
      if (displayEnd !== -1) {
        parts.push({ type: 'display', content: remaining.slice(displayStart + 2, displayEnd) });
        remaining = remaining.slice(displayEnd + 2);
      } else {
        parts.push({ type: 'text', content: remaining.slice(displayStart) });
        break;
      }
      continue;
    }

    const inlineStart = remaining.indexOf('$');
    if (inlineStart !== -1) {
      if (inlineStart > 0) parts.push({ type: 'text', content: remaining.slice(0, inlineStart) });
      const inlineEnd = remaining.indexOf('$', inlineStart + 1);
      if (inlineEnd !== -1) {
        parts.push({ type: 'inline', content: remaining.slice(inlineStart + 1, inlineEnd) });
        remaining = remaining.slice(inlineEnd + 1);
      } else {
        parts.push({ type: 'text', content: remaining.slice(inlineStart) });
        break;
      }
      continue;
    }

    parts.push({ type: 'text', content: remaining });
    break;
  }

  return parts;
}
