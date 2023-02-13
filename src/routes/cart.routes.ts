import express from 'express';

import { cartController } from '../controllers';

const cartRouter = express.Router();

cartRouter.post('/add', cartController.addCartBook);
cartRouter.delete('/delete', cartController.deleteCartBook);
cartRouter.get('/all', cartController.getCart);
cartRouter.patch('/change-qty', cartController.changeQtyBooksCart);

export { cartRouter };
