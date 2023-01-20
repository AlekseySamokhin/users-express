import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { dbBooks } from '../db';

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allBooks = await dbBooks.find();

    res.status(StatusCodes.OK).json(allBooks);
  } catch (err) {
    next(err);
  }
};

const changeBookRating = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allBooks = await dbBooks.find();

    res.status(StatusCodes.OK).json(allBooks);
  } catch (err) {
    next(err);
  }
};

const bookController = {
  getAllBooks,
  changeBookRating,
};

export { bookController };
