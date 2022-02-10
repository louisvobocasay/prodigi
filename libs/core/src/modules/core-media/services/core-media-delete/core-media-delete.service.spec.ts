import { Test, TestingModule } from '@nestjs/testing';
import { CoreMediaDeleteService } from './core-media-delete.service';

describe('CoreMediaDeleteService', () => {
  let service: CoreMediaDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreMediaDeleteService],
    }).compile();

    service = module.get<CoreMediaDeleteService>(CoreMediaDeleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
