import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema()
export class UserCoinDepositeLogs {
    @Prop( )
    user_id: Types.ObjectId
    @Prop()
    deposite_id: Types.ObjectId
    @Prop({ default: false })
    is_recharge: boolean
    @Prop({ default: Date.now() })
    created_at: Date;

}
export type UserCoinDepositeLogsDocument = HydratedDocument<UserCoinDepositeLogs>;
export const UserCoinDepositeLogsSchema = SchemaFactory.createForClass(UserCoinDepositeLogs);