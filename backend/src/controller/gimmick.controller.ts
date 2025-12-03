import {NextFunction, Request, Response} from 'express';
import rp from 'request-promise';

class GimmickController {
  async getRandomMovieSummary(_req: Request, res: Response, next: NextFunction): Promise<any> {
    const randomID = Math.floor(Math.random() * 1000) + 1;

    const movie = await rp({
      uri: `https://api.themoviedb.org/3/movie/${randomID}`,
      headers: {
        accept: 'application/json',
        Authorization: process.env.TMDB_AUTH_TOKEN,
      },
    })
      .then((response) => JSON.parse(response))
      .catch((error) => {
        next(error);
      });

    res.status(200).json({
      success: false,
      result: {
        title: movie.title || '',
        overview: movie.overview || '',
        releaseYear: movie.release_date.split('-')[0] || '',
      },
      message: 'An account with this email has already been registered',
    });
  }
}

export default new GimmickController();
