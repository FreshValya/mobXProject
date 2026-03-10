import {action, makeObservable, observable} from 'mobx';

import {FavoriteResponse, favoritesApi} from '@api/favorites';

export class WastedMovieStore {
  constructor() {
    makeObservable(this);
  }

  @observable data: FavoriteResponse;
  @observable isLoading = false;
  @observable isError = false;

  @observable totalMovies = 0;
  @observable totalMoviesLength = 0;
  @observable averageMoviesLength = 0;

  @action
  async getData() {
    this.isError = false;
    this.isLoading = true;

    try {
      const {numberOfMedia, totalRuntime, averageRuntime} = await favoritesApi.getFavorites(20175604, 'movie');

      this.totalMovies = numberOfMedia;
      this.totalMoviesLength = totalRuntime;
      this.averageMoviesLength = averageRuntime;
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }
}
