import { useState } from "react";

import { useCreateNote } from "../../lib/hooks/useNotes";

export function CreateNoteForm() {
  const { mutateAsync, isPending } = useCreateNote();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content) return;

    await mutateAsync({
      title,
      content,
    });

    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border-4 border-[#1F1F1F] bg-[#FFF9EF] p-6 shadow-[8px_8px_0_#EFA0A5]"
    >
      <h2 className="text-4xl font-bold">Create Note</h2>

      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-2xl border-4 border-[#1F1F1F] bg-white px-5 py-3 text-2xl outline-none"
      />

      <textarea
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[180px] w-full rounded-2xl border-4 border-[#1F1F1F] bg-white px-5 py-3 text-2xl outline-none"
      />

      <button
        type="submit"
        disabled={isPending}
        className="rounded-2xl border-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-3 text-2xl font-bold shadow-[5px_5px_0_#1F1F1F]"
      >
        {isPending ? "Creating..." : "Create Note"}
      </button>
    </form>
  );
}
