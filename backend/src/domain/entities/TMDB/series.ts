import {
  FilePath,
  Genre,
  IsoCountryCode,
  LanguageCode,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from './media';

export interface TMDBSeries {
  backdrop_path: string | null;
  first_air_date: string; // ISO date string
  genre_ids: Array<number>;
  id: number;
  name: string;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TMDBSeriesResponse {
  page: number;
  results: Array<TMDBSeries>;
  total_pages: number;
  total_results: number;
}

interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string; // ISO 8601 date string
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: FilePath;
}

interface Season {
  air_date: string; // ISO 8601 date string
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: FilePath;
  season_number: number;
  vote_average: number;
}

export interface SeriesDetails {
  adult: boolean;
  backdrop_path: FilePath;
  created_by: Array<{
    id: number;
    credit_id: string;
    name: string;
    gender: number; // 1: Female, 2: Male, 0: Not specified
    profile_path: FilePath;
  }>;
  episode_run_time: Array<number>;
  first_air_date: string; // ISO 8601 date string
  genres: Array<Genre>;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: Array<LanguageCode>;
  last_air_date: string; // ISO 8601 date string
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: string;
  networks: Array<{
    id: number;
    logo_path: FilePath;
    name: string;
    origin_country: IsoCountryCode;
  }>;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: Array<IsoCountryCode>;
  original_language: LanguageCode;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: FilePath;
  production_companies: Array<ProductionCompany>;
  production_countries: Array<ProductionCountry>;
  seasons: Season[];
  spoken_languages: Array<SpokenLanguage>;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
