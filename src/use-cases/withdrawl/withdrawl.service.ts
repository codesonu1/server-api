import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/core/dtos/models/add_user.schema";
import { WithdrawlCoin } from "src/core/dtos/models/withdrawl_coin.schema";
import { modelService } from "src/helper/modelService";
import { clientResponse } from "src/utils/clientResponse";

@Injectable()
export class WithdrawlService {
    constructor(
        @InjectModel("Withdrawl") private readonly withdrawlCoinModel: Model<WithdrawlCoin>,
        @InjectModel("User") private readonly userModel: Model<User>,
    ) { }

    async withdrawlCoins(body, req, res) {
        console.log(body, "body")
        const { coin } = body
        try {
            if (!!!body) res.send(clientResponse.error("All feilds are required!"))
            const validUser = await modelService.FindOne(this.userModel, { _id: req.user_id })
            if (validUser && validUser.kyc_status) {
                if (validUser.coin >= 0 && coin <= validUser.coin) {
                    await modelService.UpdateById(this.userModel, { _id: req.user_id }, { coin: validUser.coin - coin })
                    await modelService.Created(this.withdrawlCoinModel, { ...body })
                    res.send(clientResponse.success({
                        msg: "You Withdrawl Coin Successfully!"
                    }))
                } else {
                    res.send(clientResponse.other(404, {
                        msg: "You  don't have enough blance to withdrawl!"
                    }))
                }
            } else {
                res.send(clientResponse.error("You Are  not Verified PLease Verify Now."))

            }
        } catch {

        }
    }
}