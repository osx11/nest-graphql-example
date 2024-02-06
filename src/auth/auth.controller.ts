import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './models/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { RefreshDto } from './models/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async signIn(@Body() dto: SignInDto) {
    return await this.authService.singIn(dto.username, dto.password);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    return await this.authService.refresh(dto.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('test')
  async test() {
    return Promise.resolve('OK');
  }
}
