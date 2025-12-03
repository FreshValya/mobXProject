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
      title: this.data.title,
      overview: this.data.overview,
      releaseYear: this.data.releaseYear,
    };
  }
}
