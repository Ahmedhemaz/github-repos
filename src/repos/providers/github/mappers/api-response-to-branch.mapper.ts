import { Branch } from '../../../entities/branch.entity';

export class ApiResponseToBranchMapper {
  /**
   * mapApiResponseToBranch
   */
  public mapApiResponseToBranch(value: any) {
    const branch = new Branch();
    branch.lastCommitSha = value.commit.sha;
    branch.name = value.name;
    return branch;
  }
}
