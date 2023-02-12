import jwt from 'jsonwebtoken';

import config from '../config';

const {
  jwt: { privateKey, expiresIn, type },
} = config;

const generate = (id: number): string => {
  return jwt.sign({ id }, privateKey, {
    expiresIn,
  });
};

const parse = (token: string) => {
// eslint-disable-next-line no-console
  return jwt.verify(token, privateKey) as { id: number };
};

const validate = (token: string): boolean => {
  return token.toLowerCase() === type;
};

const jwtUtils = {
  generate,
  parse,
  validate,
};

export { jwtUtils };
