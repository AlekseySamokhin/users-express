import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('genre')
class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;
}

export { Genre };
