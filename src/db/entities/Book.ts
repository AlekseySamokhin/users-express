import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Genre } from './Genre';
import { Rating } from './Rating';
import { Comment } from './Comment';

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

  @Column({ type: 'date', nullable: true })
  releaseDate: Date;

  @Column({ type: 'real', nullable: false })
  averageRating: number;

  @Column({ type: 'boolean', nullable: false })
  isNew: boolean;

  @Column({ type: 'boolean', nullable: false })
  isBestseller: boolean;

  @OneToMany(() => Rating, (rating) => rating.book)
  @JoinTable()
  rating: Rating[];

  @ManyToMany(() => Genre, (genre) => genre.genreId)
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Comment, (comment) => comment.book)
  @JoinColumn()
  comment: Comment[];

  @AfterLoad()
  addURL(): void {
    this.poster = setUrl.setURLBookPoster(this.poster);
  }
}

export { Book };
