import bcrypt from 'bcrypt';
import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {UserModel} from '../models/UserModel';

const YEAR_IN_HOURS = 365 * 24;
const YEAR_IN_MILLISECONDS = 365 * 24 * 60 * 60 * 1000;

class authController {
  async signUp(req: Request, res: Response) {
    const {email, username, password} = req.body;

    const existingUser = await UserModel.findByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        result: null,
        message: 'An account with this email has already been registered',
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    UserModel.createUser({email, username, password: hashedPassword})
      .then(() => {
        res.status(201).json({success: true, message: 'User registered successfully'});
      })
      .catch(() => {
        res.status(500).json({
          success: false,
          result: null,
          message: 'Registration failed',
        });
      });
  }

  async signIn(req: Request, res: Response) {
    const {email, password, remember} = req.body;
    const user = await UserModel.findByEmail(email);

    if (!user) {
      return res
        .status(403)
        .json({success: true, result: null, message: 'No account with this email has been registered'});
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        result: null,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({userId: user.id, email}, process.env.JWT_SECRET, {
      expiresIn: remember ? `${YEAR_IN_HOURS}h` : '1h',
    });

    res
      .status(200)
      .cookie('wasted_token', token, {
        maxAge: remember ? YEAR_IN_MILLISECONDS : null,
        sameSite: 'lax',
        httpOnly: true,
        secure: false,
        domain: req.hostname,
        path: '/',
      })
      .json({success: true, result: null, message: 'User logged in successfully'});
  }

  async signOut(req: Request, res: Response) {
    return res
      .status(200)
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
  }

  async verify(_req: Request, res: Response) {
    return res.status(200).json({success: true, result: null, message: 'Token is valid'});
  }
}

export default new authController();
