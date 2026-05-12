import { Link, useParams } from "@tanstack/react-router";

import { useNote, useUpdateNote } from "../lib/hooks/useNotes";
import { NoteAiActions } from "../components/ai/NoteAiActions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function NoteDetailsPage() {
  const { noteId } = useParams({ from: "/notes/$noteId" });

  const { data: note, isLoading, isError } = useNote(noteId);
  const { mutateAsync: updateNote, isPending } = useUpdateNote();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4EBDD] p-6 text-[#1F1F1F]">
        <p className="text-3xl font-black">Loading note...</p>
      </div>
    );
  }

  if (isError || !note) {
    return (
      <div className="min-h-screen bg-[#F4EBDD] p-6 text-[#1F1F1F]">
        <div className="rounded-4xl border-4 border-[#1F1F1F] bg-[#FFF9EF] p-8 shadow-[8px_8px_0_#F3A8A8]">
          <p className="text-4xl font-black">Note not found</p>

          <Link
            to="/dashboard"
            className="mt-6 inline-block rounded-full border-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-3 text-xl font-black shadow-[4px_4px_0_#1F1F1F]"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EBDD] p-6 text-[#1F1F1F]">
      <main className="mx-auto grid max-w-6xl gap-6">
        <section className="overflow-hidden rounded-4xl border-4 border-[#1F1F1F] bg-[#FFF9EF] shadow-[10px_10px_0_#A8D5BA]">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">×</span>
              <span className="text-3xl">−</span>
              <span className="text-3xl">□</span>
            </div>

            <Link
              to="/dashboard"
              className="rounded-full border-4 border-[#1F1F1F] bg-white px-5 py-2 text-lg font-black shadow-[3px_3px_0_#1F1F1F] transition hover:-translate-y-1"
            >
              Back
            </Link>
          </header>

          <div className="bg-[linear-gradient(#E8DED2_1px,transparent_1px),linear-gradient(90deg,#E8DED2_1px,transparent_1px)] bg-size-[28px_28px] p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="mb-4 flex flex-wrap gap-3">
                  {note.is_archived && (
                    <span className="rounded-full border-4 border-[#1F1F1F] bg-[#F3A8A8] px-4 py-1 text-sm font-black shadow-[2px_2px_0_#1F1F1F]">
                      Archived
                    </span>
                  )}

                  {note.tags?.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full border-4 border-[#1F1F1F] px-4 py-1 text-sm font-black shadow-[2px_2px_0_#1F1F1F]"
                      style={{ backgroundColor: tag.color }}
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>

                <h1 className="break-words text-6xl font-black leading-tight">
                  {note.title}
                </h1>

                <p className="mt-4 text-xl font-bold text-[#1F1F1F]/60">
                  Personal knowledge note
                </p>
              </div>

              <button
                type="button"
                disabled={isPending}
                onClick={() =>
                  updateNote({
                    id: note.id,
                    input: {
                      is_archived: !note.is_archived,
                    },
                  })
                }
                className="rounded-2xl border-4 border-[#1F1F1F] bg-white px-5 py-3 text-xl font-black shadow-[4px_4px_0_#1F1F1F] transition hover:-translate-y-1 disabled:opacity-50"
              >
                {note.is_archived ? "Unarchive" : "Archive"}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-4xl border-4 border-[#1F1F1F] bg-[#FFF9EF] p-8 shadow-[10px_10px_0_#EFA0A5]">
          <div className="prose prose-xl max-w-none break-words prose-headings:font-black prose-strong:text-[#1F1F1F] prose-code:rounded prose-code:bg-[#F4EBDD] prose-code:px-2 prose-code:py-1 prose-code:text-[#1F1F1F] prose-pre:border-4 prose-pre:border-[#1F1F1F] prose-pre:bg-[#1F1F1F] prose-pre:shadow-[4px_4px_0_#A8D5BA]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {note.content}
            </ReactMarkdown>
          </div>
        </section>

        {note.summary && (
          <section className="rounded-4xl border-4 border-[#1F1F1F] bg-[#F3A8A8] p-8 shadow-[10px_10px_0_#1F1F1F]">
            <p className="text-3xl font-black">AI Summary</p>

            <p className="mt-4 whitespace-pre-wrap break-words text-2xl leading-10">
              {note.summary}
            </p>
          </section>
        )}

        {!note.is_archived && <NoteAiActions noteId={note.id} />}
      </main>
    </div>
  );
}
