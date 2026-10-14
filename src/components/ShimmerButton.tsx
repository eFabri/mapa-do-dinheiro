import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

export default function ShimmerButton({
  children,
  onClick,
  disabled,
  as = "button",
  href,
  target,
  rel,
  ...rest
}: Props) {
  const content = (
    <motion.span
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 24 }}
      className="relative z-10 inline-flex items-center justify-center gap-2 font-medium tracking-wide"
    >
      {children}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        className="opacity-70"
        aria-hidden
      >
        <path
          d="M5 12h14M13 5l7 7-7 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );

  const className =
    "shimmer-btn group relative inline-flex items-center justify-center rounded-full px-7 py-4 text-[0.95rem] sm:text-base w-full sm:w-auto min-h-[52px]";

  if (as === "a") {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={className}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {content}
    </button>
  );
}
