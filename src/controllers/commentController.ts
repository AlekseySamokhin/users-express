/* eslint-disable no-console */
import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Comment } from '../db/entities';

import { dbComments } from '../db';

import { jwtUtils } from '../utils';

import type { IAuthRequestType } from '../interfaces/authRequest';

const addComment = async (
  req: IAuthRequestType,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { text, bookId } = req.body as {
      text: string;
      bookId: number;
    };

    const token: string = req.headers.authorization.split(' ')[1];

    const { id } = jwtUtils.parse(token);

    const comment = new Comment();

    comment.text = text;
    comment.bookId = bookId;
    comment.userId = id;

    await dbComments.save(comment);

    const comments = await dbComments
      .createQueryBuilder('comment')
      .where('comment.bookId = :bookId', { bookId })
      .leftJoinAndSelect('comment.user', 'user')
      .getMany();

    res.status(StatusCodes.OK).json(comments);
  } catch (err) {
    next(err);
  }
};

const getComment = async (
  req: IAuthRequestType,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { bookId } = req.query;

    const comments = await dbComments
      .createQueryBuilder('comment')
      .where('comment.bookId = :bookId', { bookId })
      .leftJoinAndSelect('comment.user', 'user')
      .getMany();

    res.status(StatusCodes.OK).json(comments);
  } catch (err) {
    next(err);
  }
};

const commentController = {
  getComment,
  addComment,
};

export { commentController };
