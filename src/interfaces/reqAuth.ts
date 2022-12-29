import type { Request } from 'express';
import type User from 'src/db/entities/User';
// import type IBodyType from './bodyReq';

interface IAuthRequest extends Request {
  user: User;
}

export default IAuthRequest;
