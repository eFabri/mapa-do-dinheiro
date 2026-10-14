import { motion } from "framer-motion";

type Props = { size?: number; className?: string };

/**
 * Gráfico financeiro premium: linha ascendente de patrimônio
 * com 4 marcos (os 4 estágios do mapa). Barras verticais sutis ao fundo,
 * eixos finos e grid dourado — leitura imediata de "evolução financeira".
 */
export default function WealthChart({ size = 260, className = "" }: Props) {
  const w = 320;
  const h = 180;

  // 4 marcos: dinheiro parado → organizado → investido → multiplicando
  const pts = [
    { x: 30, y: 150 },
    { x: 115, y: 118 },
    { x: 205, y: 76 },
    { x: 290, y: 32 },
  ];

  // Curva suave entre os pontos
  const path = `M ${pts[0].x} ${pts[0].y}
    C ${pts[0].x + 40} ${pts[0].y}, ${pts[1].x - 30} ${pts[1].y + 10}, ${pts[1].x} ${pts[1].y}
    S ${pts[2].x - 30} ${pts[2].y + 10}, ${pts[2].x} ${pts[2].y}
    S ${pts[3].x - 30} ${pts[3].y + 10}, ${pts[3].x} ${pts[3].y}`;

  // Area sob a curva
  const areaPath = `${path} L ${pts[3].x} ${h - 10} L ${pts[0].x} ${h - 10} Z`;

  // Barras ao fundo (volume)
  const bars = Array.from({ length: 18 }).map((_, i) => {
    const x = 30 + i * 15;
    const base = Math.sin(i * 0.6) * 6 + i * 1.4;
    const bh = Math.max(6, 14 + base);
    return { x, h: bh, y: h - 10 - bh };
  });

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size * (h / w) }}>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-label="Gráfico de evolução financeira" role="img">
        <defs>
          <linearGradient id="wc-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A86A" />
            <stop offset="60%" stopColor="#E4C590" />
            <stop offset="100%" stopColor="#FFD98A" />
          </linearGradient>
          <linearGradient id="wc-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E4C590" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E4C590" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wc-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A86A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C9A86A" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="wc-pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD98A" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#E4C590" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#E4C590" stopOpacity="0" />
          </radialGradient>
          <filter id="wc-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Grid horizontal */}
        {[40, 80, 120, 160].map((y, i) => (
          <motion.line
            key={i}
            x1="20" y1={y} x2={w - 15} y2={y}
            stroke="#C9A86A"
            strokeOpacity={0.08}
            strokeDasharray="2 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.9 }}
          />
        ))}

        {/* Eixo Y rótulos sutis */}
        {["$$$$", "$$$", "$$", "$"].map((t, i) => (
          <motion.text
            key={t}
            x="14"
            y={48 + i * 40}
            fontSize="7"
            fill="#C9A86A"
            fillOpacity={0.4}
            fontFamily="Inter"
            textAnchor="end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.7 }}
          >
            {t}
          </motion.text>
        ))}

        {/* Barras de volume */}
        {bars.map((b, i) => (
          <motion.rect
            key={i}
            x={b.x} width="7" rx="1.2"
            fill="url(#wc-bar)"
            initial={{ height: 0, y: h - 10 }}
            animate={{ height: b.h, y: b.y }}
            transition={{ delay: 0.2 + i * 0.04, duration: 0.6, ease: "easeOut" }}
          />
        ))}

        {/* Área sob a curva */}
        <motion.path
          d={areaPath}
          fill="url(#wc-area)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.2 }}
        />

        {/* Linha principal */}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#wc-line)"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
          filter="url(#wc-glow)"
        />

        {/* Marcos */}
        {pts.map((p, i) => {
          const isLast = i === pts.length - 1;
          return (
            <g key={i}>
              {isLast && (
                <motion.circle
                  cx={p.x} cy={p.y} r={18}
                  fill="url(#wc-pulse)"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.6, 1, 0.6] }}
                  transition={{ delay: 2.6, duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                />
              )}
              <motion.circle
                cx={p.x} cy={p.y}
                r={isLast ? 5 : 3.6}
                fill={isLast ? "#FFD98A" : "#E4C590"}
                stroke="#0B0E13"
                strokeWidth={1.4}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.55, type: "spring", stiffness: 300, damping: 18 }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
            </g>
          );
        })}

        {/* % ganho etéreo no último ponto */}
        <motion.g
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.8 }}
        >
          <rect x={pts[3].x - 22} y={pts[3].y - 24} width="38" height="14" rx="7" fill="rgba(228,197,144,0.12)" stroke="rgba(228,197,144,0.5)" strokeWidth="0.6" />
          <text x={pts[3].x - 3} y={pts[3].y - 14} fontSize="7" fill="#FFD98A" fontFamily="Inter" textAnchor="middle" letterSpacing="0.5">
            +248%
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
