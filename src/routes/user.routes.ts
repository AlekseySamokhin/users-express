import express from 'express';

import { userController } from '../controllers';

const userRouter = express.Router();

userRouter.patch('/password', userController.updatePassUser);
userRouter.patch('/info', userController.updateInfoUser);
userRouter.patch('/avatar', userController.uploadAvatar);

export { userRouter };
