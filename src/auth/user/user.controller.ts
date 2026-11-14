import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { AuthGuard } from '../guard/auth.guard.js';
import { RestPasswordDto } from './dto/rest-password.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
 
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Register
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  // Login
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.userService.login(body.email, body.password);
  }

  // Get all users
  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers(@Req() req: any) {
    return this.userService.getAllUsers(req);
  }

  // Get user by ID
  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  // Update user
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  // Reset password
  @Post('reset-password')
  async resetPassword(@Body() email: RestPasswordDto) {
    return this.userService.resetPassword(email);
  }

  // Delete user
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
