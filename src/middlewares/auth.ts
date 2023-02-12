/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';
import type { Handler } from 'express';

import { dbUsers } from '../db';

import { jwtUtils } from '../utils';

import { CustomError } from '../utils/CustomError';

import type { IAuthRequestType } from '../interfaces/authRequest';

const checkAuth: Handler = async (
  req: IAuthRequestType,
  res,
  next,
) => {
  try {
    if (!req.headers.authorization) {
      throw new CustomError({
        code: StatusCodes.UNAUTHORIZED,
        message: 'User was not authorized!',
      });
    }

    const infoToken = req.headers.authorization.split(' ');

    const [typeToken, foundToken] = infoToken;

    const { id } = jwtUtils.parse(foundToken);

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

    req.user = await dbUsers.findOneBy({ id });

    next();
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
