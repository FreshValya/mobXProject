import bcrypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {UserModel} from '../models/UserModel';
import {StatusCodes} from 'http-status-codes';

const YEAR_IN_HOURS = 365 * 24;
const YEAR_IN_MILLISECONDS = 365 * 24 * 60 * 60 * 1000;

class authController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, username, password} = req.body;

      const existingUser = await UserModel.findByEmail(email);

      if (existingUser) {
        return res.status(StatusCodes.CONFLICT).json({
          success: false,
          result: null,
          message: 'An account with this email has already been registered',
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      UserModel.createUser({email, username, password: hashedPassword})
        .then(() => {
          res.status(StatusCodes.CREATED).json({success: true, message: 'User registered successfully'});
        })
        .catch(() => {
          res.status(500).json({
            success: false,
            result: null,
            message: 'Registration failed',
          });
        });
    } catch (error) {
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password, remember} = req.body;
      const user = await UserModel.findByEmail(email);

      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({success: true, result: null, message: 'No account with this email has been registered'});
      }

      const isPasswordMatch = bcrypt.compareSync(password, user.password);

      if (!isPasswordMatch) {
        return res.status(StatusCodes.FORBIDDEN).json({
          success: false,
          result: null,
          message: 'Invalid credentials',
        });
      }

      const token = jwt.sign({userId: user.id, email}, process.env.JWT_SECRET, {
        expiresIn: remember ? `${YEAR_IN_HOURS}h` : '1h',
      });

      res
        .status(StatusCodes.OK)
        .cookie('wasted_token', token, {
          maxAge: remember ? YEAR_IN_MILLISECONDS : null,
          sameSite: 'lax',
          httpOnly: true,
          secure: false,
          domain: req.hostname,
          path: '/',
        })
        .json({success: true, result: null, message: 'User logged in successfully'});
    } catch (error) {
      next(error);
    }
  }

  async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      return res
        .status(StatusCodes.OK)
        .clearCookie('wasted_token', {
          maxAge: null,
          sameSite: 'none',
          httpOnly: true,
          secure: true,
          domain: req.hostname,
          path: '/',
        })
        .json({
          success: true,
          result: null,
          message: 'Successfully logout',
        });
    } catch (error) {
      next(error);
    }
  }

  async verify(_req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(StatusCodes.OK).json({success: true, result: null, message: 'Token is valid'});
    } catch (error) {
      next(error);
    }
  }
}

export default new authController();
