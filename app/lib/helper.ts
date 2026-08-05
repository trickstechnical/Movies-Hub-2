import { IMG, BASE } from "@/lib/constant";
import type { MovieCard, Movie } from "@/lib/types";

export function img(path: string | null | undefined, size: string) {
  return path ? `${IMG}/${size}${path}` : null;
}

export function fmtDate(iso?: string) {
  if (!iso) return "TBA";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function fmtRuntime(min?: number) {
  if (!min) return "TBA";
  return `${Math.floor(min / 60)}h ${min % 60}m`;
}

export function toCard<T extends Record<string, unknown>>(m: T): MovieCard {
  return {
    id: m.id as number,
    title: (m.title as string ?? m.name as string ?? "Untitled"),
    poster: img(m.poster_path as string | null | undefined, "w500"),
    backdrop: img(m.backdrop_path as string | null | undefined, "w780"),
    year: (m.release_date as string ?? "").slice(0, 4) || "TBA",
    score: Math.round((m.vote_average as number ?? 0) * 10) / 10,
    overview: m.overview as string ?? "",
  };
}

export async function tmdb(apiKey: string, path: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set("language", "en-US");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  if (!apiKey.startsWith("ey")) url.searchParams.set("api_key", apiKey);
  const res = await fetch(url, {
    headers: apiKey.startsWith("ey") ? { Authorization: `Bearer ${apiKey}` } : {},
  });
  if (!res.ok) throw new Error(`TMDB request failed (${res.status})`);
  return res.json();
}