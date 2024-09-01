import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema()
export class AddAddress {
    @Prop()
    user_id: string
    @Prop()
    addressNote: string
    @Prop()
    curency_name: string
    @Prop()
    network_name: string
    @Prop()
    withdrawlAddreess: string
    @Prop({ default: Date.now() })
    created_at: Date;

}
export type AddAddressDocument = HydratedDocument<AddAddress>;
export const AddAddressSchema = SchemaFactory.createForClass(AddAddress);