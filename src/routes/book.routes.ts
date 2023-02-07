import express from 'express';

import { bookController } from '../controllers';

const bookRouter = express.Router();

bookRouter.get('/all', bookController.getAllBooks);
bookRouter.get('/one', bookController.getOneBook);
bookRouter.get('/genres', bookController.getAllGenres);
bookRouter.get('/recommendation', bookController.getRecommendationBooks);
bookRouter.post('/add', bookController.addRatingBook);
bookRouter.post('/add-favorite', bookController.addFavorite);

export { bookRouter };
