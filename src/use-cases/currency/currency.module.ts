import { Module } from '@nestjs/common'; // Corrected spelling
import { CurrencyController } from 'src/controllers/currency.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AddcurrencySchema } from 'src/core/dtos/models/add_currency.schema'; // Assuming this is the correct import
import { UserSchema } from 'src/core/dtos/models/add_user.schema';
import { CurrenyService } from './curreny.service';
import { ProfitPercentageSchema } from 'src/core/dtos/models/profit_percentage.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: "Currency", schema: AddcurrencySchema }, {
            name: "User", schema: UserSchema
        },
        {
            name: "ProfitPercentage", schema: ProfitPercentageSchema
        }
    ])],
    providers: [CurrenyService],
    controllers: [CurrencyController]
})
export class CurrencyModule { }
