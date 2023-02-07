import express from 'express';

import checkAuth from '../middlewares/auth';

import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';
import { bookRouter } from './book.routes';
import { commentRouter } from './comment.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', checkAuth, userRouter);
router.use('/book', bookRouter);
router.use('/comment', commentRouter);

export default router;
