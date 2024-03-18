import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeeModule } from '../coffee/coffee.module';
import { DatabaseModule } from '../database/database.module';

// Demonstration of a dynamic module approach
@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      password: 'pass123',
      port: 5432,
    }),
    CoffeeModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
