import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema()
export class CoinVerifyLogs {

    @Prop()
    deposite_id: Types.ObjectId
    @Prop()
    user_id: Types.ObjectId
    @Prop()
    is_recharge: boolean
    @Prop({ default: "" })
    remark: string
    @Prop({ default: Date.now() })
    created_at: Date;
}
export type CoinVerifyLogsDocument = HydratedDocument<CoinVerifyLogs>;
export const CoinVerifyLogsSchema = SchemaFactory.createForClass(CoinVerifyLogs);