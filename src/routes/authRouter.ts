import express from 'express';

import authController from '../controllers/authController';

const authRouter = express.Router();

authRouter.get('/signup', authController.signupGet);
authRouter.post('/signup', authController.signupPost);
authRouter.get('/login', authController.loginGet);
authRouter.post('/login', authController.loginPost);

export default authRouter;
