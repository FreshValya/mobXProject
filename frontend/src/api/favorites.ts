import axios from 'axios';
import qs from 'query-string';

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

export type FavoriteResponse<T extends MovieDetailsResponse | SeriesDetailsResponse> = Array<T>;

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
  getFavorites: async <T extends MovieDetailsResponse | SeriesDetailsResponse>(
    accountId: number,
    cinemaType: 'movie' | 'tv',
  ) => {
    const response = await axios.get<FavoriteResponse<T>>(
      // `https://api.themoviedb.org/3/account/${accountId}/favorite/${cinemaType}`,
      'http://localhost:3000/api/watched',
      {params: {media_type: cinemaType}},
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
