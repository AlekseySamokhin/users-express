import express from 'express';

import { bookController } from '../controllers';

const bookRouter = express.Router();

bookRouter.get('/all', bookController.getAllBooks);
bookRouter.get('/one', bookController.getOneBook);
bookRouter.get('/genres', bookController.getAllGenres);
bookRouter.get('/recommendation', bookController.getRecommendationBooks);

export { bookRouter };
