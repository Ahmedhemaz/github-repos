import { ApiProperty } from '@nestjs/swagger';
import { Branch } from './branch.entity';

export class Repo {
  @ApiProperty({ example: 'Repo Name', description: 'Repo name' })
  repositoryName: string;
  @ApiProperty({ example: 'Owner', description: 'Repo Owner name' })
  loginOwner: string;
  @ApiProperty({
    example: [
      { name: 'branch1', lastCommitSha: 'sha1' },
      { name: 'branch2', lastCommitSha: 'sha2' },
      { name: 'branch3', lastCommitSha: 'sha3' },
    ],
    description: 'Branches',
  })
  branches: Branch[];
}
