import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TestService } from './test/test.service';
import { TestModule } from './test/test.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, TestModule],
  controllers: [AppController],
  providers: [AppService, TestService],
})
export class AppModule { }
