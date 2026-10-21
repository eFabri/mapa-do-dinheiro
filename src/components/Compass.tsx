import { motion } from "framer-motion";

type Props = { size?: number; className?: string; mode?: "hero" | "calibrating" };

/**
 * Bússola premium — metáfora do "encontrar seu norte financeiro".
 * A agulha hesita entre direções, acelera e desacelera e por fim
 * se estabiliza apontando para cima com um balanço vivo. Pivô
 * dourado pulsante; 4 marcas cardeais ao redor que acendem quando
 * a agulha passa (reforço sutil de "4 perfis").
 *
 * mode="calibrating": usada nas transições — agulha varrendo em loop
 * contínuo e rápido, sem pausa, e menos partículas.
 */
export default function Compass({ size = 260, className = "", mode = "hero" }: Props) {
  const calibrating = mode === "calibrating";
  const vb = 220;
  const cx = vb / 2;
  const cy = vb / 2;
  const rOuter = 92;
  const rInner = 72;
  const rNeedle = 68;

  // Rotação "procurando o norte": hesita, acelera, desacelera, estabiliza em 0
  const needleKeys = [-60, 32, -18, 10, -4, 2, 0, 1.6, -1.2, 0.6, 0];
  // 4 marcas cardeais (0=N, 90=L, 180=S, 270=O) — sugerem 4 perfis
  const marks = [0, 90, 180, 270];

  // Micro-partículas (12 pontos ao redor)
  const particleCount = calibrating ? 6 : 12;
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const a = (i / particleCount) * Math.PI * 2 + Math.random() * 0.2;
    return { a, r: rOuter + 10 + (i % 3) * 5, delay: i * 0.3 };
  });

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${vb} ${vb}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-label="Bússola do Diagnóstico Financeiro Emocional" role="img">
        <defs>
          <linearGradient id="cp-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFEEC2" />
            <stop offset="45%" stopColor="#E4C590" />
            <stop offset="100%" stopColor="#A98A4D" />
          </linearGradient>
          <linearGradient id="cp-rim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFEEC2" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#C9A86A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#A98A4D" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="cp-needle-n" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#A98A4D" />
            <stop offset="60%" stopColor="#E4C590" />
            <stop offset="100%" stopColor="#FFEEC2" />
          </linearGradient>
          <linearGradient id="cp-needle-s" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B2029" />
            <stop offset="100%" stopColor="#0B0E13" />
          </linearGradient>
          <radialGradient id="cp-pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFEEC2" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#E4C590" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E4C590" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cp-glass" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.03)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id="cp-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Partículas douradas */}
        {particles.map((p, i) => {
          const x = cx + Math.cos(p.a) * p.r;
          const y = cy + Math.sin(p.a) * p.r;
          return (
            <motion.circle
              key={i}
              cx={x} cy={y} r={1}
              fill="#E4C590"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1.6, 0.6] }}
              transition={{ delay: p.delay, duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          );
        })}

        {/* Aro externo — pedra gravada */}
        <motion.circle
          cx={cx} cy={cy} r={rOuter}
          fill="none"
          stroke="url(#cp-rim)" strokeWidth="1.4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <circle cx={cx} cy={cy} r={rOuter - 4} fill="none" stroke="rgba(201,168,106,0.18)" strokeWidth="0.6" />
        <circle cx={cx} cy={cy} r={rOuter - 10} fill="none" stroke="rgba(201,168,106,0.08)" strokeWidth="0.5" strokeDasharray="1 3" />

        {/* 72 marcações finas de bússola (tipo relógio) */}
        {Array.from({ length: 72 }).map((_, i) => {
          const a = (i / 72) * Math.PI * 2 - Math.PI / 2;
          const major = i % 18 === 0;
          const mid = i % 9 === 0;
          const r1 = rOuter - 2;
          const r2 = major ? rOuter - 12 : mid ? rOuter - 8 : rOuter - 5;
          const x1 = cx + Math.cos(a) * r1;
          const y1 = cy + Math.sin(a) * r1;
          const x2 = cx + Math.cos(a) * r2;
          const y2 = cy + Math.sin(a) * r2;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="url(#cp-gold)"
              strokeOpacity={major ? 0.9 : mid ? 0.45 : 0.22}
              strokeWidth={major ? 1 : 0.6}
            />
          );
        })}

        {/* 4 marcas cardeais — os 4 perfis */}
        {marks.map((deg, i) => {
          const a = (deg * Math.PI) / 180 - Math.PI / 2;
          const x = cx + Math.cos(a) * (rOuter - 20);
          const y = cy + Math.sin(a) * (rOuter - 20);
          return (
            <g key={i}>
              {/* Halo que acende em sequência (passagem da agulha) */}
              <motion.circle
                cx={x} cy={y} r={7}
                fill="url(#cp-pulse)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.85, 0] }}
                transition={{ delay: 1.4 + i * 0.5, duration: 1.4, repeat: Infinity, repeatDelay: 3.2 }}
              />
              <motion.circle
                cx={x} cy={y} r={2.2}
                fill="#E4C590"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ delay: 1.4 + i * 0.5, duration: 1.4, repeat: Infinity, repeatDelay: 3.2 }}
              />
            </g>
          );
        })}

        {/* Vidro — reflexo */}
        <circle cx={cx} cy={cy} r={rInner} fill="url(#cp-glass)" />

        {/* Agulha — hesita e encontra o norte */}
        <motion.g
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          {...(calibrating
            ? {
                // Sempre em sentido horário: empurra → segura → empurra.
                // 0 e 360 são a mesma posição, então o loop não "volta".
                initial: { rotate: 0 },
                animate: { rotate: [0, 70, 90, 170, 180, 260, 270, 350, 360] },
                transition: {
                  times: [0, 0.12, 0.22, 0.4, 0.5, 0.68, 0.78, 0.94, 1],
                  duration: 2.6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0,
                },
              }
            : {
                initial: { rotate: -90 },
                animate: { rotate: [...needleKeys, 0] },
                transition: {
                  times: [0, 0.08, 0.17, 0.26, 0.34, 0.42, 0.5, 0.58, 0.66, 0.74, 0.82, 1],
                  duration: 5.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1.2,
                },
              })}
        >
          {/* Metade sul (escura) */}
          <path
            d={`M ${cx} ${cy} L ${cx - 5} ${cy + 4} L ${cx} ${cy + rNeedle} L ${cx + 5} ${cy + 4} Z`}
            fill="url(#cp-needle-s)"
            stroke="rgba(201,168,106,0.5)"
            strokeWidth="0.5"
          />
          {/* Metade norte (dourada, luz) */}
          <path
            d={`M ${cx} ${cy} L ${cx - 5} ${cy - 4} L ${cx} ${cy - rNeedle} L ${cx + 5} ${cy - 4} Z`}
            fill="url(#cp-needle-n)"
            stroke="rgba(255,238,194,0.75)"
            strokeWidth="0.4"
            filter="url(#cp-glow)"
          />
          {/* Linha central brilhante */}
          <line
            x1={cx} y1={cy - rNeedle + 4}
            x2={cx} y2={cy + rNeedle - 4}
            stroke="#FFEEC2" strokeOpacity="0.4" strokeWidth="0.5"
          />
        </motion.g>

        {/* Pivô — pulso dourado */}
        <motion.circle
          cx={cx} cy={cy} r={16}
          fill="url(#cp-pulse)"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        <circle cx={cx} cy={cy} r={5.5} fill="url(#cp-gold)" />
        <circle cx={cx} cy={cy} r={2.2} fill="#0B0E13" />
        <circle cx={cx} cy={cy} r={1.1} fill="#FFEEC2" />
      </svg>
    </div>
  );
}
