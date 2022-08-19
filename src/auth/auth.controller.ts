import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    if (!loginDto.email && !loginDto.telephone)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Email or telephone is required.' });

    const user = loginDto.email
      ? await this.authService.findUserByEmail(loginDto.email)
      : await this.authService.findUserByTelephone(loginDto.telephone);

    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found.' });

    const isAutenticated = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isAutenticated)
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid password.' });

    const token = 'token';
    return res.status(HttpStatus.OK).json({ user, token });
  }
}
