import { motion } from "framer-motion";

type Props = { size?: number; className?: string };

export default function MapLogo({ size = 180, className = "" }: Props) {
  // 4 pontos conectados por uma rota (os 4 estágios do mapa)
  const pts = [
    { x: 24, y: 150 },
    { x: 78, y: 92 },
    { x: 138, y: 112 },
    { x: 196, y: 46 },
  ];
  const path = `M ${pts[0].x} ${pts[0].y}
                C ${pts[0].x + 25} ${pts[0].y - 50}, ${pts[1].x - 20} ${pts[1].y + 30}, ${pts[1].x} ${pts[1].y}
                S ${pts[2].x - 10} ${pts[2].y - 30}, ${pts[2].x} ${pts[2].y}
                S ${pts[3].x - 20} ${pts[3].y + 30}, ${pts[3].x} ${pts[3].y}`;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size * (200 / 220) }}>
      <svg
        viewBox="0 0 220 200"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Mapa do Dinheiro"
        role="img"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E4C590" />
            <stop offset="55%" stopColor="#C9A86A" />
            <stop offset="100%" stopColor="#A98A4D" />
          </linearGradient>
          <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E4C590" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#E4C590" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#E4C590" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Compass ring */}
        <motion.g
          initial={{ opacity: 0, rotate: -8 }}
          animate={{ opacity: 0.35, rotate: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          style={{ transformOrigin: "110px 100px" }}
        >
          <circle cx="110" cy="100" r="86" stroke="url(#goldGrad)" strokeOpacity="0.18" strokeWidth="1" fill="none" />
          <circle cx="110" cy="100" r="72" stroke="url(#goldGrad)" strokeOpacity="0.12" strokeWidth="1" fill="none" strokeDasharray="2 6" />
          {/* ticks */}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const r1 = 86;
            const r2 = i % 6 === 0 ? 78 : 82;
            const x1 = 110 + Math.cos(a) * r1;
            const y1 = 100 + Math.sin(a) * r1;
            const x2 = 110 + Math.cos(a) * r2;
            const y2 = 100 + Math.sin(a) * r2;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#goldGrad)" strokeOpacity="0.25" strokeWidth="0.8" />;
          })}
        </motion.g>

        {/* Route — drawn in */}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 2.6, ease: "easeInOut", delay: 0.4 }}
          filter="url(#softGlow)"
        />

        {/* Dots */}
        {pts.map((p, i) => (
          <g key={i}>
            {i === pts.length - 1 && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={16}
                fill="url(#pulse)"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.6, 0.95, 0.6] }}
                transition={{ delay: 2.4, duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
            )}
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={i === pts.length - 1 ? 5 : 3.6}
              fill={i === pts.length - 1 ? "#E4C590" : "#C9A86A"}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.55, duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={i === pts.length - 1 ? 9 : 7}
              fill="none"
              stroke="#E4C590"
              strokeOpacity={0.35}
              strokeWidth="0.8"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75 + i * 0.55, duration: 0.6 }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
          </g>
        ))}

        {/* Compass N */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 1.4, duration: 1.2 }}
        >
          <polygon
            points="110,22 114,36 110,32 106,36"
            fill="url(#goldGrad)"
            opacity={0.9}
          />
          <text
            x="110"
            y="16"
            textAnchor="middle"
            fill="#E4C590"
            fontSize="7"
            fontFamily="Fraunces, serif"
            letterSpacing="3"
          >
            N
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
