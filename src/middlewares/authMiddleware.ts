import type { Handler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import userRepository from '../db';

import token from '../utils/jwt';

export interface IGetUserAuthInfoRequest extends Request {
  user: object;
}

const checkAuth: Handler = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization.split(' ');

    const [bearer, foundToken] = authHeader;

    if (bearer.toLowerCase() !== 'bearer') {
      throw new Error('Токен не валиден');
    }

    if (!token) {
      throw new Error('Пользователь не авторизован!');
    }

    const { id } = token.parse(foundToken);

    const user = await userRepository.findOneBy({ id });

    req.user = user;

    next();
  } catch {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: 'Пользователь не авторизован!' });
  }
};

export default checkAuth;
