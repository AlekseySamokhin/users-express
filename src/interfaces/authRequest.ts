import type { Request } from 'express';

import type { User } from '../db/entities/User';

interface IAuthRequestType extends Request {
  user: User;
}

export { IAuthRequestType };
