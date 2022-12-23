import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../db/entities/User';
import dbUsers from '../db';

import { passUtils, jwtUtils, message } from '../utils';

import type ITypeBodyReq from '../interfaces/bodyReq';

const singUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, fullName, dob, password } = req.body as ITypeBodyReq;

    const newUser = new User();

    newUser.fullName = fullName.trim();

    const existUser = await dbUsers.findOneBy({ email });

    if (existUser) {
      throw new Error(message.errors.EMAIL_NOT_EXIST);
    }

    newUser.email = email.trim().toLowerCase();
    newUser.dob = new Date(dob) || dob;
    newUser.password = passUtils.hash(password);

    await dbUsers.save(newUser);

    const token = jwtUtils.genetate(newUser.id);

    const resData = { newUser, token };

    delete newUser.password;

    return res
      .status(StatusCodes.OK)
      .json({ message: message.success.USER_REGISTER, resData });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as ITypeBodyReq;

    const existUser = await dbUsers
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!existUser) {
      throw new Error(message.errors.USERS_NOT_FOUND);
    }

    const doPasswordsMatch = passUtils.compare(password, existUser.password);

    if (!doPasswordsMatch) {
      throw new Error(message.errors.WRONG_PASSWORD);
    }

    const token = jwtUtils.genetate(existUser.id);

    const resData = { existUser, token };

    delete existUser.password;

    return res
      .status(StatusCodes.OK)
      .json({ message: message.success.USER_LOGIN, resData });
  } catch (err) {
    return next(err);
  }
};

const authController = {
  singUp,
  logIn,
};

export default authController;
