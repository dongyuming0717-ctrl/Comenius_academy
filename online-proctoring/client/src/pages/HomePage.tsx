import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { supabase } from '../supabase';
import { TopNav } from '../components/TopNav';
import { FloatingAstronaut } from '../components/FloatingAstronaut';
import { useInView } from '../hooks/useInView';
import { getUserUnlocks } from '../services/gamification';
import { colors, typography, radii, spacing } from '../theme/tokens';

const font = typography.fontFamily;

// -- Data --

const testimonials = [
  { id: 1, name: 'Sophie Chen', university: 'University of Cambridge, Mathematics', quote: 'The AI analytics helped me identify my weak topics in Mathematics. Went from a B to an A* in just three months. Now reading Mathematics at Cambridge.', rating: 5 },
  { id: 2, name: 'James Thompson', university: 'Imperial College London, Physics', quote: 'The STEP preparation resources were invaluable. The step-by-step solutions and similar question recommendations made all the difference.', rating: 5 },
  { id: 3, name: 'Aisha Rahman', university: 'Oxford University, Economics & Management', quote: 'Having access to every CIE past paper with detailed marking schemes saved me countless hours. The platform is intuitive and professional.', rating: 5 },
  { id: 4, name: 'David Liu', university: 'LSE, Economics', quote: 'The dashboard helped me track my progress systematically. The predicted grades were spot on and helped me focus my revision effectively.', rating: 5 },
  { id: 5, name: 'Emily Watson', university: 'Imperial College London, Engineering', quote: 'Mock exams with instant feedback were game-changing. I could identify my mistakes immediately and learn from them.', rating: 5 },
];

const orbitData = [
  { num: 14, subject: 'CIE A-Level Economics', question: 'The diagram shows the demand for and supply of eye tests by opticians.\nWhich policy enables the government to increase eye tests from OQ₁ to OQ₂?', options: ['A. A maximum price of OP₃ per test', 'B. A minimum price of OP₂ per test', 'C. A subsidy of P₃−P₂ per test', 'D. A subsidy of P₃−P₁ per test'] },
  { num: 11, subject: 'CIE A-Level Physics', question: 'Two blocks K and L slide toward each other on a frictionless surface. K has momentum 0.72 kg m s⁻¹, L has 0.46 kg m s⁻¹. Contact time: 0.084 s. After collision, L moves back with momentum 0.12 kg m s⁻¹.\nWhat is the average force on L by K?', options: ['A. 3.1 N', 'B. 4.0 N', 'C. 6.9 N', 'D. 7.1 N'] },
  { num: 10, subject: 'TMUA 2023 · Paper 1', question: 'The trapezium rule with 4 strips is used to estimate:\n∫₋₂² √(4 − x²) dx\nWhat is the positive difference between the estimate and the exact value?', options: ['A. (π − 2√2 − 2) / 3', 'B. (π − √2 − 1) / 3', 'C. (π − 2√2 − 1) / 3', 'D. (π − 4√2 − 1) / 3'] },
  { num: 5, subject: 'CIE A-Level Chemistry', question: 'The reaction of hydrogen with oxygen is shown:\n2H₂(g) + O₂(g) → 2H₂O(l)\nWhich expression corresponds to the standard enthalpy change of this reaction?', options: ['A. 2 × ΔH°f(H₂O)', 'B. ΔH°c(H₂O) − ΔH°c(H₂)', 'C. ΔH°c(H₂)', 'D. 2 × ΔH°f(H₂O) + 2 × ΔH°c(H₂)'] },
  { num: 25, subject: 'CIE A-Level Physics', question: 'A sound wave travels from left to right. The graph shows displacement of particles vs distance at one instant, with points A (peak), B (zero crossing), C (trough), D (zero crossing).\nWhich letter represents the centre of a compression?', options: ['A. A', 'B. B', 'C. C', 'D. D'] },
  { num: 16, subject: 'CIE A-Level Chemistry', question: 'NH₄⁺ + OH⁻ ⇌ NH₃ + H₂O\n1. The ammonium ions are reduced.\n2. In the reverse reaction, ammonia acts as a Brønsted–Lowry base.\n3. NH₄⁺ and NH₃ have the same bond angle.\n4. This reaction is not a redox reaction.\nWhich statements are correct?', options: ['A. 1 and 2', 'B. 1 and 3', 'C. 2 and 4', 'D. 3 and 4'] },
  { num: 12, subject: 'TMUA 2023 · Paper 1', question: 'How many solutions are there to the equation\n2ˣ tan²x = 2^(1/4) sin x\nin the range 0 ≤ x ≤ 2π ?', options: ['A. 2', 'B. 3', 'C. 4', 'D. 5'] },
  { num: 11, subject: 'CIE A-Level Biology', question: 'The diagrams show three different bonds:\n1. —NH····O— (hydrogen bond)\n2. —C(=O)—N— (peptide bond)\n3. —CH₂—S—S—CH₂— (disulfide bond)\nWhich bonds are found in proteins?', options: ['A. 1, 2 and 3', 'B. 1 and 2 only', 'C. 1 and 3 only', 'D. 2 and 3 only'] },
];

// -- Button helpers --

const btnPrimary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '10px 20px', borderRadius: radii.md, fontSize: typography.size.base,
  fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'all 0.2s',
  textDecoration: 'none', whiteSpace: 'nowrap', fontFamily: font,
  background: colors.primary, color: colors.primaryForeground,
};

const btnOutline: React.CSSProperties = {
  ...btnPrimary, background: 'transparent', color: colors.foreground,
  border: `1px solid ${colors.border}`,
};

const btnOutlineLg: React.CSSProperties = {
  ...btnOutline, padding: '12px 32px', fontSize: typography.size.md, height: 56,
};

const cardStyle: React.CSSProperties = {
  background: colors.card, border: `1px solid ${colors.borderAlpha}`,
  borderRadius: radii.lg, overflow: 'hidden',
};

const cardHeaderStyle: React.CSSProperties = { padding: '24px 24px 16px' };
const cardContentStyle: React.CSSProperties = { padding: '0 24px 24px' };

// -- Orbit Cards Component --

function OrbitCards() {
  const stageRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const pausedRef = useRef(false);
  const N = orbitData.length;
  const radiusZ = 372;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      if (!pausedRef.current) {
        angleRef.current += 0.0025;
      }
      const radiusX = window.innerWidth * 0.468;
      const cards = stageRef.current?.querySelectorAll<HTMLDivElement>('.orbit-card');
      cards?.forEach((card, i) => {
        const a = angleRef.current + (Math.PI * 2 / N) * i;
        const x = radiusX * Math.cos(a);
        const z = radiusZ * Math.sin(a);
        const depth = (z + radiusZ) / (2 * radiusZ);
        const baseScale = 0.48 + 0.52 * depth;
        const isHovered = hoveredIdx === i;
        const scale = isHovered ? baseScale * 1.15 : baseScale;
        const opacity = isHovered ? 1 : 0.18 + 0.82 * depth;
        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0px, ${z}px) scale(${scale})`;
        card.style.opacity = String(+opacity.toFixed(3));
        card.style.zIndex = String(isHovered ? 200 : Math.round(depth * 100));
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [N, hoveredIdx]);

  const card3dBase: React.CSSProperties = {
    position: 'absolute', width: 434, left: '50%', top: '50%',
    willChange: 'transform, opacity',
  };

  return (
    <div style={{
      position: 'absolute', inset: '7.5% 0', pointerEvents: 'none',
      perspective: '1000px', perspectiveOrigin: '50% 50%',
    }}>
      <div ref={stageRef} style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
        {orbitData.map((q, i) => (
          <div
            key={i} className="orbit-card" style={{ ...card3dBase, pointerEvents: 'auto' }}
            onMouseEnter={() => { pausedRef.current = true; setHoveredIdx(i); }}
            onMouseLeave={() => { pausedRef.current = false; setHoveredIdx(null); }}
          >
            <div style={{
              background: colors.card, border: `1px solid rgba(226,232,240,0.6)`,
              borderRadius: radii.lg, boxShadow: shadows.xl, overflow: 'hidden',
              cursor: 'default',
            }}>
              <div style={{ padding: '16px 16px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, padding: '1px 6px', background: colors.secondary, borderRadius: 4 }}>{q.subject}</span>
                  <span style={{ fontSize: 12, color: colors.mutedForeground, fontFamily: 'monospace' }}>Q{q.num}</span>
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.6, whiteSpace: 'pre-line', fontWeight: 500, color: colors.foreground }}>{q.question}</div>
              </div>
              <div style={{ padding: '0 16px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {q.options.map((o, j) => (
                  <div key={j} style={{ padding: 8, border: `1px solid rgba(226,232,240,0.6)`, borderRadius: 4, fontSize: 12 }}>{o}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -- Testimonial Carousel --

function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(() => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  });

  useEffect(() => {
    const handleResize = () => {
      let s = 1;
      if (window.innerWidth >= 1024) s = 3;
      else if (window.innerWidth >= 768) s = 2;
      setSlidesPerView(s);
      // clamp current index on resize
      const maxIdx = Math.max(0, testimonials.length - s);
      if (currentRef.current > maxIdx) {
        currentRef.current = maxIdx;
        setCurrentIndex(maxIdx);
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${-(maxIdx * (100 / s))}%)`;
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - slidesPerView);
  const cardFlexBasis = `${100 / slidesPerView}%`;

  const move = useCallback((dir: number) => {
    const max = Math.max(0, testimonials.length - slidesPerView);
    const next = Math.max(0, Math.min(currentRef.current + dir, max));
    currentRef.current = next;
    setCurrentIndex(next);
    const pct = -(next * (100 / slidesPerView));
    if (trackRef.current) trackRef.current.style.transform = `translateX(${pct}%)`;
  }, [slidesPerView]);

  useEffect(() => {
    const interval = setInterval(() => {
      const max = Math.max(0, testimonials.length - slidesPerView);
      if (currentRef.current >= max) {
        currentRef.current = -1;
        setCurrentIndex(-1);
      }
      move(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [move, slidesPerView]);

  return (
    <div style={{ position: 'relative', maxWidth: 1024, margin: '0 auto' }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div ref={trackRef} style={{ display: 'flex', transition: 'transform 0.5s ease' }}>
          {testimonials.map(t => (
            <div key={t.id} style={{ flex: `0 0 ${cardFlexBasis}`, padding: 6 }}>
              <div style={{
                ...cardStyle, height: '100%', background: colors.card,
                border: `1px solid ${colors.borderAlpha}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}>
                <div style={cardHeaderStyle}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 12, fontSize: 16 }}>
                    {[1,2,3,4,5].map(i => (
                      <span key={i} style={{ color: i <= t.rating ? '#f59e0b' : '#e5e7eb' }}>&#9733;</span>
                    ))}
                  </div>
                  <p style={{ fontSize: typography.size.base, lineHeight: 1.7, color: colors.mutedForeground, fontStyle: 'italic' }}>"{t.quote}"</p>
                </div>
                <div style={cardContentStyle}>
                  <div style={{ fontWeight: 600, fontSize: typography.size.base, color: colors.foreground }}>{t.name}</div>
                  <div style={{ fontSize: typography.size.sm, color: colors.mutedForeground }}>{t.university}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// -- Stats Card --

function StatCard({ icon, value, label, color, animate }: { icon: React.ReactNode; value: string; label: string; color: string; animate?: boolean }) {
  const [displayVal, setDisplayVal] = useState(animate ? '0' : value);
  const countRef = useRef<boolean>(false);

  useEffect(() => {
    if (!animate || countRef.current) return;
    countRef.current = true;
    const target = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
    const suffix = value.replace(/[0-9]/g, '');
    let raf: number;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(eased * target);
      setDisplayVal(current + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, value]);

  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...cardStyle, background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)',
        cursor: 'default',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? shadows.xl : 'none',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={cardHeaderStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: radii.lg, background: `rgba(${color},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </div>
        </div>
        <div style={{ fontSize: 30, fontWeight: 600 }}>{displayVal}</div>
        <div style={{ fontSize: typography.size.base, color: colors.mutedForeground }}>{label}</div>
      </div>
    </div>
  );
}

// -- Feature Card --

function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode; title: string; desc: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...cardStyle, border: `1px solid ${colors.borderAlpha}`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? shadows.xl : 'none',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={cardHeaderStyle}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: `rgba(${color},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          {icon}
        </div>
        <h3 style={{ fontSize: typography.size.xl, fontWeight: 600 }}>{title}</h3>
        <p style={{ fontSize: typography.size.md, color: colors.mutedForeground, lineHeight: 1.625 }}>{desc}</p>
      </div>
    </div>
  );
}

// -- Platform Card --

function PlatformCard({ to, icon, title, desc, features, linkText, accentColor }: {
  to: string; icon: React.ReactNode; title: string; desc: string;
  features: string[]; linkText: string; accentColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          ...cardStyle, height: '100%', border: `2px solid ${colors.borderAlpha}`, cursor: 'pointer',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered ? shadows.xl : 'none',
          borderColor: hovered ? `rgb(${accentColor})` : colors.borderAlpha,
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={cardHeaderStyle}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: `rgba(${accentColor},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            {icon}
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{title}</h3>
          <p style={{ fontSize: typography.size.md, color: colors.mutedForeground }}>{desc}</p>
        </div>
        <div style={cardContentStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: typography.size.base }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                <span>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 16 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: accentColor, fontWeight: 500 }}>
              {linkText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// -- SVG Icons --

const PaperIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
);

const AdmissionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

// -- Shadows --

const shadows = {
  xl: '0 20px 25px rgba(0,0,0,0.1)',
  '2xl': '0 25px 50px rgba(0,0,0,0.15)',
};

// -- Section helper --

const sectionStyle: React.CSSProperties = { padding: '64px 0' };

// -- Main Component --

function ExamFeatureCard({ icon, title, desc, color }: { icon: React.ReactNode; title: string; desc: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...cardStyle, border: `1px solid ${colors.borderAlpha}`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? shadows.xl : 'none',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={cardHeaderStyle}>
        <div style={{ width: 40, height: 40, borderRadius: radii.lg, background: `rgba(${color},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={`rgb(${color})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        </div>
        <h4 style={{ fontSize: typography.size.md, fontWeight: 600 }}>{title}</h4>
        <p style={{ fontSize: typography.size.base, color: colors.mutedForeground }}>{desc}</p>
      </div>
    </div>
  );
}

// -- Exam Preview Card (1:1 replica of real MCQ exam UI) --

function ExamPreviewCard() {
  const { t } = useLocale();
  const [selected, setSelected] = useState<string | null>(null);
  const [flagged, setFlagged] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(43 * 60 + 27);

  const totalQuestions = 30;
  const currentQ = 21;
  const answeredCount = 20; // mock: first 20 answered

  const question = {
    id: 21,
    text: 'What is deflation?',
    options: [
      { label: 'A', text: 'a sustained fall in total demand' },
      { label: 'B', text: 'a sustained fall in the general price level' },
      { label: 'C', text: 'a sustained fall in the rate of inflation' },
      { label: 'D', text: 'a sustained fall in the value of money' },
    ],
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // Timer frozen for preview

  const getQStatus = (n: number) => {
    if (n === currentQ) return 'current';
    if (n === currentQ && flagged) return 'current'; // current takes priority
    if (flagged && n === currentQ) return 'current';
    if (n < currentQ) return 'answered';
    return 'unanswered';
  };

  // Tailwind equivalent color tokens
  const primary = '#1e40af';
  const primaryLight = '#eff6ff';
  const green = '#22c55e';
  const orange = '#f97316';
  const border = '#e5e7eb';
  const mutedFg = '#94a3b8';
  const cardBg = '#fff';
  const fg = '#1e293b';

  return (
    <div style={{
      maxWidth: 1024, margin: '0 auto',
      background: '#f8fafc',
      borderRadius: 12,
      boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
      border: `1px solid ${border}`,
      overflow: 'hidden',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      userSelect: 'none',
    }}>
      {/* ── Top bar (sticky) ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', height: 48,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${border}`,
        fontSize: 14,
      }}>
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer',
          color: mutedFg, fontSize: 14, fontFamily: 'inherit',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Economics 0455/11
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: mutedFg }}>
            {answeredCount}/{totalQuestions} {t('mcqExam.answeredCount')}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: mutedFg, fontVariantNumeric: 'tabular-nums' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {formatTime(timerSeconds)}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display: 'flex' }}>
        {/* ── Left: question + options ── */}
        <div style={{ flex: 1, minWidth: 0, padding: '24px 28px' }}>
          {/* Progress bar */}
          <div style={{ height: 4, borderRadius: 2, background: '#e2e8f0', marginBottom: 24, overflow: 'hidden' }}>
            <div style={{
              height: '100%', background: primary, borderRadius: 2,
              width: `${(answeredCount / totalQuestions) * 100}%`,
              transition: 'width 0.5s',
            }} />
          </div>

          {/* Question card */}
          <div style={{
            borderRadius: 16, border: `1px solid ${border}`,
            background: cardBg, padding: 28, marginBottom: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
              <span style={{
                fontSize: 12, fontWeight: 600, color: mutedFg,
                textTransform: 'uppercase', letterSpacing: 0.5,
              }}>
                Question {currentQ} of {totalQuestions}
              </span>
              <button
                onClick={() => setFlagged(!flagged)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '4px 12px', borderRadius: 9999,
                  fontSize: 12, fontWeight: 500,
                  background: flagged ? '#fff7ed' : '#f1f5f9',
                  color: flagged ? '#9a3412' : mutedFg,
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                {flagged ? t('mcqExam.flagged') : t('mcqExam.flag')}
              </button>
            </div>
            <p style={{
              fontSize: 16, lineHeight: 1.625, color: fg,
            }}>
              {question.text}
            </p>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            {question.options.map((opt) => {
              const isSelected = selected === opt.label;
              return (
                <button
                  key={opt.label}
                  onClick={() => setSelected(isSelected ? null : opt.label)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 16,
                    width: '100%', padding: '16px 20px',
                    borderRadius: 12,
                    border: isSelected
                      ? `2px solid ${primary}`
                      : `1px solid ${border}`,
                    background: isSelected ? primaryLight : cardBg,
                    cursor: 'pointer',
                    textAlign: 'left' as const,
                    fontFamily: 'inherit',
                    transition: 'all 0.15s',
                    boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = primary;
                      e.currentTarget.style.background = 'rgba(241,245,249,0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = border;
                      e.currentTarget.style.background = cardBg;
                    }
                  }}
                >
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: isSelected ? `2px solid ${primary}` : `2px solid ${border}`,
                    background: isSelected ? primary : 'transparent',
                    color: isSelected ? '#fff' : mutedFg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700, flexShrink: 0,
                    transition: 'all 0.15s',
                  }}>
                    {opt.label}
                  </span>
                  <span style={{
                    fontSize: 14, lineHeight: 1.5, marginTop: 2,
                    color: isSelected ? fg : '#475569',
                    fontWeight: isSelected ? 500 : 400,
                  }}>
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 8,
              border: `1px solid ${border}`, background: cardBg,
              cursor: 'pointer', fontSize: 14, fontWeight: 500,
              color: fg, fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              {t('mcqExam.previous')}
            </button>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 20px', borderRadius: 8,
              border: 'none',
              background: primary, color: '#fff',
              cursor: 'pointer', fontSize: 14, fontWeight: 500,
              fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}>
              {t('mcqExam.next')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>

        {/* ── Right: question navigator ── */}
        <div style={{
          width: 220, flexShrink: 0,
          padding: '24px 16px',
          borderLeft: `1px solid ${border}`,
          background: cardBg,
        }}>
          <h3 style={{
            fontSize: 14, fontWeight: 600, color: fg,
            marginBottom: 16,
          }}>
            {t('mcqExam.questions')}
          </h3>

          {/* Question grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 8, marginBottom: 20,
          }}>
            {Array.from({ length: totalQuestions }, (_, i) => {
              const n = i + 1;
              const status = getQStatus(n);
              const isCurrent = status === 'current';
              const isAnswered = status === 'answered';

              let bg = '#fff'; let fgc = mutedFg; let bd = border;
              if (isCurrent) { bg = primary; fgc = '#fff'; bd = primary; }
              else if (isAnswered) { bg = '#dcfce7'; fgc = '#16a34a'; bd = '#bbf7d0'; }

              return (
                <button
                  key={n}
                  style={{
                    width: 32, height: 32,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 600,
                    borderRadius: 8,
                    background: bg, color: fgc,
                    border: `1px solid ${bd}`,
                    cursor: 'default',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s',
                    ...(isCurrent ? { boxShadow: '0 2px 8px rgba(30,64,175,0.3)', transform: 'scale(1.05)' } : {}),
                  }}
                >
                  {n}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{
            borderTop: `1px solid ${border}`,
            paddingTop: 16,
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: mutedFg }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: primary, flexShrink: 0 }} />
              {t('mcqExam.current')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: mutedFg }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: green, flexShrink: 0 }} />
              {t('mcqExam.answered')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: mutedFg }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: '#fff', border: `1px solid ${border}`, flexShrink: 0 }} />
              {t('mcqExam.unanswered')}
            </div>
          </div>

          {/* Stats */}
          <div style={{
            borderTop: `1px solid ${border}`,
            marginTop: 16, paddingTop: 16,
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: mutedFg }}>{t('mcqExam.answered')}</span>
              <span style={{ fontWeight: 500, color: fg }}>{answeredCount}/{totalQuestions}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: mutedFg }}>{t('mcqExam.flag')}</span>
              <span style={{ fontWeight: 500, color: orange }}>{flagged ? 1 : 0}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: mutedFg }}>{t('mcqExam.remaining')}</span>
              <span style={{ fontWeight: 500, color: fg }}>{totalQuestions - answeredCount}</span>
            </div>
          </div>

          {/* Submit button */}
          <div style={{
            borderTop: `1px solid ${border}`,
            marginTop: 16, paddingTop: 16,
          }}>
            <button style={{
              width: '100%', padding: '10px 16px',
              borderRadius: 8, border: 'none',
              background: green, color: '#fff',
              fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',


function AnimatedSection({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {children}
    </div>
  );
}

export function HomePage() {
  const [liveStreak, setLiveStreak] = useState(0);
  const [astronautEnabled, setAstronautEnabled] = useState(() => localStorage.getItem('astronaut_enabled') !== 'false');
  const [liveXP, setLiveXP] = useState(0);
  const { user } = useProctor();
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [commentFormOpen, setCommentFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentUni, setCommentUni] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load saved reviews from localStorage
  const [savedReviews, setSavedReviews] = useState<Array<{ name: string; text: string; rating: number; uni?: string }>>(() => {
    try {
      return JSON.parse(localStorage.getItem('comenius_reviews') || '[]');
    } catch { return []; }
  });

  useEffect(() => {
    const t1 = setTimeout(() => setHeroVisible(true), 200);
    return () => { clearTimeout(t1); };
  }, []);

  // Fetch gamification data for logged-in users
  useEffect(() => {
    if (!user) return;
    supabase.from('users').select('id').eq('auth_id', user.id).single().then(({ data: profile }) => {
      if (!profile) return;
      Promise.all([
        supabase.from('streaks').select('current_streak').eq('user_id', profile.id).maybeSingle(),
        supabase.from('xp_transactions').select('amount').eq('user_id', profile.id),
      ]).then(([streakRes, xpRes]) => {
        if (streakRes.data) setLiveStreak(streakRes.data.current_streak ?? 0);
        if (xpRes.data) {
          const total = xpRes.data.reduce((s: number, r: { amount: number }) => s + r.amount, 0);
          setLiveXP(total);
        }
      });
    });
  }, [user]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setShowBackTop(y > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sync astronaut unlock state
  useEffect(() => {
    if (!user) return;
    supabase.from('users').select('id').eq('auth_id', user.id).single().then(({ data: profile }) => {
      if (!profile) return;
      getUserUnlocks(profile.id).then((unlocks) => {
        const has = unlocks.some((u) => u.unlock_key === 'astronaut_home');
        localStorage.setItem('astronaut_unlocked', has ? 'true' : 'false');
        setAstronautEnabled(has && localStorage.getItem('astronaut_enabled') !== 'false');
      });
    });
  }, [user]);

  // Listen for astronaut toggle changes from ProfilePage
  useEffect(() => {
    const handler = () => {
      setAstronautEnabled(localStorage.getItem('astronaut_enabled') !== 'false');
    };
    window.addEventListener('astronaut-toggle-changed', handler);
    return () => window.removeEventListener('astronaut-toggle-changed', handler);
  }, []);

  const containerStyle: React.CSSProperties = {
    maxWidth: 1280, margin: '0 auto', padding: '0 24px',
    fontFamily: font,
  };

  const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 };
  const grid3: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 };
  const grid4: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 24 };

  const sectionTitle: React.CSSProperties = { textAlign: 'center', marginBottom: 48 };

  const analyticsLink = user ? '/analytics' : '/login';

  return (
    <div style={{ minHeight: '100vh', background: colors.background, fontFamily: font }}>
      <TopNav currentPage="home" scrolled={scrolled} />

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-blob" style={{ position: 'absolute', top: 0, right: 0, width: 500, height: 500, background: 'rgba(30,64,175,0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div className="bg-blob" style={{ position: 'absolute', top: 160, left: 0, width: 300, height: 300, background: 'rgba(96,165,250,0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <OrbitCards />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.65)', pointerEvents: 'none' }} />
        <FloatingAstronaut enabled={astronautEnabled} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 1024, margin: '0 auto', padding: '128px 24px' }}>
          <h1 style={{
            fontSize: 60, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.025em', marginBottom: 48,
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}>Comenius</h1>
          <p style={{
            fontSize: 18, color: colors.mutedForeground, marginBottom: 40, lineHeight: 1.625, maxWidth: 768, marginLeft: 'auto', marginRight: 'auto',
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s',
          }}>
            For International Exam Preparations
          </p>
          <style>{`
            .shine-btn {
              position: relative;
              transition: all 0.3s ease-in-out;
              box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
              padding: 12px 32px;
              background-color: ${colors.primary};
              border-radius: 9999px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              color: #fff;
              gap: 10px;
              font-weight: 600;
              border: 3px solid rgba(255,255,255,0.3);
              outline: none;
              overflow: hidden;
              font-size: ${typography.size.md};
              cursor: pointer;
              text-decoration: none;
              white-space: nowrap;
              font-family: ${typography.fontFamily};
              box-sizing: border-box;
            }
            .shine-btn .shine-icon {
              width: 20px;
              height: 20px;
              transition: all 0.3s ease-in-out;
              flex-shrink: 0;
            }
            .shine-btn:hover {
              transform: scale(1.05);
              border-color: rgba(255,255,255,0.6);
            }
            .shine-btn:hover .shine-icon {
              transform: translateX(4px);
            }
            .shine-btn:hover::before {
              animation: shine 1.5s ease-out infinite;
            }
            .shine-btn::before {
              content: "";
              position: absolute;
              width: 100px;
              height: 100%;
              background-image: linear-gradient(
                120deg,
                rgba(255, 255, 255, 0) 30%,
                rgba(255, 255, 255, 0.8),
                rgba(255, 255, 255, 0) 70%
              );
              top: 0;
              left: -100px;
              opacity: 0.6;
            }
            @keyframes shine {
              0% { left: -100px; }
              60% { left: 100%; }
              to { left: 100%; }
            }
          `}</style>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap',
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
          }}>
            <Link to="/admission-tests" className="shine-btn">
              Start Practice
              <svg className="shine-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link to={analyticsLink} style={btnOutlineLg}>View Analytics</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <AnimatedSection>
        <section style={sectionStyle}>
          <div style={containerStyle}>
            <div style={grid4}>
              <StatCard icon={<PaperIcon />} value="1530+" label="Past papers indexed" color="30,64,175" animate />
              <StatCard icon={<AdmissionIcon />} value="120+" label="Students Joined" color="34,197,94" animate />
              <StatCard icon={<PaperIcon />} value="20+" label="Different Subjects" color="59,130,246" animate />
              <StatCard icon={<CheckIcon />} value="300+" label="Mock exams completed" color="147,51,234" animate />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Platform */}
      <AnimatedSection>
        <section style={sectionStyle}>
          <div style={containerStyle}>
            <div style={sectionTitle}>
              <h2 style={{ fontSize: 36, fontWeight: 600, marginBottom: 16 }}>Complete Preparation Platform</h2>
              <p style={{ fontSize: 18, color: colors.mutedForeground, maxWidth: 672, margin: '0 auto' }}>
                Everything you need to excel in A-Levels and UK university admissions
              </p>
            </div>
            <div style={grid2}>
              <PlatformCard
                to="/past-papers" icon={<PaperIcon />}
                title="Full A-Level Past Papers"
                desc="Comprehensive resources for Cambridge International and Edexcel qualifications"
                features={['20+ CIE subjects covering all majors', 'Organized topical questions', 'MCQ instant grading', 'Structured questions online typing']}
                linkText="Explore Past Papers" accentColor="30,64,175"
              />
              <PlatformCard
                to="/admission-tests" icon={<AdmissionIcon />}
                title="Admissions Tests"
                desc="Specialized preparation for Oxbridge and competitive university admissions"
                features={['TMUA, ESAT, STEP, TARA', '173+ admissions test past papers', 'Step-by-step worked solutions', 'Targeted preparation for Cambridge, Oxford']}
                linkText="View Admissions Tests" accentColor="59,130,246"
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Mock Exam Preview */}
      <AnimatedSection>
        <section style={{ ...sectionStyle, background: 'rgba(248,250,252,0.3)' }}>
          <div style={containerStyle}>
            <div style={sectionTitle}>
              <h2 style={{ fontSize: 36, fontWeight: 600, marginBottom: 16 }}>Real Exam Environment</h2>
              <p style={{ fontSize: 18, color: colors.mutedForeground, maxWidth: 672, margin: '0 auto' }}>
                Experience authentic computer-based testing with our advanced mock examination platform
              </p>
            </div>
            <div style={{ marginBottom: 48, textAlign: 'center' }}>
              <img
                src="/exam-screenshot.png"
                alt="Real Exam Environment"
                style={{
                  maxWidth: '100%',
                  borderRadius: radii.lg,
                  boxShadow: shadows['2xl'],
                  border: `1px solid ${colors.border}`,
                }}
              />
            </div>
            <div style={{ marginBottom: 48 }}>
              <ExamPreviewCard />
            </div>

            {/* Exam Features */}
            <div style={grid3}>
              {[
                { icon: <CheckIcon />, title: 'Fullscreen Mode', desc: 'Distraction-free exam simulation matching real test conditions', color: '30,64,175' },
                { icon: <CheckIcon />, title: 'Real-time Autosave', desc: 'Never lose progress with automatic answer synchronization', color: '34,197,94' },
                { icon: <CheckIcon />, title: 'Auto-Creation of Papers', desc: 'Random selected questions with every topic covered', color: '59,130,246' },
                { icon: <CheckIcon />, title: 'Time Analytics', desc: 'Track time per question and optimize exam strategy', color: '147,51,234' },
                { icon: <CheckIcon />, title: 'Question Flagging', desc: 'Mark questions for review and navigate efficiently', color: '249,115,22' },
                { icon: <CheckIcon />, title: 'Instant Grading', desc: 'Automated marking with detailed explanations', color: '236,72,153' },
              ].map((f, i) => (
                <ExamFeatureCard key={i} {...f} />
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Personal Study Record */}
      <AnimatedSection>
        <section style={sectionStyle}>
        <div style={containerStyle}>
          <div style={sectionTitle}>
            <h2 style={{ fontSize: 36, fontWeight: 600, marginBottom: 16 }}>Record of Personal Studying Process</h2>
            <p style={{ fontSize: 18, color: colors.mutedForeground, maxWidth: 672, margin: '0 auto' }}>
              Track every session, paper, and milestone in your academic journey
            </p>
          </div>

          <div style={{ position: 'relative', maxWidth: 1024, margin: '0 auto' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(30,64,175,0.2), rgba(59,130,246,0.2))', borderRadius: radii['2xl'], filter: 'blur(64px)', opacity: 0.5 }} />
            <div style={{ ...cardStyle, position: 'relative', border: `2px solid ${colors.borderAlpha}`, boxShadow: shadows['2xl'], backdropFilter: 'blur(8px)', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(to right, rgba(30,64,175,0.1), rgba(59,130,246,0.1))', padding: 24, borderBottom: `1px solid ${colors.borderAlpha}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f87171' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#facc15' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#4ade80' }} />
                  </div>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.5)', borderRadius: 8, padding: '8px 16px', fontSize: 14, color: colors.mutedForeground }}>
                    oxbridgeprep.com/dashboard
                  </div>
                </div>
                <div style={grid4}>
                  {[
                    { label: 'Overall Accuracy', value: '87%' },
                    { label: 'Study Streak', value: user ? `${liveStreak} day${liveStreak !== 1 ? 's' : ''}` : '23 days' },
                    { label: 'Questions', value: '2,847' },
                    { label: 'XP Earned', value: user ? liveXP.toLocaleString() : '31.8h' },
                  ].map((stat) => (
                    <div key={stat.label} style={{ ...cardStyle, background: 'rgba(255,255,255,0.8)', border: `1px solid ${colors.borderAlpha}` }}>
                      <div style={{ padding: '16px 16px 8px' }}>
                        <div style={{ fontSize: 12, color: colors.mutedForeground }}>{stat.label}</div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>{stat.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {user && (
                  <Link to="/checkin" style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
                    borderRadius: 8, background: '#eff6ff', textDecoration: 'none',
                    fontSize: 13, fontWeight: 500, color: '#1e40af',
                    fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                  }}>
                    🔥 View Your Study Streak & Earn XP →
                  </Link>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 8, background: 'rgba(248,250,252,0.5)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: radii.lg, background: 'rgba(30,64,175,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>Mathematics Paper 3</div>
                      <div style={{ fontSize: 12, color: colors.mutedForeground }}>Completed 2 hours ago</div>
                    </div>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500, background: colors.successBg, color: colors.success, border: `1px solid ${colors.successBorder}` }}>A*</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 8, background: 'rgba(248,250,252,0.5)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: radii.lg, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10h-10V2z"/></svg>
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>AI Recommendation</div>
                      <div style={{ fontSize: 12, color: colors.mutedForeground }}>Focus on Complex Numbers this week</div>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Class Mode */}
      <AnimatedSection>
        <section style={sectionStyle}>
        <div style={containerStyle}>
          <div style={sectionTitle}>
            <h2 style={{ fontSize: 36, fontWeight: 600, marginBottom: 16 }}>Class Mode Available</h2>
            <p style={{ fontSize: 18, color: colors.mutedForeground, maxWidth: 672, margin: '0 auto' }}>
              Join your teacher's class and collaborate with classmates — all in one place
            </p>
          </div>
          <div style={grid3}>
            <FeatureCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              title="Join Your Class" color="139,92,246"
              desc="Enter a class code and password to instantly connect with your teacher and classmates in a shared learning space"
            />
            <FeatureCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="10" y1="14" x2="14" y2="14"/><line x1="12" y1="10" x2="12" y2="18"/></svg>}
              title="Teacher-Set Assignments" color="59,130,246"
              desc="Receive mock exam assignments directly from your teacher with due dates, track your progress, and submit results in real time"
            />
            <FeatureCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/></svg>}
              title="Learn Together" color="34,197,94"
              desc="See your classmates, share the journey, and stay motivated as you prepare for your exams as a cohort"
            />
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection>
        <section style={{
        ...sectionStyle,
        background: 'linear-gradient(180deg, #f8fafc 0%, #eff6ff 50%, #f8fafc 100%)',
      }}>
        <div style={containerStyle}>
          <div style={sectionTitle}>
            <div style={{ marginBottom: 16, display: 'inline-block', padding: '12px', borderRadius: '50%', background: 'rgba(30,64,175,0.06)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1Z"/>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1Z"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 600, marginBottom: 16, color: colors.foreground }}>Trusted by Top Students</h2>
            <p style={{ fontSize: 18, color: colors.mutedForeground }}>Join thousands who achieved their dream university offers</p>
          </div>
          <TestimonialCarousel />
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            {!commentFormOpen && !submitted && (
              <button style={btnOutlineLg} onClick={() => setCommentFormOpen(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="12" y1="8" x2="12" y2="14"/><line x1="9" y1="11" x2="15" y2="11"/></svg>
                Write a Comment
              </button>
            )}
            {submitted && (
              <div style={{
                maxWidth: 480, margin: '0 auto', padding: '32px 24px', textAlign: 'center', ...cardStyle, border: `1px solid ${colors.borderAlpha}`,
                animation: 'fadeInUp 0.5s ease',
              }}>
                <div style={{ marginBottom: 12, display: 'inline-block', padding: '10px', borderRadius: '50%', background: colors.successBg }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ fontWeight: 600, fontSize: 18, color: colors.foreground }}>Thank you for your review!</div>
                <p style={{ fontSize: typography.size.base, color: colors.mutedForeground, marginTop: 8 }}>Your comment has been submitted and will appear after review.</p>
                <button
                  onClick={() => { setSubmitted(false); setRating(0); setCommentText(''); setCommentName(''); setCommentUni(''); }}
                  style={{ ...btnOutline, marginTop: 16 }}
                >
                  Write Another
                </button>
              </div>
            )}

            {/* Saved reviews from localStorage */}
            {savedReviews.length > 0 && !commentFormOpen && !submitted && (
              <div style={{ width: '100%', maxWidth: 576 }}>
                <h4 style={{ fontSize: typography.size.md, fontWeight: 600, marginBottom: 12, textAlign: 'center' }}>Recent Reviews</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {savedReviews.slice(-3).reverse().map((r, i) => (
                    <div key={i} style={{ ...cardStyle, padding: '16px', border: `1px solid ${colors.borderAlpha}` }}>
                      <div style={{ display: 'flex', gap: 2, marginBottom: 4, fontSize: 14 }}>
                        {[1,2,3,4,5].map(s => (
                          <span key={s} style={{ color: s <= r.rating ? '#f59e0b' : '#e5e7eb' }}>★</span>
                        ))}
                      </div>
                      <p style={{ fontSize: typography.size.base, color: colors.foreground, fontStyle: 'italic', marginBottom: 4 }}>"{r.text}"</p>
                      <div style={{ fontSize: typography.size.sm, fontWeight: 500, color: colors.mutedForeground }}>— {r.name}{r.uni ? `, ${r.uni}` : ''}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {commentFormOpen && (
              <div style={{ width: '100%', maxWidth: 576, ...cardStyle, border: `2px solid ${colors.borderAlpha}` }}>
                <div style={{ ...cardHeaderStyle, paddingBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: 20, fontWeight: 600 }}>Share Your Experience</h3>
                    <button onClick={() => setCommentFormOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.mutedForeground, fontSize: 20 }}>×</button>
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                    {[1,2,3,4,5].map(s => (
                      <button key={s} onClick={() => setRating(s)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 28, color: s <= rating ? '#f59e0b' : '#d1d5db' }}
                      >★</button>
                    ))}
                  </div>
                </div>
                <div style={{ ...cardContentStyle, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <textarea rows={4} value={commentText} onChange={e => setCommentText(e.target.value)}
                    placeholder="Share your experience with Comenius..."
                    style={{ width: '100%', borderRadius: radii.md, border: `1px solid ${colors.border}`, background: colors.background, padding: '8px 12px', fontSize: typography.size.base, color: colors.foreground, fontFamily: font, resize: 'none' }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <input value={commentName} onChange={e => setCommentName(e.target.value)}
                      placeholder="Your name"
                      style={{ borderRadius: radii.md, border: `1px solid ${colors.border}`, background: colors.background, padding: '8px 12px', fontSize: typography.size.base, fontFamily: font }}
                    />
                    <input value={commentUni} onChange={e => setCommentUni(e.target.value)}
                      placeholder="University & subject (optional)"
                      style={{ borderRadius: radii.md, border: `1px solid ${colors.border}`, background: colors.background, padding: '8px 12px', fontSize: typography.size.base, fontFamily: font }}
                    />
                  </div>
                  <button
                    style={{
                      ...btnPrimary, height: 44, justifyContent: 'center',
                      opacity: (!rating || !commentText.trim() || !commentName.trim() || submitting) ? 0.6 : 1,
                    }}
                    disabled={!rating || !commentText.trim() || !commentName.trim() || submitting}
                    onClick={() => {
                      setSubmitting(true);
                      const newReview = { name: commentName, text: commentText.trim(), rating, uni: commentUni || undefined };
                      const updated = [...savedReviews, newReview];
                      localStorage.setItem('comenius_reviews', JSON.stringify(updated));
                      setSavedReviews(updated);
                      setTimeout(() => {
                        setSubmitting(false);
                        setSubmitted(true);
                        setCommentFormOpen(false);
                      }, 800);
                    }}
                  >
                    {submitting ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#fff', borderRadius: '50%',
                          animation: 'spin 0.6s linear infinite',
                        }} />
                        Submitting...
                      </span>
                    ) : 'Submit Review'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        </section>
      </AnimatedSection>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 100,
          width: 44, height: 44, borderRadius: '50%',
          border: `1px solid ${colors.border}`, background: colors.card,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: showBackTop ? 1 : 0,
          pointerEvents: showBackTop ? 'auto' : 'none',
          transform: showBackTop ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
      </button>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${colors.borderAlpha}`, background: 'rgba(248,250,252,0.3)', padding: '48px 0' }}>
        <div style={containerStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: colors.foreground }}>Contact Us</h3>
            <p style={{ fontSize: typography.size.base, color: colors.mutedForeground, textAlign: 'center', maxWidth: 480 }}>
              Have questions or feedback? We'd love to hear from you. Send us your suggestions, bug reports, or feature requests via email.
            </p>
            <a href="mailto:Comenius_academy@outlook.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: radii.md,
              background: colors.primary, color: colors.primaryForeground,
              textDecoration: 'none', fontSize: typography.size.md, fontWeight: 500,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Comenius_academy@outlook.com
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: radii.lg, background: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <span style={{ fontWeight: 600, color: colors.foreground }}>Comenius</span>
            </div>
            <div style={{ fontSize: typography.size.base, color: colors.mutedForeground }}>2026 Comenius. All rights reserved.</div>
          </div>
        </div>
      </footer>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
