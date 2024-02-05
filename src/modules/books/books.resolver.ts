import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookDto } from './models/book.dto';
import { CreateBookDto } from './models/create-book-dto';
import { UpdateBookDto } from './models/update-book-dto';
import { PubSub } from 'graphql-subscriptions';

export const booksPubSub = new PubSub();

@Resolver((of) => BookDto)
export class BooksResolver {
  constructor(private bookService: BookService) {}

  @Query((returns) => BookDto)
  async book(@Args('id', { type: () => Int }) id: number) {
    const r = await this.bookService.findOne(id);
    console.debug(r);
    return r;
  }

  @Query((returns) => [BookDto])
  async books() {
    return await this.bookService.findAll();
  }

  @Mutation((returns) => BookDto)
  async createBook(
    @Args({ name: 'entity', type: () => CreateBookDto }) entity: BookDto,
  ) {
    return await this.bookService.create(entity);
  }

  @Mutation((returns) => BookDto)
  async updateBook(
    @Args({ name: 'entity', type: () => UpdateBookDto }) entity: BookDto,
  ) {
    return await this.bookService.update(entity);
  }

  @Subscription((returns) => BookDto)
  async bookUpdated() {
    return booksPubSub.asyncIterator('bookUpdated');
  }
}
