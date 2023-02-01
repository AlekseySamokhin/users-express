/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { dbBooks, dbGenres } from '../db';

interface ITypesCustomRequest extends Request {
  query: {
    genres: string;
    minPrice: string;
    maxPrice: string;
    sort: string;
    page: string;
    search: string;
  };
}

const getAllBooks = async (
  req: ITypesCustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { genres, minPrice, maxPrice, sort, page, search } = req.query;

    const books = dbBooks.createQueryBuilder('books');

    if (genres) {
      const arrayGenres = genres.split(',');

      books.innerJoinAndSelect(
        'books.genres',
        'genre',
        'genre.name IN (:...arrayGenres)',
        { arrayGenres },
      );
    }

    if (minPrice && maxPrice) {
      books.where('books.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice,
      });
    }

    // if (maxPrice) {
    //   books.where('books.price <= :maxPrice', { maxPrice });
    // }

    // if (minPrice) {
    //   books.where('books.price >= :minPrice', { minPrice });
    // }

    if (search) {
      books.andWhere(
        'books.title ILIKE :search OR books.author ILIKE :search',
        { search: `%${search}%` },
      );
    }

    // if (maxPrice && minPrice) {
    //   if (maxPrice === minPrice) {
    //     books.where('books.price = :minPrice', { minPrice });
    //   } else {
    //     books.where('books.price => :minPrice', { minPrice });
    //     books.where('books.price <= :maxPrice', { maxPrice });
    //   }
    // }

    if (sort) {
      if (sort === 'Name') {
        books.orderBy('books.title', 'ASC');
      } else if (sort === 'Author name') {
        books.orderBy('books.author', 'ASC');
      } else if (sort === 'Rating') {
        books.orderBy('books.rating', 'ASC');
      } else if (sort === 'Date of issue') {
        books.orderBy('books.releaseDate', 'ASC');
      } else {
        books.orderBy('books.price', 'ASC');
      }
    }

    const currentPage = Number(page) || 1;
    const numberBooksOfPage = 8;

    const [filteredArrayOfBooks, numberOfBooks] = await books
      .take(numberBooksOfPage)
      .skip(numberBooksOfPage * currentPage - numberBooksOfPage)
      .getManyAndCount();

    const pagesQty = Math.ceil(numberOfBooks / 8);

    const serviceBook = {
      pagesQty,
      currentPage: currentPage === 0 ? currentPage + 1 : currentPage,
      prevPage: currentPage - 1 < 0 ? 1 : currentPage - 1,
      nextPage:
        currentPage + 1 > pagesQty ? pagesQty : currentPage + 1,
    };

    // const filteredArrayOfBooks = await books.getMany();

    res
      .status(StatusCodes.OK)
      .json({ books: filteredArrayOfBooks, info: serviceBook });
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
