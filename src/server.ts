/* eslint-disable no-console */
import { createServer } from 'http';
import { Server } from 'socket.io';

import app from './app';

import connectToDb from './db/connectToDb';
import { addCommentSocket } from './utils/addCommentSocket';

import config from './config';

const { port } = config.server;

(async () => {
  try {
    await connectToDb();

    const server = createServer(app);

    const io = new Server(server, {
      cors: {
        origin: `${config.client.url}`,
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      socket.on('send_comments', async (data) => {
        const comments = await addCommentSocket(data);

        socket.broadcast.emit('comments', comments);
      });
    });

    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server started on URL http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Server did not start, error: ', err);
    process.exit(1);
  }
})();
