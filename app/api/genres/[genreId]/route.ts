import { fetchByGenre } from "@/lib/fetch";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ genreId: string }> },
) {
  const { genreId } = await params;

  if (!/^\d+$/.test(genreId)) {
    return NextResponse.json({ message: "Invalid genre id" }, { status: 400 });
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: "TMDB_API_KEY is not configured" }, { status: 500 });
  }

  try {
    const movies = await fetchByGenre(apiKey, Number(genreId));
    return NextResponse.json(movies);
  } catch (error) {
    if (error instanceof Error && error.message.includes("(404)")) {
      return NextResponse.json([], { status: 404 });
    }
    return NextResponse.json({ message: "Failed to load genre movies" }, { status: 500 });
  }
}
