import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { AssignUserRoleDto } from './dto/assign-user-role.dto';
import { AssignRolePermissionsDto } from './dto/assign-role-permissions';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  // Create a new Role
  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ROLE', 'CREATE')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  // To get all the roles
  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ROLE', 'READ')
  findAll() {
    return this.rolesService.findAll();
  }

  // To get the single role
  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ROLE', 'READ')
  findOne(@Param(':id') id: string) {
    return this.rolesService.findOne(id);
  }

  // To assign a role to User
  @Post('assign-user')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ROLE', 'UPDATE')
  assignUserRole(@Body() assignUserRoleDto: AssignUserRoleDto) {
    return this.rolesService.assignUserRole(assignUserRoleDto);
  }

  // To assign permissions to User
  @Post('assign-permissions')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ROLE', 'UPDATE')
  assignRolePermissions(@Body() assignRolePermissionsDto: AssignRolePermissionsDto) {
    return this.rolesService.assignRolePermissions(assignRolePermissionsDto);
  }
}
