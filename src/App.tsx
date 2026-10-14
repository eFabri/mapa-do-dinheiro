import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  WHATSAPP_NUMBER,
  TRANSITION_MS_DEFAULT,
  TRANSITION_MS_BY_STEP,
  LOADING_MESSAGES,
  LOADER_VARIANT_BY_STEP,
  STAGE_LABELS,
  DANILO_PHOTO,
  type Stage,
} from "./config";
import { SCREENS, DIAGNOSIS, DIAGNOSIS_CLOSING, type Option } from "./content";
import Compass from "./components/Compass";
import ShimmerButton from "./components/ShimmerButton";
import OptionList from "./components/OptionList";
import Loading from "./components/Loading";
import Testimonials from "./components/Testimonials";

type Answers = {
  stage?: Stage;
  stageOptionId?: string;
  [k: string]: unknown;
};

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<Record<number, Option>>({});
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [loadingVariant, setLoadingVariant] = useState(0);
  const reduceMotion = useReducedMotion();

  const screen = SCREENS[step];
  const totalSteps = SCREENS.length;
  const progress = ((step + 1) / totalSteps) * 100;

  // Pré-carregar foto do Danilo
  useEffect(() => {
    const img = new Image();
    img.src = DANILO_PHOTO;
  }, []);

  function handleSelect(opt: Option) {
    setSelected((prev) => ({ ...prev, [step]: opt }));
    if (screen.stageKey === "stage" && opt.stage) {
      setAnswers((prev) => ({ ...prev, stage: opt.stage, stageOptionId: opt.id }));
    } else if (screen.stageKey) {
      setAnswers((prev) => ({ ...prev, [screen.stageKey as string]: opt.label }));
    }
  }

  function advance() {
    if (step >= totalSteps - 1) return;
    const nextStep = step + 1;
    const key = `${step}-${nextStep}`;
    const base = TRANSITION_MS_BY_STEP[key] ?? TRANSITION_MS_DEFAULT;
    const duration = reduceMotion ? Math.min(base, 500) : base;

    setLoadingMsg(LOADING_MESSAGES[nextStep] || "Carregando...");
    setLoadingVariant(LOADER_VARIANT_BY_STEP[nextStep] ?? nextStep % 6);
    setLoading(true);
    window.setTimeout(() => {
      setStep(nextStep);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, duration);
  }

  const stage: Stage = answers.stage ?? "E1";
  const diag = DIAGNOSIS[stage];

  const whatsappHref = useMemo(() => {
    const label = STAGE_LABELS[stage];
    const parts = [
      `Olá Danilo! Acabei de fazer meu Diagnóstico Financeiro Emocional.`,
      `Meu perfil: ${label} (${stage}).`,
      answers["block"] ? `O que mais me trava: ${answers["block"]}.` : "",
      answers["trajectory"] ? `Últimos 2–3 anos: ${answers["trajectory"]}.` : "",
      answers["readiness"] ? `Prontidão: ${answers["readiness"]}.` : "",
      `Quero entender como funciona o acompanhamento.`,
    ].filter(Boolean);
    const text = encodeURIComponent(parts.join(" "));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }, [stage, answers]);

  const canAdvance =
    screen.kind === "question" ? Boolean(selected[step]) : true;

  return (
    <div className="min-h-screen w-full relative noise vignette">
      {/* Fundo luxuoso */}
      <div
        className="fixed inset-0 -z-10 bg-ink-900"
        style={{
          backgroundImage:
            "radial-gradient(1100px 500px at 50% -10%, rgba(201,168,106,0.08), transparent 60%), radial-gradient(900px 500px at 50% 110%, rgba(201,168,106,0.05), transparent 60%)",
        }}
      />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <div className="h-[2px] bg-bone-50/5">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.28em] text-bone-300">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulseGold" />
            Diagnóstico · Danilo Mello
          </div>
          <div className="text-[0.68rem] tracking-[0.2em] text-bone-300/70">
            {String(step + 1).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <Loading key="loader" message={loadingMsg} variant={loadingVariant} />
        ) : (
          <motion.main
            key={`screen-${step}`}
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.99 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 min-h-screen pt-20 pb-16 px-5"
          >
            {step === 0 && <IntroScreen onNext={advance} />}
            {step === SCREENS.length - 1 && (
              <FinalScreen stage={stage} whatsappHref={whatsappHref} />
            )}

            {step > 0 && step < SCREENS.length - 1 && screen.kind !== "diagnosis" && (
              <StandardScreen
                title={screen.title}
                body={screen.body}
                options={screen.options}
                cta={screen.cta ?? "Continuar"}
                selectedId={selected[step]?.id}
                onSelect={handleSelect}
                canAdvance={canAdvance}
                onAdvance={advance}
              />
            )}

            {screen.kind === "diagnosis" && (
              <DiagnosisScreen
                stage={stage}
                headline={diag.headline}
                body={diag.body}
                closing={DIAGNOSIS_CLOSING}
                cta={screen.cta ?? "Continuar"}
                onAdvance={advance}
              />
            )}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------- Tela 1 ------------------------------- */
function IntroScreen({ onNext }: { onNext: () => void }) {
  const s = SCREENS[0];
  return (
    <div
      className="max-w-2xl mx-auto flex flex-col items-center text-center justify-between"
      style={{ minHeight: "calc(100vh - 92px)" }}
    >
      {/* Topo: bússola animada + selo do produto */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="w-full flex justify-center mt-1 sm:mt-4 animate-drift"
        >
          <Compass size={220} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-3 flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.4em] text-gold-500"
        >
          <span className="w-5 h-px bg-gold-500/50" />
          Diagnóstico Financeiro Emocional
          <span className="w-5 h-px bg-gold-500/50" />
        </motion.div>
      </div>

      {/* Centro: promessa compacta com gradientes */}
      <div className="flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[1.35rem] sm:text-[2rem] font-serif font-medium leading-[1.18] max-w-md"
        >
          <span className="text-bone-50">Descubra qual é o seu </span>
          <span className="text-gradient-emphasis italic">perfil emocional com o dinheiro</span>
          <span className="text-bone-50">, identifique o que te trava e receba o que fazer para ver o dinheiro sobrar.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.9 }}
          className="mt-3 text-[0.88rem] sm:text-[0.98rem] text-bone-100/85 leading-relaxed max-w-sm"
        >
          Independente da sua situação financeira — se você já investe ou ainda não tem clareza — o diagnóstico te dá o caminho certo para{" "}
          <span className="text-gradient-gold font-semibold">ver o dinheiro sobrar e multiplicar</span> com a técnica certa.
        </motion.p>
      </div>

      {/* Base: CTA + microcópia */}
      <div className="w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="w-full sm:w-auto"
        >
          <ShimmerButton onClick={onNext}>{s.cta}</ShimmerButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="mt-4 text-[0.68rem] tracking-[0.3em] uppercase text-bone-300 flex items-center gap-2"
        >
          <span className="w-1 h-1 rounded-full bg-gold-400 animate-pulseGold" />
          Diagnóstico sigiloso · ~2 min
        </motion.p>
      </div>
    </div>
  );
}

/* ---------------------------- Tela padrão --------------------------- */
function StandardScreen(props: {
  title: string;
  body?: string;
  options?: Option[];
  cta: string;
  selectedId?: string;
  onSelect: (o: Option) => void;
  canAdvance: boolean;
  onAdvance: () => void;
}) {
  const { title, body, options, cta, selectedId, onSelect, canAdvance, onAdvance } = props;
  return (
    <div className="max-w-xl mx-auto flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-2xl sm:text-3xl font-serif font-medium text-bone-50 leading-[1.2]"
      >
        {title}
      </motion.h2>

      {body && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-4 text-bone-100/80 leading-relaxed whitespace-pre-line"
        >
          {body}
        </motion.p>
      )}

      <div className="my-7 gold-hairline" />

      {options && (
        <OptionList options={options} selectedId={selectedId} onSelect={onSelect} />
      )}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8"
      >
        <ShimmerButton onClick={onAdvance} disabled={!canAdvance}>
          {canAdvance ? cta : "Selecione uma opção"}
        </ShimmerButton>
      </motion.div>
    </div>
  );
}

/* --------------------------- Tela diagnóstico ----------------------- */
function DiagnosisScreen(props: {
  stage: Stage;
  headline: string;
  body: string;
  closing: string;
  cta: string;
  onAdvance: () => void;
}) {
  const { stage, headline, body, closing, cta, onAdvance } = props;
  const stageIndex = ["E1", "E2", "E3", "E4"].indexOf(stage);

  return (
    <div className="max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-gold-500"
      >
        <span className="w-6 h-px bg-gold-500/60" />
        Seu diagnóstico
        <span className="w-6 h-px bg-gold-500/60" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="mt-4 text-2xl sm:text-3xl font-serif font-medium text-bone-50 leading-[1.2]"
      >
        Seu Diagnóstico Financeiro Emocional está pronto. Aqui está o seu perfil:
      </motion.h2>

      {/* Barra visual com os 4 perfis destacando o seu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.9 }}
        className="mt-8 relative rounded-2xl border border-gold-500/25 bg-gradient-to-b from-ink-700/60 to-ink-800/60 backdrop-blur-sm p-6"
      >
        <svg viewBox="0 0 320 110" width="100%" height="110" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dg-route" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C9A86A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E4C590" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M 20 80 C 70 50, 110 90, 160 60 S 250 30, 300 50"
            fill="none"
            stroke="url(#dg-route)"
            strokeWidth="1.6"
            strokeDasharray="4 6"
          />
          {[
            { x: 20, y: 80, label: "No escuro" },
            { x: 110, y: 90, label: "Refém do hábito" },
            { x: 220, y: 55, label: "Quase lá" },
            { x: 300, y: 50, label: "Sobra sem rumo" },
          ].map((p, i) => {
            const active = i === stageIndex;
            return (
              <g key={i}>
                {active && (
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r={16}
                    fill="#E4C590"
                    fillOpacity={0.15}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                  />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active ? 5 : 3}
                  fill={active ? "#E4C590" : "#8E8A80"}
                />
                <text
                  x={p.x}
                  y={p.y + 20}
                  textAnchor="middle"
                  fontSize="7"
                  fill={active ? "#E4C590" : "#8E8A80"}
                  fontFamily="Inter"
                  style={{ letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-7"
      >
        <div className="text-[0.7rem] tracking-[0.3em] uppercase text-gold-500/80">Você está em</div>
        <div className="mt-1 font-serif text-3xl sm:text-4xl text-bone-50 italic">{headline}</div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.9 }}
        className="mt-5 text-bone-100/90 leading-relaxed"
      >
        {body}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.9 }}
        className="my-7 gold-hairline"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.9 }}
        className="text-bone-100/80 leading-relaxed italic"
      >
        {closing}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        className="mt-9"
      >
        <ShimmerButton onClick={onAdvance}>{cta}</ShimmerButton>
      </motion.div>
    </div>
  );
}

/* ---------------------------- Tela 11 ------------------------------- */
function FinalScreen({ stage, whatsappHref }: { stage: Stage; whatsappHref: string }) {
  const label = STAGE_LABELS[stage];
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
        {/* Esquerda: texto */}
        <div className="md:col-span-3 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-gold-500"
          >
            <span className="w-6 h-px bg-gold-500/60" />
            Diagnóstico concluído · {label}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-4 text-[1.9rem] sm:text-4xl font-serif font-medium text-bone-50 leading-[1.15]"
          >
            Pronto. Seu Diagnóstico vai direto pro Danilo.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-5 text-bone-100/85 leading-relaxed"
          >
            O Danilo Mello é planejador financeiro e já ajudou pessoas em todos esses
            perfis — do “não sei pra onde vai meu dinheiro” até “sobra, mas não
            vira nada” — a assumir o controle e transformar renda em patrimônio e
            projetos realizados.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 space-y-3"
          >
            {[
              "Ler seu Diagnóstico",
              "Te mostrar o próximo passo pra evoluir do seu perfil",
              "Explicar como funciona o acompanhamento individual",
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.1, duration: 0.5 }}
                className="flex items-start gap-3 text-bone-100/90"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0">
                  <circle cx="12" cy="12" r="11" stroke="#C9A86A" strokeWidth="1" fill="rgba(201,168,106,0.08)" />
                  <path d="M8 12.5l2.6 2.6L16 9.5" stroke="#E4C590" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[0.98rem]">{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8"
          >
            <ShimmerButton
              as="a"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com o Danilo no WhatsApp
            </ShimmerButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-5 text-sm text-bone-300 italic max-w-md"
          >
            P.S. Não importa de onde você parte. O que decide o seu futuro financeiro é
            ter um plano — e começar hoje.
          </motion.p>
        </div>

        {/* Direita: foto do Danilo */}
        <div className="md:col-span-2 order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-gold-500/35 shadow-gold">
              <img
                src={DANILO_PHOTO}
                alt="Danilo Mello, planejador financeiro"
                loading="lazy"
                className="w-full h-auto block object-cover"
                style={{ aspectRatio: "4/5", objectPosition: "center top" }}
              />
              {/* Overlay: gradiente nas bordas, rosto desobstruído */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,14,19,0) 55%, rgba(11,14,19,0.92) 100%), linear-gradient(90deg, rgba(11,14,19,0.0) 60%, rgba(11,14,19,0.5) 100%)",
                }}
              />
              {/* Hairline interna dourada */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(228,197,144,0.25)" }} />

              {/* Legenda */}
              <div className="absolute left-0 right-0 bottom-0 p-5">
                <div className="text-[0.65rem] tracking-[0.35em] text-gold-500 uppercase">Planejador Financeiro</div>
                <div className="mt-1 font-serif text-xl text-bone-50">Danilo Mello</div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 bg-ink-800 border border-gold-500/40 rounded-full px-4 py-2 text-xs tracking-widest uppercase text-gold-300 shadow-gold"
            >
              Atendimento individual
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Depoimentos */}
      <div className="mt-20">
        <Testimonials />
      </div>

      {/* Rodapé */}
      <div className="mt-16 text-center">
        <div className="gold-hairline w-32 mx-auto mb-6" />
        <p className="text-xs text-bone-300 tracking-widest uppercase">
          Diagnóstico Financeiro Emocional · Danilo Mello
        </p>
      </div>
    </div>
  );
}
