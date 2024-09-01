import { HydratedDocument, Types } from "mongoose";
export declare class AddCoin {
    user_id: Types.ObjectId;
    currency_id: Types.ObjectId;
    recharge_network_id: Types.ObjectId;
    recharge_amount: number;
    is_recharge: boolean;
    voucher_img: string;
    isValid: Boolean;
    created_at: Date;
}
export type AddCoinDocument = HydratedDocument<AddCoin>;
export declare const AddCoinSchema: import("mongoose").Schema<AddCoin, import("mongoose").Model<AddCoin, any, any, any, import("mongoose").Document<unknown, any, AddCoin> & AddCoin & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AddCoin, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AddCoin>> & import("mongoose").FlatRecord<AddCoin> & {
    _id: Types.ObjectId;
}>;
