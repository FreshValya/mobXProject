import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {SignInDTO, SignUpDTO} from '../domain/interfaces/auth';
import AuthService from '../services/auth.service';

const YEAR_IN_MILLISECONDS = 365 * 24 * 60 * 60 * 1000;

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  signUp = async (req: Request<{}, {}, SignUpDTO>, res: Response, next: NextFunction) => {
    try {
      const {user} = await this.authService.signUp(req.body);

      res.status(StatusCodes.CREATED).json({message: `User ${user} created successfully`});
    } catch (error) {
      next(error);
    }
  };

  signIn = async (req: Request<{}, {}, SignInDTO>, res: Response, next: NextFunction) => {
    try {
      const {token} = await this.authService.signIn(req.body);

      res
        .status(StatusCodes.OK)
        .cookie('wasted_token', token, {
          maxAge: req.body.remember ? YEAR_IN_MILLISECONDS : null,
          sameSite: 'lax',
          httpOnly: true,
          secure: false,
          domain: req.hostname,
          path: '/',
        })
        .json({message: 'User logged in successfully'});
    } catch (error) {
      next(error);
    }
  };

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
