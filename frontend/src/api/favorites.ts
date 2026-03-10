import {axiosInstance} from '@api/base';
import {MovieDetailsResponse} from '@api/movies';
import {SeriesDetailsResponse} from '@api/series';

type AddFavoritePayload = {
  media_type: 'movie' | 'tv';
  media_id: number;
};

type FavoritePayload = {
  success: boolean;
  status_code: number;
  status_message: string;
};

export type FavoriteResponse = {
  numberOfMedia: number;
  totalRuntime: number;
  averageRuntime: number;
};

export interface DeleteFavoriteOptions {
  media_id: number;
  media_type: 'movie' | 'tv';
}

export const favoritesApi = {
  addFavorite: async (accountId: number, payload: AddFavoritePayload) => {
    const response = await axiosInstance.post<FavoritePayload>(
      // TODO: pass accountId to back
      // `https://api.themoviedb.org/3/account/${accountId}/favorite`,
      'watched',
      payload,
    );

    return response.data;
  },
  getFavorites: async (accountId: number, cinemaType: 'movie' | 'tv') => {
    const response = await axiosInstance.get<FavoriteResponse>(
      // `https://api.themoviedb.org/3/account/${accountId}/favorite/${cinemaType}`,
      'watched',
      {params: {media_type: cinemaType}},
    );
    return response.data;
  },
  deleteFavorite: async (requestOptions: DeleteFavoriteOptions) => {
    const response = await axiosInstance.delete('watched', {params: requestOptions});

    return response.data;
  },
};
