// ======================================================================
// MAPA DO DINHEIRO — Configurações editáveis
// ======================================================================

// WhatsApp (cliente informou "+55 31 9572-8877" — assumido 9 extra do celular)
export const WHATSAPP_NUMBER = "5531995728877";

// Duração padrão da tela de transição entre telas (ms)
export const TRANSITION_MS_DEFAULT = 4000;

// Overrides por transição (origem->destino). Use índice da tela (0-based).
// Se não houver override, usa TRANSITION_MS_DEFAULT.
export const TRANSITION_MS_BY_STEP: Record<string, number> = {
  // "0-1": 4000,
};

// Microfrases do loading por tela de destino (índice 0-based)
export const LOADING_MESSAGES: string[] = [
  "Abrindo seu Mapa do Dinheiro...",   // -> tela 1
  "Lendo sua resposta...",             // -> tela 2
  "Localizando você no mapa...",       // -> tela 3
  "Entendendo o que te trava...",      // -> tela 4
  "Marcando seu ponto no mapa...",     // -> tela 5
  "Analisando sua trajetória...",      // -> tela 6
  "Projetando seus próximos 5 anos...",// -> tela 7
  "Montando seu diagnóstico...",       // -> tela 8
  "Preparando o próximo passo...",     // -> tela 9
  "Traçando sua rota de saída...",     // -> tela 10
  "Direcionando ao Danilo...",         // -> tela 11
];

// Paleta (ajustável). Fonte de verdade em tailwind.config.js e index.css.
export const PALETTE = {
  ink: "#0E1116",
  inkDeep: "#0B0E13",
  bone: "#F4F1EA",
  gold: "#C9A86A",
  goldSoft: "#E4C590",
};

// Foto do Danilo (Cloudinary)
export const DANILO_PHOTO =
  "https://res.cloudinary.com/def9lnal7/image/upload/v1791996494/Retrato_em_escrito%CC%81rio_executivo_brasileiro_zsazbl.png";

// Estágios
export type Stage = "E1" | "E2" | "E3" | "E4";

export const STAGE_LABELS: Record<Stage, string> = {
  E1: "No escuro",
  E2: "Refém do hábito",
  E3: "Quase lá",
  E4: "Sobra sem rumo",
};

// Depoimentos — prints + textos transcritos, com mapeamento ao estágio
export type Testimonial = {
  id: string;
  name: string;
  stageHint: Stage[];
  print: string;
  quote: string;
  featured: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "jean-marcelo",
    name: "Jean Marcelo",
    stageHint: ["E4", "E2"],
    print:
      "https://res.cloudinary.com/def9lnal7/image/upload/v1791997216/Captura_de_Tela_2026-10-14_a%CC%80s_13.58.50_ojddis.png",
    quote:
      "Irmão, quero te fazer um agradecimento... antes da sua mentoria eu estava perdido e com medo de investir errado. Depois do seu acompanhamento consegui organizar tudo e hoje invisto com muito mais segurança e confiança. Seu trabalho fez muita diferença pra mim, obrigado!",
    featured: true,
  },
  {
    id: "rodrigo-almeida",
    name: "Rodrigo Almeida",
    stageHint: ["E1"],
    print:
      "https://res.cloudinary.com/def9lnal7/image/upload/v1791997215/Captura_de_Tela_2026-10-14_a%CC%80s_13.57.50_jnxjzj.png",
    quote:
      "Só tenho a agradecer ao Danilo pelo excelente trabalho. Após a consultoria, tudo ficou mais claro e organizado. Hoje, sabemos exatamente quanto ganhamos e gastamos. Sou muito grato por todo o acompanhamento. Clareza e ensinamentos que fazem a diferença!",
    featured: true,
  },
  {
    id: "cliente-reserva",
    name: "Cliente do Danilo",
    stageHint: ["E1", "E2", "E3"],
    print:
      "https://res.cloudinary.com/def9lnal7/image/upload/v1791997215/Captura_de_Tela_2026-10-14_a%CC%80s_13.58.31_s4wg9h.png",
    quote:
      "Danilo, passando aqui para te agradecer por tudo que você me ensinou. Eu aprendi a administrar melhor o meu dinheiro, a fazer escolhas melhores e a entender onde investir melhor. Hoje tenho uma reserva financeira e colho muitos frutos de tudo aquilo que aprendi com você e coloquei em prática. No início eu não acreditava que conseguiria, mas hoje sei que posso. Muito obrigada por tudo!",
    featured: true,
  },
  {
    id: "elaine-ramos",
    name: "Elaine Ramos",
    stageHint: ["E1", "E3"],
    print:
      "https://res.cloudinary.com/def9lnal7/image/upload/v1791997215/Captura_de_Tela_2026-10-14_a%CC%80s_13.59.04_caory5.png",
    quote:
      "Quando comecei o curso de Planejamento Financeiro com o Danilo, eu cheguei sem saber praticamente nada sobre organização financeira. Não sabia como administrar meu dinheiro da melhor forma, não entendia sobre investimentos. Eu entrei buscando conhecimento financeiro, mas saí com algo muito maior.",
    featured: false,
  },
  {
    id: "planejamento-solto",
    name: "Cliente do Danilo",
    stageHint: ["E3", "E4"],
    print:
      "https://res.cloudinary.com/def9lnal7/image/upload/v1791997215/Captura_de_Tela_2026-10-14_a%CC%80s_13.58.13_urytib.png",
    quote:
      "Com certeza a mentoria abriu minha mente para enxergar minha falta de planejamento. Me ensinou a poupar, eleger prioridades e entender o que eu realmente quero para meu futuro. Hoje consigo tomar decisões com mais segurança e ainda viver com tranquilidade. Na minha vida fez toda diferença.",
    featured: false,
  },
  {
    id: "ricardo-igreja",
    name: "Ricardo",
    stageHint: ["E1", "E2", "E3", "E4"],
    print:
      "https://res.cloudinary.com/def9lnal7/image/upload/v1791997216/Captura_de_Tela_2026-10-14_a%CC%80s_13.59.37_yiugee.png",
    quote:
      "Danilo é um profissional extremamente completo, com elevado nível de competências técnicas, sempre atento às boas práticas do mercado financeiro, que nos possibilita rápido aprendizado e, sobretudo, mudanças comportamentais. Quando fiz o curso com o Danilo, estava vivendo uma desorganização financeira e a mentoria me ensinou os caminhos e como se organizar para viver um planejamento financeiro estruturado.",
    featured: false,
  },
  {
    id: "rodrigo-araujo",
    name: "Rodrigo Araújo",
    stageHint: ["E4"],
    print:
      "https://res.cloudinary.com/def9lnal7/image/upload/v1791997216/Captura_de_Tela_2026-10-14_a%CC%80s_13.59.27_ytwd3w.png",
    quote:
      "Quero relatar sobre a experiência que tenho tido com o Danilo Mello como Planejador Financeiro. Sempre me preocupei com o futuro, porém não tinha conhecimento com as finanças. Não sabia organizar a casa, empreendimento e investimentos. Depois que tive a assessoria do Danilo as finanças foram se tornando melhores e organizadas, com conhecimentos técnicos que trouxe para minha vida familiar e trabalho.",
    featured: false,
  },
];
