import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly appService: UsersService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // Lógica para crear el usuario
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    // Lógica para actualizar el usuario
  }
}
