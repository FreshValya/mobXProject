import db from '../db';
import rp from 'request-promise';
import {Request, Response} from 'express';

class MoviesController {
  async getLatestMovies(req: Request, res: Response) {
    const watchedMediaId = await db
      .query(
        {
          text: 'SELECT wc.media_id FROM watched_cinema wc WHERE wc.user_id = $1 AND wc.media_type = $2',
          rowMode: 'array',
        },
        [20175604, 'movie'],
      )
      .then((result) => result.rows.flat());

    const movies = await rp({
      uri: `https://api.themoviedb.org/3/discover/movie`,
      headers: {
        accept: 'application/json',
        Authorization: process.env.AUTH_TOKEN,
      },
    }).then((response) => JSON.parse(response));

    movies.results.forEach((movie) => (movie.watched = watchedMediaId.includes(movie.id)));

    res.status(200).json(movies);
  }
  async getSearchedMovies(req: Request, res: Response) {
    const searchParams = req.query;

    const watchedMediaId = await db
      .query(
        {
          text: 'SELECT wc.media_id FROM watched_cinema wc WHERE wc.user_id = $1 AND wc.media_type = $2',
          rowMode: 'array',
        },
        [20175604, 'movie'],
      )
      .then((result) => result.rows.flat());

    const movies = await rp({
      uri: `https://api.themoviedb.org/3/search/movie`,
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

    movies.results.forEach((movie) => (movie.watched = watchedMediaId.includes(movie.id)));

    res.status(200).json(movies);
  }
}

export default new MoviesController();
