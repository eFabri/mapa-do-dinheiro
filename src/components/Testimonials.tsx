import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS, type Testimonial } from "../config";

function PrintCard({ t, i, onOpen }: { t: Testimonial; i: number; onOpen: (t: Testimonial) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(t)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative text-left"
      aria-label={`Ver depoimento de ${t.name}`}
    >
      {/* Moldura dourada premium */}
      <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-br from-gold-300/80 via-gold-500/30 to-gold-700/60 shadow-gold">
        <div className="relative rounded-[14px] bg-ink-900 overflow-hidden">
          {/* Barra "janela" como num app desktop premium */}
          <div className="flex items-center justify-between px-3 py-2 bg-ink-800 border-b border-gold-500/15">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gold-500/40" />
              <span className="w-2 h-2 rounded-full bg-gold-500/25" />
              <span className="w-2 h-2 rounded-full bg-gold-500/15" />
            </div>
            <span className="text-[0.55rem] tracking-[0.3em] uppercase text-gold-500/80">WhatsApp</span>
          </div>

          {/* Print em dimensão fixa — object-cover garante grid uniforme */}
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-ink-900">
            <img
              src={t.print}
              alt={`Depoimento de ${t.name}`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* overlay sutil para integrar o verde cru à paleta */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,14,19,0) 70%, rgba(11,14,19,0.75) 100%)",
                mixBlendMode: "normal",
              }}
            />
            {/* badge de clique */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-ink-900/80 backdrop-blur-sm border border-gold-500/40 text-[0.6rem] tracking-widest uppercase text-gold-300 opacity-0 group-hover:opacity-100 transition-opacity">
              Ampliar
            </div>
          </div>

          {/* Nome + selo */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gold-500/15 bg-ink-800/60">
            <div className="text-[0.9rem] text-bone-50">{t.name}</div>
            <div className="flex items-center gap-1.5 text-[0.6rem] tracking-widest uppercase text-gold-500/90">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Real
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function Lightbox({ t, onClose }: { t: Testimonial; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-ink-900/92 backdrop-blur-md flex items-center justify-center p-5 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 240 }}
        className="relative max-w-md w-full my-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-br from-gold-300 via-gold-500/40 to-gold-700 shadow-gold">
          <div className="relative rounded-[14px] overflow-hidden bg-ink-900">
            <img src={t.print} alt={`Print do WhatsApp — ${t.name}`} className="w-full h-auto block" />
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-b from-gold-300 to-gold-600 text-ink-900 flex items-center justify-center font-bold text-lg shadow-gold hover:brightness-110 transition"
          aria-label="Fechar"
        >
          ×
        </button>
        <p className="mt-5 text-center text-[0.68rem] text-gold-500 tracking-[0.3em] uppercase">
          {t.name} · WhatsApp
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  const featured = TESTIMONIALS.filter((t) => t.featured);
  const extras = TESTIMONIALS.filter((t) => !t.featured);
  const [showExtras, setShowExtras] = useState(false);
  const [lightbox, setLightbox] = useState<Testimonial | null>(null);

  return (
    <div className="w-full">
      <div className="text-center mb-7">
        <div className="inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-gold-500">
          <span className="w-6 h-px bg-gold-500/60" />
          Prints reais de quem já saiu do ponto
          <span className="w-6 h-px bg-gold-500/60" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {featured.map((t, i) => (
          <PrintCard key={t.id} t={t} i={i} onOpen={setLightbox} />
        ))}
      </div>

      <div className="mt-7 flex justify-center">
        <button
          type="button"
          onClick={() => setShowExtras((s) => !s)}
          className="text-sm text-bone-200 hover:text-gold-300 transition-colors underline underline-offset-4 decoration-gold-500/50"
        >
          {showExtras ? "Esconder depoimentos" : `Ver mais ${extras.length} prints`}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-6">
              {extras.map((t, i) => (
                <PrintCard key={t.id} t={t} i={i} onOpen={setLightbox} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && <Lightbox t={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}
