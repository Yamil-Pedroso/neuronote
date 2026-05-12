import { useState } from "react";

import { useCreateTag } from "../../lib/hooks/useTags";

const colors = ["#F3A8A8", "#A8D5BA", "#FFD966", "#AFCBFF", "#D9B8FF"];

export function CreateTagForm() {
  const { mutateAsync, isPending } = useCreateTag();

  const [name, setName] = useState("");

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return;

    await mutateAsync({
      name,
      color: selectedColor,
    });

    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border-4 border-[#1F1F1F] bg-[#FFF9EF] p-6 shadow-[8px_8px_0_#EFA0A5]"
    >
      <h2 className="text-4xl font-bold">Create Tag</h2>

      <input
        type="text"
        placeholder="Tag name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-5 w-full rounded-2xl border-4 border-[#1F1F1F] bg-white px-5 py-3 text-2xl outline-none"
      />

      <div className="mt-5 flex gap-3">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setSelectedColor(color)}
            className={`h-12 w-12 rounded-full border-4 ${
              selectedColor === color
                ? "border-[#1F1F1F]"
                : "border-transparent"
            }`}
            style={{
              backgroundColor: color,
            }}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-6 rounded-2xl border-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-3 text-2xl font-bold shadow-[5px_5px_0_#1F1F1F]"
      >
        {isPending ? "Creating..." : "Create Tag"}
      </button>
    </form>
  );
}
