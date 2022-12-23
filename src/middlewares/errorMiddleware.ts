/* eslint-disable no-console */
import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.log('In error handler!');
  const status = err.status || 400;
  return res.status(status).send(err.message);
};

export default errorHandler;
