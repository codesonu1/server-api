import { Module } from '@nestjs/common';
import { TradeController } from 'src/controllers/trade.controller';
import { TradeService } from './trade.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/core/dtos/models/add_user.schema';
import { BuyTradeSchema } from 'src/core/dtos/models/buy_trade.schema.';

@Module({
    imports: [MongooseModule.forFeature([{
        name: "BuyTrade", schema: BuyTradeSchema
    },
    {
        name: "User", schema: User
    }
    ])],
    controllers: [TradeController],
    providers: [TradeService],
})
export class TradeModule { }
