import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";

import { useUpdateNote } from "../../lib/hooks/useNotes";
import type { Note } from "../../types/note.types";
import { MarkdownEditor } from "./MarkdownEditor";

type EditNoteDrawerProps = {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
};

export function EditNoteDrawer({ note, isOpen, onClose }: EditNoteDrawerProps) {
  const updateNoteMutation = useUpdateNote();

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await updateNoteMutation.mutateAsync({
      id: note.id,
      input: {
        title,
        content,
      },
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed h-[50rem] inset-0 z-50 flex justify-end bg-black/40 p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        aria-label="Close drawer"
      />

      <aside className="relative z-10 flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border-4 border-[#1F1F1F] bg-[#FFF9EF] shadow-[10px_10px_0_#EFA0A5]">
        <header className="flex items-center justify-between border-b-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full border-4 border-[#1F1F1F] bg-white shadow-[3px_3px_0_#1F1F1F]">
              <LuPencil className="h-6 w-6" />
            </span>

            <div>
              <h2 className="text-3xl font-black">Edit Note</h2>
              <p className="text-sm font-bold text-[#1F1F1F]/70">
                Refine your idea
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border-4 border-[#1F1F1F] bg-[#F3A8A8] p-2 shadow-[3px_3px_0_#1F1F1F] transition hover:-translate-y-0.5"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-5 overflow-y-auto bg-[linear-gradient(#E8DED2_1px,transparent_1px),linear-gradient(90deg,#E8DED2_1px,transparent_1px)] bg-size-[28px_28px] p-6"
        >
          <label className="block">
            <span className="mb-2 block text-xl font-black">Title</span>

            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-3xl border-4 border-[#1F1F1F] bg-white px-5 py-4 text-2xl font-bold outline-none shadow-[4px_4px_0_#1F1F1F] focus:bg-[#FFF9EF]"
              placeholder="Note title"
            />
          </label>

          <label className="flex flex-1 flex-col">
            <span className="mb-2 block text-xl font-black">Content</span>

            <MarkdownEditor value={content} onChange={setContent} />
          </label>

          <div className="mt-auto flex flex-wrap justify-end gap-3 border-t-4 border-[#1F1F1F] pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border-4 border-[#1F1F1F] bg-white px-6 py-3 text-xl font-black shadow-[4px_4px_0_#1F1F1F] transition hover:-translate-y-0.5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateNoteMutation.isPending}
              className="rounded-full border-4 border-[#1F1F1F] bg-[#F3A8A8] px-6 py-3 text-xl font-black shadow-[4px_4px_0_#1F1F1F] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateNoteMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
