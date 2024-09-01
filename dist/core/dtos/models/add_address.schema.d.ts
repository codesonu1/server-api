import { HydratedDocument, Types } from "mongoose";
export declare class AddAddress {
    user_id: string;
    addressNote: string;
    curency_name: string;
    network_name: string;
    withdrawlAddreess: string;
    created_at: Date;
}
export type AddAddressDocument = HydratedDocument<AddAddress>;
export declare const AddAddressSchema: import("mongoose").Schema<AddAddress, import("mongoose").Model<AddAddress, any, any, any, import("mongoose").Document<unknown, any, AddAddress> & AddAddress & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AddAddress, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AddAddress>> & import("mongoose").FlatRecord<AddAddress> & {
    _id: Types.ObjectId;
}>;
