/* eslint-disable no-console */
import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  try {
    console.log(12345678);
    // Error handling middleware functionality
    console.log(`error ${err.message}`); // log the error
    const status = err.status || 400;
    // send back an easily understandable error message to the caller
    res.status(status).send(err.message);
  } catch {
    next(err);
  }
};

export default errorHandler;
