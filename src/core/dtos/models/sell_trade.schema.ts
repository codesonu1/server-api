import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema()
export class SellTrade {

    @Prop()
    user_id: Types.ObjectId;
    @Prop()
    wallet_id: string
    @Prop()
    coin_id: string
    @Prop()
    network_id: string
    @Prop()
    amount: number
    @Prop({ default: Date.now() })
    created_at: Date
}
export type SellTradeDocument = HydratedDocument<SellTrade>
export const SellTradeSchema = SchemaFactory.createForClass(SellTrade)
