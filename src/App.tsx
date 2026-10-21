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
import RichText from "./components/RichText";

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
        {/* Título centralizado; contador ancorado à direita sem deslocar o centro */}
        <div className="max-w-3xl mx-auto px-4 sm:px-5 py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <span aria-hidden />
          <div className="text-[0.6rem] sm:text-[0.68rem] uppercase tracking-[0.14em] sm:tracking-[0.28em] whitespace-nowrap text-center">
            <span className="text-shimmer-gold font-medium">Diagnóstico Financeiro Emocional</span>
          </div>
          <div className="justify-self-end text-[0.6rem] sm:text-[0.68rem] tracking-[0.1em] sm:tracking-[0.2em] text-bone-300/70 whitespace-nowrap">
            {String(step + 1).padStart(2, "0")}/{String(totalSteps).padStart(2, "0")}
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
      {/* Topo: bússola animada, logo abaixo do título do header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="w-full flex justify-center -mt-8 sm:-mt-4 animate-drift"
      >
        <Compass size={220} />
      </motion.div>

      {/* Centro: promessa compacta com gradientes */}
      <div className="w-full flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[1.4rem] sm:text-[2rem] font-serif font-medium leading-[1.2] w-full max-w-xl text-balance"
        >
          <span className="text-bone-50">Descubra qual é o seu </span>
          <span className="text-gradient-emphasis italic">perfil emocional com o dinheiro</span>
          <span className="text-bone-50">, identifique o que te trava e veja o que fazer para ver o dinheiro sobrar.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.9 }}
          className="mt-4 text-[0.92rem] sm:text-[0.98rem] text-bone-100/85 leading-relaxed w-full max-w-lg text-balance"
        >
          Independente da sua situação financeira — se você já investe ou ainda não tem clareza — o diagnóstico te dá{" "}
          <span className="text-gradient-gold font-semibold">o caminho certo</span>.
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-4"
        >
          <RichText text={body} className="text-bone-100/80 leading-relaxed" />
        </motion.div>
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
        <svg viewBox="0 0 320 124" width="100%" height="124" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dg-route" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C9A86A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E4C590" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M 36 76 C 70 56, 90 92, 118 86 S 190 50, 216 56 S 262 44, 284 46"
            fill="none"
            stroke="url(#dg-route)"
            strokeWidth="1.6"
            strokeDasharray="4 6"
          />
          {/* Labels em 2 linhas e pontos recuados das bordas: cabem inteiros no mobile */}
          {[
            { x: 36, y: 76, label: ["No escuro"] },
            { x: 118, y: 86, label: ["Refém do", "hábito"] },
            { x: 216, y: 56, label: ["Quase lá"] },
            { x: 284, y: 46, label: ["Sobra", "sem rumo"] },
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
                  y={p.y + 19}
                  textAnchor="middle"
                  fontSize="8"
                  fill={active ? "#E4C590" : "#8E8A80"}
                  fontFamily="Inter"
                  style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {p.label.map((line, j) => (
                    <tspan key={j} x={p.x} dy={j === 0 ? 0 : 10}>
                      {line}
                    </tspan>
                  ))}
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.9 }}
        className="mt-5"
      >
        <RichText text={body} className="text-bone-100/90 leading-relaxed" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.9 }}
        className="my-7 gold-hairline"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.9 }}
      >
        <RichText text={closing} className="text-bone-100/80 leading-relaxed italic" />
      </motion.div>

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
  const final = SCREENS[SCREENS.length - 1];
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
            {final.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-5"
          >
            <RichText text={final.body ?? ""} className="text-bone-100/85 leading-[1.8]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mt-7 text-bone-50 font-medium text-[1.02rem]"
          >
            Eu vou pessoalmente te ajudar a:
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 space-y-3"
          >
            {[
              "Ler e entender o que te trava no financeiro",
              "Sair das dívidas com clareza",
              "Te mostrar o que fazer para o seu dinheiro multiplicar",
              "Explicar como funciona o meu acompanhamento individual",
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-8 text-bone-100/90 leading-[1.8] text-[1.02rem]"
          >
            Clique no botão abaixo para agendar uma call comigo e eu te mostro{" "}
            <span className="text-glow-gold font-semibold">
              como é possível mudar a sua realidade financeira
            </span>
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6"
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
            P.S. O que decide o seu futuro financeiro é ter um plano — e começar hoje.
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
                alt="Danilo Boschi, planejador financeiro"
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
                <div className="mt-1 font-serif text-xl text-bone-50">Danilo Boschi</div>
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
          Diagnóstico Financeiro Emocional · Danilo Boschi
        </p>
      </div>
    </div>
  );
}
