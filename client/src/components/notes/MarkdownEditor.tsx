import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");

  return (
    <div className="overflow-hidden rounded-3xl border-4 border-[#1F1F1F] bg-white shadow-[4px_4px_0_#1F1F1F]">
      <div className="flex border-b-4 border-[#1F1F1F] bg-[#F4EBDD]">
        <button
          type="button"
          onClick={() => setMode("write")}
          className={`border-r-4 border-[#1F1F1F] px-5 py-3 text-lg font-black ${
            mode === "write" ? "bg-[#A8D5BA]" : "bg-white"
          }`}
        >
          Write
        </button>

        <button
          type="button"
          onClick={() => setMode("preview")}
          className={`px-5 py-3 text-lg font-black ${
            mode === "preview" ? "bg-[#F3A8A8]" : "bg-white"
          }`}
        >
          Preview
        </button>
      </div>

      {mode === "write" ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-[360px] w-full resize-none bg-white px-5 py-4 text-xl leading-8 outline-none"
          placeholder="Write your note with Markdown..."
        />
      ) : (
        <div className="prose prose-xl min-h-[360px] max-w-none px-5 py-4 prose-headings:font-black prose-code:rounded prose-code:bg-[#F4EBDD] prose-code:px-2 prose-code:py-1 prose-pre:border-4 prose-pre:border-[#1F1F1F] prose-pre:bg-[#1F1F1F] prose-pre:shadow-[4px_4px_0_#A8D5BA]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {value || "_Nothing to preview yet._"}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
