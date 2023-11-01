import {Request, Response} from 'express';
import db from '../db';
import rp from 'request-promise';

class SeriesController {
  async getLatestSeries(req: Request, res: Response) {
    const watchedSeriesId = await db
      .query(
        {
          text: `SELECT wc.media_id FROM watched_cinema wc WHERE wc.user_id = $1 AND wc.media_type = $2`,
          rowMode: 'array',
        },
        [20175604, 'tv'],
      )
      .then((result) => result.rows.flat());

    const series = await rp({
      url: 'https://api.themoviedb.org/3/discover/tv',
      headers: {accept: 'application/json', Authorization: process.env.AUTH_TOKEN},
    })
      .then((response) => JSON.parse(response))
      .catch((error) => console.log(error));

    series.results.forEach((tv) => (tv.watched = watchedSeriesId.includes(tv.id)));

    res.status(200).json(series);
  }
  async getSearchedSeries(req: Request, res: Response) {
    const searchParams = req.query;

    const watchedMediaId = await db
      .query(
        {
          text: 'SELECT wc.media_id FROM watched_cinema wc WHERE wc.user_id = $1 AND wc.media_type = $2',
          rowMode: 'array',
        },
        [20175604, 'tv'],
      )
      .then((result) => result.rows.flat());

    const series = await rp({
      uri: `https://api.themoviedb.org/3/search/tv`,
      headers: {
        accept: 'application/json',
        Authorization: process.env.AUTH_TOKEN,
      },
      qs: searchParams,
    })
      .then((response) => JSON.parse(response))
      .catch((e) => {
        console.log(e);
      });

    console.log(series);

    series.results.forEach((series) => (series.watched = watchedMediaId.includes(series.id)));

    res.status(200).json(series);
  }
}

export default new SeriesController();
