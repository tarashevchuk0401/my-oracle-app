import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    console.log(body);
    return await this.userService.createUser(body);
  }

  @Put()
  async updateUsername(@Body() body: { name: string }) {
    return this.userService.updateUsername(body.name);
  }

  @Get('by-date')
  async getUserItemByCreationDate(@Body() body: { date: Date }) {
    return await this.userService.getUserItemByCreationDate(body);
  }

  @Get('by-name')
  async getUserByName(@Query('name') name: string) {
    return await this.userService.getUserByName(name);
  }
}
