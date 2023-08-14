import {makeObservable} from 'mobx';

import {LatestSeriesResponse, seriesApi} from '@api/series';

import {QueryStore} from '@store/QueryStore';

export class SeriesStore extends QueryStore<LatestSeriesResponse> {
  constructor() {
    super();

    makeObservable(this);
  }

  apiFunction = seriesApi.getLatestSeries;
}
