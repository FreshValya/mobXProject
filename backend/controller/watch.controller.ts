import db from '../db';
import rp from 'request-promise';
import {Request, Response} from 'express';

class WatchController {
  async addWatched(req: Request, res: Response) {
    const {media_id, media_type} = req.body;

    db.query(
      // TODO RETURN ALL FROM QUERY???
      'INSERT INTO watched_cinema (user_id, media_id, media_type) VALUES ($1, $2, $3) RETURNING media_id',
      [20175604, media_id, media_type],
      (error, results) => {
        if (error) {
          throw error;
        }

        res.status(209).send(`Media added with ID: ${results.rows[0].media_id}`);
      },
    );
  }

  async getWatched(req: Request, res: Response) {
    const {media_type} = req.query;
    const watchedMedia = await db.query(
      {
        text: `SELECT * FROM watched_cinema wc WHERE wc.user_id = $1 AND wc.media_type = $2`,
      },
      [20175604, media_type],
    );

    const media = await Promise.all(
      watchedMedia.rows.map((media) =>
        rp({
          uri: `https://api.themoviedb.org/3/${media.media_type}/${media.media_id}`,
          headers: {
            accept: 'application/json',
            Authorization: process.env.AUTH_TOKEN,
          },
        })
          .then((response) => JSON.parse(response))
          .catch((e) => {
            console.log(e);
          }),
      ),
    );

    res.status(200).json(media);
  }

  async deleteWatched(req: Request, res: Response) {
    const {media_id, media_type} = req.query;

    db.query(
      'DELETE FROM watched_cinema WHERE user_id = $1 AND media_type = $2 AND media_id = $3',
      [20175604, media_type, Number(media_id)],
      (error) => {
        if (error) {
          throw error;
        }

        res.status(200).send(`Media deleted with ID: ${media_id}`);
      },
    );
  }
}

export default new WatchController();
