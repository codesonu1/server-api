import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Addcurrency } from 'src/core/dtos/models/add_currency.schema'
import { ProfitPercentage } from 'src/core/dtos/models/profit_percentage.schema'
import { clientResponse } from 'src/utils/clientResponse'

@Injectable()
export class CurrenyService {
    constructor(
        @InjectModel("Currency") private readonly currencyModel: Model<Addcurrency>, @InjectModel("ProfitPercentage") private readonly profitPercentageModel: Model<ProfitPercentage>
    ) { }

    async getCurrency(res) {
        try {
            const totalCurrencys = await this.currencyModel.find({});
            return res.send(clientResponse.success({ data: totalCurrencys, count: totalCurrencys.length }))
        } catch (error) {
            console.log(error)
        }
    }
    async addCurrency(body, res) {
        try {
            const { curency_name, } = body
            if (!curency_name) {
                return res.send(clientResponse.other(400, "currency name is already exist!"))
            } else {
                const created_currency = await this.currencyModel.create({
                    curency_name: curency_name
                })
                return res.send(clientResponse.success(created_currency))
            }
        } catch (error) {
            console.log(error)
            res.send(clientResponse.error(error))
        }
    }

    async addProfitPercentage({ time_frame, percentage, min_volume }, res) {

        try {
            const created_currency = await this.profitPercentageModel.create({

                time_frame: time_frame,
                percentage: percentage,
                min_volume: min_volume
            })
            return res.send(clientResponse.success(created_currency))
        } catch (error) {
            console.log(error)
            res.send(clientResponse.error(error))
        }
    }
}
