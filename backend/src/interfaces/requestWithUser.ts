import {UserType} from '../models/UserModel';
import {Request} from 'express';
import * as core from 'express-serve-static-core';
export interface RequestWithUser<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>,
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user: {userId: UserType['id']; email: UserType['email']};
}

export interface RequestWithOptionalUser<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>,
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user?: {userId: UserType['id']; email: UserType['email']};
}
