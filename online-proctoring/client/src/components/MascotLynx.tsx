import React from 'react';

export type LynxVariant = 'idle' | 'watching' | 'happy' | 'suspicious';
export type LynxSize = 'sm' | 'md' | 'lg' | 'xl';

interface Props {
  variant?: LynxVariant;
  size?: LynxSize;
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap: Record<LynxSize, number> = {
  sm: 56,
  md: 100,
  lg: 160,
  xl: 240,
};

// ── Shared gradients (referenced by id, scoped per instance) ──
let instanceId = 0;

const Defs = () => (
  <defs>
    <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#2d5ec9" />
      <stop offset="100%" stopColor="#1e40af" />
    </linearGradient>
    <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#3b6fdb" />
      <stop offset="100%" stopColor="#2d5ec9" />
    </linearGradient>
    <radialGradient id="eyeGrad" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stopColor="#fbbf24" />
      <stop offset="60%" stopColor="#f59e0b" />
      <stop offset="100%" stopColor="#b45309" />
    </radialGradient>
    <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.3" />
      <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.15" />
    </linearGradient>
  </defs>
);

// ── Fixed body parts (same for all variants) ──

const Tail = () => (
  <g id="tail">
    <path d="M230,210 Q260,205 268,195 Q275,185 272,172 Q269,162 260,160 Q250,160 242,168 Q225,180 225,200 Z"
      fill="url(#bodyGrad)" stroke="#1e3a8a" strokeWidth="1.5"/>
    <path d="M260,160 Q269,162 272,172 Q275,185 268,195 Q265,198 262,195 Q268,182 268,172 Q265,164 260,160 Z"
      fill="#0f172a"/>
  </g>
);

const Body = () => (
  <g id="body">
    <ellipse cx="150" cy="195" rx="58" ry="70" fill="url(#bodyGrad)" stroke="#1e3a8a" strokeWidth="1.5"/>
    <ellipse cx="150" cy="200" rx="32" ry="52" fill="#dbeafe" opacity="0.6"/>
  </g>
);

const Paws = () => (
  <g id="paws">
    <ellipse cx="118" cy="265" rx="22" ry="16" fill="#2d5ec9" stroke="#1e3a8a" strokeWidth="1.5"/>
    <path d="M104,268 Q108,258 112,268" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M112,270 Q116,260 120,270" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="182" cy="265" rx="22" ry="16" fill="#2d5ec9" stroke="#1e3a8a" strokeWidth="1.5"/>
    <path d="M168,268 Q172,258 176,268" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M176,270 Q180,260 184,270" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="118" cy="270" rx="10" ry="6" fill="#dbeafe" opacity="0.5"/>
    <ellipse cx="182" cy="270" rx="10" ry="6" fill="#dbeafe" opacity="0.5"/>
  </g>
);

const Ears = () => (
  <g id="ears">
    <path d="M95,95 L78,45 L130,85 Z" fill="#2d5ec9" stroke="#1e3a8a" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M98,90 L85,55 L125,84 Z" fill="#dbeafe" opacity="0.5"/>
    <path d="M78,45 Q72,35 75,22 Q78,8 82,10 Q84,15 82,28 L80,42 Q79,44 78,45 Z" fill="#0f172a"/>
    <path d="M78,45 Q74,38 72,30" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M80,44 Q78,38 76,30" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M205,95 L222,45 L170,85 Z" fill="#2d5ec9" stroke="#1e3a8a" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M202,90 L215,55 L175,84 Z" fill="#dbeafe" opacity="0.5"/>
    <path d="M222,45 Q228,35 225,22 Q222,8 218,10 Q216,15 218,28 L220,42 Q221,44 222,45 Z" fill="#0f172a"/>
    <path d="M222,45 Q226,38 228,30" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M220,44 Q222,38 224,30" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </g>
);

const Head = () => (
  <g id="head">
    <path d="M150,60 Q200,60 215,95 Q225,125 218,145 Q210,165 185,170 Q160,178 150,180 Q140,178 115,170 Q90,165 82,145 Q75,125 85,95 Q100,60 150,60 Z"
      fill="url(#headGrad)" stroke="#1e3a8a" strokeWidth="1.5"/>
    <path d="M85,95 Q75,125 82,145 Q90,162 115,170 Q140,178 150,180 L150,140 Q130,135 115,125 Q100,110 100,95 Q98,80 100,65 Z"
      fill="#dbeafe" opacity="0.35"/>
    <path d="M215,95 Q225,125 218,145 Q210,162 185,170 Q160,178 150,180 L150,140 Q170,135 185,125 Q200,110 200,95 Q202,80 200,65 Z"
      fill="#dbeafe" opacity="0.35"/>
    <path d="M140,70 L150,85 L160,70" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.3"/>
    <path d="M130,72 L140,88 L150,72" stroke="#1e3a8a" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.2"/>
    <path d="M150,72 L160,88 L170,72" stroke="#1e3a8a" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.2"/>
    {/* Nose */}
    <path d="M147,128 L150,134 L153,128 Q153,124 150,123 Q147,124 147,128 Z" fill="#f472b6"/>
    {/* Whisker dots */}
    {[[132,130],[128,135],[132,140],[168,130],[172,135],[168,140]].map(([cx,cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="1.5" fill="#1e3a8a" opacity="0.4"/>
    ))}
    {/* Whiskers */}
    <line x1="125" y1="128" x2="100" y2="120" stroke="#1e3a8a" strokeWidth="0.8" strokeLinecap="round" opacity="0.25"/>
    <line x1="124" y1="134" x2="98" y2="134" stroke="#1e3a8a" strokeWidth="0.8" strokeLinecap="round" opacity="0.25"/>
    <line x1="125" y1="140" x2="100" y2="148" stroke="#1e3a8a" strokeWidth="0.8" strokeLinecap="round" opacity="0.25"/>
    <line x1="175" y1="128" x2="200" y2="120" stroke="#1e3a8a" strokeWidth="0.8" strokeLinecap="round" opacity="0.25"/>
    <line x1="176" y1="134" x2="202" y2="134" stroke="#1e3a8a" strokeWidth="0.8" strokeLinecap="round" opacity="0.25"/>
    <line x1="175" y1="140" x2="200" y2="148" stroke="#1e3a8a" strokeWidth="0.8" strokeLinecap="round" opacity="0.25"/>
  </g>
);

const Glasses = () => (
  <g id="glasses">
    <path d="M146,107 Q150,103 154,107" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="130" cy="108" r="18" stroke="#0f172a" strokeWidth="2.2" fill="url(#lensGrad)"/>
    <circle cx="170" cy="108" r="18" stroke="#0f172a" strokeWidth="2.2" fill="url(#lensGrad)"/>
    <path d="M112,108 Q100,106 92,100" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    <path d="M188,108 Q200,106 208,100" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
  </g>
);

const Badge = () => (
  <g id="badge">
    <rect x="135" y="158" width="30" height="18" rx="3" fill="white" stroke="#1e3a8a" strokeWidth="1"/>
    <text x="150" y="171" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fontWeight="700" fill="#1e40af">LYNX</text>
  </g>
);

// ── Expression variants (eyes + eyebrows + mouth) ──

interface EyeProps { cx: number; pupilDx?: number; pupilDy?: number; squint?: boolean; happyArc?: boolean }

const Eye = ({ cx, pupilDx = 0, pupilDy = 0, squint = false, happyArc = false }: EyeProps) => {
  const cy = 108;
  if (happyArc) {
    return (
      <>
        {/* Happy arc eye — closed smiling eye */}
        <path d={`M${cx - 14},${cy} Q${cx},${cy - 10} ${cx + 14},${cy}`}
          stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </>
    );
  }
  return (
    <>
      <ellipse cx={cx} cy={cy} rx={squint ? 14 : 14} ry={squint ? 11 : 15} fill="white"
        stroke="#1e3a8a" strokeWidth="1.5"/>
      <ellipse cx={cx} cy={cy + 1} rx={squint ? 8 : 9} ry={squint ? 7 : 10} fill="url(#eyeGrad)"/>
      <ellipse cx={cx + pupilDx} cy={cy + pupilDy} rx={squint ? 3.5 : 4} ry={squint ? 4 : 5} fill="#0f172a"/>
      <ellipse cx={cx - 3 + pupilDx} cy={cy - 3 + pupilDy} rx="2.5" ry="2" fill="white" opacity="0.9"/>
      <ellipse cx={cx + 2 + pupilDx} cy={cy + 2 + pupilDy} rx="1" ry="0.8" fill="white" opacity="0.4"/>
    </>
  );
};

const Eyes = ({ variant }: { variant: LynxVariant }) => {
  switch (variant) {
    case 'watching':
      return (
        <g id="eyes-watching">
          <Eye cx={130} squint />
          <Eye cx={170} squint />
        </g>
      );
    case 'happy':
      return (
        <g id="eyes-happy">
          <Eye cx={130} happyArc />
          <Eye cx={170} happyArc />
        </g>
      );
    case 'suspicious':
      return (
        <g id="eyes-suspicious">
          <Eye cx={130} squint pupilDx={1} pupilDy={-1} />
          <Eye cx={170} squint pupilDx={-1} pupilDy={-1} />
        </g>
      );
    default: // idle
      return (
        <g id="eyes-idle">
          <Eye cx={130} />
          <Eye cx={170} />
        </g>
      );
  }
};

const Eyebrows = ({ variant }: { variant: LynxVariant }) => {
  switch (variant) {
    case 'watching':
      return (
        <g id="eyebrows-watching">
          {/* Angled inward — focused */}
          <path d="M118,93 Q128,86 141,90" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M159,90 Q172,86 182,93" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </g>
      );
    case 'happy':
      return (
        <g id="eyebrows-happy">
          {/* Raised high */}
          <path d="M116,86 Q128,80 142,85" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M158,85 Q172,80 184,86" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </g>
      );
    case 'suspicious':
      return (
        <g id="eyebrows-suspicious">
          {/* Left raised, right lowered */}
          <path d="M116,86 Q128,80 142,85" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M162,96 Q172,94 184,92" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </g>
      );
    default: // idle
      return (
        <g id="eyebrows-idle">
          <path d="M115,93 Q122,88 138,92" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M162,92 Q178,88 185,93" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </g>
      );
  }
};

const Mouth = ({ variant }: { variant: LynxVariant }) => {
  switch (variant) {
    case 'watching':
      return (
        <g id="mouth-watching">
          <path d="M145,140 L155,140" stroke="#1e3a8a" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        </g>
      );
    case 'happy':
      return (
        <g id="mouth-happy">
          <path d="M142,134 Q150,148 158,134" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M145,140 Q150,146 155,140" fill="#f472b6" opacity="0.3"/>
        </g>
      );
    case 'suspicious':
      return (
        <g id="mouth-suspicious">
          <path d="M145,138 Q150,142 157,136" stroke="#1e3a8a" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        </g>
      );
    default: // idle
      return (
        <g id="mouth-idle">
          <path d="M145,138 Q150,144 155,138" stroke="#1e3a8a" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        </g>
      );
  }
};

// ── Main component ──

const MascotLynx: React.FC<Props> = ({
  variant = 'idle',
  size = 'md',
  className,
  style,
}) => {
  const px = sizeMap[size];

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: px,
        height: px,
        ...style,
      }}
      data-mascot="lynx"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 300"
        fill="none"
        width={px}
        height={px}
        style={{ display: 'block' }}
      >
        <Defs />
        <Tail />
        <Body />
        <Paws />
        <Ears />
        <Head />
        <Eyes variant={variant} />
        <Eyebrows variant={variant} />
        <Mouth variant={variant} />
        <Glasses />
        <Badge />
      </svg>
    </div>
  );
};

export default MascotLynx;
