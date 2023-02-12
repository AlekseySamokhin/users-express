import dataSource from './dataSource';
import { User, Book, Genre, Rating, Comment, FavoriteBook, Cart } from './entities';

const dbUsers = dataSource.getRepository(User);
const dbBooks = dataSource.getRepository(Book);
const dbGenres = dataSource.getRepository(Genre);
const dbRatings = dataSource.getRepository(Rating);
const dbComments = dataSource.getRepository(Comment);
const dbFavoritesBooks = dataSource.getRepository(FavoriteBook);
const dbCart = dataSource.getRepository(Cart);

export {
  dbUsers,
  dbBooks,
  dbGenres,
  dbRatings,
  dbComments,
  dbFavoritesBooks,
  dbCart,
};
