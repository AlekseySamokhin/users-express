import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import dbUsers from '../db';

import type ITypeBodyReq from '../interfaces/bodyReq';

import { passUtils, message } from '../utils';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await dbUsers.find();

    return res.status(StatusCodes.OK).send({ allUsers });
  } catch (err) {
    return next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const user = await dbUsers.findOneBy({ id });

    if (!user) {
      throw new Error(message.errors.USERS_NOT_FOUND);
    }

    return res.status(StatusCodes.OK).send({ user });
  } catch (err) {
    return next(err);
  }
};

const removeUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await dbUsers.find();

    allUsers.forEach((user) => {
      dbUsers.delete(user.id);
    });

    return res.status(StatusCodes.OK).send({ message: message.success.USERS_DELETE });
  } catch (err) {
    return next(err);
  }
};

const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const user = await dbUsers.findOneBy({ id });

    if (!user) {
      throw new Error(message.errors.USERS_NOT_FOUND);
    }

    await dbUsers.delete(id);

    return res.status(StatusCodes.OK).send({ message: message.success.USER_DELETE });
  } catch (err) {
    return next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName: newFullName, email: newEmail } = req.body as ITypeBodyReq;

    let newPassword = req.body.password;

    const id = Number(req.params.id);

    const existUser = await dbUsers
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();

    if (!existUser) {
      throw new Error(message.errors.USERS_NOT_FOUND);
    }

    if (newPassword) {
      const hashedPassword = passUtils.hash(newPassword);

      const doPasswordsMatch = passUtils.compare(newPassword, existUser.password);

      if (doPasswordsMatch) {
        throw new Error(message.errors.REPEAT_PASSWORD);
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

    return res.status(StatusCodes.OK).send({ message: message.success.USER_UPDATE });
  } catch (err) {
    return next(err);
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
