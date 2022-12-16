import express from 'express';
import cors from 'cors';

import router from './routes';
import config from './config';

const app = express();

app.use(
  cors({
    origin: config.postgresDb.host,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

export default app;
