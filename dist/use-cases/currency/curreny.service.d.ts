import { Model } from 'mongoose';
import { Addcurrency } from 'src/core/dtos/models/add_currency.schema';
import { ProfitPercentage } from 'src/core/dtos/models/profit_percentage.schema';
export declare class CurrenyService {
    private readonly currencyModel;
    private readonly profitPercentageModel;
    constructor(currencyModel: Model<Addcurrency>, profitPercentageModel: Model<ProfitPercentage>);
    getCurrency(res: any): Promise<any>;
    addCurrency(body: any, res: any): Promise<any>;
    addProfitPercentage({ time_frame, percentage, min_volume }: {
        time_frame: any;
        percentage: any;
        min_volume: any;
    }, res: any): Promise<any>;
}
