import jwt from 'jsonwebtoken';
import {NextFunction, Response} from 'express';
import {RequestWithOptionalUser} from '../interfaces/requestWithUser';

export const checkIsToken = (req: RequestWithOptionalUser, res: Response, next: NextFunction) => {
  const token = req.cookies.wasted_token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({success: false, result: null, message: 'Could not verify token'});
      }

      req.user = user;
    });
  }

  next();
};
