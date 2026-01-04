import {NextFunction, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {RequestWithOptionalUser} from '../domain/interfaces/auth';
import MoviesService from '../services/movies.service';
import {SearchMoviesDTO} from '../domain/interfaces/movies';

class MoviesController {
  private readonly moviesService: MoviesService;

  constructor() {
    this.moviesService = new MoviesService();
  }

  getLatestMovies = async (req: RequestWithOptionalUser, res: Response, next: NextFunction) => {
    try {
      const {movies} = await this.moviesService.popularMovies(req.user?.userId);

      res.status(StatusCodes.OK).json(movies);
    } catch (error) {
      next(error);
    }
  };

  getSearchedMovies = async (
    req: RequestWithOptionalUser<{}, {}, {}, SearchMoviesDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {movies} = await this.moviesService.searchMovies(req.query, req.user?.userId);

      res.status(StatusCodes.OK).json(movies);
    } catch (error) {
      next(error);
    }
  };
}

export default new MoviesController();
