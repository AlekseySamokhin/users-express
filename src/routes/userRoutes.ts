import express from 'express';

import createUser from '../controllers/createUser';
import deleteUser from '../controllers/deleteUser';
import updateUser from '../controllers/updateUser';
import getUsers from '../controllers/getUsers';

const userRoutes = express.Router();

userRoutes.post('/', createUser);
userRoutes.get('/', getUsers);
userRoutes.patch('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;
