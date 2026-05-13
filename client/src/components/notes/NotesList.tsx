import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  useDeleteNote,
  useNotes,
  useArchiveNote,
  useUnarchiveNote,
} from "../../lib/hooks/useNotes";

import {
  useAttachTagToNote,
  useRemoveTagFromNote,
  useTags,
} from "../../lib/hooks/useTags";

import { NoteAiActions } from "../ai/NoteAiActions";
import { EditNoteDrawer } from "./EditNoteDrawer";

type ArchiveFilter = "active" | "archived" | "all";

export function NotesList() {
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [archiveFilter, setArchiveFilter] = useState<ArchiveFilter>("active");

  const { data: notes = [], isLoading } = useNotes();

  const { data: tags = [] } = useTags();

  const { mutateAsync: deleteNote } = useDeleteNote();

  const { mutateAsync: attachTag } = useAttachTagToNote();

  const { mutateAsync: removeTag } = useRemoveTagFromNote();

  const { mutateAsync: archiveNote } = useArchiveNote();

  const { mutateAsync: unarchiveNote } = useUnarchiveNote();

  const filteredNotes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return notes.filter((note) => {
      const matchesArchiveFilter =
        archiveFilter === "all" ||
        (archiveFilter === "active" && !note.is_archived) ||
        (archiveFilter === "archived" && note.is_archived);

      const title = note.title.toLowerCase();

      const content = note.content.toLowerCase();

      const summary = note.summary?.toLowerCase() || "";

      const matchesSearch =
        !normalizedSearch ||
        title.includes(normalizedSearch) ||
        content.includes(normalizedSearch) ||
        summary.includes(normalizedSearch);

      return matchesArchiveFilter && matchesSearch;
    });
  }, [notes, searchTerm, archiveFilter]);

  if (isLoading) {
    return <p className="text-xl font-black">Loading notes...</p>;
  }

  return (
    <div className="space-y-5">
      <div className="rounded-4xl border-4 border-[#1F1F1F] bg-[#F4EBDD] p-5 shadow-[5px_5px_0_#EFA0A5]">
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search notes..."
          className="w-full rounded-3xl border-4 border-[#1F1F1F] bg-white px-5 py-4 text-lg font-black outline-none shadow-[4px_4px_0_#1F1F1F]"
        />

        <div className="mt-4 flex flex-wrap gap-3">
          {(["active", "archived", "all"] as ArchiveFilter[]).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setArchiveFilter(filter)}
              className={`rounded-full border-4 border-[#1F1F1F] px-4 py-2 text-sm font-black shadow-[3px_3px_0_#1F1F1F] transition hover:-translate-y-1 ${
                archiveFilter === filter
                  ? "bg-[#A8D5BA]"
                  : "bg-white opacity-70"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        {filteredNotes.map((note) => {
          const availableTags = tags.filter(
            (tag) => !note.tags?.some((noteTag) => noteTag.id === tag.id),
          );

          const isEditing = editingNoteId === note.id;

          return (
            <article
              key={note.id}
              className={`rounded-[2rem] border-4 border-[#1F1F1F] bg-[#FFF9EF] p-5 shadow-[6px_6px_0_#A8D5BA] ${
                note.is_archived ? "opacity-70" : ""
              }`}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full border-4 border-[#1F1F1F] bg-[#A8D5BA] px-3 py-1 text-xs font-black shadow-[2px_2px_0_#1F1F1F]">
                    NOTE
                  </span>

                  {note.is_archived && (
                    <span className="rounded-full border-4 border-[#1F1F1F] bg-[#F3A8A8] px-3 py-1 text-xs font-black shadow-[2px_2px_0_#1F1F1F]">
                      ARCHIVED
                    </span>
                  )}
                </div>

                <p className="text-xs font-black opacity-60">
                  {new Date(note.updated_at).toLocaleDateString()}
                </p>
              </div>

              <h3 className="break-words text-2xl font-black leading-tight">
                {note.title}
              </h3>

              <div className="prose prose-base mt-4 max-h-[220px] max-w-none overflow-y-auto break-words rounded-3xl border-4 border-[#1F1F1F] bg-white p-4 prose-headings:font-black prose-p:leading-7 prose-strong:text-[#1F1F1F] prose-code:rounded prose-code:bg-[#F4EBDD] prose-code:px-2 prose-code:py-1 prose-code:text-[#1F1F1F] prose-pre:border-4 prose-pre:border-[#1F1F1F] prose-pre:bg-[#1F1F1F] prose-pre:shadow-[4px_4px_0_#A8D5BA]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {note.content}
                </ReactMarkdown>
              </div>

              {note.summary && (
                <details className="mt-5 rounded-3xl border-4 border-[#1F1F1F] bg-[#F3A8A8] p-4">
                  <summary className="cursor-pointer text-lg font-black">
                    AI Summary
                  </summary>

                  <p className="mt-3 text-base leading-7">{note.summary}</p>
                </details>
              )}

              {!note.is_archived && (
                <details className="mt-5">
                  <summary className="cursor-pointer rounded-2xl border-4 border-[#1F1F1F] bg-[#A8D5BA] px-4 py-3 text-lg font-black shadow-[3px_3px_0_#1F1F1F]">
                    AI Tools
                  </summary>

                  <div className="mt-4">
                    <NoteAiActions noteId={note.id} />
                  </div>
                </details>
              )}

              {note.tags && note.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      disabled={note.is_archived}
                      onClick={() =>
                        removeTag({
                          noteId: note.id,
                          tagId: tag.id,
                        })
                      }
                      className="rounded-full border-4 border-[#1F1F1F] px-3 py-1 text-sm font-black shadow-[2px_2px_0_#1F1F1F]"
                      style={{
                        backgroundColor: tag.color,
                      }}
                    >
                      #{tag.name}
                    </button>
                  ))}
                </div>
              )}

              {!note.is_archived && availableTags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() =>
                        attachTag({
                          noteId: note.id,
                          tagId: tag.id,
                        })
                      }
                      className={`bg-[${tag.color}] rounded-full border-4 border-dashed border-[#1F1F1F] px-3 py-1 text-sm font-black opacity-80 transition hover:-translate-y-1`}
                    >
                      + {tag.name}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap justify-center gap-2 border-t-4 border-dashed border-[#1F1F1F] pt-4">
                <Link
                  to="/notes/$noteId"
                  params={{ noteId: note.id }}
                  className="rounded-2xl border-4 border-[#1F1F1F] bg-white px-3 py-2 text-sm font-black shadow-[3px_3px_0_#1F1F1F]"
                >
                  Open
                </Link>

                {!note.is_archived && (
                  <button
                    type="button"
                    onClick={() => setEditingNoteId(note.id)}
                    className="rounded-2xl border-4 border-[#1F1F1F] bg-[#A8D5BA] px-3 py-2 text-sm font-black shadow-[3px_3px_0_#1F1F1F]"
                  >
                    Edit
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    note.is_archived
                      ? unarchiveNote(note.id)
                      : archiveNote(note.id)
                  }
                  className={`rounded-2xl border-4 border-[#1F1F1F] px-3 py-2 text-sm font-black shadow-[3px_3px_0_#1F1F1F] transition hover:-translate-y-1 ${
                    note.is_archived ? "bg-[#A8D5BA]" : "bg-white"
                  }`}
                >
                  {note.is_archived ? "Unarchive" : "Archive"}
                </button>

                <button
                  type="button"
                  onClick={() => deleteNote(note.id)}
                  className="rounded-2xl border-4 border-[#1F1F1F] bg-[#F3A8A8] px-3 py-2 text-sm font-black shadow-[3px_3px_0_#1F1F1F]"
                >
                  Delete
                </button>
              </div>

              <EditNoteDrawer
                key={note.id}
                note={note}
                isOpen={isEditing}
                onClose={() => setEditingNoteId(null)}
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}
