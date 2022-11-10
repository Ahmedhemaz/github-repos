import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { RepoCreator } from './entities/creator/repo.creator';
import { HttpServiceNotfoundPipe } from './pipes/http-service-notfound.pipe';
import { Github } from './providers/github/github';
import { ApiResponseToBranchMapper } from './providers/github/mappers/api-response-to-branch.mapper';
import { ApiResponseToRepoMapper } from './providers/github/mappers/api-response-to-repo.mapper';
import { ReposService } from './repos.service';
import { createBrancheMocks } from './__mocks__/branches.mock';
import { createRepoMocks } from './__mocks__/repos.mocks';

describe('ReposService', () => {
  let service: ReposService;
  let githubService: Github;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ReposService,
        Github,
        HttpServiceNotfoundPipe,
        ApiResponseToRepoMapper,
        ApiResponseToBranchMapper,
        RepoCreator,
      ],
    }).compile();

    service = module.get<ReposService>(ReposService);
    githubService = module.get<Github>(Github);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return repos promise', async () => {
    const reposMocks = createRepoMocks();
    const branchesMocks = createBrancheMocks();
    jest
      .spyOn(githubService, 'getAllReposBy')
      .mockImplementation(() => reposMocks);
    jest
      .spyOn(service, 'findAllRepoBranches')
      .mockImplementation(() => branchesMocks);

    expect(service.findAll(null)).toStrictEqual(
      Promise.all(service['mergeRepoWithBranches'](await reposMocks, null)),
    );
  });
});
