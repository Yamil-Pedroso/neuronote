import { Link } from "@tanstack/react-router";
import { RiRobot2Line, RiBrain2Line } from "react-icons/ri";
import { PiBooksBold } from "react-icons/pi";

export function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F4EBDD] text-[#1F1F1F]">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-8 p-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="relative flex flex-col overflow-hidden rounded-4xl border-4 border-[#1F1F1F] bg-[#FFF9EF] shadow-[12px_12px_0_#EFA0A5]">
          <header className="flex items-center gap-3 border-b-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-4">
            <span className="text-3xl">×</span>
            <span className="text-3xl">−</span>
            <span className="text-3xl">□</span>

            <div className="h-5 flex-1 rounded-full border-4 border-[#1F1F1F] bg-[#FFF9EF]" />
          </header>

          <div className="relative flex flex-1 flex-col justify-center bg-[linear-gradient(#E8DED2_1px,transparent_1px),linear-gradient(90deg,#E8DED2_1px,transparent_1px)] bg-size-[28px_28px] p-10">
            <div className="absolute right-8 top-8 rotate-[-8deg] rounded-3xl border-4 border-[#1F1F1F] bg-[#F3A8A8] px-6 py-3 text-2xl shadow-[5px_5px_0_#1F1F1F]">
              AI Workspace
            </div>

            <h1 className="max-w-3xl text-7xl leading-none font-bold lg:text-8xl">
              Neuro
              <br />
              Note
            </h1>

            <p className="mt-8 max-w-2xl text-3xl leading-10">
              A creative AI notebook for your ideas, summaries, tags, learning
              sessions, inspirations and personal knowledge.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <div className="rounded-full border-4 border-[#1F1F1F] bg-[#F3A8A8] px-6 py-3 text-2xl shadow-[4px_4px_0_#1F1F1F]">
                Smart Notes
              </div>

              <div className="rounded-full border-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-3 text-2xl shadow-[4px_4px_0_#1F1F1F]">
                AI Summary
              </div>

              <div className="rounded-full border-4 border-[#1F1F1F] bg-white px-6 py-3 text-2xl shadow-[4px_4px_0_#1F1F1F]">
                Cute Productivity
              </div>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          <div className="rounded-[2rem] border-4 border-[#1F1F1F] bg-[#FFF9EF] shadow-[10px_10px_0_#A8D5BA]">
            <header className="rounded-t-[1.7rem] border-b-4 border-[#1F1F1F] bg-[#F3A8A8] px-6 py-4">
              <h2 className="text-center text-5xl font-bold">Welcome</h2>
            </header>

            <div className="space-y-6 p-8">
              <p className="text-center text-3xl leading-10">
                Organize your thoughts in a more human, calm and artistic way.
              </p>

              <div className="flex flex-col gap-4">
                <Link
                  to="/login"
                  className="rounded-2xl border-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-4 text-center text-3xl font-bold shadow-[6px_6px_0_#1F1F1F] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-2xl border-4 border-[#1F1F1F] bg-[#F3A8A8] px-6 py-4 text-center text-3xl font-bold shadow-[6px_6px_0_#1F1F1F] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border-4 border-[#1F1F1F] bg-[#FFF9EF] shadow-[10px_10px_0_#EFA0A5]">
            <header className="rounded-t-[1.7rem] border-b-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-4">
              <h3 className="text-center text-4xl font-bold">Features</h3>
            </header>

            <div className="space-y-4 p-6 text-2xl">
              <div className="rounded-2xl border-4 border-[#1F1F1F] bg-white px-5 py-4">
                <RiRobot2Line className="inline-block h-6 w-6 mr-2" />
                AI generated summaries
              </div>

              <div className="rounded-2xl border-4 border-[#1F1F1F] bg-[#F3A8A8] px-5 py-4">
                <RiBrain2Line className="inline-block h-6 w-6 mr-2" />
                Smart tags suggestions
              </div>

              <div className="rounded-2xl border-4 border-[#1F1F1F] bg-[#A8D5BA] px-5 py-4">
                <PiBooksBold className="inline-block h-6 w-6 mr-2" />
                Creative knowledge workspace
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
