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
    // const { genres } = req.query;

    // // if (maxPrice && minPrice) {
    // //   const books = dbBooks.createQueryBuilder('books');

    // //   books.where('books.price => :minPrice', { minPrice });
    // //   books.where('books.price <= :maxPrice', { maxPrice });

    // //   const filteredBooksByGenres = await books.getMany();

    // //   res.status(StatusCodes.OK).json(filteredBooksByGenres);

    // if (genres) {
    //   const arrayGenres = genres.split(',');
    //   const books = dbBooks.createQueryBuilder('books');
    //   books.innerJoinAndSelect(
    //     'books.genres',
    //     'genre',
    //     'genre.name IN (:...arrayGenres)',
    //     {
    //       arrayGenres,
    //     },
    //   );

    //   const filteredBooksByGenres = await books.getMany();

    //   res.status(StatusCodes.OK).json(filteredBooksByGenres);
    // } else {
    //   const allBooks = await dbBooks.find();

    //   res.status(StatusCodes.OK).json(allBooks);
    // }
    const { genres, minPrice, maxPrice } = req.query;

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
