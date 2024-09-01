import { HydratedDocument, Types } from "mongoose";
export declare class Bill {
    user_id: string;
    curency_id: string;
    network_id: string;
    amount: number;
    status: boolean;
    created_at: Date;
}
export type BillDocument = HydratedDocument<Bill>;
export declare const BillSchema: import("mongoose").Schema<Bill, import("mongoose").Model<Bill, any, any, any, import("mongoose").Document<unknown, any, Bill> & Bill & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Bill, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Bill>> & import("mongoose").FlatRecord<Bill> & {
    _id: Types.ObjectId;
}>;
