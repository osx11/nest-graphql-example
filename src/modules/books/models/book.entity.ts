import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from '../../reviews/models/review.entity';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('varchar', { length: 255 })
  author: string;

  @OneToMany((type) => Review, (review) => review.book)
  reviews: Review[];
}
