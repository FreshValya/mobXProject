const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const watchedRouter = require('./routes/watched.routes');

const app = express();
const port = 3000;
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

app.get('/api', watchedRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
