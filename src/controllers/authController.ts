/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../db/entities/User';
import dbUsers from '../db';
import { passUtils, jwtUtils } from '../utils';
import { CustomError } from '../utils/CustomError';
import type { IDataUserType } from '../interfaces/user';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as IDataUserType;

    const newUser = new User();

    newUser.fullName = '';

    const existUser = await dbUsers.findOneBy({ email });

    if (existUser) {
      throw new CustomError({
        code: StatusCodes.NOT_FOUND,
        message: 'User is not found!',
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
    const { email, password } = req.body as IDataUserType;

    const existUser = await dbUsers
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!existUser) {
      throw new CustomError({
        code: StatusCodes.NOT_FOUND,
        message: 'User is not found!',
      });
    }

    const doPasswordsMatch = passUtils.compare(password, existUser.password);

    if (!doPasswordsMatch) {
      throw new CustomError({
        code: StatusCodes.NOT_FOUND,
        message: 'User is not found!',
      });
    }

    const accessToken = jwtUtils.generate(existUser.id);

    delete existUser.password;

    res.status(StatusCodes.OK).json({ user: existUser, accessToken });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(1);
    if (!req.headers.authorization) {
      throw new CustomError({
        code: StatusCodes.FORBIDDEN,
        message: 'User is not authorized!',
      });
    }

    const token: string = req.headers.authorization.split(' ')[1];

    const { id } = jwtUtils.parse(token);

    const currentUser = await dbUsers.findOne({ where: { id } });

    res.status(StatusCodes.OK).json(currentUser);
  } catch (error) {
    next(error);
  }
};

const authController = { signUp, signIn, getCurrentUser };

export default authController;
