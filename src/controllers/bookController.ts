/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// import { loadGenres } from '../../loadBook/datas';
// import { loadBooks } from '../../loadBook/datas';

import { dbBooks, dbGenres } from '../db';

interface ITypesCustomRequest extends Request {
  query: {
    genres: string;
    minPrice: string;
    maxPrice: string;
    sort: string;
  };
}

const getAllBooks = async (
  req: ITypesCustomRequest,
  res: Response,
  next: NextFunction,
) => {
  // loadGenres();
  // loadBooks();

  try {
    const { genres, minPrice, maxPrice, sort } = req.query;

    const books = dbBooks.createQueryBuilder('books');

    if (genres) {
      const arrayGenres = genres.split(',');

      books.innerJoinAndSelect(
        'books.genres',
        'genre',
        'genre.name IN (:...arrayGenres)',
        {
          arrayGenres,
        },
      );
    }

    if (maxPrice && minPrice) {
      if (maxPrice === minPrice) {
        books.where('books.price = :minPrice', { minPrice });
      } else {
        books.where('books.price => :minPrice', { minPrice });
        books.where('books.price <= :maxPrice', { maxPrice });
      }
    }

    if (sort) {
      if (sort === 'Price') {
        books.orderBy('books.price', 'ASC');
      } else if (sort === 'Name') {
        books.orderBy('books.title', 'ASC');
      } else if (sort === 'Author name') {
        books.orderBy('books.author', 'ASC');
      } else if (sort === 'Rating') {
        books.orderBy('books.rating', 'ASC');
      } else if (sort === 'Date of issue') {
        books.orderBy('books.releaseDate', 'ASC');
      } else {
        return;
      }
    }

    const filteredBooks = await books.getMany();

    res.status(StatusCodes.OK).json(filteredBooks);
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
