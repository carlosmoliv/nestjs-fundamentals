import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeModule } from '../../src/coffee/coffee.module';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateCoffeeDto } from '../../src/coffee/dtos/create-coffee.dto';

describe('Coffee e2e tests', () => {
  let app: INestApplication;
  const coffee = {
    name: 'Black Coffee',
    brand: 'Brand',
    flavors: ['without sugar'],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeeModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /coffees', () => {
    it('Create a coffee', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/coffees')
        .send(coffee as CreateCoffeeDto);

      expect(status).toBe(HttpStatus.CREATED);
      expect(body).toEqual(
        expect.objectContaining({
          ...coffee,
          flavors: expect.arrayContaining(
            coffee.flavors.map((name) => expect.objectContaining({ name })),
          ),
        }),
      );
    });
  });

  it.todo('GET /coffees/:id');
  it.todo('PATCH /coffees/:id');
  it.todo('DELETE /coffees/:id');
});
