import { HydratedDocument, Types } from "mongoose";
export declare class AddNetwork {
    network_name: string;
    wallet_address: string;
    wallet_img: string;
    created_at: Date;
}
export type AddNetworkDocument = HydratedDocument<AddNetwork>;
export declare const AddNetworkSchema: import("mongoose").Schema<AddNetwork, import("mongoose").Model<AddNetwork, any, any, any, import("mongoose").Document<unknown, any, AddNetwork> & AddNetwork & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AddNetwork, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AddNetwork>> & import("mongoose").FlatRecord<AddNetwork> & {
    _id: Types.ObjectId;
}>;
