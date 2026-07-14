import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// @Global() - PrismaService can use all over the application, no need to import PrismaModule in every module
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule { }
