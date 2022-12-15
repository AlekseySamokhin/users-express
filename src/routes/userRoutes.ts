import express from 'express';

import { createUser } from '../controllers/createUser';
import { deleteUser } from '../controllers/deleteUser';
import { updateUser } from '../controllers/updateUser';
import { getUsers } from '../controllers/getUsers';

const userRoutes = express.Router();

userRoutes.post('/user', createUser);
userRoutes.get('/user', getUsers);
userRoutes.patch('/user/:userId', updateUser);
userRoutes.delete('/user/:userId', deleteUser);

export default userRoutes;
