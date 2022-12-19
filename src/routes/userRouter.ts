import express from 'express';

import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
