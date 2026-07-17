import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

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
}
