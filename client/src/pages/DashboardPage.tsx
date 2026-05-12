import { useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";

import { useAuth } from "../lib/hooks/useAuth";
import { useNotes, useNotesStats } from "../lib/hooks/useNotes";

import { AvatarUploader } from "../components/AvatarUploader";
import { CreateTagForm } from "../components/tags/CreateTagForm";
import { TagsList } from "../components/tags/TagsList";
import { CreateNoteForm } from "../components/notes/CreateNoteForm";
import { NotesList } from "../components/notes/NotesList";
import { SemanticSearchBox } from "../components/search/SemanticSearchBox";

import assets from "../assets/images";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
} as const;

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const;

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data: notes } = useNotes();
  const { totalNotes, summarizedNotes, archivedNotes } = useNotesStats();

  const welcomeMessage = useMemo(() => {
    if (!user) return "Welcome";

    const hasLoggedBefore = localStorage.getItem(`hasLoggedBefore_${user.id}`);

    return hasLoggedBefore ? "Welcome back" : "Welcome";
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const key = `hasLoggedBefore_${user.id}`;
    const hasLoggedBefore = localStorage.getItem(key);

    if (!hasLoggedBefore) {
      localStorage.setItem(key, "true");
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full bg-[#F4EBDD] text-[#1F1F1F]"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid min-h-screen w-full grid-cols-1 gap-6 p-6 2xl:grid-cols-[360px_1fr]"
      >
        <aside className="flex flex-col gap-6">
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="rounded-4xl border-4 border-[#1F1F1F] bg-[#FFF9EF] p-6 shadow-[10px_10px_0_#A8D5BA]"
          >
            <motion.div
              initial={{ rotate: -2, scale: 0.95 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-4xl bg-[#F3A8A8] p-3"
            >
              <AvatarUploader />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-6 text-center text-5xl font-bold"
            >
              {user?.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-3 text-center text-2xl text-[#6FA98B]"
            >
              NeuroNote Workspace
            </motion.p>

            <motion.button
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
              className="mt-8 w-full rounded-4xl border-4 border-[#1F1F1F] bg-[#F3A8A8] px-5 py-3 text-2xl font-bold shadow-[5px_5px_0_#1F1F1F]"
            >
              Logout
            </motion.button>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="rounded-4xl border-4 border-[#1F1F1F] bg-[#FFF9EF] p-6 shadow-[10px_10px_0_#EFA0A5]"
          >
            <h2 className="text-4xl font-bold">Statistics</h2>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                className="rounded-4xl border-4 border-[#1F1F1F] bg-[#A8D5BA] p-4"
              >
                <p className="text-2xl font-bold">Total Notes</p>
                <p className="text-5xl">{totalNotes}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="rounded-4xl border-4 border-[#1F1F1F] bg-[#F3A8A8] p-4"
              >
                <p className="text-2xl font-bold">AI Summaries</p>
                <p className="text-5xl">{summarizedNotes}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                className="rounded-4xl border-4 border-[#1F1F1F] bg-white p-4"
              >
                <p className="text-2xl font-bold">Archived</p>
                <p className="text-5xl">{archivedNotes}</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="rounded-4xl border-4 border-[#1F1F1F] bg-[#FFF9EF] p-6 shadow-[10px_10px_0_#A8D5BA]"
          >
            <h2 className="text-4xl font-bold">Tags</h2>

            <div className="mt-6">
              <TagsList />
            </div>

            <div className="mt-6">
              <CreateTagForm />
            </div>
          </motion.div>
        </aside>

        <main className="flex min-w-0 flex-col gap-6">
          <motion.section
            variants={cardVariants}
            className="overflow-hidden rounded-4xl border-4 border-[#1F1F1F] bg-[#FFF9EF] shadow-[10px_10px_0_#EFA0A5]"
          >
            <header className="flex items-center gap-3 border-b-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-4">
              <span className="text-3xl">×</span>
              <span className="text-3xl">−</span>
              <span className="text-3xl">□</span>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-5 rounded-full border-4 border-[#1F1F1F] bg-[#FFF9EF]"
              />
            </header>

            <div className="bg-[linear-gradient(#E8DED2_1px,transparent_1px),linear-gradient(90deg,#E8DED2_1px,transparent_1px)] bg-size-[28px_28px] p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="flex items-center text-6xl font-bold"
              >
                <p>{welcomeMessage}</p>

                <motion.div
                  animate={{ rotate: [0, -8, 8, -4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 4,
                  }}
                >
                  <img
                    src={assets.sunFlower}
                    alt="Sunflower Icon"
                    className="ml-2.5 mt-2 h-14 w-14 object-contain saturate-80"
                  />
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-5 max-w-5xl text-3xl leading-10"
              >
                Organize your thoughts, generate AI summaries, connect tags and
                build your personal knowledge universe.
              </motion.p>
            </div>
          </motion.section>

          <div className="grid w-full items-start gap-6 xl:grid-cols-[460px_1fr]">
            <motion.div
              variants={cardVariants}
              className="self-start xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:overflow-y-auto xl:pr-2"
            >
              <CreateNoteForm />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.7,
                  duration: 0.7,
                }}
                className="mt-6"
              >
                <SemanticSearchBox />
              </motion.div>
            </motion.div>

            <motion.section
              variants={cardVariants}
              className="min-w-0 rounded-4xl border-4 border-[#1F1F1F] bg-[#FFF9EF] p-6 shadow-[10px_10px_0_#A8D5BA]"
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-5xl font-bold"
                  >
                    Your Notes
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mt-2 text-2xl"
                  >
                    {notes?.length || 0} notes stored
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ rotate: -2, scale: 1.03 }}
                  className="rounded-full border-4 border-[#1F1F1F] bg-[#F3A8A8] px-5 py-2 text-2xl"
                >
                  AI Powered
                </motion.div>
              </div>

              <NotesList />
            </motion.section>
          </div>
        </main>
      </motion.div>
    </motion.div>
  );
}
