import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Model } from 'mongoose';
import { User } from 'src/core/dtos/models/add_user.schema';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private readonly userModel;
    constructor(reflector: Reflector, userModel: Model<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
