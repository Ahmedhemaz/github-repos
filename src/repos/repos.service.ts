import { Injectable } from '@nestjs/common';
import { FindAllReposInterface } from './interfaces/find-all-repos.interface';
import { Github } from './providers/github/github';

@Injectable()
export class ReposService {
  constructor(private readonly githubService: Github) {}
  findAll(findAllRequest: FindAllReposInterface) {
    return this.githubService.getAllReposBy(findAllRequest);
  }
}
