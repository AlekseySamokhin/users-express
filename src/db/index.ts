import User from './entities/User';
import dataSource from './dataSource';

const dbUsers = dataSource.getRepository(User);

export default dbUsers;
