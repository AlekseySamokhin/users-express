import type { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import User from '../db/entities/User';
import dbUsers from '../db';

import { passUtils, jwtUtils, message } from '../utils';

import HttpError from '../utils/httpError';

import type IBodyReq from '../interfaces/bodyReq';

const singUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as IBodyReq;

    const newUser = new User();

    newUser.fullName = '';

    const existUser = await dbUsers.findOneBy({ email });

    if (existUser) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        ReasonPhrases.FORBIDDEN,
        message.errors.EMAIL_NOT_EXIST,
      );
    }

    newUser.email = email.trim().toLowerCase();
    // newUser.dob = new Date(dob) || dob;
    newUser.password = passUtils.hash(password);

    await dbUsers.save(newUser);

    const accessToken = jwtUtils.genetate(newUser.id);

    delete newUser.password;

    res.status(StatusCodes.OK).json({ newUser, accessToken });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as IBodyReq;

    const existUser = await dbUsers
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!existUser) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
        message.errors.USERS_NOT_FOUND
      );
    }

    const doPasswordsMatch = passUtils.compare(password, existUser.password);

    if (!doPasswordsMatch) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
        message.errors.USERS_NOT_FOUND
      );
    }

    const token = jwtUtils.genetate(existUser.id);

    const resData = { existUser, token };

    delete existUser.password;

    res
      .status(StatusCodes.OK)
      .json({ message: message.success.USER_LOGIN, resData });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
        'Пользователь не авторизован'
      );
    }

    const token: string = req.headers.authorization.split(' ')[1];

    const { id } = jwtUtils.parse(token);

    const currentUser = await dbUsers.findOne({ where: { id } });

    res.status(StatusCodes.OK).json(currentUser);
  } catch (err) {
    next(err);
  }
};

const authController = {
  singUp,
  logIn,
  getUser,
};

export default authController;
