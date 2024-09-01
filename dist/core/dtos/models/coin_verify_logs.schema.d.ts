import { HydratedDocument, Types } from "mongoose";
export declare class CoinVerifyLogs {
    deposite_id: Types.ObjectId;
    user_id: Types.ObjectId;
    is_recharge: boolean;
    remark: string;
    created_at: Date;
}
export type CoinVerifyLogsDocument = HydratedDocument<CoinVerifyLogs>;
export declare const CoinVerifyLogsSchema: import("mongoose").Schema<CoinVerifyLogs, import("mongoose").Model<CoinVerifyLogs, any, any, any, import("mongoose").Document<unknown, any, CoinVerifyLogs> & CoinVerifyLogs & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CoinVerifyLogs, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CoinVerifyLogs>> & import("mongoose").FlatRecord<CoinVerifyLogs> & {
    _id: Types.ObjectId;
}>;
