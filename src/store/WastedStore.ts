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

  @observable totalMovies = 0;
  @observable totalMoviesLength = 0;
  @observable averageMoviesLength = 0;

  @observable totalSeries = 0;
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
      this.averageMoviesLength = parseFloat((this.totalMoviesLength / this.totalMovies).toFixed(2)) || 0;

      const favoritesSeries = await favoritesApi.getFavorites(20175604, 'tv');

      this.totalSeries = favoritesSeries.total_results;
      const titleSeriesTimes = [];
      let totalEpisodes = 0;

      for (const series of favoritesSeries.results) {
        const seriesDetails = await seriesApi.getDetails(series.id);
        const avgEpisodeTime = seriesDetails.episode_run_time.reduce((prev, curr) => prev + curr, 0);

        totalEpisodes += seriesDetails.number_of_episodes;
        titleSeriesTimes.push(seriesDetails.number_of_episodes * avgEpisodeTime);
      }

      this.totalSeriesLength = titleSeriesTimes.reduce((prev, curr) => prev + curr, 0);
      this.averageSeriesLength = parseFloat((this.totalSeriesLength / totalEpisodes).toFixed(2)) || 0;
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }
}
