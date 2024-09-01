import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import jwt from "jsonwebtoken"
import { JWT_SECRET } from 'src/config/configuration';
import { encryptService } from 'src/helper/encryptService';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false
    const token = authHeader.split(' ')[1];
    try {
      if (token) {
        const decoded = await encryptService.JwtVerify(token, JWT_SECRET.secret)
        //  console.log(decoded , "auth")
        req.user_role = decoded.role;
        req.user_id = decoded._id;
        return true;
      } else {
        return false
      }
    } catch (error) { return false }
  }
}
