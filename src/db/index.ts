import dataSource from './dataSource';
import { User, Book, Genre } from './entities';

const dbUsers = dataSource.getRepository(User);
const dbBooks = dataSource.getRepository(Book);
const dbGenres = dataSource.getRepository(Genre);

export { dbUsers, dbBooks, dbGenres };
