import User from './entities/User';
import dataSource from './dataSource';

const userRepository = dataSource.getRepository(User);

export default userRepository;
