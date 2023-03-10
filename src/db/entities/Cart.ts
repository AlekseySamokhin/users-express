import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

import { Book } from './Book';
import { User } from './User';

@Entity()
class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  count: number;

  @ManyToOne(() => Book, (book) => book.cart, { nullable: false })
  book: Book;

  @ManyToOne(() => User, (user) => user.cart, { nullable: false })
  user: User;
}

export { Cart };
