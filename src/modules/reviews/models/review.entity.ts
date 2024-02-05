import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../../books/models/book.entity';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int')
  mark: number;

  @Column('varchar', { length: 255, nullable: true, default: null })
  comment?: string;

  @ManyToOne((type) => Book)
  @JoinColumn({ name: 'book' })
  book: Book;
}
