import { Test, TestingModule } from '@nestjs/testing';
import { CoreMediaCreateService } from './core-media-create.service';

describe('CoreMediaCreateService', () => {
  let service: CoreMediaCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreMediaCreateService],
    }).compile();

    service = module.get<CoreMediaCreateService>(CoreMediaCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
