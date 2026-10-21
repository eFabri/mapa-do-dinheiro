import { motion } from "framer-motion";
import Compass from "./Compass";

type Props = { message: string };

/**
 * Loader único de transição: a bússola da marca em modo "calibrando"
 * + a microfrase da tela. O App controla o tempo real pelo setTimeout
 * de TRANSITION_MS.
 */
export default function Loading({ message }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
    >
      <Compass size={150} mode="calibrating" />

      <motion.p
        key={message}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 text-bone-100/80 text-[0.78rem] tracking-[0.22em] uppercase text-center"
      >
        {message}
      </motion.p>

      <div className="mt-4 w-28 h-px gold-hairline" />
    </motion.div>
  );
}
