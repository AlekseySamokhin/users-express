import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Book } from './Book';
import { User } from './User';

@Entity()
class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ type: 'varchar', nullable: true })
  bookId: number;

  @Column({ type: 'varchar', nullable: true })
  userId: number;

  @CreateDateColumn()
  dateOfcreation: Date;

  @ManyToOne(() => Book, (book) => book.bookId, { nullable: true })
  @JoinColumn()
  book: Book;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn()
  user: User;
}

export { Comment };
