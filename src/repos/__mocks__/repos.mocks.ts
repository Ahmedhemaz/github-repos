import { Repo } from '../entities/repo.entity';
import { faker } from '@faker-js/faker';

export const createRepoMocks = async () => {
  const repos: Repo[] = [];
  for (let index = 0; index < 5; index++) {
    const repo: Repo = new Repo();
    repo.loginOwner = faker.internet.userName();
    repo.repositoryName = faker.random.word();
    repos.push(repo);
  }
  return repos;
};
