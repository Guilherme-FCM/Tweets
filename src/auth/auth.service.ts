import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  findUserByTelephone(telephone: string) {
    return this.userModel.findOne({ where: { telephone } });
  }
}
