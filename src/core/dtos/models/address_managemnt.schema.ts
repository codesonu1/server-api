import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema()
export class AddressManagemet {

    @Prop()
    user_id: Types.ObjectId;
    @Prop()
    address_note: String;
    @Prop()
    Currency_name: String;
    @Prop()
    Network_name: String;
    @Prop()
    wallet_address: String
    @Prop({ default: Date.now() })
    created_at: Date
}
export type AddressManagemetDocument = HydratedDocument<AddressManagemet>
export const AddressManagemetSchema = SchemaFactory.createForClass(AddressManagemet)
