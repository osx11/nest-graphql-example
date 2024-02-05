import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BookDto } from '../../books/models/book.dto';

@ObjectType()
export class ReviewDto {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  mark: number;

  @Field((type) => String, { nullable: true })
  comment?: string;

  @Field((type) => BookDto)
  book: BookDto;
}
