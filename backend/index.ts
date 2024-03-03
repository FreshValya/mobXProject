import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import watchedRouter from './src/routes/watched.routes';
import moviesRouter from './src/routes/movies.routes';
import seriesRoutes from './src/routes/series.routes';
import userRoutes from './src/routes/auth.routes';
import gimmickRoutes from './src/routes/gimmick.routes';
import {developmentErrors, notFound} from './src/handlers/errorHandlers';

const app = express();
const port = 3000;
dotenv.config();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({origin: 'http://localhost:443', credentials: true}));
app.use(
  '/api/v3',
  proxy('https://api.themoviedb.org', {
    proxyReqPathResolver: (req) => {
      return `https://api.themoviedb.org/3${req.url}`;
    },
  }),
);

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.json({info: 'Node.js, Express, and Postgres API'});
});

app.use('/api', watchedRouter);
app.use('/api', moviesRouter);
app.use('/api', seriesRoutes);
app.use('/api', userRoutes);
app.use('/api', gimmickRoutes);

app.use(notFound);

app.use(developmentErrors);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
