import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import type { Handler, NextFunction, Response } from 'express';

import dbUsers from '../db';

import { message, jwtUtils } from '../utils';

import HttpError from '../utils/httpError';

import type IAuthRequest from '../interfaces/reqAuth';

const checkAuth: Handler = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization.split(' ');

    const [typeToken, foundToken] = authHeader;

    if (!foundToken) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED,
        message.errors.USER_NOT_AUTH,
      );
    }

    const checkToken: boolean = jwtUtils.validate(typeToken);

    if (!checkToken) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED,
        message.errors.TOKEN_NOT_VALID,
      );
    }

    const { id } = jwtUtils.parse(foundToken);

    req.user = await dbUsers.findOneBy({ id });

    next();
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
