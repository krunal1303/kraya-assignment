import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { VendorsModule } from './vendors/vendors.module';
import { IndentsModule } from './indents/indents.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, RolesModule, VendorsModule, IndentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
