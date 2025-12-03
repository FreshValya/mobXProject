import errors from '../resources/lang/errors.json';
import dotenv from 'dotenv';

dotenv.config();

const isDevEnv = process.env.NODE_ENV === 'development';

export default {
  errors,
  port: isDevEnv ? process.env.DEV_APP_PORT : process.env.APP_PORT,
  environment: process.env.NODE_ENV || 'development',
  logging: {
    level: process.env.LOGGING_LEVEL || 'info',
    maxSize: process.env.LOGGING_MAX_SIZE || '20m',
    maxFiles: process.env.LOGGING_MAX_FILES || '7d',
    datePattern: process.env.LOGGING_DATE_PATTERN || 'YYYY-MM-DD',
    logFileGenerationSupport: process.env.LOG_FILE_GENERATION_SUPPORT || 'true',
  },
};
