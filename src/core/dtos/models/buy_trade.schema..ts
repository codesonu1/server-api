import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema()
export class BuyTrade {

    @Prop()
    user_id: Types.ObjectId;
    @Prop()
    currency: String;
    @Prop()
    time: string;
    @Prop()
    amount: number
    @Prop({ default: 0 })
    subtotal: number
    @Prop({ default: false })
    isValid: boolean
    @Prop({ default: true })
    isHold: boolean
    @Prop({ default: Date.now() })
    created_at: Date
}
export type BuyTradeDocument = HydratedDocument<BuyTrade>
export const BuyTradeSchema = SchemaFactory.createForClass(BuyTrade)
