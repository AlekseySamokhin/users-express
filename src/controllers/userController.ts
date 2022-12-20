import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import userRepository from '../db';

const removeUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const user = userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    await userRepository.delete(id);

    return res.status(StatusCodes.OK).send({ message: 'User deleted!', user });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find();

    res.status(StatusCodes.OK).send({ users });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const user = userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    return res.status(StatusCodes.OK).send({ user });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, dob } = req.body;

    const id = Number(req.params.id);

    const userToUpdate = await userRepository.findOneBy({ id });

    if (!userToUpdate) {
      throw new Error('Пользователь не найден');
    }

    userRepository.merge(userToUpdate, {
      fullName: fullName || userToUpdate.fullName,
      email: email || userToUpdate.email,
      dob: dob || userToUpdate.dob,
    });

    await userRepository.save(userToUpdate);

    return res.status(StatusCodes.OK).send({ userToUpdate });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

const userController = {
  removeUser,
  getUser,
  getUsers,
  updateUser,
};

export default userController;
