import { Test, TestingModule } from '@nestjs/testing';
import { IndentsController } from './indents.controller';

describe('IndentsController', () => {
  let controller: IndentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndentsController],
    }).compile();

    controller = module.get<IndentsController>(IndentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
