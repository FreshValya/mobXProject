const Pool = require('pg').Pool;
//TODO: add normal env handling - redundant dotenv imports
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getMedia = async (userId) => {
  return await pool.query({
    rowMode: 'object',
    text: `SELECT * FROM watched_cinema wc WHERE wc.user_id = ${userId}`,
  });
};

const addWatchedMedia = (request, response) => {
  const {media_id, media_type} = request.body;
  console.log(request.body);

  pool.query(
    'INSERT INTO watched_cinema (user_id, media_id, media_type) VALUES (20175604, $1, $2)',
    [media_id, media_type],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      response.status(201).send(`Media added with ID`);
    },
  );
};

const deleteWatchedMedia = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM watched_cinema WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Media deleted with ID: ${id}`);
  });
};

module.exports = {
  getMedia,
  addWatchedMedia,
  deleteWatchedMedia,
};
