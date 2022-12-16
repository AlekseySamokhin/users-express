import app from './app';

import connectToDb from './db/connectToDb';

import config from './config';

(async () => {
  try {
    await connectToDb();

    app.listen(config.server.port, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Server started on URL http://localhost:${config.server.port}`,
      );
    });
  } catch (err) {
    console.error('Server did not start, error: ', err);
    process.exit(1);
  }
})();
