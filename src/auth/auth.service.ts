import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // TO REGISTER A NEW USER
  async register(registerDto: RegisterDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (user) throw new Error('User already exists');

    const hashPassword = await bcrypt.hash(registerDto.password, 10);

    const { password, ...userData } = registerDto;

    await this.prisma.user.create({
      data: {
        ...userData,
        password: hashPassword,
      },
    });

    return 'User registered successfully...';
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) throw new UnauthorizedException('Invalid email or password');

    const comparePassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!comparePassword)
      throw new UnauthorizedException('Invalid email or password');

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      accessToken,
    };
  }
}
