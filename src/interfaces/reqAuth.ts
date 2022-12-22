import type { Request } from 'express';
import type IBodyType from './bodyReq';

interface IAuthRequest extends Request {
  user: IBodyType;
}

export default IAuthRequest;
