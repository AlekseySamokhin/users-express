/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import dbUsers from '../db';

import type { IDataUserType } from '../interfaces/user';

import { passUtils, message } from '../utils';

import { CustomError } from '../utils/CustomError';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await dbUsers.find();

    res.status(StatusCodes.OK).json({ allUsers });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const user = await dbUsers.findOneBy({ id });

    if (!user) {
      throw new CustomError({
        code: StatusCodes.UNAUTHORIZED,
        message: 'User is not found!',
      });
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    next(err);
  }
};

const removeUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await dbUsers.find();

    allUsers.forEach((user) => {
      dbUsers.delete(user.id);
    });

    res.status(StatusCodes.OK).json({ message: message.success.USERS_DELETE });
  } catch (err) {
    next(err);
  }
};

const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const user = await dbUsers.findOneBy({ id });

    if (!user) {
      throw new CustomError({
        code: StatusCodes.UNAUTHORIZED,
        message: 'User is not found!',
      });
    }

    await dbUsers.delete(id);

    res.status(StatusCodes.OK).json({ message: message.success.USER_DELETE });
  } catch (err) {
    next(err);
  }
};

const updateInfoUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullName, email } = req.body;

    console.log(fullName, email);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName: newFullName, email: newEmail } =
      req.body as IDataUserType;

    let newPassword = req.body.password;

    const id = Number(req.params.id);

    const existUser = await dbUsers
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();

    if (!existUser) {
      throw new CustomError({
        code: StatusCodes.UNAUTHORIZED,
        message: 'User is not found!',
      });
    }

    if (newPassword) {
      const hashedPassword = passUtils.hash(newPassword);

      const doPasswordsMatch = passUtils.compare(
        newPassword,
        existUser.password,
      );

      if (!doPasswordsMatch) {
        throw new CustomError({
          code: StatusCodes.UNAUTHORIZED,
          message: 'User is not found!',
        });
      }

      newPassword = hashedPassword;
    }

    const updatedUser = {
      fullName: newFullName || existUser.fullName,
      email: newEmail || existUser.email,
      password: newPassword || existUser.password,
    };

    dbUsers.merge(existUser, updatedUser);

    await dbUsers.save(existUser);

    res.status(StatusCodes.OK).json({ message: message.success.USER_UPDATE });
  } catch (err) {
    next(err);
  }
};

const userController = {
  getUsers,
  getUser,
  removeUsers,
  removeUser,
  updateUser,

  updateInfoUser,
};

export default userController;
