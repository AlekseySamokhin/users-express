import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Genre } from './Genre';

import { setUrl } from '../../utils/setUrl';

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

  @Column({ type: 'real', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  poster: string;

  @Column({ type: 'boolean', nullable: false })
  isNew: boolean;

  @Column({ type: 'boolean', nullable: false })
  isBestseller: boolean;

  @AfterLoad()
  addURL(): void {
    this.poster = setUrl.setURLBookPoster(this.poster);
  }

  @ManyToMany(() => Genre, (genre) => genre.genreId)
  @JoinTable()
  genres: Genre[];
}

export { Book };
