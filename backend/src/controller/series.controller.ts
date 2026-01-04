import {NextFunction, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import SeriesService from '../services/series.service';
import {SearchSeriesDTO} from '../domain/interfaces/series';
import {RequestWithOptionalUser} from '../domain/interfaces/auth';

class SeriesController {
  private readonly seriesService: SeriesService;

  constructor() {
    this.seriesService = new SeriesService();
  }

  getLatestSeries = async (req: RequestWithOptionalUser, res: Response, next: NextFunction) => {
    try {
      const {series} = await this.seriesService.popularSeries(req.user?.userId);

      res.status(StatusCodes.OK).json(series);
    } catch (error) {
      next(error);
    }
  };

  getSearchedSeries = async (
    req: RequestWithOptionalUser<{}, {}, {}, SearchSeriesDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {series} = await this.seriesService.searchSeries(req.query, req.user?.userId);

      res.status(StatusCodes.OK).json(series);
    } catch (error) {
      next(error);
    }
  };
}

export default new SeriesController();
