/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { IAuthRequestType } from '../interfaces/authRequest';

import { dbBooks, dbGenres, dbRating, dbUsers } from '../db';

import { Rating } from '../db/entities';

import { CustomError } from '../utils/CustomError';

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
    console.log(genres);

    const books = dbBooks.createQueryBuilder('books');

    if (genres) {
      const arrayGenres = genres.split(',');

      books.innerJoinAndSelect(
        'books.genres',
        'genre',
        'genre.genreId IN (:...arrayGenres)',
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
        books.orderBy('books.rating', 'DESC');
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
      nextPage: currentPage + 1 > pagesQty ? pagesQty : currentPage + 1,
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
    const { bookId, userId } = req.query;

    console.log(userId);
    console.log(bookId);

    const book = await dbBooks.findOne({ where: { bookId: Number(bookId) } });

    if (!book) {
      throw new CustomError({
        code: StatusCodes.NOT_FOUND,
        message: 'Book was not found!',
      });
    }

    res.status(StatusCodes.OK).json(book);
  } catch (err) {
    next(err);
  }
};

const getRecommendationBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const randomBooks = await dbBooks
      .createQueryBuilder('books')
      .select()
      .orderBy('RANDOM()')
      .take(4)
      .getMany();

    res.status(StatusCodes.OK).json(randomBooks);
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

const setRatingBook = async (
  req: IAuthRequestType,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookId, rate } = req.body as { bookId: number; rate: number };

    const userId = req.user.id;

    const book = await dbBooks.findOne({ where: { bookId } });

    if (!book) {
      throw new CustomError({
        code: StatusCodes.NOT_FOUND,
        message: 'Book was not found!',
      });
    }

    const user = await dbUsers.findOne({ where: { id: userId } });

    if (!user) {
      throw new CustomError({
        code: StatusCodes.UNAUTHORIZED,
        message: 'User was not authorized!',
      });
    }

    const currentRating = await dbRating.findOne({
      where: { user: { id: userId }, book: { bookId } },
    });

    if (currentRating) {
      currentRating.rating = rate;

      await dbRating.save(currentRating);
    } else {
      const newRating = new Rating();

      newRating.rating = rate;
      newRating.book = book;
      newRating.user = user;

      await dbRating.save(newRating);
    }

    const ratingOfbook = await dbRating.find({
      where: { book: { bookId } },
    });

    console.log(ratingOfbook);
  } catch (err) {
    next(err);
  }
};

const bookController = {
  getAllBooks,
  getRecommendationBooks,
  getOneBook,
  setRatingBook,
  getAllGenres,
};

export { bookController };
