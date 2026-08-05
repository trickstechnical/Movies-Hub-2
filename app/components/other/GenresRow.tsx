"use client";

import { useQuery } from "@tanstack/react-query";
import { PosterCard } from "./MovieRow";
import type { MovieCard, Genre } from "@/lib/types";
import { useState } from "react";

export const GenresRow = ({
  genreID,
  genres,
}: {
  genreID: number;
  genres: Genre[];
}) => {
  const [genreId, setGenreId] = useState<number>(genreID);

  const {
    data: genreMovies,
    isPending,
    isError,
  } = useQuery<MovieCard[]>({
    queryKey: ["genre", genreId],
    queryFn: async () => {
      const res = await fetch(`/api/genres/${genreId}`);
      if (!res.ok) throw new Error(`Genre request failed (${res.status})`);
      return res.json();
    },
    staleTime: 5 * 60_000,
  });

  if (isError) {
    return (
      <p className="mt-6 text-sm text-muted-foreground">
        Could not load movies for this genre right now.
      </p>
    );
  }

  return (
    <>
      <div
        role="tablist"
        aria-label="Movie genres"
        className="mt-8 flex flex-wrap gap-2"
      >
        {(genres as Genre[]).map((g) => {
          const active = g.id === genreId;
          return (
            <button
              key={g.id}
              role="tab"
              aria-selected={active}
              onClick={() => setGenreId(g.id)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                active
                  ? "border-transparent bg-primary text-primary-foreground shadow-glow"
                  : "border-white/15 bg-white/5 text-foreground/80 hover:bg-white/10"
              }`}
            >
              {g.name}
            </button>
          );
        })}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {isPending
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] animate-pulse rounded-2xl bg-surface"
              />
            ))
          : (genreMovies ?? []).map((m) => (
              <div key={m.id} className="w-full [&>article]:w-full">
                <PosterCard movie={m} />
              </div>
            ))}
      </div>
    </>
  );
};
