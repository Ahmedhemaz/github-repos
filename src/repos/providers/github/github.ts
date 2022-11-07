import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpServiceNotfoundPipe } from 'src/repos/pipes/http-service-notfound.pipe';
import { Repo } from 'src/repos/entities/repo.entity';
import { ApiResponseToRepoMapper } from './mappers/api-response-to-repo.mapper';
import { FindAllReposInterface } from 'src/repos/interfaces/find-all-repos.interface';
import { ApiResponseToBranchMapper } from './mappers/api-response-to-branch.mapper';
@Injectable()
export class Github {
  constructor(
    private readonly httpService: HttpService,
    private readonly httpServiceNotfoundPipe: HttpServiceNotfoundPipe,
    private readonly apiResponseToRepoMapper: ApiResponseToRepoMapper,
    private readonly apiResponseToBranchMapper: ApiResponseToBranchMapper,
  ) {}

  public async getAllReposBy(
    getAllReposRequest: FindAllReposInterface,
  ): Promise<Repo[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `https://api.github.com/users/${getAllReposRequest.username}/repos`,
          {
            params: {
              per_page: getAllReposRequest.per_page,
              page: getAllReposRequest.page,
            },
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.httpServiceNotfoundPipe.transform(error);
            throw error.message;
          }),
        ),
    );

    return data
      .filter((repo: any) => !repo.fork)
      .map((repo: any) =>
        this.apiResponseToRepoMapper.mapApiResponseToRepo(repo),
      );
  }

  public async getRepoBranches(
    username: string,
    repoName: string,
  ): Promise<any[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/repos/${username}/${repoName}/branches`, {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.httpServiceNotfoundPipe.transform(error);
            throw error.message;
          }),
        ),
    );
    return data.map((branch: any) =>
      this.apiResponseToBranchMapper.mapApiResponseToBranch(branch),
    );
  }
}
