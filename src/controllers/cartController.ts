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

    return res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

const cartController = {
  addCartBook,
};

export { cartController };
