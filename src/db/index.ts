import dataSource from './dataSource';
import { User, Book, Genre, Rating, Comment, FavoriteBook } from './entities';

const dbUsers = dataSource.getRepository(User);
const dbBooks = dataSource.getRepository(Book);
const dbGenres = dataSource.getRepository(Genre);
const dbRatings = dataSource.getRepository(Rating);
const dbComments = dataSource.getRepository(Comment);
const dbFavoritesBooks = dataSource.getRepository(FavoriteBook);

export { dbUsers, dbBooks, dbGenres, dbRatings, dbComments, dbFavoritesBooks };
