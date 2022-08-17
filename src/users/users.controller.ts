import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const credentials = [];
    if (!createUserDto.email && !createUserDto.telephone)
      return res.json({ message: 'Email or telephone is required.' });

    if (createUserDto.email) credentials.push({ email: createUserDto.email });

    if (createUserDto.telephone)
      credentials.push({ telephone: createUserDto.telephone });

    const findedUsers = await this.usersService.countByCredentials(credentials);
    if (findedUsers > 0)
      return res.json({
        message: 'This email or telephone is vinculated to a account.',
      });

    const createdUser = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json(createdUser);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const user = this.usersService.findOne(+id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'User not found.' });
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
