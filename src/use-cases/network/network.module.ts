import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NetworkController } from 'src/controllers/network.controller';
import { AddNetworkSchema } from 'src/core/dtos/models/add_network.schema';
import { NetworkService } from './network.service';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';
import { UserSchema } from 'src/core/dtos/models/add_user.schema';

@Module({
    imports: [MongooseModule.forFeature([{
        name: "Network", schema: AddNetworkSchema
    }, {
        name: "User", schema: UserSchema
    }])
        // , MulterModule.register({
        //     dest: "./network"
        // })
    ],
    controllers: [NetworkController],
    providers: [NetworkService, CloudinaryService],
})
export class NetworkModule { }
