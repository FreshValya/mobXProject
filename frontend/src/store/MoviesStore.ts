import {makeObservable} from 'mobx';

import {Movie, moviesApi} from '@api/movies';

import {QueryStore} from './QueryStore';

export class MoviesStore extends QueryStore<Array<Movie>> {
  constructor() {
    super();

    makeObservable(this);
  }

  apiFunction = moviesApi.getMovies;
}
