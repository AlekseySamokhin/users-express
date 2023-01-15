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

const corsOptions = {
  origin: url,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

// const corsOptions = {
//  origin: url,
// };

app.use('/static', express.static(`${__dirname}/static`));

app.use(express.urlencoded({ extended: true }));

app.use(endpoint, routes);

app.use(errorHandler);

export default app;
