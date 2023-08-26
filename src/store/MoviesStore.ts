import {makeObservable} from 'mobx';

import {MoviesResponse, moviesApi} from '@api/movies';

import {QueryStore} from '@store/QueryStore';

export class MoviesStore extends QueryStore<MoviesResponse> {
  constructor() {
    super();

    makeObservable(this);
  }

  apiFunction = moviesApi.getMovies;
}
