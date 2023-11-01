import {makeObservable} from 'mobx';

import {SeriesResponse, seriesApi} from '@api/series';

import {QueryStore} from './QueryStore';

export class SeriesStore extends QueryStore<SeriesResponse> {
  constructor() {
    super();

    makeObservable(this);
  }

  apiFunction = seriesApi.getLatestSeries;
}
