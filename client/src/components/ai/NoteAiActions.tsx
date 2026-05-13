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
import { Tooltip } from "../common/Tooltip";
import { AiFloatingTextCard } from "../common/AiFlotingTextCard";
import { AiFloatingTagsCard } from "../common/AiFlotingTagsCard";

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
    <section className="mt-6  rounded-4xl border-4 border-[#1F1F1F] bg-[#FFF9EF] shadow-[6px_6px_0_#EFA0A5]">
      <div className="flex items-center justify-between gap-4 rounded-t-4xl  border-b-4 border-[#1F1F1F] bg-[#F4EBDD] px-5 py-4">
        <div className="">
          <div className="flex items-center gap-2">
            <div>
              <span className="grid h-10 w-10 place-items-center rounded-full border-4 border-[#1F1F1F] bg-[#A8D5BA] shadow-[3px_3px_0_#1F1F1F]">
                <LuSparkles className="h-5 w-5" />
              </span>
            </div>

            <div>
              <p className="text-xl font-black text-[#1F1F1F]">AI Tools</p>
              <p className="text-sm font-bold text-[#1F1F1F]/60">
                Improve this note with one click
              </p>
            </div>
          </div>
        </div>

        {isBusy && (
          <span className="absolute rounded-full border-4 border-[#1F1F1F] bg-white px-3 py-1 text-sm font-black shadow-[2px_2px_0_#1F1F1F]">
            Working...
          </span>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Tooltip content="Create a short note summary">
            <div>
              <span className=" grid h-11 w-11 place-items-center rounded-full border-4 border-[#1F1F1F] bg-white">
                <MdOutlineSummarize
                  onClick={() => summarizeMutation.mutate(noteId)}
                  className="h-6 w-6 cursor-pointer"
                />
              </span>
            </div>
          </Tooltip>

          <div className="relative">
            <Tooltip content="Generate a better title">
              <span className="mb-3 grid h-11 w-11 place-items-center rounded-full border-4 border-[#1F1F1F] bg-white">
                <LuFileText
                  onClick={async () => {
                    const result =
                      await generateTitleMutation.mutateAsync(noteId);

                    setGeneratedTitle(result.title);
                  }}
                  className="h-6 w-6 cursor-pointer"
                />
              </span>
            </Tooltip>

            {generatedTitle && (
              <AiFloatingTextCard
                title="Suggested title"
                value={generatedTitle}
                confirmText="Apply Title"
                isLoading={updateNoteMutation.isPending}
                onConfirm={async () => {
                  await updateNoteMutation.mutateAsync({
                    id: noteId,
                    input: {
                      title: generatedTitle,
                    },
                  });

                  setGeneratedTitle(null);
                }}
                onCancel={() => setGeneratedTitle(null)}
              />
            )}
          </div>

          <div className="relative">
            <Tooltip content="Suggest relevant tags">
              <span className="mb-3 grid h-11 w-11 place-items-center rounded-full border-4 border-[#1F1F1F] bg-[#FFF9EF]">
                <FaCode
                  onClick={async () => {
                    const result =
                      await suggestTagsMutation.mutateAsync(noteId);
                    setSuggestedTags(result.tags);
                  }}
                  className="h-6 w-6 cursor-pointer"
                />
              </span>
            </Tooltip>

            {suggestedTags.length > 0 && (
              <AiFloatingTagsCard
                tags={suggestedTags}
                isLoading={isBusy}
                onConfirm={async () => {
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
                onCancel={() => setSuggestedTags([])}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
