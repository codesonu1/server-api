import { HydratedDocument, Types } from "mongoose";
export declare class UserCoinDepositeLogs {
    user_id: Types.ObjectId;
    deposite_id: Types.ObjectId;
    is_recharge: boolean;
    created_at: Date;
}
export type UserCoinDepositeLogsDocument = HydratedDocument<UserCoinDepositeLogs>;
export declare const UserCoinDepositeLogsSchema: import("mongoose").Schema<UserCoinDepositeLogs, import("mongoose").Model<UserCoinDepositeLogs, any, any, any, import("mongoose").Document<unknown, any, UserCoinDepositeLogs> & UserCoinDepositeLogs & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserCoinDepositeLogs, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserCoinDepositeLogs>> & import("mongoose").FlatRecord<UserCoinDepositeLogs> & {
    _id: Types.ObjectId;
}>;
