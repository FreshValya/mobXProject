import {makeObservable} from 'mobx';

import {TVShow, seriesApi} from '@api/series';

import {QueryStore} from './QueryStore';

export class SeriesStore extends QueryStore<Array<TVShow>> {
  constructor() {
    super();

    makeObservable(this);
  }

  apiFunction = seriesApi.getLatestSeries;
}
