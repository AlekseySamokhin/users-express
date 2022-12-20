import express from 'express';

import userController from '../controllers/userController';

const userRoutes = express.Router();

userRoutes.get('/use', userController.getUsers);
userRoutes.get('/:id', userController.getUser);
userRoutes.patch('/:id', userController.updateUser);
userRoutes.delete('/:id', userController.removeUser);

export default userRoutes;
