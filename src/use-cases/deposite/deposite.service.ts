import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddAddress } from 'src/core/dtos/models/add_address.schema';
import { Addcurrency } from 'src/core/dtos/models/add_currency.schema';
import { AddNetwork } from 'src/core/dtos/models/add_network.schema';
import { User } from 'src/core/dtos/models/add_user.schema';
import { Bill } from 'src/core/dtos/models/bill.schema';
import { CoinVerifyLogs } from 'src/core/dtos/models/coin_verify_logs.schema';
import { AddCoin } from 'src/core/dtos/models/deposite_coin.schem';
import { UserCoinDepositeLogs } from 'src/core/dtos/models/user_coin_deposite_logs.schema';
import { modelService } from 'src/helper/modelService';
import { clientResponse } from 'src/utils/clientResponse';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';

@Injectable()
export class DepositeService {
    constructor(@InjectModel("Deposite") private readonly depositeModel: Model<AddCoin>,
        private readonly cloudinaryService: CloudinaryService,
        @InjectModel("User") private readonly userModel: Model<User>,
        @InjectModel("UserCoinDepositeLogs") private readonly userCoinDepositeLogsModel: Model<UserCoinDepositeLogs>,
        @InjectModel("Network") private readonly networkModel: Model<AddNetwork>,
        @InjectModel("Currency") private readonly currencyModel: Model<Addcurrency>,
        @InjectModel("Bill") private readonly billModel: Model<Bill>,
        @InjectModel("Address") private readonly addressModel: Model<AddAddress>,
        @InjectModel("CoinVerifyLogs") private readonly coinVerifyLogsModel: Model<CoinVerifyLogs>) { }

    async getAllUserDespositeCoin(res) {
        try {
            res.send(clientResponse.success(await modelService.FindAll(this.depositeModel)))
        } catch (error) {
            console.log(error)
        }
    }


    async depositeCoin({ currency_id, recharge_network_id, recharge_amount }, res, files, req) {

        try {
            const isExistUser = await modelService.FindOne(this.userModel, { _id: req.user_id });
            const isAlreadyDeposite = await modelService.FindOne(this.depositeModel, { user_id: req.user_id });
            if (isExistUser && isExistUser?.kyc_status) {
                if (isAlreadyDeposite) {
                    if (!isAlreadyDeposite.is_recharge) {
                        return res.send(clientResponse.other(400, 'You already deposite coin ! but not verify yet. Wait for Admin Response'))
                    } else {
                        const result = await this.cloudinaryService.uploadImage(files)
                        const deposite_coin = await modelService.Created(this.depositeModel, { user_id: req.user_id, currency_id: currency_id, recharge_network_id: recharge_network_id, recharge_amount: recharge_amount, voucher_img: result.secure_url })
                        await modelService.Created(this.userCoinDepositeLogsModel, { user_id: req.user_id, deposite_id: deposite_coin._id, is_recharge: deposite_coin.is_recharge })
                        await modelService.Created(this.billModel, { user_id: req.user_id, curency_id: currency_id, network_id: deposite_coin._id, amount: recharge_amount, status: false })
                        return res.send(clientResponse.success({ msg: 'Coin Deposite Request is sent to the Admin Please wait 24hr to deposite the coin.', coin: recharge_amount }))
                    }
                } else {
                    const result = await this.cloudinaryService.uploadImage(files)
                    const deposite_coin = await modelService.Created(this.depositeModel, { user_id: req.user_id, currency_id: currency_id, recharge_network_id: recharge_network_id, recharge_amount: recharge_amount, voucher_img: result.secure_url })
                    await modelService.Created(this.userCoinDepositeLogsModel, { user_id: req.user_id, deposite_id: deposite_coin._id, is_recharge: deposite_coin.is_recharge })
                    await modelService.Created(this.billModel, { user_id: req.user_id, curency_id: currency_id, network_id: deposite_coin._id, amount: recharge_amount, status: false })
                    return res.send(clientResponse.success({ msg: 'Coin Deposite Request is sent to the Admin Please wait 24hr to deposite the coin.', coin: recharge_amount }))



                }
            } else {
                return res.send(clientResponse.other(400, 'Your Are Not Verified Please Verify Now.'))
            }
        } catch (error) {
            console.error(error)
        }
    }

    async coinDepositeVerify({ deposite_id, user_id, amount }, res) {
        try {
            const isExistUser = await modelService.FindOne(this.userModel, { _id: user_id });
            const isExistDeposite = await modelService.FindOne(this.depositeModel, { _id: deposite_id, user_id: user_id });
            console.log({ isExistDeposite })
            if (isExistUser && isExistDeposite) {
                if (isExistDeposite.voucher_img) {
                    await modelService.Update(this.depositeModel, { _id: deposite_id }, { isValid: true, created_at: Date.now() })
                    await modelService.Update(this.userModel, { _id: user_id }, { coin: isExistUser.coin + amount })
                    // await modelService.Created(this.coinVerifyLogsModel, { deposite_id: deposite_id, user_id: user_id, is_recharge: is_recharge, remark: remark })
                    // await modelService.Update(this.userCoinDepositeLogsModel, { deposite_id: deposite_id }, { is_recharge: is_recharge })
                    // await modelService.Created(this.billModel, { user_id: isExistDeposite.user_id, curency_id: isExistDeposite.currency_id, network_id: isExistDeposite.recharge_network_id, amount: isExistDeposite.recharge_amount, status: true })
                    return res.send(clientResponse.success({ msg: 'coin verify successfully' }))
                } else {
                    return res.send(clientResponse.other(400, 'Invalid voture image!'))
                }
            } else {
                return res.send(clientResponse.other(400, 'User doesnot deposite coin yet!'))
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getAllDepositeCoinBill(res) {
        try {
            const data = await modelService.FindAll(this.billModel)
            return res.send(clientResponse.success(data))
        } catch (error) {
            console.log(error)
        }
    }

    async addAddress(body, res, req) {
        const { addressNote, currency_id, network_id, withdrawlAddreess } = body
        try {
            const isExistCurrency = await modelService.FindOne(this.currencyModel, { _id: currency_id })
            const isExistNetwork = await modelService.FindOne(this.networkModel, { _id: network_id })
            await modelService.Created(this.addressModel, { user_id: req.user_id, addressNote, curency_name: isExistCurrency.curency_name, network_name: isExistNetwork.network_name, withdrawlAddreess })
            return res.send(clientResponse.success({ msg: 'Address adds successfully' }))
        } catch (error) {
            console.log(error)
        }
    }

    async getAllAddress(res) {
        try {
            const data = await modelService.FindAll(this.addressModel)
            return res.send(clientResponse.success(data))
        } catch (error) {

        }
    }

}
