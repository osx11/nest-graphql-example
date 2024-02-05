import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async singIn(username: string, password: string) {
    const user = await this.usersService.findOne(username);

    if (!user) throw new UnauthorizedException();
    if (user.password !== password) throw new UnauthorizedException();

    const { password: _, ...userNoPass } = user;

    const payload = { sub: userNoPass.id, username: userNoPass.username };

    return {
      user: payload,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
