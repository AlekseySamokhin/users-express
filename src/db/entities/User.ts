import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Rating } from './Rating';
import { Comment } from './Comment';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  @JoinColumn()
  comment: Comment[];

  @OneToOne(() => Rating, (rating) => rating.user, { cascade: true })
  @JoinColumn()
  rating: Rating;
}

export { User };
