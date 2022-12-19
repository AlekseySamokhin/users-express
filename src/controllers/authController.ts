/* eslint-disable no-console */
import type { NextFunction, Request, Response } from 'express';

import jwtToken from 'src/utils/jwtToken';

import userRepository from '../db';

import User from '../db/entities/User';

// const signupGet = (req: Request, res: Response) => {
//   res.render('signup');
// };

// const loginGet = (req: Request, res: Response) => {
//   res.render('login');
// };

// const signupPost = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   console.log(email);
//   console.log(password);

//   res.end('new signup');
// };

const singUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, fullName, dob, password } = req.body;

    const user = new User();

    const userEmail = await userRepository.findOne({ where: email });

    if (userEmail) {
      user.email = email;
    }

    user.fullName = fullName.trim();
    user.email = email.trim().toLowerCase();

    user.password = password;

    await userRepository.save(user);

    res.status(201).json({ user: user.id });
  } catch (err) {
    next(err);
  }
};

// const singUp: HandlerSingUpType = async (req, res, next) => {
//   try {
//     const { email, fullName, dob, password } = req.body;

//     const user = new User();
//     const emailUser = await findDubleEmail(email);

//     user.fullName = fullName.trim();
//     user.email = emailUser.trim().toLowerCase();

//     user.password = await hashPassword.hash(password);
//     user.dob = new Date(dob);

//     const token = tokenJwt.createToken(user.id);

//     await db.user.save(user);

//     delete user.password;
//     res.status(StatusCodes.CREATED).json({ user, token });
//   } catch (error) {
//     next(error);
//   }
// };

const authController = {
  signupGet,
  loginGet,
  signupPost,
  loginPost,
};

export default authController;
