/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';
import type { NextFunction, Request, Response } from 'express';

import { CustomError } from '../utils/CustomError';
import config from '../config';

const {
  server: { name, error },
} = config;

interface ICustomErrorPayloadType {
  code: number;
  message: string;
}

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction): void => {
  const customError = {} as ICustomErrorPayloadType;

  if (err instanceof CustomError) {
    customError.code = err.payload.code;
    customError.message = err.payload.message;
  }

  res.status(customError.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
    name: customError.code || name,
    message: customError.message || error,
  });
};

export { errorHandler };
