/* eslint-disable no-console */
import type { NextFunction, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import fs from 'fs';

import { dbUsers } from '../db';
import config from '../config';

import type { ITypesDataUser } from '../interfaces/user';
import type { IAuthRequestType } from '../interfaces/authRequest';

import { passUtils, messages } from '../utils';

const {
  server: { serverUrl },
  client: { rootPath },
} = config;

const updateInfoUser = async (
  req: IAuthRequestType,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullName, email } = req.body as ITypesDataUser;

    const { id } = req.user;

    const existUser = await dbUsers.findOne({ where: { id } });

    // if (existUser.email === email.toLowerCase().trim()) {
    //   throw new CustomError({
    //     code: StatusCodes.UNAUTHORIZED,
    //     message: 'This email address already exists!',
    //   });
    // }

    const updatedInfoUser: { fullName: string; email: string } = {
      fullName: fullName || existUser.fullName,
      email: email || existUser.email,
    };

    dbUsers.merge(existUser, updatedInfoUser);

    await dbUsers.save(existUser);

    res.status(StatusCodes.OK).json(existUser);
  } catch (err) {
    next(err);
  }
};

const updatePassUser = async (
  req: IAuthRequestType,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { password } = req.body as ITypesDataUser;

    const { id } = req.user;

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

    res.status(StatusCodes.OK).json({ message: messages.success.USER_UPDATE });
  } catch (err) {
    next(err);
  }
};

const uploadAvatar = async (
  req: IAuthRequestType,
  res: Response,
  next: NextFunction,
) => {
  try {
    const imageURL = req.body.imageURL as string;

    const { id } = req.user;

    const existUser = await dbUsers.findOne({ where: { id } });

    const base64Data = imageURL.split('base64,')[1];
    const typeImage = imageURL.split('base64,')[0].split('/')[1].slice(0, -1);

    const generatedRandomString = uuid().substring(0, 18);

    const nameFileImage = `avatar_${generatedRandomString}.${typeImage}`;
    const pathToImage = `static/avatars/${nameFileImage}`;

    if (existUser.avatar) {
      const nameFileExistAvatarUser = existUser.avatar.slice(30);

      fs.unlink(`${rootPath}/static/avatars/${nameFileExistAvatarUser}`, (err) => {
        console.error(err);
      });
    }

    fs.writeFile(
      `${rootPath}/${pathToImage}`,
      base64Data,
      { encoding: 'base64' },
      (err) => {
        console.error(err);
      },
    );

    existUser.avatar = `${serverUrl}/avatars/${nameFileImage}`;

    await dbUsers.save(existUser);

    res.status(StatusCodes.OK).json(existUser);
  } catch (err) {
    next(err);
  }
};

const userController = {
  updatePassUser,
  updateInfoUser,
  uploadAvatar,
};

export { userController };
