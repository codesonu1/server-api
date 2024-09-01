import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId, Types } from "mongoose";
import { User } from "./add_user.schema";


@Schema()
export class AddVerificationDetail {
    @Prop({ type: Types.ObjectId, ref: User })
    user_id: ObjectId
    @Prop()
    documentType: String
    @Prop({ default: '' })
    validNumber: string
    @Prop()
    issuessDay: Date
    @Prop({ default: Date.now() })
    created_at: Date;

}
export type AddVerificationDetailDocument = HydratedDocument<AddVerificationDetail>;
export const AddVerificationDetailSchema = SchemaFactory.createForClass(AddVerificationDetail);