import { MongooseModule } from '@nestjs/mongoose'
import { MONGO_URI } from './configuration'
import { Module } from '@nestjs/common';
import { User, UserSchema } from '../core/dtos/models/add_user.schema';
import { AuthModule } from 'src/use-cases/auth/auth.module';
import { CurrencyModule } from 'src/use-cases/currency/currency.module';

@Module({
    imports: [
        MongooseModule.forRoot(MONGO_URI.uri,)],
    providers: [],
    exports: [],
    controllers: [],
})
export class MongoDataService { }
