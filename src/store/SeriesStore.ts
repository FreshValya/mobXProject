import axios from 'axios';
import {action, computed, flow, makeObservable, observable} from 'mobx';

import {LatestSeriesResponse, seriesApi} from '@api/series';

export class SeriesStore {
  constructor() {
    makeObservable(this);
  }

  @observable data: LatestSeriesResponse | {} = {};
  @observable isLoading = false;
  @observable isError = false;

  @action
  async getData() {
    this.isError = false;
    this.isLoading = true;

    try {
      this.data = await seriesApi.getLatestSeries();
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }
}
