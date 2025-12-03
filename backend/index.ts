import app from './app';
import dotenv from 'dotenv';
import config from './src/config/config';
import logger from './src/utils/logger';
import nodeErrorHandler from './src/middleware/nodeErrorHandler';

dotenv.config();

const {port} = config;

if (!port) {
  throw new Error('App port is not assigned');
}

app
  .listen(+port, () => {
    logger.log('info', `Server started at localhost:${port}`);
  })
  .on('error', nodeErrorHandler);
