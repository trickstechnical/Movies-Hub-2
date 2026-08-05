import type { MovieCard } from "@/lib/types";
import { Reveal } from "./Reveal";
import Link from "next/link";

export function PosterCard({ movie }: { movie: MovieCard }) {
  return (
    <article className="group w-[150px] shrink-0 sm:w-[190px]">
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-surface">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={`Poster for ${movie.title}`}
            loading="lazy"
            width={500}
            height={750}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center font-display text-4xl text-muted-foreground">
            {movie.title[0]}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="glass absolute right-2 top-2 rounded-full px-2 py-1 text-[11px] font-semibold text-foreground">
          {movie.score.toFixed(1)}
        </span>
      </div>
      <h3 className="mt-3 line-clamp-1 text-sm font-semibold text-foreground">{movie.title}</h3>
      <p className="text-xs text-muted-foreground">{movie.year}</p>
    </article>
  );
}

export function MovieRow({
  id,
  eyebrow,
  title,
  movies,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  movies: MovieCard[];
}) {
  if (!movies.length) return null;
  return (
    <section id={id} className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl">{title}</h2>
        </Reveal>
      </div>
      <Reveal delay={0.05}>
        <ul className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:thin]">
          {movies.map((m) => (
            <li key={m.id} className="snap-start">
              <Link href={`/${m.id}`}>
                <PosterCard movie={m} />
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
