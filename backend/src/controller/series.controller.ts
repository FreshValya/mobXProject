import {Response} from 'express';
import rp from 'request-promise';
import {WatchedCinemaModel} from '../models/WatchedCinemaModel';
import {RequestWithOptionalUser} from '../interfaces/requestWithUser';

class SeriesController {
  async getLatestSeries(req: RequestWithOptionalUser, res: Response) {
    const series = await rp({
      url: 'https://api.themoviedb.org/3/discover/tv',
      headers: {accept: 'application/json', Authorization: process.env.TMDB_AUTH_TOKEN},
    }).then((response) => JSON.parse(response));

    if ('user' in req) {
      const watchedSeriesId = await WatchedCinemaModel.getSeriesByUserId(req.user.userId);

      series.results.forEach((movie) => (movie.watched = watchedSeriesId.includes(movie.id)));
    }

    res.status(200).json({success: true, result: series.results, message: null});
  }
  async getSearchedSeries(req: RequestWithOptionalUser, res: Response) {
    const searchParams = req.query;

    const series = await rp({
      uri: `https://api.themoviedb.org/3/search/tv`,
      headers: {
        accept: 'application/json',
        Authorization: process.env.TMDB_AUTH_TOKEN,
      },
      qs: searchParams,
    })
      .then((response) => JSON.parse(response))
      .catch((e) => {
        console.log(e);
      });

    if ('user' in req) {
      const watchedSeriesId = await WatchedCinemaModel.getSeriesByUserId(req.user.userId);

      series.results.forEach((movie) => (movie.watched = watchedSeriesId.includes(movie.id)));
    }

    res.status(200).json({success: true, result: series.results, message: null});
  }
}

export default new SeriesController();
