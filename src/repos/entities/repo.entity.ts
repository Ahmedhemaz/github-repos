import { Branch } from './branch.entity';

export class Repo {
  repositoryName: string;
  loginOwner: string;
  branches: Branch[];
}
