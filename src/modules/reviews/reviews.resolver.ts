import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { ReviewDto } from './models/review.dto';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './models/create-review.dto';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../../auth/graphql-auth.guard';
import { WsAuthGuard } from '../../auth/ws-auth.guard';

export const reviewsPubSub = new PubSub();

@Resolver((of) => ReviewDto)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query((returns) => ReviewDto)
  @UseGuards(GraphqlAuthGuard)
  async review(@Args('id', { type: () => Int }) id: number) {
    return await this.reviewsService.findOne(id);
  }

  @Query((returns) => [ReviewDto])
  @UseGuards(GraphqlAuthGuard)
  async reviews() {
    return await this.reviewsService.findAll();
  }

  @Mutation((returns) => ReviewDto)
  @UseGuards(GraphqlAuthGuard)
  async createReview(
    @Args('entity', { type: () => CreateReviewDto }) entity: CreateReviewDto,
  ) {
    const created = await this.reviewsService.create(entity);

    await reviewsPubSub.publish('reviewAdded', { reviewAdded: created });

    return created;
  }

  @Subscription((returns) => ReviewDto)
  @UseGuards(WsAuthGuard)
  reviewAdded() {
    console.debug('trig');
    return reviewsPubSub.asyncIterator('reviewAdded');
  }
}
