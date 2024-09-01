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
exports.TradeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const modelService_1 = require("../../helper/modelService");
const calculateTime_1 = require("../../utils/calculateTime");
const clientResponse_1 = require("../../utils/clientResponse");
let TradeService = class TradeService {
    constructor(buyTradeModel, userModel) {
        this.buyTradeModel = buyTradeModel;
        this.userModel = userModel;
    }
    async buyTradeNow(body, req, res) {
        const { currency, time, coin } = body;
        try {
            const isValidUser = await modelService_1.modelService.FindOne(this.userModel, { _id: req.user_id });
            if (isValidUser && isValidUser.kyc_status) {
                if (isValidUser.coin == 0 && isValidUser.coin <= coin) {
                    res.send(clientResponse_1.clientResponse.other(200, "You don't have enough coin please deposite coin!"));
                }
                else {
                    await modelService_1.modelService.UpdateById(this.userModel, { _id: req.user_id }, { coin: isValidUser.coin - coin });
                    const totalPayout = coin * 0.01;
                    await modelService_1.modelService.Created(this.buyTradeModel, { user_id: req.user_id, currency: currency, amount: coin, time: time, subtotal: totalPayout });
                    await this.userModel.updateOne({ _id: req.user_id }, {
                        $inc: { coin: -coin }
                    }, {
                        new: true
                    });
                    res.send(clientResponse_1.clientResponse.success({
                        msg: "You have successfully buy our trade"
                    }));
                }
            }
            else {
                res.send(clientResponse_1.clientResponse.other(404, "You are Not verified user , Please Verify Now."));
                return;
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async getAllBuyTrade(res) {
        try {
            const allbuyingTrade = await modelService_1.modelService.FindAll(this.buyTradeModel);
            res.send(clientResponse_1.clientResponse.success(allbuyingTrade));
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateBuyingTrade(body, res) {
        const { tradebuy_id, percentage } = body;
        try {
            const isBuyIdValid = await modelService_1.modelService.FindOne(this.buyTradeModel, { _id: tradebuy_id });
            if (isBuyIdValid) {
                if (isBuyIdValid.isHold == true) {
                    const tradeBuyingTime = new Date(isBuyIdValid.created_at);
                    const timePeriod = isBuyIdValid.time;
                    const { hrs, mins } = (0, calculateTime_1.calculatetime)(tradeBuyingTime);
                    console.log({ hrs, mins });
                    if (timePeriod / 60 < hrs && timePeriod < mins) {
                        await this.userModel.updateOne({ _id: isBuyIdValid.user_id }, {
                            $inc: {
                                coin: isBuyIdValid.amount + (100 / percentage) * isBuyIdValid.amount
                            },
                        }, { new: true });
                        await modelService_1.modelService.UpdateById(this.buyTradeModel, { _id: isBuyIdValid._id }, {
                            isHold: false
                        });
                        res.send(clientResponse_1.clientResponse.success("Trade Amount Successfully Added to the coin"));
                    }
                    else {
                        await modelService_1.modelService.UpdateById(this.buyTradeModel, { _id: isBuyIdValid._id }, {
                            isHold: false
                        });
                        res.send(clientResponse_1.clientResponse.other(404, "Out of time to trade. You cannot Update the trade Amount"));
                    }
                }
                else {
                    res.send(clientResponse_1.clientResponse.other(404, "Trade Amount Already Added to user."));
                }
            }
            else {
                res.send(clientResponse_1.clientResponse.other(404, "Not Valid User "));
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.TradeService = TradeService;
exports.TradeService = TradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("BuyTrade")),
    __param(1, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TradeService);
//# sourceMappingURL=trade.service.js.map