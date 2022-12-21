/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

import token from '../utils/jwt';
import config from '../config';
import userRepository from '../db';
import User from '../db/entities/User';

const singUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, fullName, dob, password } = req.body;

    const user = new User();

    user.fullName = fullName.trim();
    user.email = email.trim().toLowerCase();
    user.dob = dob;

    // const oldUser = await userRepository.findOneBy({ email });

    user.email = email;

    const hashedPassword = bcrypt.hashSync(password, Number(config.pass.salt));

    user.password = hashedPassword;

    await userRepository.save(user);

    const generatedToken = token.genetate(user.id);

    delete user.password;

    res.status(StatusCodes.OK).json({ user, generatedToken });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new Error(
        'Пользователь с таким логином или паролем не существует!',
      );
    }

    const doPasswordsMatch = await bcrypt.compare(password, user.password);

    if (!doPasswordsMatch) {
      throw new Error(
        'Пользователь с таким логином или паролем не существует!',
      );
    }

    const generatedToken = token.genetate(user.id);

    delete user.password;

    res.status(StatusCodes.OK).json({ user, generatedToken });
  } catch (err) {
    next(err);
  }
};

const authController = {
  singUp,
  logIn,
};

export default authController;
