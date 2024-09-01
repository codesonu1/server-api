export declare class ProfitPercentage {
    time_frame: string;
    percentage: number;
    min_volume: number;
    created_at: Date;
}
export type ProfitPercentageDocument = ProfitPercentage & Document;
export declare const ProfitPercentageSchema: import("mongoose").Schema<ProfitPercentage, import("mongoose").Model<ProfitPercentage, any, any, any, import("mongoose").Document<unknown, any, ProfitPercentage> & ProfitPercentage & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProfitPercentage, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProfitPercentage>> & import("mongoose").FlatRecord<ProfitPercentage> & {
    _id: import("mongoose").Types.ObjectId;
}>;
