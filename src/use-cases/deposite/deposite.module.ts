import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AddCoinSchema } from 'src/core/dtos/models/deposite_coin.schem';
import { DepositeService } from './deposite.service';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';
import { DepositeController } from 'src/controllers/deposite.controller';
import { UserSchema } from 'src/core/dtos/models/add_user.schema';
import { UserCoinDepositeLogsSchema } from 'src/core/dtos/models/user_coin_deposite_logs.schema';
import { CoinVerifyLogsSchema } from 'src/core/dtos/models/coin_verify_logs.schema';
import { Addcurrency } from 'src/core/dtos/models/add_currency.schema';
import { AddNetwork } from 'src/core/dtos/models/add_network.schema';
import { BillSchema } from 'src/core/dtos/models/bill.schema';
import { AddAddressSchema } from 'src/core/dtos/models/add_address.schema';

@Module({
    imports: [MongooseModule.forFeature([{
        name: "Deposite", schema: AddCoinSchema
    }, {
        name: "User", schema: UserSchema
    }, {
        name: "UserCoinDepositeLogs", schema: UserCoinDepositeLogsSchema
    }, {
        name: "CoinVerifyLogs", schema: CoinVerifyLogsSchema
    },
    {
        name: "Currency", schema: Addcurrency
    },
    {
        name: "Network", schema: AddNetwork
    },
    {
        name: "Address", schema: AddAddressSchema
    },
    {
        name: "Bill", schema: BillSchema
    }
    ]),
        // MulterModule.register({
        //     dest: "./deposite"
        // })
    ],
    controllers: [DepositeController],
    providers: [DepositeService, CloudinaryService],
})
export class DepositeModule { }
