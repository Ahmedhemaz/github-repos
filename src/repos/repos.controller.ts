import { Controller, Get, Param } from '@nestjs/common';
import { ReposService } from './repos.service';

@Controller('repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}

  @Get(':username')
  findAll(@Param('username') username: string) {
    console.log(username);

    return this.reposService.findAll();
  }
}
