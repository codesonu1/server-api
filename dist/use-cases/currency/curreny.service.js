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
exports.CurrenyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const clientResponse_1 = require("../../utils/clientResponse");
let CurrenyService = class CurrenyService {
    constructor(currencyModel, profitPercentageModel) {
        this.currencyModel = currencyModel;
        this.profitPercentageModel = profitPercentageModel;
    }
    async getCurrency(res) {
        try {
            const totalCurrencys = await this.currencyModel.find({});
            return res.send(clientResponse_1.clientResponse.success({ data: totalCurrencys, count: totalCurrencys.length }));
        }
        catch (error) {
            console.log(error);
        }
    }
    async addCurrency(body, res) {
        try {
            const { curency_name, } = body;
            if (!curency_name) {
                return res.send(clientResponse_1.clientResponse.other(400, "currency name is already exist!"));
            }
            else {
                const created_currency = await this.currencyModel.create({
                    curency_name: curency_name
                });
                return res.send(clientResponse_1.clientResponse.success(created_currency));
            }
        }
        catch (error) {
            console.log(error);
            res.send(clientResponse_1.clientResponse.error(error));
        }
    }
    async addProfitPercentage({ time_frame, percentage, min_volume }, res) {
        try {
            const created_currency = await this.profitPercentageModel.create({
                time_frame: time_frame,
                percentage: percentage,
                min_volume: min_volume
            });
            return res.send(clientResponse_1.clientResponse.success(created_currency));
        }
        catch (error) {
            console.log(error);
            res.send(clientResponse_1.clientResponse.error(error));
        }
    }
};
exports.CurrenyService = CurrenyService;
exports.CurrenyService = CurrenyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Currency")),
    __param(1, (0, mongoose_1.InjectModel)("ProfitPercentage")),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model])
], CurrenyService);
//# sourceMappingURL=curreny.service.js.map