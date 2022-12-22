import jwt from 'jsonwebtoken';

import config from '../config';

import type IJwtPayload from '../interfaces/jwtPayload';

const { privateKey, expiresIn } = config.jwt;

const genetate = (id: number) => {
  return jwt.sign({ id }, privateKey, {
    expiresIn,
  });
};

const parse = (token: string) => {
  return jwt.verify(token, privateKey) as IJwtPayload;
};

const jwtUtils = {
  genetate,
  parse,
};

export default jwtUtils;
