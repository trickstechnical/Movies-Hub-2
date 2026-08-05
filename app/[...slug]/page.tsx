import { Nav, Hero, Overview, Cast, Trailer, Reviews, Gallery, Footer } from "@/components/other";
import { fetchMovie } from "@/lib/fetch";
import { notFound } from "next/navigation";

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
    movie = await fetchMovie(apiKey, movieId);
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
