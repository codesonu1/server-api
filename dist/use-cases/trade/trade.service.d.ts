import { Model } from 'mongoose';
import { User } from 'src/core/dtos/models/add_user.schema';
import { BuyTrade } from 'src/core/dtos/models/buy_trade.schema.';
export declare class TradeService {
    private readonly buyTradeModel;
    private readonly userModel;
    constructor(buyTradeModel: Model<BuyTrade>, userModel: Model<User>);
    buyTradeNow(body: any, req: any, res: any): Promise<void>;
    getAllBuyTrade(res: any): Promise<void>;
    updateBuyingTrade(body: any, res: any): Promise<void>;
}
