import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.wasted_token;

  if (!token) {
    return res.status(401).json({success: false, result: null, message: 'Authorization failed. No access token.'});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({success: false, result: null, message: 'Could not verify token'});
    }
    req.user = user;
  });
  next();
};
