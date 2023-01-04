import type { Request } from 'express';
import type User from 'src/db/entities/User';

interface IAuthRequest extends Request {
  user: User;
}

export default IAuthRequest;
