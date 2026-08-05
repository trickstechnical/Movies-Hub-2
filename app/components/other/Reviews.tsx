import type { Movie } from "@/lib/types";
import { Reveal } from "./Reveal";

function Ring({ value, label, sub, accent }: { value: string; label: string; sub: string; accent: string }) {
  const pct = Math.min(100, Math.max(0, Number(value.replace("%", "")) || 0));
  const radius = 42;
  const circ = 2 * Math.PI * radius;
  const dash = (pct / 100) * circ;
  return (
    <div className="glass flex flex-col items-center rounded-2xl p-6">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} stroke="oklch(1 0 0 / 0.08)" strokeWidth="6" fill="none" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={accent}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${dash} ${circ}`}
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-3xl">{value}</span>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

export function Reviews({ movie }: { movie: Movie }) {
  const votesPct = Math.min(100, Math.round((movie.votes / 5000) * 100));
  const popPct = Math.min(100, Math.round((movie.popularity / 1000) * 100));

  return (
    <section id="reviews" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Acclaim</p>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">Ratings & Reviews</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Live audience data from The Movie Database.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Ring
              value={`${movie.scorePct}%`}
              label="TMDB Score"
              sub={`${movie.score} / 10 average`}
              accent="#01b4e4"
            />
            <Ring
              value={`${votesPct}%`}
              label="Vote Volume"
              sub={`${movie.votes.toLocaleString()} votes cast`}
              accent="oklch(0.62 0.24 27)"
            />
            <Ring
              value={`${popPct}%`}
              label="Popularity"
              sub={`Index ${movie.popularity.toLocaleString()}`}
              accent="oklch(0.74 0.18 55)"
            />
          </div>
        </Reveal>

        {movie.reviews.length > 0 && (
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {movie.reviews.map((r, i) => (
              <Reveal key={r.author} delay={0.05 * i}>
                <figure className="glass flex h-full flex-col justify-between rounded-2xl p-7">
                  <blockquote className="font-display text-lg italic leading-snug text-foreground/90">
                    “{r.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{r.author}</span>
                    {r.score && <span className="text-primary">{r.score}</span>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
