import { motion } from "motion/react";

type AiFloatingCardProps = {
  title: string;
  value: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

export function AiFloatingTextCard({
  title,
  value,
  confirmText = "Apply",
  cancelText = "Dismiss",
  isLoading = false,
  onConfirm,
  onCancel,
}: AiFloatingCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -8,
        scale: 0.92,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        y: -8,
        scale: 0.92,
        filter: "blur(8px)",
      }}
      transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute left-1/2 top-full z-50 mt-4 w-[340px] -translate-x-1/2"
    >
      <div className="relative rounded-[1.5rem] border-4 border-[#1F1F1F] bg-[#F3A8A8] p-4 shadow-[6px_6px_0_#1F1F1F]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1F1F1F]/60">
            {title}
          </p>

          <button
            type="button"
            onClick={onCancel}
            className="grid h-8 w-8 place-items-center rounded-full border-4 border-[#1F1F1F] bg-white text-sm font-black shadow-[2px_2px_0_#1F1F1F] transition hover:-translate-y-0.5"
          >
            ×
          </button>
        </div>

        <div className="rounded-2xl border-4 border-[#1F1F1F] bg-[#FFF9EF] p-4">
          <p className="text-xl font-black leading-tight text-[#1F1F1F]">
            {value}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="rounded-full border-4 border-[#1F1F1F] bg-[#A8D5BA] px-4 py-2 text-sm font-black shadow-[3px_3px_0_#1F1F1F] transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isLoading ? "Applying..." : confirmText}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border-4 border-[#1F1F1F] bg-white px-4 py-2 text-sm font-black shadow-[3px_3px_0_#1F1F1F] transition hover:-translate-y-0.5"
          >
            {cancelText}
          </button>
        </div>

        <span className="absolute bottom-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-[10px] border-b-[10px] border-x-transparent border-b-[#1F1F1F]" />
      </div>
    </motion.div>
  );
}
