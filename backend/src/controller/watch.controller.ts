import {NextFunction, Response} from 'express';
import {WatchedCinemaModel} from '../models/WatchedCinemaModel';
import {RequestWithUser} from '../domain/interfaces/requestWithUser';
import {StatusCodes} from 'http-status-codes';

class WatchController {
  async addWatched(
    req: RequestWithUser<{}, {}, {media_id: string; media_type: 'movie' | 'tv'}>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const {media_id, media_type} = req.body;

      WatchedCinemaModel.create({user_id: req.user.userId, media_id, media_type}).then(() =>
        res
          .status(StatusCodes.CREATED)
          .send({success: true, result: null, message: `Media added with ID: ${media_id}`}),
      );
    } catch (error) {
      next(error);
    }
  }

  async getWatched(req: RequestWithUser<{}, {}, {}, {media_type: 'movie' | 'tv'}>, res: Response, next: NextFunction) {
    try {
      const {media_type} = req.query;
      const watchedMedia = await WatchedCinemaModel.getMediaByUserIdAndMediaType(req.user.userId, media_type);

      const media = await Promise.all(
        watchedMedia.map((media) =>
          fetch(`https://api.themoviedb.org/3/${media.media_type}/${media.media_id}`, {
            headers: {
              accept: 'application/json',
              Authorization: process.env.TMDB_AUTH_TOKEN,
            },
          }).then((response) => response.json()),
        ),
      );

      res.status(StatusCodes.OK).json({success: true, result: media, message: null});
    } catch (error) {
      next(error);
    }
  }

  async deleteWatched(
    req: RequestWithUser<{}, {}, {}, {media_id: number; media_type: 'tv' | 'movie'}>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const {media_id, media_type} = req.query;

      WatchedCinemaModel.deleteBy({media_id, media_type, user_id: req.user.userId}).then(() =>
        res.status(StatusCodes.OK).send({success: true, result: null, message: `Media deleted with ID: ${media_id}`}),
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new WatchController();
