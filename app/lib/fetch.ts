import { BASE, CREW_JOBS } from "@/lib/constant";
import { cache } from "react";
import { fmtRuntime, fmtDate, img, tmdb, toCard } from "@/lib/helper";
import { Movie, Provider, BrowseData, MovieCard, Genre } from "@/lib/types";

export async function fetchMovie(apiKey: string, movieId: string): Promise<Movie> {
  const url = new URL(`${BASE}/movie/${movieId}`);
  url.searchParams.set("language", "en-US");
  url.searchParams.set(
    "append_to_response",
    "credits,videos,images,release_dates,reviews,watch/providers",
  );
  url.searchParams.set("include_image_language", "en,null");
  if (!apiKey.startsWith("ey")) url.searchParams.set("api_key", apiKey);

  const res = await fetch(url, {
    headers: apiKey.startsWith("ey") ? { Authorization: `Bearer ${apiKey}` } : {},
  });
  if (!res.ok) throw new Error(`TMDB request failed (${res.status})`);

  const d: any = await res.json();

  const videos: any[] = d.videos?.results ?? [];
  const yt = videos.filter((v) => v.site === "YouTube");
  const trailer =
    yt.find((v) => v.type === "Trailer" && v.official) ??
    yt.find((v) => v.type === "Trailer") ??
    yt.find((v) => v.type === "Teaser") ??
    yt[0];

  const us = (d.release_dates?.results ?? []).find((r: any) => r.iso_3166_1 === "US");
  const certification =
    (us?.release_dates ?? []).map((r: any) => r.certification).find((c: string) => c) || "NR";

  const wp = d["watch/providers"]?.results?.US;

  const mapProviders = (list: any[] | undefined): Provider[] =>
    (list ?? []).slice(0, 6).map((p) => ({ name: p.provider_name, logo: img(p.logo_path, "w92") }));

  return {
    id: d.id,
    title: d.title ?? "Untitled",
    tagline: d.tagline || d.overview?.split(".")[0] || "",
    overview: d.overview ?? "",
    releaseDate: fmtDate(d.release_date),
    releaseISO: d.release_date ?? "",
    runtime: fmtRuntime(d.runtime),
    language: (d.spoken_languages?.[0]?.english_name as string) ?? "English",
    director:
      (d.credits?.crew ?? []).find((c: any) => c.job === "Director")?.name ?? "Unknown",
    studio: (d.production_companies ?? [])
      .slice(0, 2)
      .map((c: any) => c.name)
      .join(" · "),
    certification,
    genres: (d.genres ?? []).map((g: any) => g.name),
    score: Math.round((d.vote_average ?? 0) * 10) / 10,
    scorePct: Math.round((d.vote_average ?? 0) * 10),
    votes: d.vote_count ?? 0,
    popularity: Math.round(d.popularity ?? 0),
    homepage: d.homepage || null,
    backdrop: img(d.backdrop_path, "original"),
    poster: img(d.poster_path, "w780"),
    cast: (d.credits?.cast ?? []).slice(0, 6).map((c: any) => ({
      name: c.name,
      role: c.character || "—",
      img: img(c.profile_path, "w342"),
    })),
    crew: CREW_JOBS.map((job) => {
      const people = (d.credits?.crew ?? [])
        .filter((c: any) => c.job === job)
        .map((c: any) => c.name);
      return { role: job, name: [...new Set(people)].slice(0, 3).join(" · ") };
    }).filter((c) => c.name),
    trailerKey: trailer?.key ?? null,
    clips: yt
      .filter((v) => ["Trailer", "Teaser", "Featurette", "Clip"].includes(v.type))
      .slice(0, 4)
      .map((v) => ({
        title: v.name,
        key: v.key,
        type: v.type,
        img: `https://i.ytimg.com/vi/${v.key}/hqdefault.jpg`,
      })),
    gallery: (d.images?.backdrops ?? [])
      .slice(0, 6)
      .map((b: any) => img(b.file_path, "w1280")!)
      .filter(Boolean),
    reviews: (d.reviews?.results ?? []).slice(0, 3).map((r: any) => ({
      author: r.author,
      quote:
        r.content.length > 260 ? `${r.content.slice(0, 257).trimEnd()}…` : r.content,
      score: r.author_details?.rating ? `${r.author_details.rating} / 10` : null,
    })),
    providerLink: wp?.link ?? null,
    streaming: mapProviders(wp?.flatrate),
    rent: mapProviders(wp?.rent ?? wp?.buy),
  };
}

export const fetchMovieCached = cache(async function (apiKey: string, movieId: string) {
  return fetchMovie(apiKey, movieId);
});

export async function fetchBrowse(apiKey: string): Promise<BrowseData> {
  const [day, week, popular, topRated, nowPlaying, upcoming, genres] = await Promise.all([
    tmdb(apiKey, "/trending/movie/day"),
    tmdb(apiKey, "/trending/movie/week"),
    tmdb(apiKey, "/movie/popular"),
    tmdb(apiKey, "/movie/top_rated"),
    tmdb(apiKey, "/movie/now_playing"),
    tmdb(apiKey, "/movie/upcoming"),
    tmdb(apiKey, "/genre/movie/list"),
  ]);

  const list = (d: any) => (d.results ?? []).slice(0, 18).map(toCard);

  return {
    trendingDay: list(day),
    trendingWeek: list(week),
    popular: list(popular),
    topRated: list(topRated),
    nowPlaying: list(nowPlaying),
    upcoming: list(upcoming),
    genres: (genres.genres ?? []).map((g: Genre) => ({ id: g.id, name: g.name })),
  };
}

export async function fetchByGenre(apiKey: string, genreId: number): Promise<MovieCard[]> {
  const d = await tmdb(apiKey, "/discover/movie", {
    with_genres: String(genreId),
    sort_by: "popularity.desc",
    include_adult: "false",
    "vote_count.gte": "50",
  });

  return (d.results ?? []).slice(0, 18).map(toCard);
}