import { Model } from "mongoose";
import { User } from "src/core/dtos/models/add_user.schema";
import { WithdrawlCoin } from "src/core/dtos/models/withdrawl_coin.schema";
export declare class WithdrawlService {
    private readonly withdrawlCoinModel;
    private readonly userModel;
    constructor(withdrawlCoinModel: Model<WithdrawlCoin>, userModel: Model<User>);
    withdrawlCoins(body: any, req: any, res: any): Promise<void>;
}
