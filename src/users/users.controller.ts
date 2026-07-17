import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // create a new user by Admin User
    @Post()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('USER', 'CREATE')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    // Get all the users
    @Get()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('USER', 'READ')
    findAll() {
        return this.usersService.findAll();
    }

    // Get single user
    @Get(':id')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('USER', 'READ')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }
}
