import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';

@Controller('users')
export class UsersController {

    @Post()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('USER', 'CREATE')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

}
