import {makeObservable} from 'mobx';

import {LatestMoviesResponse, moviesApi} from '@api/movies';

import {QueryStore} from '@store/QueryStore';

export class MoviesStore extends QueryStore<LatestMoviesResponse> {
  constructor() {
    super();

    makeObservable(this);
  }

  apiFunction = moviesApi.getLatestMovies;
}
