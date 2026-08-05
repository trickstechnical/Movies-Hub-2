'use client'

import { motion } from "framer-motion";
import type { Movie } from "@/lib/types";

export function Hero({ movie }: { movie: Movie }) {
  return (
    <section id="top" className="relative isolate min-h-[100svh] w-full overflow-hidden">
      {movie.backdrop && (
        <img
          src={movie.backdrop}
          alt={`Key art from ${movie.title}`}
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          fetchPriority="high"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_20%,transparent_0%,oklch(0.13_0.005_270/0.5)_60%,oklch(0.13_0.005_270)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-background" />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 sm:px-8 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-2"
        >
          {movie.genres.map((g) => (
            <span
              key={g}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-foreground/80 backdrop-blur"
            >
              {g}
            </span>
          ))}
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-foreground/80 backdrop-blur">
            {movie.certification}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-6 text-[clamp(3rem,11vw,8.5rem)] leading-[0.9] tracking-tight text-foreground text-glow"
        >
          {movie.title}
        </motion.h1>

        {movie.tagline && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display mt-4 max-w-2xl text-xl italic text-foreground/80 sm:text-2xl"
          >
            “{movie.tagline}”
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground/80"
        >
          <span className="inline-flex items-center gap-2">
            <span className="grid h-7 w-14 place-items-center rounded bg-[#01b4e4] text-[10px] font-black uppercase tracking-wide text-black">
              TMDB
            </span>
            <span className="font-semibold text-foreground">{movie.score}</span>
            <span className="text-muted-foreground">/ 10</span>
          </span>
          <span className="h-4 w-px bg-white/20" />
          <span>{movie.releaseDate}</span>
          <span className="h-4 w-px bg-white/20" />
          <span>{movie.runtime}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a
            href="#trailer"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Trailer
          </a>
          <a
            href="#showtimes"
            className="glass inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
          >
            Get Tickets
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.4em] text-foreground/50"
        style={{ animation: "shimmer 2.4s ease-in-out infinite" }}
      >
        Scroll
      </div>
    </section>
  );
}
