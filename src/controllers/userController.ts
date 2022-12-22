/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import dbUsers from '../db';

import { errors, success } from '../constants';

import type ITypeBodyReq from '../interfaces/bodyReq';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await dbUsers.find();

    res.status(StatusCodes.OK).send({ allUsers });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const user = await dbUsers.findOneBy({ id });

    if (!user) {
      throw new Error(errors.USERS_NOT_FOUND);
    }

    return res.status(StatusCodes.OK).send({ user });
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

    res.status(StatusCodes.OK).send({ message: success.USERS_DELETE });
  } catch (err) {
    next(err);
  }
};

const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const user = await dbUsers.findOneBy({ id });

    if (!user) {
      throw new Error(errors.USERS_NOT_FOUND);
    }

    await dbUsers.delete(id);

    return res.status(StatusCodes.OK).send({ message: success.USER_DELETE });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, email, dob } = req.body as ITypeBodyReq;

    const id = Number(req.params.id);

    const user = await dbUsers.findOneBy({ id });

    if (!user) {
      throw new Error(errors.USERS_NOT_FOUND);
    }

    const updatedUser = {
      fullName: fullName || user.fullName,
      email: email || user.email,
      dob: dob || user.dob,
    };

    dbUsers.merge(user, updatedUser);

    await dbUsers.save(user);

    return res.status(StatusCodes.OK).send({ message: success.USER_UPDATE });
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
