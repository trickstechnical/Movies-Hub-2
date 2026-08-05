import type { Movie } from "@/lib/types";
import { Reveal } from "./Reveal";

export function Cast({ movie }: { movie: Movie }) {
  return (
    <section id="cast" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Cast & Crew</p>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">Who's On Screen</h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground sm:block">
            Top billed performers and the team behind the camera.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {movie.cast.map((c) => (
              <li key={c.name} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface">
                  {c.img ? (
                    <img
                      src={c.img}
                      alt={`${c.name} as ${c.role}`}
                      loading="lazy"
                      width={342}
                      height={456}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center font-display text-4xl text-muted-foreground">
                      {c.name[0]}
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-primary/90">{c.role}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{c.name}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {movie.crew.map((c) => (
              <div key={c.role} className="bg-background/60 p-6">
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{c.role}</p>
                <p className="mt-2 text-base font-medium text-foreground">{c.name}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
