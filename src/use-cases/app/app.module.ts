import { Module } from '@nestjs/common';
import { AppController } from '../../controllers/index';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { CurrencyModule } from '../currency/currency.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/core/dtos/models/add_user.schema';
import { MongoDataService } from 'src/config/mongodb';
import { AddcurrencySchema } from 'src/core/dtos/models/add_currency.schema';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryController } from 'src/controllers/cloudinary.controller';
import { CloudinaryService } from '../../utils/cloudinary/cloudinary.service';
import { NetworkModule } from '../network/network.module';
import { DepositeModule } from '../deposite/deposite.module';
import { TradeModule } from '../trade/trade.module';
import { EventsModule } from 'src/gateway/event.module';
import { WithdrawlModule } from '../withdrawl/withdrawl.module';

@Module({
  imports: [
    MongoDataService,
    AuthModule,
    CurrencyModule,
    MulterModule.register({
      dest: "./uploads"
    }),
    NetworkModule,
    DepositeModule,
    TradeModule,
    EventsModule,
    WithdrawlModule
  ],
  controllers: [AppController, CloudinaryController],
  providers: [AppService, CloudinaryService],
})
export class AppModule { }
