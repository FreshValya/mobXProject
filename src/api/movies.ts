import axios from 'axios';

const params = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjQxNWMwMGViOTIyMDAxZjU3ZTdjNGNmM2ExYzAyMCIsInN1YiI6IjY0Yjk3NDRmMDZmOTg0MDBjNGYxNDgzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V5gGKAlVXfB395emdvJyMLe6KTZkUxg6xUQBzMOiYzU',
  },
};

type LatestMovie = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any | null; // You can use a more specific type if available
  budget: number;
  genres: string[]; // Replace 'string' with a more specific type if available
  homepage: string;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: any[]; // You can use a more specific type if available
  production_countries: any[]; // You can use a more specific type if available
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: any[]; // You can use a more specific type if available
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type LatestMoviesResponse = {page: number; results: Array<LatestMovie>; total_pages: number; total_results: number};

interface Movie {
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

export interface FavoriteResponse {
  page: number;
  results: Movie[];
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

interface MovieDetailsResponse {
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

export const moviesApi = {
  getLatestMovies: async () => {
    const response = await axios.get<LatestMoviesResponse>('https://api.themoviedb.org/3/discover/movie', params);
    return response.data;
  },
  getDetails: async (movieId: number) => {
    const response = await axios.get<MovieDetailsResponse>(`https://api.themoviedb.org/3/movie/${movieId}`, params);
    return response.data;
  },
};
