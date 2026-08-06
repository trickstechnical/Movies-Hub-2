import { Nav, Hero, Overview, Cast, Trailer, Reviews, Gallery, Footer } from "@/components/other";
import { fetchBrowse, fetchMovieCached } from "@/lib/fetch";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB_API_KEY is not configured");

  const data = await fetchBrowse(apiKey);
  const ids = new Set<number>();

  [
    ...data.trendingDay,
    ...data.trendingWeek,
    ...data.popular,
    ...data.topRated,
    ...data.nowPlaying,
    ...data.upcoming,
  ].forEach((movie) => ids.add(movie.id));

  return Array.from(ids).map((id) => ({ slug: [String(id)] }));
}

export async function generateMetadata({ params }: { params?: any }) {
  const resolved = await params;
  const slug = resolved?.slug;
  const raw = Array.isArray(slug) ? slug[0] : slug;
  const movieId = raw ? String(raw).match(/^\d+/)?.[0] : undefined;

  if (!movieId) return undefined;

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB_API_KEY is not configured");

  let movie;
  try {
    movie = await fetchMovieCached(apiKey, movieId);
  } catch (error) {
    if (error instanceof Error && error.message.includes("(404)")) notFound();
    throw error;
  }

  const title = `${movie.title} — Cinema`;

  return {
    title,
    description: movie.overview || "",
    openGraph: {
      title,
      description: movie.overview || "",
      images: movie.poster ? [{ url: movie.poster, alt: movie.title }] : [],
      type: "video.movie",
    },
  };
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const [movieId] = slug;

  if (!/^\d+$/.test(movieId)) notFound();

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB_API_KEY is not configured");
  let movie;

  try {
    movie = await fetchMovieCached(apiKey, movieId);
  } catch (error) {
    if (error instanceof Error && error.message.includes("(404)")) notFound();
    throw error;
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav title={movie.title} />
      <Hero movie={movie} />
      <Overview movie={movie} />
      <Cast movie={movie} />
      <Trailer movie={movie} />
      <Reviews movie={movie} />
      <Gallery movie={movie} />
      <Footer movie={movie} /> 
    </main>
  );
}
