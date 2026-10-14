import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS, type Testimonial } from "../config";

function Card({ t, i }: { t: Testimonial; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
        className="testimonial-frame flex flex-col gap-4"
      >
        <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-gold-500/90">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Cliente real · WhatsApp
        </div>

        <p className="text-bone-50/95 text-[0.98rem] leading-relaxed font-light">
          <span className="text-gold-500 text-xl leading-none align-top">“</span>
          {t.quote}
          <span className="text-gold-500 text-xl leading-none align-bottom">”</span>
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-bone-50/8">
          <div>
            <div className="text-sm text-bone-50">{t.name}</div>
            <div className="text-xs text-bone-300 mt-0.5">Cliente do Danilo Mello</div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative group"
            aria-label={`Ver print do WhatsApp de ${t.name}`}
          >
            <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gold-500/40 shadow-gold">
              <div className="absolute inset-0 bg-gradient-to-br from-ink-700 to-ink-900" />
              <img
                src={t.print}
                alt=""
                loading="lazy"
                className="relative w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-ink-900/30 group-hover:bg-ink-900/10 transition-colors" />
            </div>
            <span className="absolute -bottom-5 right-0 text-[0.6rem] tracking-widest text-gold-500/70 uppercase whitespace-nowrap">
              ver print
            </span>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-ink-900/90 backdrop-blur-md flex items-center justify-center p-5"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 220 }}
              className="relative max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden border border-gold-500/40 shadow-gold">
                <img src={t.print} alt={`Print do depoimento de ${t.name}`} className="w-full h-auto" />
              </div>
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-ink-800 border border-gold-500/50 text-bone-50 flex items-center justify-center hover:border-gold-300 transition-colors"
                aria-label="Fechar"
              >
                ×
              </button>
              <p className="mt-4 text-center text-xs text-bone-300 tracking-widest uppercase">
                {t.name} · WhatsApp
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Testimonials() {
  const featured = TESTIMONIALS.filter((t) => t.featured);
  const extras = TESTIMONIALS.filter((t) => !t.featured);
  const [showExtras, setShowExtras] = useState(false);

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-gold-500">
          <span className="w-6 h-px bg-gold-500/60" />
          O que dizem quem já saiu do ponto
          <span className="w-6 h-px bg-gold-500/60" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {featured.map((t, i) => (
          <Card key={t.id} t={t} i={i} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setShowExtras((s) => !s)}
          className="text-sm text-bone-300 hover:text-gold-300 transition-colors underline underline-offset-4 decoration-gold-500/40"
        >
          {showExtras ? "Esconder depoimentos" : `Ver mais ${extras.length} depoimentos`}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showExtras && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              {extras.map((t, i) => (
                <Card key={t.id} t={t} i={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
