import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
@Injectable()
export class Github {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger('GithubService');
  public async getAllReposBy(username: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://api.github.com/users/${username}/repos`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    console.log(data);
    return 'yoyottt';
  }
}
