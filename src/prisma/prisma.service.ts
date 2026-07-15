import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // NestJS calls onModuleInit() automatically when the module starts.
  async onModuleInit() {
    await this.$connect();
  }
}
