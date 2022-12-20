import jwt from 'jsonwebtoken';

import config from '../config';

const createToken = (id: number) => {
  return jwt.sign({ id }, config.token.secret, {
    expiresIn: '60m',
  });
};

const parseToken = (token: string) => {
  return jwt.verify(token, config.token.secret);
};

export default {
  createToken,
  parseToken,
};
