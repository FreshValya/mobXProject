import {action, makeObservable, observable} from 'mobx';

import {LatestMoviesResponse, moviesApi} from '@api/movies';

export class MoviesStore {
  constructor() {
    makeObservable(this);
  }

  @observable data: LatestMoviesResponse | {} = {};
  @observable isLoading = false;
  @observable isError = false;

  @action
  async getData() {
    this.isError = false;
    this.isLoading = true;

    try {
      this.data = await moviesApi.getLatestMovies();
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }
}
