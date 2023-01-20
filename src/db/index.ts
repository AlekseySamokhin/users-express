import dataSource from './dataSource';
import { User, Book } from './entities';

const dbUsers = dataSource.getRepository(User);
const dbBooks = dataSource.getRepository(Book);

export { dbUsers, dbBooks };
