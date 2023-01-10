import jwt from 'jsonwebtoken';

import config from '../config';

const {
  jwt: { privateKey, expiresIn, type },
} = config;

interface ITokenPayloadType {
  id: number;
}

const generate = (id: number): string => {
  return jwt.sign({ id }, privateKey, {
    expiresIn,
  });
};

const parse = (token: string) => {
  return jwt.verify(token, privateKey) as ITokenPayloadType;
};

const validate = (token: string): boolean => {
  return token.toLowerCase() === type;
};

const jwtUtils = {
  generate,
  parse,
  validate,
};

export default jwtUtils;
