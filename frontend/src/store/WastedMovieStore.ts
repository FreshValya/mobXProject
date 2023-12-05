import {action, makeObservable, observable} from 'mobx';

import {FavoriteResponse, favoritesApi} from '@api/favorites';
import {MovieDetailsResponse} from '@api/movies';

export class WastedMovieStore {
  constructor() {
    makeObservable(this);
  }

  @observable data: FavoriteResponse<MovieDetailsResponse>;
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
      const favoritesMovies = await favoritesApi.getFavorites<MovieDetailsResponse>(20175604, 'movie');

      this.totalMovies = favoritesMovies.length;
      const titleMoviesTimes = [];

      for (const movie of favoritesMovies) {
        titleMoviesTimes.push(movie.runtime);
      }

      this.totalMoviesLength = titleMoviesTimes.reduce((prev, curr) => prev + curr, 0);
      this.averageMoviesLength = parseFloat((this.totalMoviesLength / this.totalMovies).toFixed(2)) || 0;
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }
}
