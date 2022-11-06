import { Test, TestingModule } from '@nestjs/testing';
import { Github } from './github';

describe('Github', () => {
  let provider: Github;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Github],
    }).compile();

    provider = module.get<Github>(Github);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
