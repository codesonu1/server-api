import { HydratedDocument, Types } from "mongoose";
export declare class AddBonus {
    bonus_type: string;
    bonus_amount: Number;
    remark: string;
    created_at: Date;
}
export type AddBonusDocument = HydratedDocument<AddBonus>;
export declare const AddBonusSchema: import("mongoose").Schema<AddBonus, import("mongoose").Model<AddBonus, any, any, any, import("mongoose").Document<unknown, any, AddBonus> & AddBonus & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AddBonus, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AddBonus>> & import("mongoose").FlatRecord<AddBonus> & {
    _id: Types.ObjectId;
}>;
