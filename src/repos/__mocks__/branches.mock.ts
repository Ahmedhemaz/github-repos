import { Branch } from '../entities/branch.entity';
import { faker } from '@faker-js/faker';

export const createBrancheMocks = async () => {
  const branches: Branch[] = [];
  for (let index = 0; index < 5; index++) {
    const branche: Branch = new Branch();
    branche.name = faker.git.branch();
    branche.lastCommitSha = faker.git.commitSha();
    branches.push(branche);
  }
  return branches;
};
