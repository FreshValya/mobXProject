import {action, makeObservable, observable} from 'mobx';
import {moviesApi} from '../api/movies';
import {ReactNode} from 'react';

interface Ticker {
  title: string;
  overview: string;
  releaseDate: string;
}

export class TickerStore {
  constructor() {
    makeObservable(this);
  }

  @observable ticker: Ticker = {title: '', overview: '', releaseDate: ''};
  @observable isLoading = false;
  @observable isError = false;

  @action
  async getData() {
    this.isError = false;
    this.isLoading = true;

    try {
      const randomID = Math.floor(Math.random() * 1000) + 1;
      const movieDetails = await moviesApi.getDetails(randomID);
      console.log(movieDetails);

      this.ticker.title = movieDetails.title;
      this.ticker.overview = movieDetails.overview;
      this.ticker.releaseDate = movieDetails.release_date;
    } catch (error) {
      this.isError = true;
      console.error(`Error happened: ${error}`);
    } finally {
      this.isLoading = false;
    }
  }
}
