import type { Handler, NextFunction, Response } from 'express';

import dbUsers from '../db';

import { message, jwtUtils } from '../utils';

import type IAuthRequest from '../interfaces/reqAuth';

const checkAuth: Handler = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization.split(' ');

    const [typeToken, foundToken] = authHeader;

    if (!foundToken) {
      throw new Error(message.errors.USER_NOT_AUTH);
    }

    const checkToken = jwtUtils.validate(typeToken);

    if (!checkToken) {
      throw new Error(message.errors.TOKEN_NOT_VALID);
    }

    const { id } = jwtUtils.parse(foundToken);

    req.user = await dbUsers.findOneBy({ id });

    return next();
  } catch (err) {
    return next(err);
  }
};

export default checkAuth;
