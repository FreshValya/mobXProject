import {action, makeObservable, observable} from 'mobx';

import {FavoriteResponse, favoritesApi} from '@api/favorites';
import {SeriesDetailsResponse} from '@api/series';

export class WastedTVStore {
  constructor() {
    makeObservable(this);
  }

  @observable data: FavoriteResponse<SeriesDetailsResponse>;
  @observable isLoading = false;
  @observable isError = false;

  @observable totalSeries = 0;
  @observable totalSeriesLength = 0;
  @observable averageSeriesLength = 0;

  @action
  async getData() {
    this.isError = false;
    this.isLoading = true;

    try {
      const favoritesSeries = await favoritesApi.getFavorites<SeriesDetailsResponse>(20175604, 'tv');

      this.totalSeries = favoritesSeries.result.length;
      const titleSeriesTimes = [];
      let totalEpisodes = 0;

      for (const series of favoritesSeries.result) {
        const avgEpisodeTime = series.episode_run_time.reduce((prev, curr) => prev + curr, 0);

        totalEpisodes += series.number_of_episodes;
        titleSeriesTimes.push(series.number_of_episodes * avgEpisodeTime);
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
