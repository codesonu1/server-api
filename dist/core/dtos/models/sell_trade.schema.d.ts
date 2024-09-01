import { HydratedDocument, Types } from "mongoose";
export declare class SellTrade {
    user_id: Types.ObjectId;
    wallet_id: string;
    coin_id: string;
    network_id: string;
    amount: number;
    created_at: Date;
}
export type SellTradeDocument = HydratedDocument<SellTrade>;
export declare const SellTradeSchema: import("mongoose").Schema<SellTrade, import("mongoose").Model<SellTrade, any, any, any, import("mongoose").Document<unknown, any, SellTrade> & SellTrade & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SellTrade, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SellTrade>> & import("mongoose").FlatRecord<SellTrade> & {
    _id: Types.ObjectId;
}>;
