import {NextFunction, Response} from 'express';
import {WatchedCinemaModel} from '../models/WatchedCinemaModel';
import {RequestWithOptionalUser} from '../interfaces/requestWithUser';
import {TMDBMoviesResponse} from '../domain/entities/TMDB/movies';
import {StatusCodes} from 'http-status-codes';
import {Movie} from '../domain/entities/movies';

class MoviesController {
  async getLatestMovies(req: RequestWithOptionalUser, res: Response, next: NextFunction) {
    try {
      const TMDBMoviesList = await fetch(`https://api.themoviedb.org/3/discover/movie`, {
        headers: {
          accept: 'application/json',
          Authorization: process.env.TMDB_AUTH_TOKEN,
        },
      }).then((response) => response.json() as TMDBMoviesResponse);

      // TODO wrap into helper
      // is actual??
      const watchedMediaId = req.user?.userId ? await WatchedCinemaModel.getMoviesByUserId(req.user.userId) : [];

      const movies: Array<Movie> = TMDBMoviesList.results.map((TMDBMovie) => ({
        ...TMDBMovie,
        watched: watchedMediaId.includes(TMDBMovie.id),
      }));

      res.status(StatusCodes.OK).json(movies);
    } catch (error) {
      next(error);
    }
  }

  async getSearchedMovies(req: RequestWithOptionalUser, res: Response, next: NextFunction) {
    try {
      const searchParams = new URLSearchParams(req.query);

      const TMDBMoviesList = await fetch(`https://api.themoviedb.org/3/search/movie?${searchParams}`, {
        headers: {
          accept: 'application/json',
          Authorization: process.env.TMDB_AUTH_TOKEN,
        },
      }).then((response) => response.json() as TMDBMoviesResponse);

      const watchedMediaId = req.user?.userId ? await WatchedCinemaModel.getMoviesByUserId(req.user.userId) : [];

      const movies = TMDBMoviesList.results.map((TMDBMovie) => ({
        ...TMDBMovie,
        watched: watchedMediaId.includes(TMDBMovie.id),
      }));

      res.status(StatusCodes.OK).json(movies);
    } catch (error) {
      next(error);
    }
  }
}

export default new MoviesController();
