import type { Handler, NextFunction, Response } from 'express';

import dbUsers from '../db';

import token from '../utils/jwtUtils';

import type IAuthRequest from '../interfaces/reqAuth';

import { errors } from '../constants';

const checkAuth: Handler = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization.split(' ');

    const [typeToken, foundToken] = authHeader;

    if (typeToken.toLowerCase() !== 'bearer') {
      throw new Error(errors.TOKEN_NOT_VALID);
    }

    if (!token) {
      throw new Error(errors.USER_NOT_AUTH);
    }

    const { id } = token.parse(foundToken);

    req.user = await dbUsers.findOneBy({ id });

    next();
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
