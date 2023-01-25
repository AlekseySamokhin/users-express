import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;
}

export { Rating };
