import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { WithdrawlCoinSchema } from "src/core/dtos/models/withdrawl_coin.schema";
import { WithdrawlService } from "./withdrawl.service";
import { WithdrawlController } from "src/controllers/withdrawl.controller";
import { UserSchema } from "src/core/dtos/models/add_user.schema";

@Module({
    imports: [MongooseModule.forFeature([{
        name: "Withdrawl", schema: WithdrawlCoinSchema
    },
    {
        name: "User", schema: UserSchema
    }])],
    controllers: [WithdrawlController],
    providers: [WithdrawlService]
})
export class WithdrawlModule { }