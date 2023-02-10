/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { jwtUtils } from '../utils';

import type { IAuthRequestType } from '../interfaces/authRequest';

import { dbBooks, dbGenres, dbRatings, dbUsers, dbFavoritesBooks } from '../db';

import { Rating, FavoriteBook } from '../db/entities';

import { CustomError } from '../utils/CustomError';

interface ITypeCustomRequest extends Request {
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
  req: ITypeCustomRequest,
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

    if (search) {
      books.andWhere(
        'books.title ILIKE :search OR books.author ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (sort) {
      if (sort === '2') {
        books.orderBy('books.title', 'ASC');
      } else if (sort === '3') {
        books.orderBy('books.author', 'ASC');
      } else if (sort === '4') {
        books.orderBy('books.rating', 'DESC');
      } else if (sort === '5') {
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

    res
      .status(StatusCodes.OK)
      .json({ books: filteredArrayOfBooks, info: serviceBook });
  } catch (err) {
    next(err);
  }
};

const getOneBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.query;

    const token: string = req.headers.authorization.split(' ')[1];

    const { id } = jwtUtils.parse(token);

    const book = await dbBooks.findOne({ where: { bookId: Number(bookId) } });

    if (!book) {
      throw new CustomError({
        code: StatusCodes.NOT_FOUND,
        message: 'Book was not found!',
      });
    }

    const personalRating = await dbRatings.findOne({
      where: { user: { id: Number(id) }, book: { bookId: Number(bookId) } },
    });

    if (personalRating) {
      return res
        .status(StatusCodes.OK)
        .json({ book, personalRating: personalRating.rating });
    }

    return res.status(StatusCodes.OK).json({ book, personalRating: 0 });
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

const addRatingBook = async (
  req: IAuthRequestType,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookId, userId, rate } = req.body as {
      bookId: number;
      userId: number;
      rate: number;
    };

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

    const currentRating = await dbRatings.findOne({
      where: { user: { id: userId }, book: { bookId } },
    });

    if (currentRating) {
      currentRating.rating = rate;

      await dbRatings.save(currentRating);
    } else {
      const newRating = new Rating();

      newRating.rating = rate;
      newRating.book = book;
      newRating.user = user;

      await dbRatings.save(newRating);
    }

    const ratingOfbook = await dbRatings.find({
      where: { book: { bookId } },
    });

    if (ratingOfbook.length === 0) {
      return res.status(StatusCodes.OK).json({
        averageRating: 0,
      });
    }

    const averageRating =
      ratingOfbook.reduce((acc, cur) => acc + cur.rating, 0) /
      ratingOfbook.length;

    book.averageRating = averageRating;

    await dbBooks.save(book);

    return res.status(StatusCodes.OK).json({
      book,
      personalRating: currentRating.rating,
    });
  } catch (err) {
    next(err);
  }
};

const addFavoriteBook = async (
  req: IAuthRequestType,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookId } = req.body;

    const token: string = req.headers.authorization.split(' ')[1];

    const { id } = jwtUtils.parse(token);

    const favoriteBook = new FavoriteBook();

    favoriteBook.bookId = bookId;
    favoriteBook.userId = id;

    await dbFavoritesBooks.save(favoriteBook);

    const favoritesBooks = await dbFavoritesBooks
      .createQueryBuilder('favoriteBook')
      .where('favoriteBook.userId = :userId', { userId: id })
      .leftJoinAndSelect('favoriteBook.book', 'book')
      .getMany();

    return res.status(StatusCodes.OK).json(favoritesBooks);
  } catch (err) {
    next(err);
  }
};

const deleteFavoriteBook = async (
  req: IAuthRequestType,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookId } = req.body.params;

    const token: string = req.headers.authorization.split(' ')[1];
    const { id } = jwtUtils.parse(token);

    const unLiked = await dbFavoritesBooks
      .createQueryBuilder('favoriteBook')
      .where('favoriteBook.bookId = :bookId', { bookId })
      .getOne();

    await dbFavoritesBooks.remove(unLiked);

    const favoritesBooks = await dbFavoritesBooks
      .createQueryBuilder('favoriteBook')
      .where('favoriteBook.userId = :userId', { userId: id })
      .leftJoinAndSelect('favoriteBook.book', 'book')
      .getMany();

    return res.status(StatusCodes.OK).json(favoritesBooks);
  } catch (err) {
    next(err);
  }
};

const getAllFavoritesBooks = async (
  req: IAuthRequestType,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(1);
  } catch (err) {
    next(err);
  }
};

const bookController = {
  addFavoriteBook,
  deleteFavoriteBook,
  getAllFavoritesBooks,
  getAllBooks,
  getRecommendationBooks,
  getOneBook,
  addRatingBook,
  getAllGenres,
};

export { bookController };
