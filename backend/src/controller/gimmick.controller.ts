import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import GimmickService from '../services/gimmick.service';

class GimmickController {
  private readonly gimmickService: GimmickService;

  constructor() {
    this.gimmickService = new GimmickService();
  }

  getRandomMovieSummary = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const movieSummary = await this.gimmickService.randomMovieSummary();

      res.status(StatusCodes.OK).json(movieSummary);
    } catch (error) {
      next(error);
    }
  };
}

export default new GimmickController();
