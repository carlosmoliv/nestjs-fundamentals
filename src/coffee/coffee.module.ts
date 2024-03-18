import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffee.constants';

class MockCoffeeService {}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeeController],
  // providers: [{ provide: CoffeeService, useValue: new MockCoffeeService() }],
  providers: [
    CoffeeService,
    { provide: COFFEE_BRANDS, useValue: ['brand1', 'brand2'] },
  ],
  exports: [CoffeeService],
})
export class CoffeeModule {}
