/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';
import type { NextFunction, Request, Response } from 'express';

import { jwtUtils } from '../utils';

import { dbCart, dbBooks, dbUsers } from '../db/index';
import { Cart } from '../db/entities';

const addCartBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.body.params;

    const token: string = req.headers.authorization.split(' ')[1];

    const { id } = jwtUtils.parse(token);

    const cart = await dbCart.find({
      where: {
        book: {
          bookId,
        },
        user: {
          id,
        },
      },
    });

    if (cart.length === 0) {
      const cart = new Cart();

      const book = await dbBooks.findOne({
        relations: {
          cart: true,
        },
        where: {
          bookId,
        },
      });

      const user = await dbUsers.findOne({
        //  relations: {
        //    cart: true,
        //  },
        where: {
          id,
        },
      });

      cart.count = 1;
      cart.user = user;
      cart.book = book;

      await dbCart.save(cart);
    }

    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

const deleteCartBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cartId } = req.query;

    const book = await dbCart.findOne({
      where: {
        id: Number(cartId),
      },
    });

    await dbCart.remove(book);

    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = req.headers.authorization.split(' ')[1];

    const { id } = jwtUtils.parse(token);

    const cart = await dbCart.find({
      relations: {
        book: true,
      },
      where: {
        user: {
          id,
        },
      },
    });

    res.status(StatusCodes.OK).json(cart);
  } catch (err) {
    next(err);
  }
};

const changeQtyBooksCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cartId, count } = req.body.params;

    const cart = await dbCart.findOneBy({
      id: cartId,
    });

    cart.count = count;

    await dbCart.save(cart);

    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

const cartController = {
  addCartBook,
  deleteCartBook,
  getCart,
  changeQtyBooksCart,
};

export { cartController };
