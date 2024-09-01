import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema()
export class User {
    @Prop({ default: 5001 })
    u_id: Number
    @Prop()
    fullName: string;
    @Prop()
    phoneNumber: number;
    @Prop({ unique: true })
    account: string;
    @Prop()
    address: string;
    @Prop()
    country: string;
    @Prop()
    nickName: string;
    @Prop({ default: '', minlength: 6 })
    password: string;
    @Prop()
    token: string;
    @Prop({ default: '' })
    cupon_code: string;
    @Prop({ default: 'user' })
    role: string;
    @Prop({ default: 0 })
    coin: number
    @Prop({ default: '' })
    profile_img: string;
    @Prop({ default: '' })
    DOB: string;
    @Prop({ default: Date.now() })
    last_login_time: string;
    @Prop({ default: false })
    kyc_status: boolean

    @Prop({ default: Date.now() })
    last_logout_time: string;
    @Prop({ default: Date.now() })
    created_at: Date;

}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);