const db = require('../db');
const rp = require('request-promise');

class WatchController {
  async createWatched(req, res) {
    const {media_id, media_type} = req.body;
    console.log(req.body);

    db.query(
      'INSERT INTO watched_cinema (user_id, media_id, media_type) VALUES (20175604, $1, $2)',
      [media_id, media_type],
      (error, results) => {
        if (error) {
          throw error;
        }
        console.log(results);
        res.status(201).send(`Media added with ID`);
      },
    );
  }
  async getWatched(req, res) {
    const watchedMedia = await db.query(
      {
        text: `SELECT * FROM watched_cinema wc WHERE wc.user_id = $1`,
      },
      [20175604],
    );

    console.log(watchedMedia.rows);

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
  async deleteWatched(req, res) {
    const id = parseInt(req.params.id);

    db.query('DELETE FROM watched_cinema WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Media deleted with ID: ${id}`);
    });
  }
}

export default new WatchController();
