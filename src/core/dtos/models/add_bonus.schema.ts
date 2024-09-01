import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema()
export class AddBonus {
    @Prop()
    bonus_type: string
    @Prop()
    bonus_amount: Number
    @Prop()
    remark: string
    @Prop({ default: Date.now() })
    created_at: Date;

}
export type AddBonusDocument = HydratedDocument<AddBonus>;
export const AddBonusSchema = SchemaFactory.createForClass(AddBonus);