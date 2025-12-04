import {action, makeObservable, observable} from 'mobx';

import {Movie, MovieFilter, moviesApi} from '@api/movies';

import {QueryStore} from './QueryStore';

export class DiscoveredMovies extends QueryStore<Array<Movie>> {
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
