import type User from '../db/entities/User';

interface IBodyType {
  id: User['id'];
  fullName?: User['fullName'];
  email: User['email'];
  password: User['password'];
  dob?: User['dob'];
}

export default IBodyType;
