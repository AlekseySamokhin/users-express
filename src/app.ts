import express from 'express';
import cors from 'cors';

import routes from './routes';
import config from './config';

// create and setup express app
const app = express();
app.use(express.json());

const corsOptions = {
  origin: config.postgresDb.host,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(config.server.endpoint, routes);

export default app;
