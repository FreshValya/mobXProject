import {action, makeObservable, observable} from 'mobx';
import {ReactNode} from 'react';

import {moviesApi} from '@api/movies';

interface Ticker {
  title: string;
  overview: string;
  releaseYear: string;
}

export class TickerStore {
  constructor() {
    makeObservable(this);
  }

  @observable ticker: Ticker = {title: '', overview: '', releaseYear: ''};
  @observable isLoading = false;
  @observable isError = false;

  @action
  async getData() {
    this.isError = false;
    this.isLoading = true;

    try {
      const randomID = Math.floor(Math.random() * 1000) + 1;
      const movieDetails = await moviesApi.getDetails(randomID);

      this.ticker.title = movieDetails.title;
      this.ticker.overview = movieDetails.overview;
      this.ticker.releaseYear = movieDetails.release_date.split('-')[0];
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }
}
