import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema()
export class AddNetwork {
    @Prop()
    network_name: string
    @Prop()
    wallet_address: string
    @Prop()
    wallet_img: string
    @Prop({ default: Date.now() })
    created_at: Date;

}
export type AddNetworkDocument = HydratedDocument<AddNetwork>;
export const AddNetworkSchema = SchemaFactory.createForClass(AddNetwork);