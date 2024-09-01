import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema()
export class Bill {
    @Prop()
    user_id: string
    @Prop()
    curency_id: string
    @Prop()
    network_id: string
    @Prop({ default: 0 })
    amount: number
    @Prop({ default: false })
    status: boolean
    @Prop({ default: Date.now() })
    created_at: Date;

}
export type BillDocument = HydratedDocument<Bill>;
export const BillSchema = SchemaFactory.createForClass(Bill);