import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignUserRoleDto } from './dto/assign-user-role.dto';
import { AssignRolePermissionsDto } from './dto/assign-role-permissions';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) { }

  // To create a new role
  async create(createRoleDto: CreateRoleDto) {
    const role = await this.prisma.role.findUnique({
      where: {
        name: createRoleDto.name,
      },
    });

    if (role) throw new ConflictException('Role already exists');

    return this.prisma.role.create({
      data: createRoleDto,
    });
  }

  // To get all the roles presented
  async findAll() {
    return this.prisma.role.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  // To get all the roles presented
  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({ where: { id } });

    if (!role) throw new NotFoundException('Role not found');

    return role;
  }

  // To assign a role to User
  async assignUserRole(assignUserRoleDto: AssignUserRoleDto) {

    const existingUser = await this.prisma.user.findUnique({ where: { id: assignUserRoleDto.userId } });

    if (existingUser) throw new ConflictException('User does not exist');

    const existingRole = await this.prisma.user.findUnique({ where: { id: assignUserRoleDto.roleId } });

    if (existingRole) { throw new ConflictException('Role does not exist'); }

    const assignRole = await this.prisma.userRole.findUnique({
      where: {
        userId_roleId: {
          userId: assignUserRoleDto.userId,
          roleId: assignUserRoleDto.roleId,
        },
      },
    });

    if (assignRole) throw new ConflictException('Role already assigned to user')

    await this.prisma.userRole.create({
      data: {
        userId: assignUserRoleDto.userId,
        roleId: assignUserRoleDto.roleId,
      },
    });

    return {
      message: 'Role assigned successfully',
    };
  }

  // To asisgn permissions to a Role
  async assignRolePermissions(assignRolePermissionsDto: AssignRolePermissionsDto) {

    const role = await this.prisma.role.findUnique({ where: { id: assignRolePermissionsDto.roleId } });

    if (!role) throw new NotFoundException('Role not found')

    const permissions = await this.prisma.permission.findMany({
      where: { id: { in: assignRolePermissionsDto.permissionIds } }
    });

    if (permissions.length !== assignRolePermissionsDto.permissionIds.length) throw new NotFoundException('One or more permissions not found');

    // Assign permissions
    for (const permissionId of assignRolePermissionsDto.permissionIds) {
      await this.prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: assignRolePermissionsDto.roleId,
            permissionId,
          },
        },
        update: {},
        create: {
          roleId: assignRolePermissionsDto.roleId,
          permissionId,
        },
      });
    }

    return {
      message: 'Permissions assigned successfully',
    };
  }
}
