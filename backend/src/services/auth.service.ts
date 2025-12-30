import {SignInDTO, SignUpDTO} from '../domain/interfaces/auth';
import {UserModel} from '../models/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import {HTTPError} from '../domain/exceptions/HTTPError';
import {StatusCodes} from 'http-status-codes';

// TODO move later
const YEAR_IN_HOURS = 365 * 24;

export default class AuthService {
  async signUp(signUpDTO: SignUpDTO) {
    const existingUser = await UserModel.findByEmail(signUpDTO.email);

    if (existingUser) {
      throw new HTTPError('An account with this email has already been registered', StatusCodes.CONFLICT);
    }

    const hashedPassword = bcrypt.hashSync(signUpDTO.password, 10);

    const userRecord = await UserModel.createUser({
      email: signUpDTO.email,
      username: signUpDTO.username,
      password: hashedPassword,
    });

    return {user: userRecord.username};
  }

  async signIn(signInDTO: SignInDTO) {
    const existingUser = await UserModel.findByEmail(signInDTO.email);

    if (!existingUser) {
      throw new HTTPError('No account with this email has been registered', StatusCodes.NOT_FOUND);
    }

    const isPasswordMatch = bcrypt.compareSync(signInDTO.password, existingUser.password);

    if (!isPasswordMatch) {
      throw new HTTPError('Passwords do not match', StatusCodes.FORBIDDEN);
    }

    const token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      config.auth.accessTokenSecretKey,
      {
        expiresIn: signInDTO.remember ? `${YEAR_IN_HOURS}h` : '1h',
      },
    );

    return {token};
  }
}
