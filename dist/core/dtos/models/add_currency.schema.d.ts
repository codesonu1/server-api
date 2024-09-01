import { HydratedDocument, Types } from "mongoose";
export declare class Addcurrency {
    curency_name: string;
    currency_value: number;
    created_at: Date;
}
export type AddcurrencyDocument = HydratedDocument<Addcurrency>;
export declare const AddcurrencySchema: import("mongoose").Schema<Addcurrency, import("mongoose").Model<Addcurrency, any, any, any, import("mongoose").Document<unknown, any, Addcurrency> & Addcurrency & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Addcurrency, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Addcurrency>> & import("mongoose").FlatRecord<Addcurrency> & {
    _id: Types.ObjectId;
}>;
