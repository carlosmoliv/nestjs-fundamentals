import { Injectable, Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import coffeeConfig from './coffee.config';

// class MockCoffeeService {}

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['brand1', 'brand2'];
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeeConfig),
  ],
  controllers: [CoffeeController],
  providers: [
    CoffeeService,

    // Example of custom implementation of the CoffeeService provider
    // { provide: CoffeeService, useValue: new MockCoffeeService() }

    // Example of a custom provider using strings
    // { provide: COFFEE_BRANDS, useValue: ['brand1', 'brand2'] },

    // Example using useFactory
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) =>
    //     brandsFactory.create(),
    //   inject: [CoffeeBrandsFactory],
    // },

    // Example with async operations
    {
      provide: COFFEE_BRANDS,
      useFactory: async (dataSource: DataSource): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve(['brand1', 'brand2']);
        console.log('Async Factory');
        return coffeeBrands;
      },
      inject: [DataSource],
    },

    // Example of a custom provider using the useClass
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
  exports: [CoffeeService],
})
export class CoffeeModule {}
