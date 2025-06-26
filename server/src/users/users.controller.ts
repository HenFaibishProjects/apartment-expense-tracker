import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async register(@Body() dto: CreateUserDto) {
    return this.service.register(dto);
  }

  @Post()
  async login(@Body() dto: CreateUserDto) {
    return this.service.register(dto);
  }
}
