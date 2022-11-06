import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpServiceNotfoundPipe } from 'src/repos/pipes/http-service-notfound.pipe';
@Injectable()
export class Github {
  constructor(
    private readonly httpService: HttpService,
    private readonly httpServiceNotfoundPipe: HttpServiceNotfoundPipe,
  ) {}

  public async getAllReposBy(username: string): Promise<any> {
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
    return data;
  }
}
