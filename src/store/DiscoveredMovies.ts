import {makeObservable} from 'mobx';

import {MovieFilter, MoviesResponse, moviesApi} from '@api/movies';

import {QueryStore} from '@store/QueryStore';

export class DiscoveredMovies extends QueryStore<MoviesResponse> {
  constructor() {
    super();

    makeObservable(this);
  }

  apiFunction = (payload: MovieFilter) => moviesApi.getSearchedMovies(payload);
}
