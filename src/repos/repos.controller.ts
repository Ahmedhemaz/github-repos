import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindAllReposDto } from './dto/find-all-repos.dto';
import { ReposService } from './repos.service';

@Controller('repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}

  @Get(':username')
  async findAll(
    @Param('username') username: string,
    @Query() query: FindAllReposDto,
  ) {
    return await this.reposService.findAll({
      username,
      page: query.page,
      per_page: query.per_page,
    });
  }
}
