import axios from 'axios';

const params = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjQxNWMwMGViOTIyMDAxZjU3ZTdjNGNmM2ExYzAyMCIsInN1YiI6IjY0Yjk3NDRmMDZmOTg0MDBjNGYxNDgzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V5gGKAlVXfB395emdvJyMLe6KTZkUxg6xUQBzMOiYzU',
  },
};

type PostFavoritePayload = {media_type: 'movie' | 'tv'; media_id: number; favorite: boolean};

type FavoritePayload = {
  success: boolean;
  status_code: number;
  status_message: string;
};

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

export const favoritesApi = {
  postFavorite: async (accountId: number, payload: PostFavoritePayload) => {
    const response = await axios.post<FavoritePayload>(
      `https://api.themoviedb.org/3/account/${accountId}/favorite`,
      payload,
      params,
    );
    return response.data;
  },
  getFavorites: async (accountId: number, cinemaType: 'movies' | 'tv') => {
    const response = await axios.get<FavoriteResponse>(
      `https://api.themoviedb.org/3/account/${accountId}/favorite/${cinemaType}`,
      params,
    );
    return response.data;
  },
};
