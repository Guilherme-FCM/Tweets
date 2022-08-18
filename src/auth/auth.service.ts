import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  login(loginDto: LoginDto) {
    const user = this.userModel.findOne({ where: { ...loginDto } });
    return user;
  }
}
