import {NextFunction, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import WatchedService from '../services/watched.service';
import {RequestWithUser} from '../domain/interfaces/auth';
import {MediaType, WatchedMediaDTO} from '../domain/interfaces/watched';

class WatchedController {
  private readonly watchedService: WatchedService;

  constructor() {
    this.watchedService = new WatchedService();
  }

  addWatched = async (req: RequestWithUser<{}, {}, WatchedMediaDTO>, res: Response, next: NextFunction) => {
    const {media_id, media_type} = req.body;

    try {
      await this.watchedService.markMediaAsWatched({
        userId: req.user.userId,
        mediaId: media_id,
        mediaType: media_type,
      });

      res.status(StatusCodes.CREATED).send(`${media_type} added with ID: ${media_id}`);
    } catch (error) {
      next(error);
    }
  };

  getWatched = async (req: RequestWithUser<{}, {}, {}, {media_type: MediaType}>, res: Response, next: NextFunction) => {
    try {
      const {media} = await this.watchedService.watchedMedia(req.user.userId, req.query.media_type);

      res.status(StatusCodes.OK).json(media);
    } catch (error) {
      next(error);
    }
  };

  deleteWatched = async (req: RequestWithUser<{}, {}, {}, WatchedMediaDTO>, res: Response, next: NextFunction) => {
    try {
      // TODO use body instead of query
      const {media_id, media_type} = req.query;

      await this.watchedService.unmarkWatchedMedia({
        userId: req.user.userId,
        mediaType: media_type,
        mediaId: media_id,
      });

      res.status(StatusCodes.OK).send(`${media_type} deleted with ID: ${media_id}`);
    } catch (error) {
      next(error);
    }
  };
}

export default new WatchedController();
