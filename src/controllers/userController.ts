import type { Request, Response } from 'express';

import userRepository from '../db';

import User from '../db/entities/User';

const createUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, dob } = req.body;

    const user = new User();

    user.fullName = fullName;
    user.email = email;
    user.password = password;
    user.dob = dob;

    await userRepository.save(user);

    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const results = await userRepository.delete(req.params.id);
    return res.send(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOneBy({
      id: req.params.id,
    });

    return res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find();

    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const user = await userRepository.findOneBy({
    id: req.params.id,
  });

  userRepository.merge(user, req.body);
  const results = await userRepository.save(user);

  return res.send(results);
};

const userController = {
  deleteUser,
  createUser,
  getUser,
  getUsers,
  updateUser,
};

export default userController;
