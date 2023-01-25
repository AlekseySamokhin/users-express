import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Genre } from './Genre';

@Entity()
class Book {
  @PrimaryGeneratedColumn()
  bookId: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  author: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  poster: string;

  @ManyToMany(() => Genre, (genre) => genre.genreId)
  @JoinTable()
  genres: Genre[];
}

export { Book };
