import { StatusCodes } from 'http-status-codes';
import type { Request, Response } from 'express';

import HttpError from '../utils/httpError';
import config from '../config';

import type IHttpError from '../interfaces/resError';

const { name, error } = config.server;

const errorHandler = (err: Error, req: Request, res: Response) => {
  const errObject = {} as IHttpError;

  if (err instanceof HttpError) {
    errObject.code = err.code;
    errObject.name = err.name;
    errObject.message = err.message;
  }

  res.status(errObject.code || StatusCodes.INTERNAL_SERVER_ERROR).send({
    name: errObject.name || name,
    message: errObject.message || error,
  });
};

export default errorHandler;
