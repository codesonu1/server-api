import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema()
export class Addcurrency {
    @Prop()
    curency_name: string
    @Prop({ default: 0 })
    currency_value: number
    @Prop({ default: Date.now() })
    created_at: Date;

}
export type AddcurrencyDocument = HydratedDocument<Addcurrency>;
export const AddcurrencySchema = SchemaFactory.createForClass(Addcurrency);