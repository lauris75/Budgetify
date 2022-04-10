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

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  login(@Request() req): any{
    console.log(req.user._doc._id);
    return this.authService.login(req.user);
  }

  @Get('protected')
  getHello(@Request() req): string {
    console.log(req.user);
    return req.user;
  }
}
