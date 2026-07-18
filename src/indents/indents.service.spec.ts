import { Test, TestingModule } from '@nestjs/testing';
import { IndentsService } from './indents.service';

describe('IndentsService', () => {
  let service: IndentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndentsService],
    }).compile();

    service = module.get<IndentsService>(IndentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
