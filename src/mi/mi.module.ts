import { Module } from '@nestjs/common';
import { MiController } from './mi.controller';
import { MiService } from './mi.service';

@Module({
  controllers: [MiController],
  providers: [MiService]
})
export class MiModule {}
