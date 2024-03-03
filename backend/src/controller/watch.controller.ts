import rp from 'request-promise';
import {Request, Response} from 'express';
import {WatchedCinemaModel} from '../models/WatchedCinemaModel';
import {RequestWithUser} from '../interfaces/requestWithUser';

class WatchController {
  async addWatched(req: RequestWithUser<{}, {}, {media_id: string; media_type: 'movie' | 'tvwx '}>, res: Response) {
    const {media_id, media_type} = req.body;

    WatchedCinemaModel.create({user_id: req.user.userId, media_id, media_type}).then(() =>
      res.status(201).send({success: true, result: null, message: `Media added with ID: ${media_id}`}),
    );
  }

  async getWatched(req: RequestWithUser<{}, {}, {}, {media_type: 'movie' | 'tv'}>, res: Response) {
    const {media_type} = req.query;
    const watchedMedia = await WatchedCinemaModel.getMediaByUserIdAndMediaType(req.user.userId, media_type);

    const media = await Promise.all(
      watchedMedia.map((media) =>
        rp({
          uri: `https://api.themoviedb.org/3/${media.media_type}/${media.media_id}`,
          headers: {
            accept: 'application/json',
            Authorization: process.env.TMDB_AUTH_TOKEN,
          },
        })
          .then((response) => JSON.parse(response))
          .catch((e) => {
            console.log(e);
          }),
      ),
    );

    res.status(200).json({success: true, result: media, message: null});
  }

  async deleteWatched(req: Request<{}, {}, {}, {media_id: number; media_type: 'tv' | 'movie'}>, res: Response) {
    const {media_id, media_type} = req.query;

    WatchedCinemaModel.deleteBy({media_id, media_type}).then(() =>
      res.status(200).send({success: true, result: null, message: `Media deleted with ID: ${media_id}`}),
    );
  }
}

export default new WatchController();
