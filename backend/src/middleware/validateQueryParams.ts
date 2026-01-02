import {z} from 'zod';
import {Request, Response, NextFunction} from 'express';
import logger from '../utils/logger';

export function validateQueryParams<T>(schema: z.Schema<T>) {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      logger.log('info', 'Validating schema');

      logger.log('debug', 'Validating query params', req.query);
      const value = await schema.parse(req.query);
      logger.log('debug', 'Validation response', value);

      next();
    } catch (error) {
      next(error);
    }
  };
}
