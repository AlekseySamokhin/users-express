import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Book } from './Book';
import { User } from './User';

@Entity()
class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'real', nullable: true })
  rating: number;

  @ManyToOne(() => Book, (book) => book.rating, { nullable: true })
  book: Book;

  @ManyToOne(() => User, (user) => user.rating, { nullable: true })
  user: User;
}

export { Rating };
