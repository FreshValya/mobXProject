import express = require('express');
import bodyParser = require('body-parser');
const app = express();
import cors = require('cors');
const port = 3000;
const db = require('./db');
let proxy = require('express-http-proxy');
import rp = require('request-promise');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(
  '/api/v3',
  proxy('https://api.themoviedb.org/3', {
    proxyReqPathResolver: (req) => {
      return `https://api.themoviedb.org/3${req.url}`;
    },
  }),
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (request, response) => {
  response.json({info: 'Node.js, Express, and Postgres API'});
});

app.get('/api/watched', async (request, response) => {
  const watchedMedia = await db.getMedia(20175604);

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

  response.status(200).json(movies);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.post('/api/watch', db.addWatchedMedia);
app.delete('/api/unwatch/:id', db.deleteWatchedMedia);
