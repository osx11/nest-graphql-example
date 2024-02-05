import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './models/review.entity';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewsService, ReviewsResolver],
  exports: [TypeOrmModule],
})
export class ReviewsModule {}
