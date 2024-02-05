import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateBookDto {
  @Field((type) => Int)
  id?: number;

  @Field((type) => String, { nullable: true })
  title?: string;

  @Field((type) => String, { nullable: true })
  author?: string;
}
