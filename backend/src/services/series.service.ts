import {TMDBSeries, TMDBSeriesResponse} from '../domain/entities/TMDB/series';
import {WatchedCinemaModel} from '../models/WatchedCinemaModel';
import {Series} from '../domain/entities/series';
import {SearchSeriesDTO} from '../domain/interfaces/series';
import config from '../config/config';

export default class SeriesService {
  async popularSeries(userId?: number) {
    const TMDBSeriesList = await fetch('https://api.themoviedb.org/3/discover/tv', {
      headers: {
        accept: 'application/json',
        Authorization: config.TMDB.authToken,
      },
    }).then((response) => response.json() as unknown as TMDBSeriesResponse);

    const series = await this.markWatchedSeries(TMDBSeriesList.results, userId);

    return {series};
  }

  async searchSeries(queryParams: SearchSeriesDTO, userId?: number) {
    // TODO add protection to received query params
    const searchParams = new URLSearchParams(queryParams);

    const TMDBSeriesList = await fetch(`https://api.themoviedb.org/3/search/tv?${searchParams}`, {
      headers: {
        accept: 'application/json',
        Authorization: config.TMDB.authToken,
      },
    }).then((response) => response.json() as unknown as TMDBSeriesResponse);

    const series = await this.markWatchedSeries(TMDBSeriesList.results, userId);

    return {series};
  }

  private async markWatchedSeries(TMDBSeries: Array<TMDBSeries>, userId?: number) {
    const watchedSeriesId = await WatchedCinemaModel.getSeriesByUserId(userId);

    return TMDBSeries.map<Series>((TMDBSeries) => ({
      ...TMDBSeries,
      watched: watchedSeriesId.includes(TMDBSeries.id),
    }));
  }
}
