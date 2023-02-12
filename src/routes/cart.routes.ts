import express from 'express';

import { cartController } from '../controllers';

const cartRouter = express.Router();

cartRouter.post('/add', cartController.addCartBook);

export { cartRouter };
