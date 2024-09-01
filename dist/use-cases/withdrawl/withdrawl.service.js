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
exports.WithdrawlService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const modelService_1 = require("../../helper/modelService");
const clientResponse_1 = require("../../utils/clientResponse");
let WithdrawlService = class WithdrawlService {
    constructor(withdrawlCoinModel, userModel) {
        this.withdrawlCoinModel = withdrawlCoinModel;
        this.userModel = userModel;
    }
    async withdrawlCoins(body, req, res) {
        console.log(body, "body");
        const { coin } = body;
        try {
            if (!!!body)
                res.send(clientResponse_1.clientResponse.error("All feilds are required!"));
            const validUser = await modelService_1.modelService.FindOne(this.userModel, { _id: req.user_id });
            if (validUser && validUser.kyc_status) {
                if (validUser.coin >= 0 && coin <= validUser.coin) {
                    await modelService_1.modelService.UpdateById(this.userModel, { _id: req.user_id }, { coin: validUser.coin - coin });
                    await modelService_1.modelService.Created(this.withdrawlCoinModel, { ...body });
                    res.send(clientResponse_1.clientResponse.success({
                        msg: "You Withdrawl Coin Successfully!"
                    }));
                }
                else {
                    res.send(clientResponse_1.clientResponse.other(404, {
                        msg: "You  don't have enough blance to withdrawl!"
                    }));
                }
            }
            else {
                res.send(clientResponse_1.clientResponse.error("You Are  not Verified PLease Verify Now."));
            }
        }
        catch {
        }
    }
};
exports.WithdrawlService = WithdrawlService;
exports.WithdrawlService = WithdrawlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Withdrawl")),
    __param(1, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], WithdrawlService);
//# sourceMappingURL=withdrawl.service.js.map