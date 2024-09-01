import { HydratedDocument, ObjectId, Types } from "mongoose";
export declare class AddVerificationDetail {
    user_id: ObjectId;
    documentType: String;
    validNumber: string;
    issuessDay: Date;
    created_at: Date;
}
export type AddVerificationDetailDocument = HydratedDocument<AddVerificationDetail>;
export declare const AddVerificationDetailSchema: import("mongoose").Schema<AddVerificationDetail, import("mongoose").Model<AddVerificationDetail, any, any, any, import("mongoose").Document<unknown, any, AddVerificationDetail> & AddVerificationDetail & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AddVerificationDetail, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AddVerificationDetail>> & import("mongoose").FlatRecord<AddVerificationDetail> & {
    _id: Types.ObjectId;
}>;
