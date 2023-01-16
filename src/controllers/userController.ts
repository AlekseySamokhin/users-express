/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';
// import path from 'path';

import config from '../config';

import dbUsers from '../db';

import type { ITypesDataUser } from '../interfaces/user';

import { passUtils, message, jwtUtils } from '../utils';

import { CustomError } from '../utils/CustomError';

const {
  server: { serverUrl },
  client: { rootPath },
} = config;

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
    const imageURL = req.body.imageURL;

    const token: string = req.headers.authorization.split(' ')[1];
    const id = jwtUtils.parse(token).id;
    const existUser = await dbUsers.findOne({ where: { id } });

    const base64Data = imageURL.split('base64,')[1];
    const typeImage = imageURL.split('base64,')[0].split('/')[1].slice(0, -1);

    const generatedRandomString = uuid().substring(0, 18);

    const nameFileImage = `avatar_${generatedRandomString}.${typeImage}`;
    const pathToImage = `static/avatars/${nameFileImage}`;

    if (existUser.avatar) {
      const nameFileExistAvatarUser = existUser.avatar.slice(30);

      fs.unlink(`${rootPath}/static/avatars/${nameFileExistAvatarUser}`, (err) => {
        console.log(err);
      });
    }

    fs.writeFile(
      `${rootPath}/${pathToImage}`,
      base64Data,
      { encoding: 'base64' },
      (err) => {
        console.log(err);
      },
    );

    existUser.avatar = `${serverUrl}/avatars/${nameFileImage}`;

    await dbUsers.save(existUser);

    res.status(StatusCodes.OK).json(existUser);
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
