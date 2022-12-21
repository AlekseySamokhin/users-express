import express from 'express';

import checkAuth from '../middlewares/authMiddleware';

import authRouter from './authRouter';
import userRouter from './userRouter';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/login', checkAuth, userRouter);

export default router;
