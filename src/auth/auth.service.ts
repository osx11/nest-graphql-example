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
      accessToken: await this.generateAccessToken(payload),
      refreshToken: await this.generateRefreshToken(payload),
    };
  }

  async refresh(refreshToken: string) {
    const tokenIsValid = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_SECRET,
    });

    if (!tokenIsValid) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    const user = this.jwtService.decode(refreshToken);

    return {
      accessToken: await this.generateAccessToken({
        sub: user.sub,
        username: user.username,
      }),
    };
  }

  private async generateAccessToken(payload: {
    sub: number;
    username: string;
  }) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: 300, // 5 m
    });
  }

  private async generateRefreshToken(payload: {
    sub: number;
    username: string;
  }) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: 60 * 60 * 24, // 24 h
    });
  }
}
