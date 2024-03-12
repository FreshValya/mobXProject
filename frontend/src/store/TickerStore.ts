import {computed, makeObservable} from 'mobx';

import {RandomMovieResponse, moviesApi} from '@api/movies';

import {QueryStore} from './QueryStore';

interface Ticker {
  title: string;
  overview: string;
  releaseYear: string;
}

export class TickerStore extends QueryStore<RandomMovieResponse> {
  constructor() {
    super();

    makeObservable(this);
  }

  apiFunction = () => moviesApi.getRandomMovie();

  @computed
  get ticker(): Ticker {
    return {
      title: this.data.result.title,
      overview: this.data.result.overview,
      releaseYear: this.data.result.releaseYear,
    };
  }
}
