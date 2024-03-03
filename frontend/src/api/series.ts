import qs from 'query-string';

import {axiosInstance} from '@api/base';

export interface TVShow {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  watched: boolean;
}

// export interface SeriesResponse {
//   page: number;
//   results: TVShow[];
//   total_pages: number;
//   total_results: number;
// }

export interface SeriesResponse {
  success: boolean;
  result: Array<TVShow>;
  message: string;
}

export interface SeriesDetailsResponse {
  adult: boolean;
  backdrop_path: string | null;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  } | null;
  name: string;
  next_episode_to_air: null;
  networks: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface SeriesFilter {
  query: string;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  page?: number;
  region?: string;
  year?: string;
}

export const seriesApi = {
  getLatestSeries: async () => {
    const response = await axiosInstance.get<SeriesResponse>('discover/series');
    return response.data;
  },
  getDetails: async (movieId: number) => {
    const response = await axiosInstance.get<SeriesDetailsResponse>(`https://api.themoviedb.org/3/tv/${movieId}`);
    return response.data;
  },
  getSearchedSeries: async (requestOptions: SeriesFilter) => {
    const searchParams = qs.stringify(requestOptions, {skipEmptyString: true});

    const response = await axiosInstance.get<SeriesResponse>(`search/series?${searchParams}`);
    return response.data;
  },
};
