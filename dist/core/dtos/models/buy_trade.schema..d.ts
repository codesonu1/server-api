import { HydratedDocument, Types } from "mongoose";
export declare class BuyTrade {
    user_id: Types.ObjectId;
    currency: String;
    time: string;
    amount: number;
    subtotal: number;
    isValid: boolean;
    isHold: boolean;
    created_at: Date;
}
export type BuyTradeDocument = HydratedDocument<BuyTrade>;
export declare const BuyTradeSchema: import("mongoose").Schema<BuyTrade, import("mongoose").Model<BuyTrade, any, any, any, import("mongoose").Document<unknown, any, BuyTrade> & BuyTrade & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BuyTrade, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<BuyTrade>> & import("mongoose").FlatRecord<BuyTrade> & {
    _id: Types.ObjectId;
}>;
