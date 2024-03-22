import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeService } from './coffee.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeeService', () => {
  let sut: CoffeeService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
      ],
    }).compile();
    sut = module.get<CoffeeService>(CoffeeService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
    // For request-scoped or transient-scoped, use .resolve() instead
    // service = module.resolve<CoffeeService>(CoffeeService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = 1;
        const expectedCoffee = {};
        coffeeRepository.findOne.mockReturnValue(expectedCoffee);

        const coffee = await sut.findOne(coffeeId);

        expect(coffee).toEqual(expectedCoffee);
      });
    });

    describe('otherwise', () => {
      it('should throw the NotFoundException', async () => {
        const coffeeId = 1;
        coffeeRepository.findOne.mockReturnValue(undefined);

        await expect(sut.findOne(coffeeId)).rejects.toThrow(NotFoundException);
      });
    });
  });
});
