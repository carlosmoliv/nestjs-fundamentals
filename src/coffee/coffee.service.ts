import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeeService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Black Coffee',
      brand: 'brand 1',
      flavors: ['without sugar'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: string): Coffee {
    return this.coffees.find((coffee) => coffee.id === +id);
  }

  create(coffee: Coffee): void {
    this.coffees.push(coffee);
  }

  update(id: string, updateCoffeeDto: Partial<Coffee>): void {
    const existingCoffee = this.findOne(id);
    if (!existingCoffee) throw new Error(`Coffee with id ${id} not found`);
    if (existingCoffee) {
      Object.assign(existingCoffee, updateCoffeeDto);
    }
  }

  remove(id: string) {
    console.log(id);
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
