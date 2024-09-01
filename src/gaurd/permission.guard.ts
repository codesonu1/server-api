import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { modelService } from 'src/helper/modelService';
import { JWT_EXPIRES, JWT_SECRET } from 'src/config/configuration';
import { encryptService } from 'src/helper/encryptService';
import { User } from 'src/core/dtos/models/add_user.schema';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector
    , @InjectModel("User") private readonly userModel: Model<User>
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.user_id, "request.user_id")
    if (request) {
      const roles = this.reflector.get<string[]>("roles", context.getHandler());
      const decode = await modelService.FindOne(this.userModel, { _id: request.user_id })
      // console.log(decode, "decode")
      // request.user_id = decode
      // request.user = decode
      if (decode) return roles.includes(decode.role)
      if (!decode) return false
    } else {
      return false
    }


  }
}
