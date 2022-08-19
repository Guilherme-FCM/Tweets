import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { WhereOptions } from 'sequelize';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create({ ...createUserDto });
  }

  findAll() {
    return this.userModel.findAll({
      attributes: ['id', 'email', 'telephone', 'name', 'birthDate'],
    });
  }

  findOne(id: number) {
    return this.userModel.findOne({
      where: { id },
      attributes: ['id', 'email', 'telephone', 'name', 'birthDate'],
    });
  }

  findTweets(id: number) {
    return this.userModel.findOne({
      where: { id },
      include: [Tweet],
      attributes: ['id', 'email', 'telephone', 'name', 'birthDate'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }

  countByCredentials(credentials: WhereOptions<User>) {
    return this.userModel.count({
      where: { [Op.or]: credentials },
    });
  }

  findByEmail(email: string) {
    return this.userModel.findOne({
      where: { email },
    });
  }
}
