import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { RepoCreator } from './entities/creator/repo.creator';
import { HttpServiceNotfoundPipe } from './pipes/http-service-notfound.pipe';
import { Github } from './providers/github/github';
import { ApiResponseToBranchMapper } from './providers/github/mappers/api-response-to-branch.mapper';
import { ApiResponseToRepoMapper } from './providers/github/mappers/api-response-to-repo.mapper';
import { ReposController } from './repos.controller';
import { ReposService } from './repos.service';
import { createBrancheMocks } from './__mocks__/branches.mock';
import { createRepoMocks } from './__mocks__/repos.mocks';

describe('ReposController', () => {
  let controller: ReposController;
  let repoService: ReposService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReposController],
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

    controller = module.get<ReposController>(ReposController);
    repoService = module.get<ReposService>(ReposService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all mocked repos of a user', async () => {
    const reposMocks = createRepoMocks();
    const branchesMocks = createBrancheMocks();

    jest
      .spyOn(repoService, 'findAllRepoBranches')
      .mockImplementation(() => branchesMocks);
    jest
      .spyOn(repoService, 'findAll')
      .mockImplementation(async () =>
        Promise.all(
          repoService['mergeRepoWithBranches'](await reposMocks, null),
        ),
      );

    expect(
      controller.findAll('mock', { page: 'mock', per_page: 'mock' }),
    ).toStrictEqual(
      repoService.findAll({ username: 'mock', page: 'mock', per_page: 'mock' }),
    );
  });
});
