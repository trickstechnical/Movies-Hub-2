export type Person = { name: string; role: string; img: string | null };
export type Clip = { title: string; key: string; img: string; type: string };
export type Review = { author: string; quote: string; score: string | null };
export type Provider = { name: string; logo: string | null };

export type Movie = {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  releaseDate: string;
  releaseISO: string;
  runtime: string;
  language: string;
  director: string;
  studio: string;
  certification: string;
  genres: string[];
  score: number;
  scorePct: number;
  votes: number;
  popularity: number;
  homepage: string | null;
  backdrop: string | null;
  poster: string | null;
  cast: Person[];
  crew: { role: string; name: string }[];
  trailerKey: string | null;
  clips: Clip[];
  gallery: string[];
  reviews: Review[];
  providerLink: string | null;
  streaming: Provider[];
  rent: Provider[];
};

export type MovieCard = {
  id: number;
  title: string;
  poster: string | null;
  backdrop: string | null;
  year: string;
  score: number;
  overview: string;
};

export type Genre = { id: number; name: string };

export type BrowseData = {
  trendingDay: MovieCard[];
  trendingWeek: MovieCard[];
  popular: MovieCard[];
  topRated: MovieCard[];
  nowPlaying: MovieCard[];
  upcoming: MovieCard[];
  genres: Genre[];
};