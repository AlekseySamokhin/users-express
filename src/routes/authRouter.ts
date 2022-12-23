import express from 'express';

import { authController } from '../controllers';
import validate from '../middlewares/validateMiddleware';

import { logInSchema, singUpSchema } from '../utils/validation/schemas/authSchema';

const authRouter = express.Router();

authRouter.post('/signup', validate(singUpSchema), authController.singUp);
authRouter.post('/login', validate(logInSchema), authController.logIn);

export default authRouter;
