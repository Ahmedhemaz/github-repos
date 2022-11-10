import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ReposModule } from './../src/repos/repos.module';
import { responseMock } from './__mocks__/api-response.mock';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ReposModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return status code 200  (GET)', () => {
    return request(app.getHttpServer())
      .get('/repos/ahmedhemaz')
      .query({ page: '1', per_page: '5' })
      .expect(200)
      .expect(responseMock);
  });

  it('should return status 404 (GET)', () => {
    return request(app.getHttpServer())
      .get('/repos/qqqqqqqqqqqqqqqqfpasdhfwjefhdasfghasdofhsdfgdfsg')
      .query({ page: '1', per_page: '5' })
      .expect(404);
  });

  it('should return status 406 (GET)', () => {
    return request(app.getHttpServer())
      .get('/repos/qqqqqqqqqqqqqqqqfpasdhfwjefhdasfghasdofhsdfgdfsg')
      .accept('application/xml')
      .query({ page: '1', per_page: '5' })
      .expect(406);
  });
});
