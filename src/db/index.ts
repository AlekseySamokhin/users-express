import dataSource from './dataSource';
import { User, Book, Genre, Rating } from './entities';

const dbUsers = dataSource.getRepository(User);
const dbBooks = dataSource.getRepository(Book);
const dbGenres = dataSource.getRepository(Genre);
const dbRating = dataSource.getRepository(Rating);

export { dbUsers, dbBooks, dbGenres, dbRating };
