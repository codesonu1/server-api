import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/core/dtos/models/add_user.schema';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';
import { VerifyProfileSchema } from 'src/core/dtos/models/verify_user_profile.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: "User", schema: UserSchema
  },
  {
    name: "VerifyUserProfile", schema: VerifyProfileSchema
  }])],
  providers: [AuthService, CloudinaryService],
  controllers: [AuthController]
})
export class AuthModule { }
