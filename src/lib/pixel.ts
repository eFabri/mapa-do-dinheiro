// Meta Pixel helpers — nunca quebram o fluxo se o fbq não carregar (adblock, rede etc.)

type Fbq = (command: string, event: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

export function track(event: string, params?: Record<string, unknown>) {
  try {
    if (typeof window.fbq === "function") window.fbq("track", event, params);
  } catch {
    // ignora
  }
}

export function trackCustom(event: string, params?: Record<string, unknown>) {
  try {
    if (typeof window.fbq === "function") window.fbq("trackCustom", event, params);
  } catch {
    // ignora
  }
}

export type Qualificacao = "quente" | "morno" | "frio";

export function qualificacao(readiness?: string, commit3?: string): Qualificacao {
  if (readiness === "a" && commit3 === "a") return "quente";
  if (readiness === "c") return "frio";
  return "morno";
}
