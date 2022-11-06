import { Controller, Get, Param } from '@nestjs/common';
import { ReposService } from './repos.service';

@Controller('repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}

  @Get(':username')
  async findAll(@Param('username') username: string) {
    console.log(await this.reposService.findAll(username));

    return 'yoyoyo';
  }
}
