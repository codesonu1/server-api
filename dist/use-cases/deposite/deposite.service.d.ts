import { Model } from 'mongoose';
import { AddAddress } from 'src/core/dtos/models/add_address.schema';
import { Addcurrency } from 'src/core/dtos/models/add_currency.schema';
import { AddNetwork } from 'src/core/dtos/models/add_network.schema';
import { User } from 'src/core/dtos/models/add_user.schema';
import { Bill } from 'src/core/dtos/models/bill.schema';
import { CoinVerifyLogs } from 'src/core/dtos/models/coin_verify_logs.schema';
import { AddCoin } from 'src/core/dtos/models/deposite_coin.schem';
import { UserCoinDepositeLogs } from 'src/core/dtos/models/user_coin_deposite_logs.schema';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';
export declare class DepositeService {
    private readonly depositeModel;
    private readonly cloudinaryService;
    private readonly userModel;
    private readonly userCoinDepositeLogsModel;
    private readonly networkModel;
    private readonly currencyModel;
    private readonly billModel;
    private readonly addressModel;
    private readonly coinVerifyLogsModel;
    constructor(depositeModel: Model<AddCoin>, cloudinaryService: CloudinaryService, userModel: Model<User>, userCoinDepositeLogsModel: Model<UserCoinDepositeLogs>, networkModel: Model<AddNetwork>, currencyModel: Model<Addcurrency>, billModel: Model<Bill>, addressModel: Model<AddAddress>, coinVerifyLogsModel: Model<CoinVerifyLogs>);
    getAllUserDespositeCoin(res: any): Promise<void>;
    depositeCoin({ currency_id, recharge_network_id, recharge_amount }: {
        currency_id: any;
        recharge_network_id: any;
        recharge_amount: any;
    }, res: any, files: any, req: any): Promise<any>;
    coinDepositeVerify({ deposite_id, user_id, amount }: {
        deposite_id: any;
        user_id: any;
        amount: any;
    }, res: any): Promise<any>;
    getAllDepositeCoinBill(res: any): Promise<any>;
    addAddress(body: any, res: any, req: any): Promise<any>;
    getAllAddress(res: any): Promise<any>;
}
