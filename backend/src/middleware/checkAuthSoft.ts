import jwt from 'jsonwebtoken';
import {NextFunction, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {RequestWithOptionalUser} from '../domain/interfaces/auth';

export const checkAuthSoft = (req: RequestWithOptionalUser, res: Response, next: NextFunction) => {
  const token = req.cookies.wasted_token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Could not verify token'});
      }

      req.user = user;
    });
  }

  next();
};
