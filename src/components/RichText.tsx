import type { ReactNode } from "react";

type Props = { text: string; className?: string; highlightClassName?: string };

/**
 * Texto corrido com respiro entre parágrafos.
 * - "\n\n" separa parágrafos (cada um vira um <p> com espaçamento)
 * - "**trecho**" vira destaque em degradê dourado
 */
export default function RichText({ text, className = "", highlightClassName = "text-gradient-gold font-semibold" }: Props) {
  const paragraphs = text.split(/\n{2,}/);
  return (
    <div className={`space-y-4 ${className}`}>
      {paragraphs.map((p, i) => (
        <p key={i} className="whitespace-pre-line">
          {renderInline(p, highlightClassName)}
        </p>
      ))}
    </div>
  );
}

function renderInline(text: string, highlightClassName: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <span key={i} className={highlightClassName}>
        {part.slice(2, -2)}
      </span>
    ) : (
      part
    )
  );
}
