import { motion } from "framer-motion";

type Props = { message: string };

export default function Loading({ message }: Props) {
  // Rota compacta "pulsando" durante o loading
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
    >
      <div className="relative" style={{ width: 220, height: 180 }}>
        <svg viewBox="0 0 220 180" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lg-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E4C590" />
              <stop offset="100%" stopColor="#A98A4D" />
            </linearGradient>
            <radialGradient id="lg-pulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E4C590" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E4C590" stopOpacity="0" />
            </radialGradient>
          </defs>

          <motion.path
            d="M 24 130 C 50 90, 70 100, 90 86 S 140 70, 160 60 S 196 42, 200 36"
            fill="none"
            stroke="url(#lg-grad)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="300"
            initial={{ strokeDashoffset: 300 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
          />

          {[
            { x: 24, y: 130 },
            { x: 90, y: 86 },
            { x: 160, y: 60 },
            { x: 200, y: 36 },
          ].map((p, i) => (
            <g key={i}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={12}
                fill="url(#lg-pulse)"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.3, 0.6] }}
                transition={{ delay: 0.2 + i * 0.35, duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={3}
                fill="#E4C590"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ delay: i * 0.3, duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>
          ))}
        </svg>
      </div>

      <motion.p
        key={message}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 text-bone-100/80 text-sm tracking-widest uppercase"
        style={{ letterSpacing: "0.22em" }}
      >
        {message}
      </motion.p>

      <div className="mt-4 w-28 h-px gold-hairline" />
    </motion.div>
  );
}
