import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {TMDBMovie} from '../domain/entities/TMDB/movies';

class GimmickController {
  async getRandomMovieSummary(_req: Request, res: Response, next: NextFunction) {
    try {
      const randomID = Math.floor(Math.random() * 1000) + 1;

      const movie = await fetch(`https://api.themoviedb.org/3/movie/${randomID}`, {
        headers: {
          accept: 'application/json',
          Authorization: process.env.TMDB_AUTH_TOKEN,
        },
      }).then((response) => response.json() as TMDBMovie);

      res.status(StatusCodes.OK).json({
        title: movie.title || '',
        overview: movie.overview || '',
        releaseYear: movie.release_date.split('-')[0] || '',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new GimmickController();
