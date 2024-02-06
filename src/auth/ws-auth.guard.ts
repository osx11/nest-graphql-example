import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const token = this.extractTokenFromHeader(ctx);

    console.debug('TOKEN', token);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
    } catch (e) {
      console.debug('catched', e);
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(
    context: GqlExecutionContext,
  ): string | undefined {
    const headers = context.getContext().req.connectionParams.headers;
    const [type, token] = headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
