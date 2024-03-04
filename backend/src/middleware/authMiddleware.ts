import jwt from 'jsonwebtoken';
import {NextFunction, Response} from 'express';
import {RequestWithUser} from '../interfaces/requestWithUser';

export const verifyToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.cookies.wasted_token;

  if (!token) {
    return res.status(401).json({success: false, result: null, message: 'Authorization failed. No access token.'});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .clearCookie('wasted_token', {
          maxAge: null,
          sameSite: 'none',
          httpOnly: true,
          secure: true,
          domain: req.hostname,
          path: '/',
        })
        .json({success: false, result: null, message: 'Could not verify token'});
    }
    req.user = user;
    next();
  });
};
