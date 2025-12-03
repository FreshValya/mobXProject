import {NextFunction, Request, Response} from 'express';
import rp from 'request-promise';
import {StatusCodes} from 'http-status-codes';

class GimmickController {
  async getRandomMovieSummary(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const randomID = Math.floor(Math.random() * 1000) + 1;

      const movie = await rp({
        uri: `https://api.themoviedb.org/3/movie/${randomID}`,
        headers: {
          accept: 'application/json',
          Authorization: process.env.TMDB_AUTH_TOKEN,
        },
      }).then((response) => JSON.parse(response));

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
