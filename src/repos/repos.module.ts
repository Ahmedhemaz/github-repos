import { Module } from '@nestjs/common';
import { ReposService } from './repos.service';
import { ReposController } from './repos.controller';
import { HttpModule } from '@nestjs/axios';
import { Github } from './providers/github/github';
import { HttpServiceNotfoundPipe } from './pipes/http-service-notfound.pipe';

@Module({
  imports: [HttpModule],
  controllers: [ReposController],
  providers: [ReposService, Github, HttpServiceNotfoundPipe],
})
export class ReposModule {}
