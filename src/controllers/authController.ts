import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import createToken from '../utils/jwt';
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

    const findUserByEmail = await userRepository.findOneBy({ email });
    // eslint-disable-next-line no-console
    console.log(findUserByEmail);
    // if (findUserByEmail.email) {
    //   throw new Error('Пользователь с таким паролем уже существует!');
    // }

    // if (findUserByEmail) {
    user.email = email;
    // }

    user.password = bcrypt.hashSync(password, Number(config.bcrypt.salt));

    const id = user.id;

    const token = createToken(id);

    await userRepository.save(user);

    delete user.password;

    res.status(201).json({ user, token });
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
        'Пользователь с таким логином или паролем не существует!'
      );
    }

    const comparePasswords = await bcrypt.compare(password, user.password);

    if (!comparePasswords) {
      throw new Error(
        'Пользователь с таким логином или паролем не существует!'
      );
    }

    const token = createToken(user.id);

    delete user.password;

    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

const authController = {
  singUp,
  logIn,
};

export default authController;
