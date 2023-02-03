import express from 'express';
import cors from 'cors';
import path from 'path';

import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';
import config from './config';

// import { loadBooks } from '../loadBook/datas';

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

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '..', 'static')));

app.use(endpoint, routes);

app.use(errorHandler);

setTimeout(() => {
  // loadBooks();
  // loadGenres();
}, 1000);

export default app;
