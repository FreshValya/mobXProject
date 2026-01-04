import {FilePath, Genre, LanguageCode, ProductionCompany, ProductionCountry, SpokenLanguage} from './media';

export interface TMDBMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // ISO date string
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TMDBMoviesResponse {
  page: number;
  results: Array<TMDBMovie>;
  total_pages: number;
  total_results: number;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: FilePath;
  belongs_to_collection: null;
  budget: number;
  genres: Array<Genre>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: LanguageCode;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: FilePath;
  production_companies: Array<ProductionCompany>;
  production_countries: Array<ProductionCountry>;
  release_date: string; // ISO 8601 date string
  revenue: number;
  runtime: number;
  spoken_languages: Array<SpokenLanguage>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
