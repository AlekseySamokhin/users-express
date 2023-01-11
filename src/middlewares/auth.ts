import { StatusCodes } from 'http-status-codes';
import type { Handler, NextFunction, Response } from 'express';

import dbUsers from '../db';

import { jwtUtils } from '../utils';

import { CustomError } from '../utils/CustomError';

import type { IAuthRequestType } from '../interfaces/authRequest';

const checkAuth: Handler = async (
  req: IAuthRequestType,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization.split(' ');

    const [typeToken, foundToken] = authHeader;

    if (!foundToken) {
      throw new CustomError({
        code: StatusCodes.UNAUTHORIZED,
        message: 'User is not authorized!',
      });
    }

    const checkToken: boolean = jwtUtils.validate(typeToken);

    if (!checkToken) {
      throw new CustomError({
        code: StatusCodes.UNAUTHORIZED,
        message: 'Token is not valid!',
      });
    }

    const { id } = jwtUtils.parse(foundToken);

    req.user = await dbUsers.findOneBy({ id });

    next();
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
