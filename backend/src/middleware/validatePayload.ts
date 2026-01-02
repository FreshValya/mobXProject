import {z} from 'zod';
import {Request, Response, NextFunction} from 'express';
import logger from '../utils/logger';

export function validatePayload<T>(schema: z.Schema<T>) {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      logger.log('info', 'Validating schema');

      logger.log('debug', 'Validating payload', req.body);
      const value = await schema.parse(req.body);
      logger.log('debug', 'Validation response', value);

      next();
    } catch (error) {
      next(error);
    }
  };
}
