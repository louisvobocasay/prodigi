import { Test, TestingModule } from '@nestjs/testing';
import { MediaUploadService } from './medias-upload.service';

describe('MediasUploadService', () => {
  let service: MediaUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaUploadService],
    }).compile();

    service = module.get<MediaUploadService>(MediaUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
