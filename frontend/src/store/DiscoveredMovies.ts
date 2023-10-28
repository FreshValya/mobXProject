import {action, makeObservable, observable} from 'mobx';

import {MovieFilter, MoviesResponse, moviesApi} from '@api/movies';
import {QueryStore} from './QueryStore';

export class DiscoveredMovies extends QueryStore<MoviesResponse> {
  constructor() {
    super();

    makeObservable(this);
  }

  apiFunction = (payload: MovieFilter) => moviesApi.getSearchedMovies(payload);

  @observable
  params: {};

  @action setParams(data: MovieFilter) {
    this.params = {...this.params, ...data};
  }
}
