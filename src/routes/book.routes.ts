import express from 'express';

import { bookController } from '../controllers';

const bookRouter = express.Router();

bookRouter.get('/all', bookController.getAllBooks);

export { bookRouter };
