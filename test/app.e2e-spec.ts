import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ReposModule } from './../src/repos/repos.module';
import { responseMock } from './__mocks__/api-response.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ReposModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/repos/username?page=1&per_page=5  (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/repos/ahmedhemaz')
      .query({ page: '1', per_page: '5' })
      .expect(200)
      .expect(responseMock);
  });
});
