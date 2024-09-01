"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const modelService_1 = require("../../helper/modelService");
const clientResponse_1 = require("../../utils/clientResponse");
const cloudinary_service_1 = require("../../utils/cloudinary/cloudinary.service");
let DepositeService = class DepositeService {
    constructor(depositeModel, cloudinaryService, userModel, userCoinDepositeLogsModel, networkModel, currencyModel, billModel, addressModel, coinVerifyLogsModel) {
        this.depositeModel = depositeModel;
        this.cloudinaryService = cloudinaryService;
        this.userModel = userModel;
        this.userCoinDepositeLogsModel = userCoinDepositeLogsModel;
        this.networkModel = networkModel;
        this.currencyModel = currencyModel;
        this.billModel = billModel;
        this.addressModel = addressModel;
        this.coinVerifyLogsModel = coinVerifyLogsModel;
    }
    async getAllUserDespositeCoin(res) {
        try {
            res.send(clientResponse_1.clientResponse.success(await modelService_1.modelService.FindAll(this.depositeModel)));
        }
        catch (error) {
            console.log(error);
        }
    }
    async depositeCoin({ currency_id, recharge_network_id, recharge_amount }, res, files, req) {
        try {
            const isExistUser = await modelService_1.modelService.FindOne(this.userModel, { _id: req.user_id });
            const isAlreadyDeposite = await modelService_1.modelService.FindOne(this.depositeModel, { user_id: req.user_id });
            if (isExistUser && isExistUser?.kyc_status) {
                if (isAlreadyDeposite) {
                    if (!isAlreadyDeposite.is_recharge) {
                        return res.send(clientResponse_1.clientResponse.other(400, 'You already deposite coin ! but not verify yet. Wait for Admin Response'));
                    }
                    else {
                        const result = await this.cloudinaryService.uploadImage(files);
                        const deposite_coin = await modelService_1.modelService.Created(this.depositeModel, { user_id: req.user_id, currency_id: currency_id, recharge_network_id: recharge_network_id, recharge_amount: recharge_amount, voucher_img: result.secure_url });
                        await modelService_1.modelService.Created(this.userCoinDepositeLogsModel, { user_id: req.user_id, deposite_id: deposite_coin._id, is_recharge: deposite_coin.is_recharge });
                        await modelService_1.modelService.Created(this.billModel, { user_id: req.user_id, curency_id: currency_id, network_id: deposite_coin._id, amount: recharge_amount, status: false });
                        return res.send(clientResponse_1.clientResponse.success({ msg: 'Coin Deposite Request is sent to the Admin Please wait 24hr to deposite the coin.', coin: recharge_amount }));
                    }
                }
                else {
                    const result = await this.cloudinaryService.uploadImage(files);
                    const deposite_coin = await modelService_1.modelService.Created(this.depositeModel, { user_id: req.user_id, currency_id: currency_id, recharge_network_id: recharge_network_id, recharge_amount: recharge_amount, voucher_img: result.secure_url });
                    await modelService_1.modelService.Created(this.userCoinDepositeLogsModel, { user_id: req.user_id, deposite_id: deposite_coin._id, is_recharge: deposite_coin.is_recharge });
                    await modelService_1.modelService.Created(this.billModel, { user_id: req.user_id, curency_id: currency_id, network_id: deposite_coin._id, amount: recharge_amount, status: false });
                    return res.send(clientResponse_1.clientResponse.success({ msg: 'Coin Deposite Request is sent to the Admin Please wait 24hr to deposite the coin.', coin: recharge_amount }));
                }
            }
            else {
                return res.send(clientResponse_1.clientResponse.other(400, 'Your Are Not Verified Please Verify Now.'));
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async coinDepositeVerify({ deposite_id, user_id, amount }, res) {
        try {
            const isExistUser = await modelService_1.modelService.FindOne(this.userModel, { _id: user_id });
            const isExistDeposite = await modelService_1.modelService.FindOne(this.depositeModel, { _id: deposite_id, user_id: user_id });
            console.log({ isExistDeposite });
            if (isExistUser && isExistDeposite) {
                if (isExistDeposite.voucher_img) {
                    await modelService_1.modelService.Update(this.depositeModel, { _id: deposite_id }, { isValid: true, created_at: Date.now() });
                    await modelService_1.modelService.Update(this.userModel, { _id: user_id }, { coin: isExistUser.coin + amount });
                    return res.send(clientResponse_1.clientResponse.success({ msg: 'coin verify successfully' }));
                }
                else {
                    return res.send(clientResponse_1.clientResponse.other(400, 'Invalid voture image!'));
                }
            }
            else {
                return res.send(clientResponse_1.clientResponse.other(400, 'User doesnot deposite coin yet!'));
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async getAllDepositeCoinBill(res) {
        try {
            const data = await modelService_1.modelService.FindAll(this.billModel);
            return res.send(clientResponse_1.clientResponse.success(data));
        }
        catch (error) {
            console.log(error);
        }
    }
    async addAddress(body, res, req) {
        const { addressNote, currency_id, network_id, withdrawlAddreess } = body;
        try {
            const isExistCurrency = await modelService_1.modelService.FindOne(this.currencyModel, { _id: currency_id });
            const isExistNetwork = await modelService_1.modelService.FindOne(this.networkModel, { _id: network_id });
            await modelService_1.modelService.Created(this.addressModel, { user_id: req.user_id, addressNote, curency_name: isExistCurrency.curency_name, network_name: isExistNetwork.network_name, withdrawlAddreess });
            return res.send(clientResponse_1.clientResponse.success({ msg: 'Address adds successfully' }));
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAllAddress(res) {
        try {
            const data = await modelService_1.modelService.FindAll(this.addressModel);
            return res.send(clientResponse_1.clientResponse.success(data));
        }
        catch (error) {
        }
    }
};
exports.DepositeService = DepositeService;
exports.DepositeService = DepositeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Deposite")),
    __param(2, (0, mongoose_1.InjectModel)("User")),
    __param(3, (0, mongoose_1.InjectModel)("UserCoinDepositeLogs")),
    __param(4, (0, mongoose_1.InjectModel)("Network")),
    __param(5, (0, mongoose_1.InjectModel)("Currency")),
    __param(6, (0, mongoose_1.InjectModel)("Bill")),
    __param(7, (0, mongoose_1.InjectModel)("Address")),
    __param(8, (0, mongoose_1.InjectModel)("CoinVerifyLogs")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cloudinary_service_1.CloudinaryService,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DepositeService);
//# sourceMappingURL=deposite.service.js.map