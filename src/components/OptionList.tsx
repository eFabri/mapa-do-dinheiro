import { motion } from "framer-motion";
import type { Option } from "../content";

type Props = {
  options: Option[];
  selectedId?: string;
  onSelect: (opt: Option) => void;
};

export default function OptionList({ options, selectedId, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {options.map((opt, i) => {
        const selected = selectedId === opt.id;
        return (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.45, ease: "easeOut" }}
            whileTap={{ scale: 0.985 }}
            className={`option-card ${selected ? "selected" : ""} flex items-start gap-3`}
          >
            <span className="dot mt-0.5" />
            <span className="text-[0.95rem] leading-snug sm:text-[1rem] text-bone-50/95">
              {opt.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
