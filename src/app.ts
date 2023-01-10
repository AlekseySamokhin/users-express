import express from 'express';
import cors from 'cors';

import routes from './routes';
import config from './config';

import { errorHandler } from './middlewares/errorHandler';

const {
  server: { endpoint },
  client: { url },
} = config;

const app = express();

app.use(express.json());

const corsOptions = {
  origin: url,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(endpoint, routes);

app.use(errorHandler);

export default app;
