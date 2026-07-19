import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { VendorsModule } from './vendors/vendors.module';
import { IndentsModule } from './indents/indents.module';
import { MiModule } from './mi/mi.module';
import { RfqModule } from './rfq/rfq.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, RolesModule, ItemsModule, VendorsModule, IndentsModule, MiModule, RfqModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
