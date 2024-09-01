export declare class ProfileVerify {
    userId: string;
    verification_type: string;
    front_img: string;
    back_img: string;
    created_at: Date;
}
export type ProfileVerifyDocumnet = ProfileVerify & Document;
export declare const VerifyProfileSchema: import("mongoose").Schema<ProfileVerify, import("mongoose").Model<ProfileVerify, any, any, any, import("mongoose").Document<unknown, any, ProfileVerify> & ProfileVerify & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProfileVerify, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProfileVerify>> & import("mongoose").FlatRecord<ProfileVerify> & {
    _id: import("mongoose").Types.ObjectId;
}>;
