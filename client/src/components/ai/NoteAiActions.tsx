import { useState } from "react";
import {
  useGenerateTitle,
  useSuggestTags,
  useSummarizeNote,
} from "../../lib/hooks/useAi";
import { useUpdateNote } from "../../lib/hooks/useNotes";
import {
  useCreateTag,
  useTags,
  useAttachTagToNote,
} from "../../lib/hooks/useTags";
import { MdOutlineSummarize } from "react-icons/md";
import { LuFileText, LuSparkles } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";

type NoteAiActionsProps = {
  noteId: string;
};

export function NoteAiActions({ noteId }: NoteAiActionsProps) {
  const summarizeMutation = useSummarizeNote();
  const generateTitleMutation = useGenerateTitle();
  const suggestTagsMutation = useSuggestTags();

  const [generatedTitle, setGeneratedTitle] = useState<string | null>(null);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const updateNoteMutation = useUpdateNote();

  const { data: existingTags = [] } = useTags();
  const { mutateAsync: createTag } = useCreateTag();
  const { mutateAsync: attachTag } = useAttachTagToNote();

  const isBusy =
    summarizeMutation.isPending ||
    generateTitleMutation.isPending ||
    suggestTagsMutation.isPending ||
    updateNoteMutation.isPending;

  return (
    <section className="mt-6 overflow-hidden rounded-[2rem] border-4 border-[#1F1F1F] bg-[#FFF9EF] shadow-[6px_6px_0_#EFA0A5]">
      <div className="flex items-center justify-between gap-4 border-b-4 border-[#1F1F1F] bg-[#F4EBDD] px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full border-4 border-[#1F1F1F] bg-[#A8D5BA] shadow-[3px_3px_0_#1F1F1F]">
              <LuSparkles className="h-5 w-5" />
            </span>

            <div>
              <p className="text-xl font-black text-[#1F1F1F]">AI Tools</p>
              <p className="text-sm font-bold text-[#1F1F1F]/60">
                Improve this note with one click
              </p>
            </div>
          </div>
        </div>

        {isBusy && (
          <span className="rounded-full border-4 border-[#1F1F1F] bg-white px-3 py-1 text-sm font-black shadow-[2px_2px_0_#1F1F1F]">
            Working...
          </span>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <button
            disabled={isBusy}
            onClick={() => summarizeMutation.mutate(noteId)}
            className="group rounded-2xl border-4 border-[#1F1F1F] bg-[#A8D5BA] px-4 py-4 text-left shadow-[4px_4px_0_#1F1F1F] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#1F1F1F] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#1F1F1F]"
          >
            <span className="mb-3 grid h-11 w-11 place-items-center rounded-full border-4 border-[#1F1F1F] bg-white">
              <MdOutlineSummarize className="h-6 w-6" />
            </span>

            <span className="block text-lg font-black">
              {summarizeMutation.isPending ? "Thinking..." : "Summarize"}
            </span>

            <span className="mt-1 block text-sm font-bold text-[#1F1F1F]/70">
              Create a short note summary
            </span>
          </button>

          <button
            disabled={isBusy}
            onClick={async () => {
              const result = await generateTitleMutation.mutateAsync(noteId);
              setGeneratedTitle(result.title);
            }}
            className="group rounded-2xl border-4 border-[#1F1F1F] bg-[#F3A8A8] px-4 py-4 text-left shadow-[4px_4px_0_#1F1F1F] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#1F1F1F] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#1F1F1F]"
          >
            <span className="mb-3 grid h-11 w-11 place-items-center rounded-full border-4 border-[#1F1F1F] bg-white">
              <LuFileText className="h-6 w-6" />
            </span>

            <span className="block text-lg font-black">
              {generateTitleMutation.isPending ? "Generating..." : "Title"}
            </span>

            <span className="mt-1 block text-sm font-bold text-[#1F1F1F]/70">
              Generate a better title
            </span>
          </button>

          <button
            disabled={isBusy}
            onClick={async () => {
              const result = await suggestTagsMutation.mutateAsync(noteId);
              setSuggestedTags(result.tags);
            }}
            className="group rounded-2xl border-4 border-[#1F1F1F] bg-white px-4 py-4 text-left shadow-[4px_4px_0_#1F1F1F] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#1F1F1F] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#1F1F1F]"
          >
            <span className="mb-3 grid h-11 w-11 place-items-center rounded-full border-4 border-[#1F1F1F] bg-[#FFF9EF]">
              <FaCode className="h-6 w-6" />
            </span>

            <span className="block text-lg font-black">
              {suggestTagsMutation.isPending ? "Suggesting..." : "Tags"}
            </span>

            <span className="mt-1 block text-sm font-bold text-[#1F1F1F]/70">
              Find useful tags
            </span>
          </button>
        </div>

        {generatedTitle && (
          <div className="rounded-[1.5rem] border-4 border-[#1F1F1F] bg-[#F3A8A8] p-4 shadow-[4px_4px_0_#1F1F1F]">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#1F1F1F]/60">
              Suggested title
            </p>

            <p className="mt-2 text-2xl font-black leading-tight text-[#1F1F1F]">
              {generatedTitle}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                disabled={updateNoteMutation.isPending}
                onClick={async () => {
                  await updateNoteMutation.mutateAsync({
                    id: noteId,
                    input: {
                      title: generatedTitle,
                    },
                  });

                  setGeneratedTitle(null);
                }}
                className="rounded-full border-4 border-[#1F1F1F] bg-white px-5 py-2 text-sm font-black shadow-[3px_3px_0_#1F1F1F] transition hover:-translate-y-0.5 disabled:opacity-50"
              >
                {updateNoteMutation.isPending ? "Applying..." : "Apply Title"}
              </button>

              <button
                onClick={() => setGeneratedTitle(null)}
                className="rounded-full border-4 border-[#1F1F1F] bg-[#FFF9EF] px-5 py-2 text-sm font-black shadow-[3px_3px_0_#1F1F1F] transition hover:-translate-y-0.5"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {suggestedTags.length > 0 && (
          <div className="rounded-[1.5rem] border-4 border-[#1F1F1F] bg-white p-4 shadow-[4px_4px_0_#1F1F1F]">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#1F1F1F]/60">
              Suggested tags
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border-4 border-[#1F1F1F] bg-[#A8D5BA] px-4 py-2 text-sm font-black shadow-[2px_2px_0_#1F1F1F]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                disabled={isBusy}
                onClick={async () => {
                  for (const tagName of suggestedTags) {
                    const existingTag = existingTags.find(
                      (tag) => tag.name.toLowerCase() === tagName.toLowerCase(),
                    );

                    const tag = existingTag
                      ? existingTag
                      : await createTag({
                          name: tagName,
                          color: "#A8D5BA",
                        });

                    await attachTag({
                      noteId,
                      tagId: tag.id,
                    });
                  }

                  setSuggestedTags([]);
                }}
                className="rounded-full border-4 border-[#1F1F1F] bg-[#A8D5BA] px-5 py-2 text-sm font-black shadow-[3px_3px_0_#1F1F1F] transition hover:-translate-y-0.5 disabled:opacity-50"
              >
                Apply Tags
              </button>

              <button
                onClick={() => setSuggestedTags([])}
                className="rounded-full border-4 border-[#1F1F1F] bg-[#FFF9EF] px-5 py-2 text-sm font-black shadow-[3px_3px_0_#1F1F1F] transition hover:-translate-y-0.5"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
