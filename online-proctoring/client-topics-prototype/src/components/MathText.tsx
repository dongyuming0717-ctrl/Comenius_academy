import { useEffect, useRef } from 'react';

interface MathTextProps {
  text: string;
}

// Ultra-simple KaTeX render: just replace $...$ with rendered spans
// In production we'd use the full KaTeX API; this is prototype-grade
export function MathText({ text }: MathTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Simple regex: render $...$ with KaTeX if available (CDN loaded)
    const el = ref.current;
    if (typeof (window as any).renderMathInElement === 'function') {
      try {
        (window as any).renderMathInElement(el, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
          ],
          throwOnError: false,
        });
      } catch {}
    }
  }, [text]);

  return <span ref={ref}>{text}</span>;
}
