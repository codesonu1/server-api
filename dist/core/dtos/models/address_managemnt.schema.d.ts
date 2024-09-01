import { HydratedDocument, Types } from "mongoose";
export declare class AddressManagemet {
    user_id: Types.ObjectId;
    address_note: String;
    Currency_name: String;
    Network_name: String;
    wallet_address: String;
    created_at: Date;
}
export type AddressManagemetDocument = HydratedDocument<AddressManagemet>;
export declare const AddressManagemetSchema: import("mongoose").Schema<AddressManagemet, import("mongoose").Model<AddressManagemet, any, any, any, import("mongoose").Document<unknown, any, AddressManagemet> & AddressManagemet & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AddressManagemet, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AddressManagemet>> & import("mongoose").FlatRecord<AddressManagemet> & {
    _id: Types.ObjectId;
}>;
