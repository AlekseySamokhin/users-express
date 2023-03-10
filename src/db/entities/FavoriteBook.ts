import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Book } from './Book';
import { User } from './User';

@Entity()
class FavoriteBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  bookId: number;

  @Column({ type: 'varchar', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.bookId)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}

export { FavoriteBook };
