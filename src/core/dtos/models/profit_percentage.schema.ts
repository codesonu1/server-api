import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class ProfitPercentage {

    @Prop()
    time_frame: string
    @Prop()
    percentage: number
    @Prop()
    min_volume: number
    @Prop({ default: Date.now() })
    created_at: Date
}

export type ProfitPercentageDocument = ProfitPercentage & Document
export const ProfitPercentageSchema = SchemaFactory.createForClass(ProfitPercentage)