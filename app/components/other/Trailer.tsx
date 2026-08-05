'use client'

import { useState } from "react";
import type { Movie } from "@/lib/types";
import { Reveal } from "./Reveal";

export function Trailer({ movie }: { movie: Movie }) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const poster = movie.backdrop ?? movie.clips[0]?.img ?? undefined;

  if (!movie.trailerKey && movie.clips.length === 0) return null;

  return (
    <section id="trailer" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_30%,oklch(0.62_0.24_27/0.08),transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Watch</p>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">Official Trailer</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="glass mt-10 overflow-hidden rounded-3xl">
            <div className="relative aspect-video w-full bg-black">
              {activeKey ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${activeKey}?autoplay=1&rel=0`}
                  title={`${movie.title} — video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveKey(movie.trailerKey ?? movie.clips[0]?.key ?? null)}
                  className="group absolute inset-0 grid place-items-center"
                  aria-label={`Play the official trailer for ${movie.title}`}
                >
                  {poster && (
                    <img
                      src={poster}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-90"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
                  <div className="relative grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-6 left-6 text-sm uppercase tracking-[0.25em] text-foreground/90">
                    Play Trailer
                  </span>
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {movie.clips.length > 0 && (
          <Reveal delay={0.1}>
            <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {movie.clips.map((clip) => (
                <li key={clip.key}>
                  <button
                    type="button"
                    onClick={() => setActiveKey(clip.key)}
                    className="group block w-full overflow-hidden rounded-xl text-left"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-surface">
                      <img
                        src={clip.img}
                        alt={clip.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/90 text-primary-foreground">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </div>
                      <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-foreground">
                        {clip.type}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                      {clip.title}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
