import express from 'express';

import { authController } from '../controllers';
import validate from '../middlewares/validate';

import { logInSchema, singUpSchema } from '../utils/validation/schemas/authSchema';

const authRouter = express.Router();

authRouter.post('/signup', validate(singUpSchema), authController.signUp);
authRouter.post('/signin', validate(logInSchema), authController.signIn);
authRouter.get('/me', authController.getUser);

export default authRouter;
