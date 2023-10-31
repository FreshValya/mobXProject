import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';

import watchedRouter from './routes/watched.routes';
import moviesRouter from './routes/movies.routes';
import seriesRoutes from './routes/series.routes';

const app = express();
const port = 3000;
dotenv.config();

app.use(cors());
app.use(
  '/api/v3',
  proxy('https://api.themoviedb.org', {
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

app.use('/api', watchedRouter);
app.use('/api', moviesRouter);
app.use('/api', seriesRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
