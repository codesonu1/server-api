import { HydratedDocument, Types } from "mongoose";
export declare class User {
    u_id: Number;
    fullName: string;
    phoneNumber: number;
    account: string;
    address: string;
    country: string;
    nickName: string;
    password: string;
    token: string;
    cupon_code: string;
    role: string;
    coin: number;
    profile_img: string;
    DOB: string;
    last_login_time: string;
    kyc_status: boolean;
    last_logout_time: string;
    created_at: Date;
}
export type UserDocument = HydratedDocument<User>;
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
}>;
