import { Controller, Body, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/create-user.dto';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './auth/auth.metadata';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private usersService: UsersService) {}

  @Public()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    const createdUser = this.usersService.createUser(createUserDto);
    return createdUser;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any{
    return this.authService.login(req.user);
  }

  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }
}
