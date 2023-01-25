import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// import { loadGenres, loadBooks } from '../utils/data';

import { dbBooks, dbGenres } from '../db';

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  // loadBooks();
  // loadGenres();
  try {
    const allBooks = await dbBooks.find();

    res.status(StatusCodes.OK).json(allBooks);
  } catch (err) {
    next(err);
  }
};

const getOneBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.query.id);

    const book = await dbBooks.findOne({ where: { bookId: id } });

    res.status(StatusCodes.OK).json(book);
  } catch (err) {
    next(err);
  }
};

const getAllGenres = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allGenres = await dbGenres.find();

    res.status(StatusCodes.OK).json(allGenres);
  } catch (err) {
    next(err);
  }
};

const bookController = {
  getAllBooks,
  getOneBook,
  getAllGenres,
};

export { bookController };
