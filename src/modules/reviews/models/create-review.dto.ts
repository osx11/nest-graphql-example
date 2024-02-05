import { Field, InputType, Int } from '@nestjs/graphql';
import { Book } from '../../books/models/book.entity';

@InputType()
export class CreateReviewDto {
  @Field((type) => Int)
  mark: number;

  @Field((type) => String, { nullable: true })
  comment?: string;

  @Field((type) => Int)
  book: Book;
}
