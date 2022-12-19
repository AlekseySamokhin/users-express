import jwt from 'jsonwebtoken';

import config from '../config';

const jwtToken = (id: string) => {
  return jwt.sign({ id }, config.token.secret, {
    expiresIn: '30m',
  });
};

export default {
  jwtToken,
};
