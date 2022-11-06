import { Injectable } from '@nestjs/common';
import { Repo } from 'src/repos/entities/repo.entity';

@Injectable()
export class ApiResponseToRepoMapper {
  /**
   * mapApiRes
   */
  public mapApiResponseToRepo(value: any): Repo {
    const repo = new Repo();
    repo.loginOwner = value.owner.login;
    repo.repositoryName = value.name;
    return repo;
  }
}
