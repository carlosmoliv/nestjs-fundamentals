import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import { Event, EventSchema } from '../events/entities/event.entity';

@Module({
  imports: [
    // 'forFeature' is used in child modules
    MongooseModule.forFeature([
      {
        // '.name' is a way to get the function name from a javascript class
        name: Coffee.name,
        schema: CoffeeSchema,
      },

      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
