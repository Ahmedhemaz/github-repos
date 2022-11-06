import { Injectable } from '@nestjs/common';
import { Github } from './providers/github/github';

@Injectable()
export class ReposService {
  constructor(private readonly githubService: Github) {}
  findAll(username: string) {
    return this.githubService.getAllReposBy(username);
  }
}
