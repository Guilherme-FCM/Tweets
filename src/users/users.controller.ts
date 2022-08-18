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
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Email or telephone is required.' });

    if (createUserDto.email) credentials.push({ email: createUserDto.email });

    if (createUserDto.telephone)
      credentials.push({ telephone: createUserDto.telephone });

    const findedUsers = await this.usersService.countByCredentials(credentials);
    if (findedUsers > 0)
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
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
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.findOne(+id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'User not found.' });
    return res.json(user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const [result] = await this.usersService.update(+id, updateUserDto);
    if (result === 0)
      res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found.' });
    return res.json(this.usersService.findOne(+id));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.usersService.remove(+id);
    if (result === 0)
      res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found.' });
    return res.json({ message: 'success.' });
  }
}
