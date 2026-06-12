import {Injectable, UseGuards} from '@nestjs/common';
import {JwtGuard} from "./guards/jwt/jwt.guard";
import {CurrentUser} from "./decorators/current-user.decorator";

@Injectable()
export class AppService {
  @UseGuards(JwtGuard)
  getData(@CurrentUser() user: any): { message: string } {
    console.log(user)
    return ({ message: 'Hello API' });
  }
}
