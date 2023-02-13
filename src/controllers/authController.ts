import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../db/entities/User';
import { dbCart, dbFavoritesBooks, dbUsers } from '../db';

import { passUtils, jwtUtils } from '../utils';

import { CustomError } from '../utils/CustomError';

import type { ITypesDataUser } from '../interfaces/user';
import type { IAuthRequestType } from '../interfaces/authRequest';
import type { Book } from '../db/entities';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as ITypesDataUser;

    const newUser = new User();

    newUser.fullName = '';
    newUser.avatar = '';

    const existUser = await dbUsers.findOneBy({ email });

    if (existUser) {
      throw new CustomError({
        code: StatusCodes.FORBIDDEN,
        message: 'User with this email address exists!',
      });
    }

    newUser.email = email.trim().toLowerCase();
    newUser.password = passUtils.hash(password);

    await dbUsers.save(newUser);

    const accessToken = jwtUtils.generate(newUser.id);

    delete newUser.password;

    res.status(StatusCodes.OK).json({ user: newUser, accessToken });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as ITypesDataUser;

    const existUser = await dbUsers
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!existUser) {
      throw new CustomError({
        code: StatusCodes.NOT_FOUND,
        message: 'User with this email address does not exists!',
      });
    }

    const doPasswordsMatch = passUtils.compare(password, existUser.password);

    if (!doPasswordsMatch) {
      throw new CustomError({
        code: StatusCodes.NOT_FOUND,
        message: 'Password or email is not correct!',
      });
    }

    delete existUser.password;

    const accessToken = jwtUtils.generate(existUser.id);

    const favorites = await dbFavoritesBooks
      .createQueryBuilder('favoriteBook')
      .where('favoriteBook.userId = :userId', { userId: existUser.id })
      .leftJoinAndSelect('favoriteBook.book', 'book')
      .getMany();

    const cart = await dbCart.find({
      relations: {
        book: true,
      },
      where: {
        user: {
          id: existUser.id,
        },
      },
    });

    res.status(StatusCodes.OK).json({ user: existUser, accessToken, favorites, cart });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (
  req: IAuthRequestType,
  res: Response,
  // next: NextFunction
) => {
  // try {
  // if (!req.headers.authorization) {
  //   throw new CustomError({
  //     code: StatusCodes.UNAUTHORIZED,
  //     message: 'User was not authorized!',
  //   });
  // }

  const token: string = req.headers.authorization.split(' ')[1];

  const { id } = jwtUtils.parse(token);

  const currentUser = await dbUsers.findOne({
    where: { id },
  });

  const favoritesBooks = await dbFavoritesBooks
    .createQueryBuilder('favoriteBook')
    .where('favoriteBook.userId = :userId', { userId: id })
    .leftJoinAndSelect('favoriteBook.book', 'book')
    .getMany();

  const cartUser = await dbCart.find({
    relations: {
      book: true,
    },
    where: {
      user: {
        id,
      },
    },
  });

  const favoritesBooksArray = [] as Book[];

  favoritesBooks.forEach((favoriteBook) => {
    favoritesBooksArray.push(favoriteBook.book);
  });

  res.status(StatusCodes.OK).json({ currentUser, favoritesBooksArray, cartUser });
  // } catch (err) {
  // next(err);
  // }
};

const authController = { signUp, signIn, getCurrentUser };

export { authController };
