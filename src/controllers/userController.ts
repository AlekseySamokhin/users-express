/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';
//  import fs from 'fs';
import { StatusCodes } from 'http-status-codes';

import dbUsers from '../db';

import type { ITypesDataUser } from '../interfaces/user';

import { passUtils, message, jwtUtils } from '../utils';

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
    const { fullName, email } = req.body as ITypesDataUser;

    const token: string = req.headers.authorization.split(' ')[1];

    const { id } = jwtUtils.parse(token);

    const existUser = await dbUsers.findOne({ where: { id } });

    const updatedInfoUser: { fullName: string; email: string } = {
      fullName: fullName || existUser.fullName,
      email: email || existUser.email,
    };

    dbUsers.merge(existUser, updatedInfoUser);

    await dbUsers.save(existUser);

    console.log(existUser);

    res.status(StatusCodes.OK).json(existUser);
  } catch (err) {
    next(err);
  }
};

const updatePassUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { password } = req.body as ITypesDataUser;
    console.log(password);
    const token: string = req.headers.authorization.split(' ')[1];

    const { id } = jwtUtils.parse(token);

    console.log(id);

    const existUser = await dbUsers
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();

    const hashedPassword = passUtils.hash(password);

    // const doPasswordsMatch = passUtils.compare(
    // password,
    //  existUser.password,
    // );

    // if (doPasswordsMatch) {
    password = hashedPassword;
    // }
    const updatedUser = {
      password: password || existUser.password,
    };

    dbUsers.merge(existUser, updatedUser);

    await dbUsers.save(existUser);

    res.status(StatusCodes.OK).json({ message: message.success.USER_UPDATE });
  } catch (err) {
    next(err);
  }
};

const uploadAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(1);
    // const path = `./static/${Date.now()}.png` as string;
    // console.log(path);
    // const base64Data = imageData.replace(/^data:([A-Za-z-+/]+);base64,/, '');

    // fs.writeFileSync(path, base64Data, { encoding: 'base64' });
    // console.log(2);
    // return res.send(path);

    // const file = req.files.file;

    // const token: string = req.headers.authorization.split(' ')[1];

    // const { id } = jwtUtils.parse(token);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName: newFullName, email: newEmail } =
      req.body as ITypesDataUser;

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

  updatePassUser,
  updateInfoUser,
  uploadAvatar,
};

export default userController;
