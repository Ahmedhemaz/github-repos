import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpServiceNotfoundPipe } from 'src/repos/pipes/http-service-notfound.pipe';
import { Repo } from 'src/repos/entities/repo.entity';
import { ApiResponseToRepoMapper } from './mappers/api-response-to-repo.mapper';
@Injectable()
export class Github {
  constructor(
    private readonly httpService: HttpService,
    private readonly httpServiceNotfoundPipe: HttpServiceNotfoundPipe,
    private readonly apiResponseToRepoMapper: ApiResponseToRepoMapper,
  ) {}

  public async getAllReposBy(username: string): Promise<Repo[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/users/${username}/repos`)
        .pipe(
          catchError((error: AxiosError) => {
            this.httpServiceNotfoundPipe.transform(error);
            throw error.message;
          }),
        ),
    );

    return data.map((repo) =>
      this.apiResponseToRepoMapper.mapApiResponseToRepo(repo),
    );
  }
}
