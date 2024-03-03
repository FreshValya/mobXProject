import rp from 'request-promise';
import {Response} from 'express';
import {WatchedCinemaModel} from '../models/WatchedCinemaModel';
import {RequestWithOptionalUser} from '../interfaces/requestWithUser';

class MoviesController {
  async getLatestMovies(req: RequestWithOptionalUser, res: Response) {
    const movies = await rp({
      uri: `https://api.themoviedb.org/3/discover/movie`,
      headers: {
        accept: 'application/json',
        Authorization: process.env.TMDB_AUTH_TOKEN,
      },
    }).then((response) => JSON.parse(response));

    if ('user' in req) {
      // TODO wrap into helper
      const watchedMediaId = await WatchedCinemaModel.getMoviesByUserId(req.user.userId);

      movies.results.forEach((movie) => {
        movie.watched = watchedMediaId.includes(movie.id);
      });
    }

    res.status(200).json({success: true, result: movies.results, message: null});
  }
  async getSearchedMovies(req: RequestWithOptionalUser, res: Response) {
    const searchParams = req.query;

    const movies = await rp({
      uri: `https://api.themoviedb.org/3/search/movie`,
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
      const watchedMediaId = await WatchedCinemaModel.getMoviesByUserId(req.user.userId);

      movies.results.forEach((movie) => (movie.watched = watchedMediaId.includes(movie.id)));
    }

    res.status(200).json({success: true, result: movies.results, message: null});
  }
}

export default new MoviesController();
