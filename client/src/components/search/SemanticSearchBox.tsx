import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { LuBrain, LuSearch, LuX } from "react-icons/lu";

import { useSemanticSearch } from "../../lib/hooks/useSearch";

export function SemanticSearchBox() {
  const [query, setQuery] = useState("");

  const semanticSearchMutation = useSemanticSearch();

  const results = semanticSearchMutation.data ?? [];

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    await semanticSearchMutation.mutateAsync({
      query: trimmedQuery,
      limit: 5,
    });
  };

  const handleClear = () => {
    setQuery("");
    semanticSearchMutation.reset();
  };

  return (
    <section className="rounded-4xl border-4 border-[#1F1F1F] bg-[#FFF9EF] p-6 shadow-[10px_10px_0_#EFA0A5]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-full border-4 border-[#1F1F1F] bg-[#A8D5BA] shadow-[4px_4px_0_#1F1F1F]">
            <LuBrain className="h-7 w-7" />
          </span>

          <div>
            <h2 className="text-4xl font-black">Semantic Search</h2>
            <p className="text-lg font-bold text-[#1F1F1F]/60">
              Search your notes by meaning, not only exact words.
            </p>
          </div>
        </div>

        {results.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-2 rounded-full border-4 border-[#1F1F1F] bg-[#F3A8A8] px-4 py-2 text-lg font-black shadow-[3px_3px_0_#1F1F1F] transition hover:-translate-y-1"
          >
            <LuX className="h-5 w-5" />
            Clear
          </button>
        )}
      </div>

      <form onSubmit={handleSearch} className="flex flex-col gap-3 md:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Example: ideas for getting frontend clients..."
          className="min-w-0 flex-1 rounded-3xl border-4 border-[#1F1F1F] bg-white px-5 py-4 text-xl font-bold outline-none shadow-[4px_4px_0_#1F1F1F] placeholder:text-[#1F1F1F]/40 focus:bg-[#F4EBDD]"
        />

        <button
          type="submit"
          disabled={semanticSearchMutation.isPending}
          className="inline-flex items-center justify-center gap-2 rounded-3xl border-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-4 text-xl font-black shadow-[4px_4px_0_#1F1F1F] transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LuSearch className="h-6 w-6" />
          {semanticSearchMutation.isPending ? "Searching..." : "Search"}
        </button>
      </form>

      {semanticSearchMutation.isError && (
        <div className="mt-5 rounded-3xl border-4 border-[#1F1F1F] bg-[#F3A8A8] p-4 shadow-[4px_4px_0_#1F1F1F]">
          <p className="text-xl font-black">Something went wrong</p>
          <p className="mt-1 text-lg font-bold">
            Could not complete semantic search.
          </p>
        </div>
      )}

      {semanticSearchMutation.isSuccess && results.length === 0 && (
        <div className="mt-5 rounded-3xl border-4 border-[#1F1F1F] bg-white p-4 shadow-[4px_4px_0_#A8D5BA]">
          <p className="text-xl font-black">No semantic matches found</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-6 grid gap-4">
          {results.map((result) => (
            <article
              key={result.id}
              className="rounded-3xl border-4 border-[#1F1F1F] bg-[#F4EBDD] p-5 shadow-[5px_5px_0_#A8D5BA]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-2xl font-black">
                    {result.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 break-words text-lg leading-7">
                    {result.summary || result.content}
                  </p>
                </div>

                <span className="rounded-full border-4 border-[#1F1F1F] bg-white px-3 py-1 text-sm font-black shadow-[2px_2px_0_#1F1F1F]">
                  {Math.round(result.similarity * 100)}% match
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {result.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full border-4 border-[#1F1F1F] px-3 py-1 text-sm font-black"
                    style={{ backgroundColor: tag.color }}
                  >
                    #{tag.name}
                  </span>
                ))}

                <Link
                  to="/notes/$noteId"
                  params={{ noteId: result.id }}
                  className="rounded-full border-4 border-[#1F1F1F] bg-white px-4 py-2 text-sm font-black shadow-[3px_3px_0_#1F1F1F] transition hover:-translate-y-1"
                >
                  Open note
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
