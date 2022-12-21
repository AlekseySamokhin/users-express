import express from 'express';

import authController from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/signup', authController.singUp);
authRouter.post('/login', authController.logIn);

export default authRouter;
