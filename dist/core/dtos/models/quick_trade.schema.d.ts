import { HydratedDocument, Types } from "mongoose";
export declare class QuickTrade {
    user_id: Types.ObjectId;
    currencyName: String;
    period: number;
    action: String;
    amount: number;
    created_at: Date;
}
export type QuickTradeDocument = HydratedDocument<QuickTrade>;
export declare const QuickTradeSchema: import("mongoose").Schema<QuickTrade, import("mongoose").Model<QuickTrade, any, any, any, import("mongoose").Document<unknown, any, QuickTrade> & QuickTrade & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, QuickTrade, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<QuickTrade>> & import("mongoose").FlatRecord<QuickTrade> & {
    _id: Types.ObjectId;
}>;
