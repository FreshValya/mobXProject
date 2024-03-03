import bcrypt from 'bcrypt';
import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {UserModel} from '../models/UserModel';

class authController {
  async signUp(req: Request, res: Response) {
    const {email, username, password} = req.body;

    // TODO rewrite query
    // const existingUser = await db
    //   .query('SELECT u.* from users u WHERE u.email = $1', [email])
    //   .then((result) => result.rowCount > 0);
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

    // db.query(
    //   'INSERT INTO users (email, username, password) VALUES ($1, $2, $3)',
    //   [email, username, hashedPassword],
    //   (error) => {
    //     if (error) {
    //       res.status(500).json({
    //         success: false,
    //         result: null,
    //         message: 'Registration failed',
    //       });
    //     }
    //
    //     res.status(201).json({success: true, message: 'User registered successfully'});
    //   },
    // );
  }

  async signIn(req: Request, res: Response) {
    const {email, password} = req.body;

    // TODO rewrite query
    // const user = await db
    //   .query('SELECT u.* from users u WHERE u.email =  $1', [email])
    //   .then((result) => result.rows[0]);
    const user = await UserModel.findByEmail(email);

    if (!user) {
      return res
        .status(403)
        .json({success: true, result: null, message: 'No account with this email has been registered'});
    }

    // TODO try handle errors via express
    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        result: null,
        message: 'Invalid credentials.',
      });
    }

    const token = jwt.sign({userId: user.id, email}, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.cookie('wasted_token', token, {
      // maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : null,
      sameSite: 'lax',
      httpOnly: true,
      secure: false,
      domain: req.hostname,
      path: '/',
    });

    return res.status(200).json({success: true, result: null, message: 'User Logged in Successfully'});
  }

  async signOut(req: Request, res: Response) {
    return res
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
}

export default new authController();
