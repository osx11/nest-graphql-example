import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './models/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  async create(entity: Omit<Review, 'id'>) {
    const created = await this.reviewsRepository.save(entity);
    return await this.findOne(created.id);
  }

  async findAll() {
    return await this.reviewsRepository.find({
      relations: {
        book: true,
      },
    });
  }

  async findOne(id: Review['id']) {
    return await this.reviewsRepository.findOne({
      where: { id },
      relations: { book: true },
    });
  }
}
