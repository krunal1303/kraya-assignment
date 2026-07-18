import { Test, TestingModule } from '@nestjs/testing';
import { MiController } from './mi.controller';

describe('MiController', () => {
  let controller: MiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiController],
    }).compile();

    controller = module.get<MiController>(MiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
