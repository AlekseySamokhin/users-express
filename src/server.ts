import app from './app';

import connectToDb from './db/connectToDb';

import config from './config';

const { port } = config.server;

(async () => {
  try {
    await connectToDb();

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server started on URL http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Server did not start, error: ', err);
    process.exit(1);
  }
})();
