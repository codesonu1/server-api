import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class ProfileVerify {
    @Prop()
    userId: string
    @Prop()
    verification_type: string
    @Prop()
    front_img: string
    @Prop()
    back_img: string
    @Prop({ default: Date.now() })
    created_at: Date

}
export type ProfileVerifyDocumnet = ProfileVerify & Document
export const VerifyProfileSchema = SchemaFactory.createForClass(ProfileVerify)