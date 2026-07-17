import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

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
}
