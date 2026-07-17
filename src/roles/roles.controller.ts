import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ROLE', 'CREATE')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ROLE', 'READ')
  findAll() {
    return this.rolesService.findAll();
  }

  @Get('id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ROLE', 'READ')
  findOne(@Param(':id') id: string) {
    return this.rolesService.findOne(id);
  }
}
