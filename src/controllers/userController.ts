import type { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import dbUsers from '../db';

import type IBodyReq from '../interfaces/bodyReq';

import { passUtils, message } from '../utils';

import HttpError from '../utils/httpError';

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
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
        message.errors.USERS_NOT_FOUND,
      );
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
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
        message.errors.USERS_NOT_FOUND,
      );
    }

    await dbUsers.delete(id);

    res.status(StatusCodes.OK).json({ message: message.success.USER_DELETE });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName: newFullName, email: newEmail } = req.body as IBodyReq;

    let newPassword = req.body.password;

    const id = Number(req.params.id);

    const existUser = await dbUsers
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();

    if (!existUser) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
        message.errors.USERS_NOT_FOUND,
      );
    }

    if (newPassword) {
      const hashedPassword = passUtils.hash(newPassword);

      const doPasswordsMatch = passUtils.compare(
        newPassword,
        existUser.password,
      );

      if (!doPasswordsMatch) {
        throw new HttpError(
          StatusCodes.NOT_FOUND,
          ReasonPhrases.NOT_FOUND,
          message.errors.USERS_NOT_FOUND,
        );
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
};

export default userController;
