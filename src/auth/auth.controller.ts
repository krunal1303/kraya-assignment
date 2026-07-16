import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

// route - "/auth" in express
// @Controler = decorator
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // route - /auth/register - in express
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);

    // USE 'register' function to register user (all functionality written in that funciton)
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@CurrentUser() user) {
    return user;
  }
}
