import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './models/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService, BooksResolver],
  exports: [TypeOrmModule],
})
export class BookModule {}
