import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBookDto {
  @Field((type) => String)
  title: string;

  @Field((type) => String)
  author: string;
}
