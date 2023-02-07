import express from 'express';

import { commentController } from '../controllers';

const commentRouter = express.Router();

commentRouter.post('/add', commentController.addComment);
commentRouter.get('/get', commentController.getComment);

export { commentRouter };
