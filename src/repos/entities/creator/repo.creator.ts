import { Injectable } from '@nestjs/common';
import { Branch } from '../branch.entity';
import { Repo } from '../repo.entity';

@Injectable()
export class RepoCreator {
  /**
   * name
   */
  public createRepo(repo: Repo, branches: Branch[]) {
    const newRepo = new Repo();
    newRepo.branches = branches;
    newRepo.loginOwner = repo.loginOwner;
    newRepo.repositoryName = repo.repositoryName;
    return newRepo;
  }
}
