import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rating')
class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;
}

export { Rating };
