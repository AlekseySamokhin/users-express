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
import { Cart } from './Cart';

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

  @OneToMany(() => Comment, (comment) => comment.user, { nullable: true, cascade: true })
  @JoinColumn()
  comment: Comment[];

  @OneToMany(() => Cart, (cart) => cart.book)
  @JoinColumn()
  cart: Cart[];

  @OneToOne(() => Rating, (rating) => rating.user, { cascade: true })
  @JoinColumn()
  rating: Rating;
}

export { User };
