/* eslint-disable no-console */
import jwt from 'jsonwebtoken';

import config from '../config';

import type IJwtPayload from '../interfaces/jwtPayload';

const { privateKey, expiresIn, type } = config.jwt;

console.log(expiresIn);

const genetate = (id: number): string => {
  return jwt.sign({ id }, privateKey, {
    expiresIn,
  });
};

const parse = (token: string) => {
  return jwt.verify(token, privateKey) as IJwtPayload;
};

const validate = (token: string): boolean => {
  return token.toLowerCase() === type;
};

const jwtUtils = {
  genetate,
  parse,
  validate,
};

export default jwtUtils;
