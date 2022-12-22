import bcrypt from 'bcrypt';

import config from '../config';

const { salt } = config.password;

const hash = (password: string) => {
  return bcrypt.hashSync(password, Number(salt));
};

const compare = (password: string, oldPassword: string) => {
  return bcrypt.compareSync(password, oldPassword);
};

const passUtils = {
  hash,
  compare,
};

export default passUtils;
