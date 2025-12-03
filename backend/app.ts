import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';
import cookieParser from 'cookie-parser';

import {developmentErrors, notFound} from './src/handlers/errorHandlers';
import router from './routes';
import transactionHandler from './src/middleware/transactionHandler';

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({origin: 'http://localhost:443', credentials: true}));
app.use(transactionHandler);
app.use(
  '/api/v3',
  proxy('https://api.themoviedb.org', {
    proxyReqPathResolver: (req) => {
      return `https://api.themoviedb.org/3${req.url}`;
    },
  }),
);
app.use(bodyParser.json());

app.use('/api', router);

app.use(notFound);
app.use(developmentErrors);

export default app;
