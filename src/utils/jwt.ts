import jwt from 'jsonwebtoken';

import config from '../config';

import type IJwtPayload from '../interfaces/token';

const genetate = (id: number) => {
  return jwt.sign({ id }, config.token.secret, {
    expiresIn: config.token.expiration,
  });
};

const parse = (token: string) => {
  return jwt.verify(token, config.token.secret) as IJwtPayload;
};

const token = {
  genetate,
  parse,
};

export default token;
