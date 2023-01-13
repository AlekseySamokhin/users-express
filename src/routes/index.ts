import express from 'express';

import checkAuth from '../middlewares/auth';

import authRouter from './auth.routes';
import userRouter from './user.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', checkAuth, userRouter);

export default router;
