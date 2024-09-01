import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema()
export class QuickTrade {

    @Prop()
    user_id: Types.ObjectId;
    @Prop()
    currencyName: String;
    @Prop()
    period: number;
    @Prop()
    action: String;
    @Prop()
    amount: number
    @Prop({ default: Date.now() })
    created_at: Date
}
export type QuickTradeDocument = HydratedDocument<QuickTrade>
export const QuickTradeSchema = SchemaFactory.createForClass(QuickTrade)
