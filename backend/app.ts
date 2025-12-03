import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import routes from './routes';
import transactionHandler from './src/middleware/transactionHandler';
import genericErrorHandler from './src/middleware/genericErrorHandler';

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({origin: 'http://localhost:443', credentials: true}));
app.use(transactionHandler);

app.use(bodyParser.json());

app.use('/api', routes);
// TODO figure out why i wrote this
// app.use(
//   '/api/v3',
//   proxy('https://api.themoviedb.org', {
//     proxyReqPathResolver: (req) => {
//       return `https://api.themoviedb.org/3${req.url}`;
//     },
//   }),
// );

app.use(genericErrorHandler);

export default app;
