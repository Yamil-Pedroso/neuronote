import { useDeleteTag, useTags } from "../../lib/hooks/useTags";

export function TagsList() {
  const { data } = useTags();

  const { mutateAsync } = useDeleteTag();

  return (
    <div className="flex flex-wrap gap-4">
      {data?.map((tag) => (
        <div
          key={tag.id}
          className="flex items-center gap-3 rounded-full border-4 border-[#1F1F1F] px-5 py-3 shadow-[4px_4px_0_#1F1F1F]"
          style={{
            backgroundColor: tag.color || "#FFF9EF",
          }}
        >
          <span className="text-2xl font-bold">#{tag.name}</span>

          <button onClick={() => mutateAsync(tag.id)} className="text-xl">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
