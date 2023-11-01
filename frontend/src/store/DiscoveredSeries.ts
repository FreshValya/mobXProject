import {action, makeObservable, observable} from 'mobx';

import {SeriesFilter, SeriesResponse, seriesApi} from '@api/series';

import {QueryStore} from './QueryStore';

export class DiscoveredSeries extends QueryStore<SeriesResponse> {
  constructor() {
    super();

    makeObservable(this);
  }

  apiFunction = (payload: SeriesFilter) => seriesApi.getSearchedSeries(payload);

  @observable
  params: {};

  @action setParams(data: SeriesFilter) {
    this.params = {...this.params, ...data};
  }
}
