"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeModule = void 0;
const common_1 = require("@nestjs/common");
const trade_controller_1 = require("../../controllers/trade.controller");
const trade_service_1 = require("./trade.service");
const mongoose_1 = require("@nestjs/mongoose");
const add_user_schema_1 = require("../../core/dtos/models/add_user.schema");
const buy_trade_schema_1 = require("../../core/dtos/models/buy_trade.schema.");
let TradeModule = class TradeModule {
};
exports.TradeModule = TradeModule;
exports.TradeModule = TradeModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{
                    name: "BuyTrade", schema: buy_trade_schema_1.BuyTradeSchema
                },
                {
                    name: "User", schema: add_user_schema_1.User
                }
            ])],
        controllers: [trade_controller_1.TradeController],
        providers: [trade_service_1.TradeService],
    })
], TradeModule);
//# sourceMappingURL=trade.module.js.map