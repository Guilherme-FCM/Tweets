import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;
    const isAutenticated = await bcrypt.compare(password, user.password);

    if (!isAutenticated) return null;
    return user;
  }

  login(user) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
