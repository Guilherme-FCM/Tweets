import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    if (!loginDto.email && !loginDto.telephone)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Email or telephone is required.' });
    else if (!loginDto.email) delete loginDto.email;
    else delete loginDto.telephone;

    const autenticatedUser = await this.authService.login(loginDto);
    return res.json(autenticatedUser);
  }
}
