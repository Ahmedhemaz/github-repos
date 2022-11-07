import { IsNumberString } from 'class-validator';

export class FindAllReposDto {
  @IsNumberString()
  per_page: string;

  @IsNumberString()
  page: string;
}
