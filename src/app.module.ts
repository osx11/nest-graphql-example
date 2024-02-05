import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BookModule } from './modules/books/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './modules/books/models/book.entity';
import { Review } from './modules/reviews/models/review.entity';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: '1',
      database: 'nest-graphql',
      synchronize: true,
      entities: [Book, Review, User],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
      include: [BookModule, ReviewsModule],
      autoSchemaFile: true,
    }),
    BookModule,
    ReviewsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
