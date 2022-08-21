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
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    if (await this.usersService.findByEmail(createUserDto.email))
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'This email is vinculated to a account.',
      });

    const hash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hash;

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

  @Get(':id/tweets')
  async findTweets(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.findTweets(+id);
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
    return res.json(await this.usersService.findOne(+id));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.usersService.remove(+id);
    if (result === 0)
      res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found.' });
    return res.json({ message: 'success.' });
  }
}
