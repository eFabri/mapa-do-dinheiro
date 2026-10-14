import type { Stage } from "./config";

export type Option = { id: string; label: string; stage?: Stage };

export type Screen = {
  index: number;
  kind: "intro" | "question" | "diagnosis" | "cta";
  title: string;
  body?: string;
  options?: Option[];
  cta?: string;
  stageKey?: string; // which answer key to store this screen's answer under
};

export const SCREENS: Screen[] = [
  // Tela 1
  {
    index: 0,
    kind: "intro",
    title:
      "Não importa se sobra muito, pouco ou nada. Se você sente que não sai do lugar, o problema é o mesmo.",
    body:
      "Tem gente que fecha o mês no zero a zero sem saber para onde o dinheiro foi. Tem gente que consegue fazer sobrar, mas não sabe o quanto é preciso para realizar seus projetos e conseguir sua liberdade financeira. Já outros conseguem fazer sobrar, mas não têm uma estratégia adequada para investir e multiplicar esse patrimônio.\n\nParece diferente. Mas é a mesma raiz: dinheiro sem controle e sem plano não evolui — por mais que você se esforce.",
    cta: "Quero descobrir meu Mapa do Dinheiro",
  },
  // Tela 2 — captura o estágio
  {
    index: 1,
    kind: "question",
    title: "Primeira pergunta, e seja honesto:",
    body: "Pensando no seu dinheiro hoje, qual dessas frases é mais a sua realidade?",
    stageKey: "stage",
    options: [
      { id: "e1", label: "Fecho o mês no zero e, sinceramente, não sei pra onde o dinheiro foi", stage: "E1" },
      { id: "e2", label: "Tenho renda, mas meus hábitos de consumo me deixam no aperto ou no vermelho", stage: "E2" },
      { id: "e3", label: "Sobra pouco, mas sem planejamento ele some antes que eu perceba", stage: "E3" },
      { id: "e4", label: "Sobra um bom dinheiro, mas fica parado ou mal aplicado", stage: "E4" },
    ],
    cta: "Continuar",
  },
  // Tela 3 — Compromisso #1
  {
    index: 2,
    kind: "question",
    title: "Então deixa eu te perguntar o que realmente incomoda:",
    body:
      "Você está cansado de se esforçar, de ganhar o seu dinheiro... e sentir que, no fim das contas, continua no mesmo lugar — sem controle e sem um plano de verdade?",
    stageKey: "commit1",
    options: [
      { id: "a", label: "Sim. Trabalho, mas não vejo meu dinheiro evoluir" },
      { id: "b", label: "Sim. Falta controle sobre pra onde ele vai" },
      { id: "c", label: "Sim. Nunca tive uma estratégia de verdade" },
    ],
    cta: "É exatamente isso",
  },
  // Tela 4 — Mecanismo
  {
    index: 3,
    kind: "intro",
    title: "Existe um mapa. E todo mundo está num de quatro pontos dele.",
    body:
      "Depois de acompanhar muita gente, o planejador Danilo Mello percebeu que o problema quase nunca é o quanto a pessoa ganha. É onde ela está no Mapa do Dinheiro:\n\n• No escuro — o mês fecha e você não sabe pra onde foi\n• Refém do hábito — a renda existe, mas o consumo descontrolado a consome\n• Quase lá — já sobra algo, mas sem plano ele escorre pelos dedos\n• Sobra sem rumo — sobra bem, mas o dinheiro fica parado ou mal usado\n\nO ponto mais importante: o plano pra sair é diferente em cada ponto. Por isso conselho genérico de internet nunca funcionou pra você.\n\nAs próximas perguntas revelam onde você está no mapa.",
    cta: "Descobrir meu ponto no mapa",
  },
  // Tela 5
  {
    index: 4,
    kind: "question",
    title: "E o que mais te trava hoje?",
    stageKey: "block",
    options: [
      { id: "a", label: "Eu nem sei por onde começar a organizar" },
      { id: "b", label: "Eu sei que gasto demais, mas não consigo segurar" },
      { id: "c", label: "Eu até organizo, mas não tenho uma meta clara pra mirar" },
      { id: "d", label: "Eu tenho dinheiro, mas não sei fazer ele render com estratégia" },
    ],
    cta: "Continuar",
  },
  // Tela 6
  {
    index: 5,
    kind: "question",
    title: "Quando você pensa nos últimos 2 ou 3 anos...",
    body:
      "Sua vida financeira evoluiu de um jeito que te deixa orgulhoso, ou você sente que andou de lado?",
    stageKey: "trajectory",
    options: [
      { id: "a", label: "Andei de lado. Mais tempo de trabalho, quase o mesmo resultado" },
      { id: "b", label: "Evoluí um pouco, mas bem menos do que eu poderia" },
      { id: "c", label: "Sinceramente, nunca parei pra medir isso" },
    ],
    cta: "Continuar",
  },
  // Tela 7
  {
    index: 6,
    kind: "question",
    title: "Uma pergunta difícil, mas necessária:",
    body:
      "Se o seu dinheiro continuar exatamente como está hoje — sem controle, sem plano, sem rumo — daqui a 5 anos você vai ter realizado os projetos que importam pra você? Ou vai estar contando a mesma história?",
    stageKey: "future",
    options: [
      { id: "a", label: "A mesma história. E isso me incomoda demais" },
      { id: "b", label: "Não quero descobrir. É por isso que estou aqui" },
    ],
    cta: "Quero mudar essa rota",
  },
  // Tela 8 — Diagnóstico dinâmico
  {
    index: 7,
    kind: "diagnosis",
    title: "Seu Mapa do Dinheiro está pronto. Aqui está o que ele mostra:",
    cta: "E como eu saio desse ponto?",
  },
  // Tela 9
  {
    index: 8,
    kind: "question",
    title: "Antes de te mostrar o próximo passo, só mais uma coisa:",
    body:
      "Sair do seu ponto no mapa e chegar aos seus projetos não é sorte nem fórmula pronta. É um plano ajustado pra sua realidade, com alguém acompanhando de perto. Como você se vê nisso hoje?",
    stageKey: "readiness",
    options: [
      { id: "a", label: "Estou pronto pra ter um plano profissional e parar de improvisar" },
      { id: "b", label: "Tenho interesse, quero entender como funciona o acompanhamento" },
      { id: "c", label: "Só quero conteúdo gratuito por enquanto" },
    ],
    cta: "Continuar",
  },
  // Tela 10
  {
    index: 9,
    kind: "question",
    title: "Última pergunta — e talvez a mais importante:",
    body:
      "Se existisse um plano feito sob medida pra onde você está hoje, organizando seu dinheiro pra que sobre o que precisa — com destino, virando os projetos de vida que você vem adiando — você daria esse passo agora?",
    stageKey: "commit3",
    options: [
      { id: "a", label: "Sim. Cansei de girar em falso. Quero um plano de verdade" },
      { id: "b", label: "Sim, quero pelo menos conversar e entender como funciona" },
    ],
    cta: "Quero dar esse passo",
  },
  // Tela 11
  {
    index: 10,
    kind: "cta",
    title: "Pronto. Seu Mapa do Dinheiro vai direto pro Danilo.",
    body:
      "O Danilo Mello é planejador financeiro e já ajudou pessoas em todos esses pontos do mapa — do “não sei pra onde vai meu dinheiro” até “sobra, mas não vira nada” — a assumir o controle e transformar renda em patrimônio e projetos realizados.",
    cta: "Falar com o Danilo agora",
  },
];

export const DIAGNOSIS: Record<Stage, { headline: string; body: string }> = {
  E1: {
    headline: "No escuro",
    body:
      "Você está no escuro — e isso não é sobre ganhar pouco, é sobre não enxergar. Seu dinheiro entra e sai sem deixar rastro, então toda decisão é no susto. A boa notícia: esse é o ponto que mais rápido muda. No instante em que você passa a enxergar pra onde o dinheiro vai, a sobra aparece onde antes parecia não existir. O que falta não é renda. É o primeiro mapa.",
  },
  E2: {
    headline: "Refém do hábito",
    body:
      "Você é refém do hábito. Sua renda daria conta — mas os hábitos de consumo consomem o dinheiro antes dele ter chance de virar algo. Isso não te faz irresponsável; te faz humano sem um sistema. Força de vontade sozinha sempre falha. O que vira esse jogo é estrutura: um plano que trabalha a seu favor em vez de depender de você resistir todo dia.",
  },
  E3: {
    headline: "Quase lá",
    body:
      "Você está quase lá. Já sobra alguma coisa — o mais difícil você já faz. Mas sem um planejamento, essa sobra escorre pelos dedos e você recomeça do zero todo mês. É frustrante justamente porque você está perto. Falta pouco: dar destino e estrutura ao que já sobra, pra ele parar de evaporar e começar a se acumular.",
  },
  E4: {
    headline: "Sobra sem rumo",
    body:
      "Sua sobra está sem rumo. Você faz tudo certo: ganha bem, guarda. Mas o dinheiro fica parado ou mal aplicado, sem estar amarrado a nenhum projeto — então não cresce com propósito e você sente que anda em círculos mesmo acumulando. Não falta disciplina. Falta estratégia e um destino claro pra esse dinheiro.",
  },
};

export const DIAGNOSIS_CLOSING =
  "Esse é o diagnóstico — onde você está no mapa. Mas saber onde você está não te tira do lugar. O que transforma é o plano certo pro seu ponto — e colocá-lo em prática com acompanhamento.";
