import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema()
export class AddCoin {
    @Prop()
    user_id: Types.ObjectId
    @Prop()
    currency_id: Types.ObjectId
    @Prop()
    recharge_network_id: Types.ObjectId
    @Prop({ default: 0 })
    recharge_amount: number
    @Prop({ default: false })
    is_recharge: boolean
    @Prop()
    voucher_img: string
    @Prop({ default: false })
    isValid: Boolean
    @Prop({ default: Date.now() })
    created_at: Date;

}
export type AddCoinDocument = HydratedDocument<AddCoin>;
export const AddCoinSchema = SchemaFactory.createForClass(AddCoin);