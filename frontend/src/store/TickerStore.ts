import {computed, makeObservable} from 'mobx';

import {MovieDetailsResponse, moviesApi} from '@api/movies';

import {QueryStore} from './QueryStore';

interface Ticker {
  title: string;
  overview: string;
  releaseYear: string;
}

export class TickerStore extends QueryStore<MovieDetailsResponse> {
  constructor() {
    super();

    makeObservable(this);
  }

  randomID = Math.floor(Math.random() * 1000) + 1;
  apiFunction = () => moviesApi.getDetails(this.randomID);

  @computed
  get ticker(): Ticker {
    return {
      title: this.data.title || '',
      overview: this.data.overview || '',
      releaseYear: this.data.release_date.split('-')[0] || '',
    };
  }
}
