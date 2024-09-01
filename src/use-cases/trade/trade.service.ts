import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { min } from 'class-validator';
import { Model } from 'mongoose';
import { User } from 'src/core/dtos/models/add_user.schema';
import { BuyTrade } from 'src/core/dtos/models/buy_trade.schema.';
import { modelService } from 'src/helper/modelService';
import { calculatetime } from 'src/utils/calculateTime';
import { clientResponse } from 'src/utils/clientResponse';

@Injectable()
export class TradeService {
    constructor(
        @InjectModel("BuyTrade") private readonly buyTradeModel: Model<BuyTrade>,
        @InjectModel("User") private readonly userModel: Model<User>

    ) { }
    async buyTradeNow(body, req, res) {
        const { currency, time, coin } = body
        try {
            const isValidUser = await modelService.FindOne(this.userModel, { _id: req.user_id })
            if (isValidUser && isValidUser.kyc_status) {
                // check coin
                if (isValidUser.coin == 0 && isValidUser.coin <= coin) {
                    res.send(clientResponse.other(200, "You don't have enough coin please deposite coin!"))
                } else {
                    // trade now
                    await modelService.UpdateById(this.userModel, { _id: req.user_id }, { coin: isValidUser.coin - coin })
                    const totalPayout = coin * 0.01
                    await modelService.Created(this.buyTradeModel, { user_id: req.user_id, currency: currency, amount: coin, time: time, subtotal: totalPayout })
                    await this.userModel.updateOne({ _id: req.user_id }, {
                        $inc: { coin: -coin }
                    }, {
                        new: true
                    })
                    res.send(clientResponse.success({
                        msg: "You have successfully buy our trade"
                    }))

                }
            } else {
                res.send(clientResponse.other(404, "You are Not verified user , Please Verify Now."))
                return
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getAllBuyTrade(res) {
        try {
            const allbuyingTrade = await modelService.FindAll(this.buyTradeModel)
            res.send(clientResponse.success(allbuyingTrade))
        } catch (error) {
            console.log(error)
        }
    }

    async updateBuyingTrade(body, res) {
        const { tradebuy_id, percentage } = body
        try {
            const isBuyIdValid = await modelService.FindOne(this.buyTradeModel, { _id: tradebuy_id })
            if (isBuyIdValid) {
                if (isBuyIdValid.isHold == true) {
                    const tradeBuyingTime = new Date(isBuyIdValid.created_at)
                    const timePeriod = isBuyIdValid.time
                    const { hrs, mins } = calculatetime(tradeBuyingTime)
                    console.log({ hrs, mins })
                    if (timePeriod / 60 < hrs && timePeriod < mins) {
                        await this.userModel.updateOne({ _id: isBuyIdValid.user_id }, {
                            $inc: {
                                coin: isBuyIdValid.amount + (100 / percentage) * isBuyIdValid.amount
                            },
                        }, { new: true })
                        await modelService.UpdateById(this.buyTradeModel, { _id: isBuyIdValid._id }, {
                            isHold: false
                        })
                        res.send(clientResponse.success("Trade Amount Successfully Added to the coin"))
                    } else {
                        await modelService.UpdateById(this.buyTradeModel, { _id: isBuyIdValid._id }, {
                            isHold: false
                        })
                        res.send(clientResponse.other(404, "Out of time to trade. You cannot Update the trade Amount"
                        ))
                    }
                } else {
                    res.send(clientResponse.other(404, "Trade Amount Already Added to user."))
                }

            } else {
                res.send(clientResponse.other(404, "Not Valid User "))
            }
        } catch (error) {
            console.log(error)
        }
    }

}
