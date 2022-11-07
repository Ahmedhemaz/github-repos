import { Injectable } from '@nestjs/common';
import { Branch } from './entities/branch.entity';
import { RepoCreator } from './entities/creator/repo.creator';
import { Repo } from './entities/repo.entity';
import { FindAllReposInterface } from './interfaces/find-all-repos.interface';
import { Github } from './providers/github/github';

@Injectable()
export class ReposService {
  constructor(
    private readonly githubService: Github,
    private readonly repoCreator: RepoCreator,
  ) {}
  public async findAll(findAllRequest: FindAllReposInterface): Promise<Repo[]> {
    const repos: Repo[] = await this.githubService.getAllReposBy(
      findAllRequest,
    );
    const cp: Promise<Repo>[] = repos.map(async (repo) => {
      const branches = await this.findAllRepoBranches(repo, findAllRequest);
      return this.repoCreator.createRepo(repo, branches);
    });
    return Promise.all(cp);
  }

  /**
   * findAllRepoBranches
   */
  public async findAllRepoBranches(
    repo: Repo,
    findAllRequest: FindAllReposInterface,
  ): Promise<Branch[]> {
    return await this.githubService.getRepoBranches(
      findAllRequest.username,
      repo.repositoryName,
    );
  }
}
