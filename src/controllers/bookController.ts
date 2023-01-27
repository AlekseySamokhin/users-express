/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// import { loadGenres } from '../../loadBook/datas';
// import { loadBooks } from '../../loadBook/datas';

import { dbBooks, dbGenres } from '../db';

interface ITypesCutromRequest extends Request {
  query: {
    genres: string;
  };
}

const getAllBooks = async (req: ITypesCutromRequest, res: Response, next: NextFunction) => {
  // loadGenres();
  // loadBooks();

  try {
    const { genres } = req.query;
    if (genres) {
      const genresArr = genres.split(',');

      console.log(genresArr);

      const books = dbBooks.createQueryBuilder('books');

      if (genres) {
        books.innerJoinAndSelect(
          'books.genres',
          'genre',
          'genre.name IN (:...genresArr)',
          {
            genresArr,
          },
        );
      }

      const filteredBooksByGenres = await books.getMany();

      res.status(StatusCodes.OK).json(filteredBooksByGenres);
    } else {
      const allBooks = await dbBooks.find();

      res.status(StatusCodes.OK).json(allBooks);
    }
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
