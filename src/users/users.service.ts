import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    // create a new user by Admin User
    async create(createUserDto: CreateUserDto) {

        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: createUserDto.email },
                    { phone: createUserDto.phone },
                ],
            },
        });

        if (existingUser) {
            throw new ConflictException(
                'User already exists with email or phone',
            );
        }
        if (existingUser) throw new ConflictException('User already exists');

        const hashPassword = await bcrypt.hash(createUserDto.password, 10)

        const { password, ...userData } = createUserDto;

        const createdUser = await this.prisma.user.create({ data: { ...userData, password: hashPassword } })

        const { password: _, ...response } = createdUser;

        return response;
    }

    // Get all the users
    async findAll() {
        return await this.prisma.user.findMany({
            where: { isActive: true },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                isActive: true,
                isAdmin: true,
                createdAt: true,
                updatedAt: true,
                userRoles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
    }

    // Get single user
    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id, isActive: true },
            include: {
                userRoles: {
                    include: {
                        role: true,
                    },
                },
            },
        });

        if (!user) throw new NotFoundException('User not found')

        const { password, ...result } = user;

        return result;
    }


    // To update single user
    async updateOne(id: string, updateUserDto: UpdateUserDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: { id, isActive: true },
        });

        if (!existingUser) throw new NotFoundException('User not found')

        if (updateUserDto.email || updateUserDto.phone) {
            const existingUser = await this.prisma.user.findFirst({
                where: {
                    AND: [
                        {
                            OR: [
                                { email: updateUserDto.email },
                                { phone: updateUserDto.phone },
                            ],
                        }
                    ],
                },
            });

            if (existingUser) {
                throw new ConflictException('User already exists with email or phone');
            }
        }

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });

        const { password, ...result } = updatedUser;

        return result;
    }
}
