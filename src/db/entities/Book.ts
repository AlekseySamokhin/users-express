import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('book')
class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  author: string;

  @Column({ type: 'varchar', nullable: false })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  rate: string;

  @Column({ type: 'varchar', nullable: true })
  poster: string;
}

export { Book };
