import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema()
export class WithdrawlCoin {
    @Prop()
    user_id: Types.ObjectId
    @Prop()
    networkId: Types.ObjectId
    @Prop()
    curencyId: Types.ObjectId
    @Prop()
    wallet_address: string
    @Prop()
    coin: number
    @Prop({ default: Date.now() })
    created_at: Date;

}
export type WithdrawlCoinDocument = HydratedDocument<WithdrawlCoin>;
export const WithdrawlCoinSchema = SchemaFactory.createForClass(WithdrawlCoin);