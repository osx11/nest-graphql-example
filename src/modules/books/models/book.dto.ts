import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReviewDto } from '../../reviews/models/review.dto';

@ObjectType()
export class BookDto {
  @Field((type) => Int)
  id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  author: string;

  @Field((type) => [ReviewDto])
  reviews: ReviewDto[];
}
