import db from '../db';
import rp from 'request-promise';
import {Request, Response} from 'express';

class WatchController {
  async postWatched(req: Request, res: Response) {
    const {media_id, media_type, favorite} = req.body;

    if (favorite) {
      db.query(
        'INSERT INTO watched_cinema (user_id, media_id, media_type) VALUES (20175604, $1, $2) RETURNING media_id',
        [media_id, media_type],
        (error, results) => {
          if (error) {
            throw error;
          }

          res.status(209).send(`Media added with ${results.rows[0].media_id}`);
        },
      );
    } else {
      db.query('DELETE FROM watched_cinema WHERE media_id = $1 RETURNING media_id', [media_id], (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`Media deleted with ID: ${results.rows[0].media_id}`);
      });
    }
  }
  async getWatched(req: Request, res: Response) {
    const watchedMedia = await db.query(
      {
        text: `SELECT * FROM watched_cinema wc WHERE wc.user_id = $1`,
      },
      [20175604],
    );

    const movies = await Promise.all(
      watchedMedia.rows.map((media) =>
        rp({
          uri: `https://api.themoviedb.org/3/movie/${media.media_id}`,
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

    res.status(200).json(movies);
  }
}

export default new WatchController();
