import bcrypt from 'bcrypt';

import config from '../config';

async function match(password: string, exPass: string) {
  return bcrypt.compare(password, exPass);
}

async function hash(password: string) {
  return bcrypt.hash(password, +config.verify.passwordSalt);
}
export default { match, hash };
