import type { Movie } from "@/lib/types";

export function Footer({ movie }: { movie: Movie }) {
  return (
    <footer className="border-t border-white/10 py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl uppercase tracking-[0.25em]">{movie.title}</p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            A film by {movie.director}. {movie.studio && `${movie.studio}. `}In theaters{" "}
            {movie.releaseDate}.
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {movie.homepage && (
            <li>
              <a href={movie.homepage} className="hover:text-foreground">
                Official Site
              </a>
            </li>
          )}
          <li>
            <a
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              className="hover:text-foreground"
            >
              TMDB Page
            </a>
          </li>
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-7xl px-5 text-xs text-muted-foreground sm:px-8">
        © {new Date().getFullYear()} Fan-made promotional concept. This product uses the TMDB API but
        is not endorsed or certified by TMDB.
      </p>
    </footer>
  );
}
