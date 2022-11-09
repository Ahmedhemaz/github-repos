import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindAllReposDto } from './dto/find-all-repos.dto';
import { ReposService } from './repos.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Repo } from './entities/repo.entity';

@Controller('repos')
@ApiTags('Repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}

  @ApiOperation({ summary: `Find All Non forked repos with it's branches` })
  @ApiResponse({
    status: 200,
    description: `Find All Non forked repos with it's branches`,
    type: Repo,
  })
  @ApiResponse({
    status: 404,
    description: `If username does not exist`,
  })
  @ApiResponse({
    status: 406,
    description: `If header is not Accept: application/json`,
  })
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
