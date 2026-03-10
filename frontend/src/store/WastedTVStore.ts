import {action, makeObservable, observable} from 'mobx';

import {FavoriteResponse, favoritesApi} from '@api/favorites';

export class WastedTVStore {
  constructor() {
    makeObservable(this);
  }

  @observable data: FavoriteResponse;
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
      const {numberOfMedia, totalRuntime, averageRuntime} = await favoritesApi.getFavorites(20175604, 'tv');

      this.totalSeries = numberOfMedia;
      this.totalSeriesLength = totalRuntime;
      this.averageSeriesLength = averageRuntime;
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }
}
