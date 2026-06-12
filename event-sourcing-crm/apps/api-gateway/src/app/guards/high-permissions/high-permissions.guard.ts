import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import * as constants from "../../constants/constants";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class HighPermissionsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = this.jwtService.verify(token, {
        secret: constants.JWT_SECRET,
      });

      return payload.role === "manager" || payload.role === "admin";
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
