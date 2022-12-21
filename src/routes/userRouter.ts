import express from 'express';

import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/users', userController.getUsers);
userRouter.get('/user/:id', userController.getUser);
userRouter.patch('/user/:id', userController.updateUser);
userRouter.delete('/user/:id', userController.removeUser);

export default userRouter;
