/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

import { useCreateNote } from "../../lib/hooks/useNotes";
import { toast } from "sonner";

export function CreateNoteForm() {
  const { mutateAsync, isPending } = useCreateNote();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content) return;

    try {
      await mutateAsync({
        title,
        content,
      });

      setTitle("");
      setContent("");

      toast("Note created", {
        description: "Your new note is ready.",

        className:
          "!bg-[#F3A8A8] !border-4 !border-[#1F1F1F] !text-[#1F1F1F] !rounded-[1.7rem] !shadow-[6px_6px_0_#E48D8D]",

        descriptionClassName: "!text-[#1F1F1F]/70 !font-bold",

        style: {
          fontWeight: "900",
        },
      });
    } catch (error) {
      toast.error("Failed to create note", {
        className:
          "!bg-[#F4EBDD] !border-4 !border-[#1F1F1F] !text-[#1F1F1F] !rounded-[1.7rem] !shadow-[6px_6px_0_#D9C7A8]",
      });
    }
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
