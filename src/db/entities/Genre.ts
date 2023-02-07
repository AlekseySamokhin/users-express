import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { Book } from './Book';

@Entity()
class Genre {
  @PrimaryGeneratedColumn()
  genreId: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @ManyToMany(() => Book, (book) => book.bookId, { cascade: true })
  books: Book[];
}

export { Genre };
