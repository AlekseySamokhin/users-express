import express from 'express';

import authController from '../controllers/authController';

const authRoutes = express.Router();

authRoutes.post('/signup', authController.singUp);
authRoutes.post('/login', authController.logIn);

export default authRoutes;
