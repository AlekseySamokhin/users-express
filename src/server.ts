/* eslint-disable no-console */
import { createServer } from 'http';
import { Server } from 'socket.io';

import app from './app';

import connectToDb from './db/connectToDb';
import { addCommentSocket } from './utils/addCommentSocket';

import config from './config';

const { port } = config.server;

// eslint-disable-next-line prefer-const
let onlineUsers: { userId: number; socketId: string }[] = [];

const addNewUser = (userId: number, socketId: string) => {
  const haveUser = onlineUsers.some((user) => user.userId === userId);

  if (haveUser) return;

  onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

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

      socket.on('newUser', (userId) => {
        addNewUser(userId, socket.id);
      });

      socket.on('send_notifications', (data) => {
        socket.broadcast.emit('get_notification', {
          user: data.user,
          bookId: data.bookId,
          text: data.text,
        });
      });

      socket.on('disconnect', () => {
        removeUser(socket.id);
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
