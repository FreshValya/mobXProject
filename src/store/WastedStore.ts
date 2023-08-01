import {action, computed, makeObservable, observable} from 'mobx';

import {favoritesApi} from '@api/favorites';
import {FavoriteResponse, moviesApi} from '@api/movies';
import {seriesApi} from '@api/series';

export class WastedStore {
  constructor() {
    makeObservable(this);
  }

  @observable data: FavoriteResponse;
  @observable isLoading = false;
  @observable isError = false;

  // @observable totalLength = 0;

  @observable totalMovies = 0;
  @observable totalMoviesLength = 0;
  @observable averageMoviesLength = 0;

  @observable totalSeries = 0;
  totalEpisodes = 0;
  @observable totalSeriesLength = 0;
  @observable averageSeriesLength = 0;

  @computed
  get totalLength() {
    return this.totalMoviesLength + this.totalSeriesLength;
  }

  @action
  async getData() {
    this.isError = false;
    this.isLoading = true;

    try {
      const favoritesMovies = await favoritesApi.getFavorites(20175604, 'movies');

      this.totalMovies = favoritesMovies.total_results;
      const titleMoviesTimes = [];

      for (const movie of favoritesMovies.results) {
        const movieDetails = await moviesApi.getDetails(movie.id);

        titleMoviesTimes.push(movieDetails.runtime);
      }

      this.totalMoviesLength = titleMoviesTimes.reduce((prev, curr) => prev + curr, 0);
      this.averageMoviesLength = this.totalMoviesLength / this.totalMovies;

      const favoritesSeries = await favoritesApi.getFavorites(20175604, 'tv');
      console.log(favoritesMovies);

      this.totalSeries = favoritesMovies.total_results;
      const titleSeriesTimes = [];

      for (const series of favoritesSeries.results) {
        const seriesDetails = await seriesApi.getDetails(series.id);
        const avgEpisodeTime = seriesDetails.episode_run_time.reduce((prev, curr) => prev + curr, 0);

        this.totalEpisodes += seriesDetails.number_of_episodes;
        titleSeriesTimes.push(seriesDetails.number_of_episodes * avgEpisodeTime);
      }

      this.totalSeriesLength = titleSeriesTimes.reduce((prev, curr) => prev + curr, 0);
      this.averageSeriesLength = this.totalSeriesLength / this.totalEpisodes;
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }
}
