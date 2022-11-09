import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class FindAllReposDto {
  @IsNumberString()
  @ApiProperty({
    name: 'per_page',
    required: true,
    description: 'items per page',
    type: String,
  })
  per_page: string;

  @IsNumberString()
  @ApiProperty({
    name: 'page',
    required: true,
    description: 'page',
    type: String,
  })
  page: string;
}
