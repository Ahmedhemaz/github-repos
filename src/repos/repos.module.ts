import { Module } from '@nestjs/common';
import { ReposService } from './repos.service';
import { ReposController } from './repos.controller';
import { HttpModule } from '@nestjs/axios';
import { Github } from './providers/github/github';
import { HttpServiceNotfoundPipe } from './pipes/http-service-notfound.pipe';
import { ApiResponseToRepoMapper } from './providers/github/mappers/api-response-to-repo.mapper';

@Module({
  imports: [HttpModule],
  controllers: [ReposController],
  providers: [
    ReposService,
    Github,
    HttpServiceNotfoundPipe,
    ApiResponseToRepoMapper,
  ],
})
export class ReposModule {}
