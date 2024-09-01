import { HydratedDocument, Types } from "mongoose";
export declare class WithdrawlCoin {
    user_id: Types.ObjectId;
    networkId: Types.ObjectId;
    curencyId: Types.ObjectId;
    wallet_address: string;
    coin: number;
    created_at: Date;
}
export type WithdrawlCoinDocument = HydratedDocument<WithdrawlCoin>;
export declare const WithdrawlCoinSchema: import("mongoose").Schema<WithdrawlCoin, import("mongoose").Model<WithdrawlCoin, any, any, any, import("mongoose").Document<unknown, any, WithdrawlCoin> & WithdrawlCoin & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WithdrawlCoin, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<WithdrawlCoin>> & import("mongoose").FlatRecord<WithdrawlCoin> & {
    _id: Types.ObjectId;
}>;
