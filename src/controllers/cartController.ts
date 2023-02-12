/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';

import { jwtUtils } from '../utils';

import { dbBooks, dbUsers } from '../db/index';

const addCartBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.body.params;

    const token: string = req.headers.authorization.split(' ')[1];

    const { id } = jwtUtils.parse(token);

    const book = await dbBooks.findOne({ where: { bookId } });
    const user = await dbUsers.findOne({ where: { id } });

    console.log(book);
    console.log(user);
  } catch (err) {
    next(err);
  }
};

const cartController = {
  addCartBook,
};

export { cartController };
