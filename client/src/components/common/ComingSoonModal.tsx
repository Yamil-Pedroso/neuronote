import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LuSparkles, LuX } from "react-icons/lu";

export function ComingSoonModal() {
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem("neuronote_welcome_modal_seen") !== "true";
  });

  const handleClose = () => {
    localStorage.setItem("neuronote_welcome_modal_seen", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] grid place-items-center bg-[#1F1F1F]/50 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94, rotate: -1 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl rounded-[2rem] border-4 border-[#1F1F1F] bg-[#FFF9EF] p-6 text-[#1F1F1F] shadow-[10px_10px_0_#A8D5BA]"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border-4 border-[#1F1F1F] bg-[#F3A8A8] shadow-[3px_3px_0_#1F1F1F] transition hover:-translate-y-1"
            >
              <LuX className="h-5 w-5" />
            </button>

            <div className="mb-5 flex items-center gap-3 pr-12">
              <span className="grid h-14 w-14 place-items-center rounded-full border-4 border-[#1F1F1F] bg-[#A8D5BA] shadow-[4px_4px_0_#1F1F1F]">
                <LuSparkles className="h-7 w-7" />
              </span>

              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#6FA98B]">
                  NeuroNote Preview
                </p>
                <h2 className="text-4xl font-black">
                  You can start playing now
                </h2>
              </div>
            </div>

            <p className="text-xl leading-8">
              NeuroNote is already usable, but it is still growing. You can
              create notes, use AI tools, organize tags, try semantic search and
              explore the current workspace while new features are added. The
              responsive will be improved in the next updates, but for now we
              recommend using it on desktop for the best experience.
            </p>

            <div className="mt-6 rounded-3xl border-4 border-[#1F1F1F] bg-[#F4EBDD] p-5 shadow-[5px_5px_0_#EFA0A5]">
              <p className="mb-4 text-2xl font-black">Coming next</p>

              <div className="grid gap-3">
                {[
                  "Chat with this note",
                  "Global AI Workspace Chat",
                  "n8n Integration",
                  "UI/UX Improvements",
                ].map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-2xl border-4 border-[#1F1F1F] bg-white p-3 shadow-[3px_3px_0_#1F1F1F]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full border-4 border-[#1F1F1F] bg-[#A8D5BA] text-sm font-black">
                      {index + 1}
                    </span>

                    <p className="text-lg font-black">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full border-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-3 text-lg font-black shadow-[4px_4px_0_#1F1F1F] transition hover:-translate-y-1"
              >
                Start exploring
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
