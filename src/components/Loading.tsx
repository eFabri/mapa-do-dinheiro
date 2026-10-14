import { motion } from "framer-motion";

type Props = { message: string; variant: number };

/**
 * 6 variantes de loader financeiro. O App escolhe a variante por step
 * passando `variant` (0..5). Todas duram ~1s–1.5s de ciclo mas o App
 * controla o tempo real pelo setTimeout de TRANSITION_MS.
 */
export default function Loading({ message, variant }: Props) {
  const Variant = VARIANTS[variant % VARIANTS.length];

  return (
    <motion.div
      key={`loading-${variant}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
    >
      <div className="w-[240px] flex items-center justify-center">
        <Variant />
      </div>

      <motion.p
        key={message}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 text-bone-100/80 text-[0.78rem] tracking-[0.22em] uppercase text-center"
      >
        {message}
      </motion.p>

      <div className="mt-4 w-28 h-px gold-hairline" />
    </motion.div>
  );
}

/* ============================ VARIANTES ============================ */

// 0 — Barras enchendo (análise de ganhos/gastos)
function BarsLoader() {
  const bars = [60, 85, 45, 95, 70, 110, 80];
  return (
    <svg viewBox="0 0 240 160" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bl-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD98A" />
          <stop offset="100%" stopColor="#A98A4D" />
        </linearGradient>
      </defs>
      <line x1="10" y1="140" x2="230" y2="140" stroke="#C9A86A" strokeOpacity="0.25" strokeWidth="0.8" />
      {bars.map((bh, i) => (
        <motion.rect
          key={i}
          x={20 + i * 28}
          width="18"
          rx="3"
          fill="url(#bl-g)"
          initial={{ height: 0, y: 140 }}
          animate={{ height: bh, y: 140 - bh }}
          transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatType: "reverse", repeatDelay: 0.4 }}
        />
      ))}
      <motion.text
        x="120" y="155" textAnchor="middle"
        fontSize="7" fill="#C9A86A" fillOpacity="0.6"
        fontFamily="Inter" letterSpacing="2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
      >
        ANALISANDO
      </motion.text>
    </svg>
  );
}

// 1 — Checklist com checks aparecendo
function ChecksLoader() {
  const items = ["Renda", "Hábitos", "Sobra", "Investimentos"];
  return (
    <svg viewBox="0 0 240 160" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cl-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C9A86A" />
          <stop offset="100%" stopColor="#FFD98A" />
        </linearGradient>
      </defs>
      {items.map((label, i) => {
        const y = 24 + i * 32;
        return (
          <g key={i}>
            <motion.rect
              x="20" y={y - 11} width="200" height="22" rx="6"
              fill="rgba(201,168,106,0.06)"
              stroke="rgba(201,168,106,0.2)" strokeWidth="0.6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3, duration: 0.4 }}
            />
            <motion.circle
              cx="34" cy={y} r="7"
              fill="url(#cl-g)"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.3, type: "spring", stiffness: 300, damping: 15 }}
            />
            <motion.path
              d={`M ${30} ${y} l 3 3 l 6 -6`}
              stroke="#0B0E13" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 + i * 0.3, duration: 0.4 }}
            />
            <motion.text
              x="52" y={y + 3} fontSize="9"
              fill="#F4F1EA" fillOpacity="0.9"
              fontFamily="Inter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.3 }}
            >
              {label}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

// 2 — Linha subindo (stock chart) com partículas
function LineLoader() {
  return (
    <svg viewBox="0 0 240 160" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ll-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C9A86A" />
          <stop offset="100%" stopColor="#FFD98A" />
        </linearGradient>
        <linearGradient id="ll-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E4C590" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#E4C590" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 10 130 L 10 140 L 230 140 L 230 40 L 180 60 L 140 50 L 100 85 L 60 70 L 10 100 Z"
        fill="url(#ll-a)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      />
      <motion.path
        d="M 10 100 L 60 70 L 100 85 L 140 50 L 180 60 L 230 40"
        fill="none" stroke="url(#ll-g)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 0.3 }}
      />
      {[[10,100],[60,70],[100,85],[140,50],[180,60],[230,40]].map(([x,y], i) => (
        <motion.circle
          key={i} cx={x} cy={y} r={3} fill="#FFD98A"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.2 * i, duration: 0.3 }}
        />
      ))}
      <motion.text
        x="230" y="30" textAnchor="end" fontSize="8"
        fill="#FFD98A" fontFamily="Inter"
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 30 }}
        transition={{ delay: 1.2 }}
      >
        ↑ +132%
      </motion.text>
    </svg>
  );
}

// 3 — Pizza/donut preenchendo (alocação)
function DonutLoader() {
  const cx = 120, cy = 80, r = 48, sw = 14;
  const C = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 240 160" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dl-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD98A" />
          <stop offset="100%" stopColor="#A98A4D" />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} stroke="rgba(201,168,106,0.15)" strokeWidth={sw} fill="none" />
      <motion.circle
        cx={cx} cy={cy} r={r}
        stroke="url(#dl-g)" strokeWidth={sw} fill="none"
        strokeLinecap="round"
        strokeDasharray={C}
        transform={`rotate(-90 ${cx} ${cy})`}
        initial={{ strokeDashoffset: C }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 0.3 }}
      />
      <motion.text
        x={cx} y={cy - 2} textAnchor="middle" fontSize="18"
        fill="#F4F1EA" fontFamily="Fraunces"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <tspan>100%</tspan>
      </motion.text>
      <motion.text
        x={cx} y={cy + 12} textAnchor="middle" fontSize="6.5"
        fill="#C9A86A" fillOpacity="0.75" letterSpacing="2.5"
        fontFamily="Inter"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        MAPEADO
      </motion.text>
    </svg>
  );
}

// 4 — Dial / gauge semi-circular
function DialLoader() {
  const cx = 120, cy = 110, r = 60;
  // arco semicircular de 180° partindo da esquerda
  const start = { x: cx - r, y: cy };
  const end = { x: cx + r, y: cy };
  const bg = `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`;
  const C = Math.PI * r;
  return (
    <svg viewBox="0 0 240 160" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gl-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A98A4D" />
          <stop offset="100%" stopColor="#FFD98A" />
        </linearGradient>
      </defs>
      <path d={bg} fill="none" stroke="rgba(201,168,106,0.18)" strokeWidth="10" strokeLinecap="round" />
      <motion.path
        d={bg} fill="none" stroke="url(#gl-g)" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        animate={{ strokeDashoffset: C * 0.1 }}
        transition={{ duration: 1.6, ease: "easeOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 0.3 }}
      />
      {/* Agulha */}
      <motion.line
        x1={cx} y1={cy} x2={cx} y2={cy - r + 10}
        stroke="#FFD98A" strokeWidth="2" strokeLinecap="round"
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        initial={{ rotate: -90 }}
        animate={{ rotate: 65 }}
        transition={{ duration: 1.6, ease: "easeOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 0.3 }}
      />
      <circle cx={cx} cy={cy} r="4" fill="#FFD98A" />
      <text x={cx - r} y={cy + 14} fontSize="7" fill="#C9A86A" fillOpacity="0.6" fontFamily="Inter">Baixo</text>
      <text x={cx + r} y={cy + 14} fontSize="7" fill="#C9A86A" fillOpacity="0.6" fontFamily="Inter" textAnchor="end">Alto</text>
      <motion.text
        x={cx} y={cy + 28} textAnchor="middle" fontSize="7"
        fill="#FFD98A" letterSpacing="2.5" fontFamily="Inter"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
      >
        CALIBRANDO
      </motion.text>
    </svg>
  );
}

// 5 — Blocos empilhando (patrimônio)
function StackLoader() {
  const blocks = [
    { w: 110, label: "Reserva" },
    { w: 90, label: "Renda fixa" },
    { w: 70, label: "Variável" },
    { w: 50, label: "Alternativos" },
  ];
  return (
    <svg viewBox="0 0 240 160" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sl-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C9A86A" />
          <stop offset="100%" stopColor="#FFD98A" />
        </linearGradient>
      </defs>
      {blocks.map((b, i) => {
        const y = 130 - i * 24;
        return (
          <g key={i}>
            <motion.rect
              x={120 - b.w / 2} y={y} width={b.w} height={20} rx="4"
              fill="url(#sl-g)" fillOpacity={0.3 + i * 0.17}
              stroke="rgba(228,197,144,0.6)" strokeWidth="0.6"
              initial={{ opacity: 0, y: y - 24, scaleY: 0.2 }}
              animate={{ opacity: 1, y, scaleY: 1 }}
              transition={{ delay: i * 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `120px ${y + 10}px` }}
            />
            <motion.text
              x="120" y={y + 14} textAnchor="middle"
              fontSize="7.5" fill="#0B0E13" fontFamily="Inter" fontWeight="600" letterSpacing="0.5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.25 }}
            >
              {b.label}
            </motion.text>
          </g>
        );
      })}
      <motion.text
        x="120" y="28" textAnchor="middle" fontSize="7"
        fill="#C9A86A" letterSpacing="2.5" fontFamily="Inter"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
      >
        MONTANDO PLANO
      </motion.text>
    </svg>
  );
}

const VARIANTS = [BarsLoader, ChecksLoader, LineLoader, DonutLoader, DialLoader, StackLoader];
