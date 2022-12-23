import express from 'express';

import { userController } from '../controllers';

import validate from '../middlewares/validateMiddleware';

import { updateUser, removeUser, getUser} from '../utils/validation/schemas/userSchema';

const userRouter = express.Router();

userRouter.get('/users', userController.getUsers);
userRouter.get('/user/:id', validate(getUser), userController.getUser);
userRouter.patch('/user/:id', validate(removeUser), userController.updateUser);
userRouter.delete('/users', validate(updateUser), userController.removeUsers);
userRouter.delete('/user/:id', userController.removeUser);

export default userRouter;
