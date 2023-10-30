import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';
import {watchedRouter} from './routes/watched.routes';
import dotenv from 'dotenv';

const app = express();
const port = 3000;
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

app.get('/api', watchedRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
