import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './models/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async findAll() {
    return await this.booksRepository.find({ relations: { reviews: true } });
  }

  async findOne(id: Book['id']) {
    return await this.booksRepository.findOne({
      where: { id },
      relations: { reviews: true },
    });
  }

  async create(book: Omit<Book, 'id'>) {
    const created = await this.booksRepository.save(book);
    return this.findOne(created.id);
  }

  async update(book: Partial<Book> & Pick<Book, 'id'>) {
    const existing = await this.findOne(book.id);

    if (!existing) throw new NotFoundException('Book does not exist');

    const updateData = { ...existing, ...book };

    const updated = await this.booksRepository.save(updateData);
    return await this.findOne(updated.id);
  }
}
