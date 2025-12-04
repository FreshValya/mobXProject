import {NextFunction, Response} from 'express';
import {WatchedCinemaModel} from '../models/WatchedCinemaModel';
import {RequestWithOptionalUser} from '../interfaces/requestWithUser';
import {TMDBSeriesResponse} from '../domain/entities/TMDB/series';
import {StatusCodes} from 'http-status-codes';
import {Series} from '../domain/entities/series';

class SeriesController {
  async getLatestSeries(req: RequestWithOptionalUser, res: Response, next: NextFunction) {
    try {
      const TMDBSeriesList = await fetch('https://api.themoviedb.org/3/discover/tv', {
        headers: {
          accept: 'application/json',
          Authorization: process.env.TMDB_AUTH_TOKEN,
        },
      }).then((response) => response.json() as TMDBSeriesResponse);

      const watchedSeriesId = req.user?.userId ? await WatchedCinemaModel.getSeriesByUserId(req.user.userId) : [];

      const series: Array<Series> = TMDBSeriesList.results.map((TMDBSeries) => ({
        ...TMDBSeries,
        watched: watchedSeriesId.includes(TMDBSeries.id),
      }));

      res.status(StatusCodes.OK).json(series);
    } catch (error) {
      next(error);
    }
  }

  async getSearchedSeries(req: RequestWithOptionalUser, res: Response, next: NextFunction) {
    try {
      // TODO add protection to received query params
      const searchParams = new URLSearchParams(req.query);

      const TMDBSeriesList = await fetch(`https://api.themoviedb.org/3/search/tv?${searchParams}`, {
        headers: {
          accept: 'application/json',
          Authorization: process.env.TMDB_AUTH_TOKEN,
        },
      }).then((response) => response.json() as TMDBSeriesResponse);

      const watchedSeriesId = req.user?.userId ? await WatchedCinemaModel.getSeriesByUserId(req.user.userId) : [];

      const series: Array<Series> = TMDBSeriesList.results.map((TMDBSeries) => ({
        ...TMDBSeries,
        watched: watchedSeriesId.includes(TMDBSeries.id),
      }));

      res.status(StatusCodes.OK).json(series);
    } catch (error) {
      next(error);
    }
  }
}

export default new SeriesController();
