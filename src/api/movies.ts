import axios from 'axios';
import qs from 'query-string';

const params = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjQxNWMwMGViOTIyMDAxZjU3ZTdjNGNmM2ExYzAyMCIsInN1YiI6IjY0Yjk3NDRmMDZmOTg0MDBjNGYxNDgzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V5gGKAlVXfB395emdvJyMLe6KTZkUxg6xUQBzMOiYzU',
  },
};

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesResponse {
  page: number;
  results: Array<Movie>;
  total_pages: number;
  total_results: number;
}

export interface FavoriteResponse {
  page: number;
  results: Array<Movie>;
  total_pages: number;
  total_results: number;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetailsResponse {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any | null; // You can use a more specific type if available
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieAdvancedFilter {
  certification?: string;
  'certification.gte'?: string;
  'certification.lte'?: string;
  certification_country?: string;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  page?: number;
  primary_release_year?: number;
  'primary_release_date.gte'?: string; // date format
  'primary_release_date.lte'?: string; // date format
  region?: string;
  'release_date.gte'?: string; // date format
  'release_date.lte'?: string; // date format
  sort_by?: string;
  vote_average?: number;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  vote_count?: number;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  watch_region?: string;
  with_cast?: string; // comma (AND) or pipe (OR) separated query
  with_companies?: string; // comma (AND) or pipe (OR) separated query
  with_crew?: string; // comma (AND) or pipe (OR) separated query
  with_genres?: string; // comma (AND) or pipe (OR) separated query
  with_keywords?: string; // comma (AND) or pipe (OR) separated query
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string; // comma (AND) or pipe (OR) separated query
  with_release_type?: number; // comma (AND) or pipe (OR) separated query, can be used in conjunction with region
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  with_watch_monetization_types?: string; // use in conjunction with watch_region, comma (AND) or pipe (OR) separated query
  with_watch_providers?: string; // use in conjunction with watch_region, comma (AND) or pipe (OR) separated query
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  year?: number;
}

export interface MovieFilter {
  query: string;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  page?: number;
  region?: string;
  year?: string;
}

export const moviesApi = {
  getMovies: async () => {
    const response = await axios.get<MoviesResponse>('https://api.themoviedb.org/3/discover/movie', params);
    return response.data;
  },
  getDetails: async (movieId: number) => {
    const response = await axios.get<MovieDetailsResponse>(`https://api.themoviedb.org/3/movie/${movieId}`, params);
    return response.data;
  },
  getSearchedMovies: async (requestOptions: MovieFilter) => {
    const searchParams = qs.stringify(requestOptions);

    const response = await axios.get<MoviesResponse>(`https://api.themoviedb.org/3/search/movie?${searchParams}`, params);
    return response.data;
  },
};
