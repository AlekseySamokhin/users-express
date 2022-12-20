import express from 'express';

import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

const routes = express.Router();

routes.use('/login', authRoutes);
routes.use('/auth', userRoutes);

export default routes;
