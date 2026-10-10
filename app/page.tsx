import { notFound } from "next/navigation";
import Link from "next/link";
import { MovieRow, GenresRow } from "@/components/other";
import { Reveal } from "@/components/other/Reveal";
import { fetchBrowse, fetchByGenre } from "@/lib/fetch";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const revalidate = 3600;

export default async function BrowsePage() {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB_API_KEY is not configured");
  let data;

  try {
    data = await fetchBrowse(apiKey);
  } catch (error) {
    if (error instanceof Error && error.message.includes("(404)")) notFound();
    throw error;
  }

  const queryClient = new QueryClient();

  const genreId = data.genres[0]?.id ?? 28

  const res = await queryClient.prefetchQuery({
    queryKey: ["genre", genreId],
    queryFn: () => fetchByGenre(apiKey, genreId),
  });

  const hero = data.trendingDay[0];

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <header className="glass-strong fixed inset-x-0 top-0 z-50 py-3">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/"
            className="font-display text-xl uppercase tracking-[0.25em]"
          >
            Cinema
          </Link>
          <ul className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <li>
              <a
                href="#trending"
                className="transition-colors hover:text-foreground"
              >
                Trending
              </a>
            </li>
            <li>
              <a
                href="#categories"
                className="transition-colors hover:text-foreground"
              >
                Categories
              </a>
            </li>
            <li>
              <a
                href="#theaters"
                className="transition-colors hover:text-foreground"
              >
                In Theaters
              </a>
            </li>
          </ul>
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            Featured Film
          </Link>
        </nav>
      </header>

      <section className="relative isolate overflow-hidden pb-16 pt-36 sm:pb-24 sm:pt-44">
        {hero?.backdrop && (
          <img
            src={hero.backdrop}
            alt=""
            aria-hidden
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/50 to-background" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">
            Now on TMDB
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] text-glow">
            Trending &amp; Popular Movies
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">
            Live from TMDB — what the world is watching today, plus every genre
            worth exploring.
          </p>
        </div>
      </section>

      <MovieRow
        id="trending"
        eyebrow="Trending Today"
        title="What's Hot Right Now"
        movies={data.trendingDay}
      />
      <MovieRow
        eyebrow="Trending This Week"
        title="The Week's Biggest"
        movies={data.trendingWeek}
      />
      <MovieRow eyebrow="Popular" title="Most Popular" movies={data.popular} />

      <section id="categories" className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              Categories
            </p>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl">
              Browse by Genre
            </h2>
          </Reveal>

          <HydrationBoundary state={dehydrate(queryClient)}>
            <Reveal delay={0.05}>
              <GenresRow genreID={genreId} genres={data.genres} />
            </Reveal>
          </HydrationBoundary>
        </div>
      </section>

      <MovieRow
        id="theaters"
        eyebrow="In Theaters"
        title="Now Playing"
        movies={data.nowPlaying}
      />
      <MovieRow
        eyebrow="Top Rated"
        title="All-Time Greats"
        movies={data.topRated}
      />
      <MovieRow
        eyebrow="Coming Soon"
        title="Upcoming Releases"
        movies={data.upcoming}
      />

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-5 text-xs text-muted-foreground sm:px-8">
          Data provided by TMDB. This product uses the TMDB API but is not
          endorsed or certified by TMDB.
        </div>
      </footer>
    </main>
  );
}

export const metadata = {
  title: "Cinema — Trending & Popular Movies",
  description:
    "Live from TMDB — Trending, popular, and new release movies across genres.",
  openGraph: {
    title: "Cinema — Trending & Popular Movies",
    description:
      "Live from TMDB — Trending, popular, and new release movies across genres.",
    url: "/",
  },
};
