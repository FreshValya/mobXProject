import axios from 'axios';
import qs from 'query-string';

type AddFavoritePayload = {
  media_type: 'movie' | 'tv';
  media_id: number;
};

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

export interface DeleteFavoriteOptions {
  media_id: number;
  media_type: 'movie' | 'tv';
}

export const favoritesApi = {
  addFavorite: async (accountId: number, payload: AddFavoritePayload) => {
    const response = await axios.post<FavoritePayload>(
      // TODO: pass accountId to back
      // `https://api.themoviedb.org/3/account/${accountId}/favorite`,
      'http://localhost:3000/api/watched',
      payload,
    );

    return response.data;
  },
  getFavorites: async (accountId: number, cinemaType: 'movies' | 'tv') => {
    const response = await axios.get<FavoriteResponse>(
      `https://api.themoviedb.org/3/account/${accountId}/favorite/${cinemaType}`,
    );
    return response.data;
  },
  deleteFavorite: async (requestOptions: DeleteFavoriteOptions) => {
    const params = qs.stringify(requestOptions, {skipEmptyString: true});
    console.log(params);

    const response = await axios.delete('http://localhost:3000/api/watched', {params: requestOptions});

    return response.data;
  },
};
