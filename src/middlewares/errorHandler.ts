/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';
import type { NextFunction, Request, Response } from 'express';

import { CustomError } from '../utils/CustomError';
import config from '../config';

const {
  server: { name, error },
} = config;

interface ICustomErrorType {
  code: number;
  name: string;
  message: string;
}

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction): void => {
  const customError = {} as ICustomErrorType;

  if (err instanceof CustomError) {
    customError.code = err.code;
    customError.name = err.name;
    customError.message = err.message;
  }

  res.status(customError.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
    name: customError.name || name,
    message: customError.message || error,
  });
};

export { errorHandler };
