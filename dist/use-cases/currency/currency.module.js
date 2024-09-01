"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyModule = void 0;
const common_1 = require("@nestjs/common");
const currency_controller_1 = require("../../controllers/currency.controller");
const mongoose_1 = require("@nestjs/mongoose");
const add_currency_schema_1 = require("../../core/dtos/models/add_currency.schema");
const add_user_schema_1 = require("../../core/dtos/models/add_user.schema");
const curreny_service_1 = require("./curreny.service");
const profit_percentage_schema_1 = require("../../core/dtos/models/profit_percentage.schema");
let CurrencyModule = class CurrencyModule {
};
exports.CurrencyModule = CurrencyModule;
exports.CurrencyModule = CurrencyModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: "Currency", schema: add_currency_schema_1.AddcurrencySchema }, {
                    name: "User", schema: add_user_schema_1.UserSchema
                },
                {
                    name: "ProfitPercentage", schema: profit_percentage_schema_1.ProfitPercentageSchema
                }
            ])],
        providers: [curreny_service_1.CurrenyService],
        controllers: [currency_controller_1.CurrencyController]
    })
], CurrencyModule);
//# sourceMappingURL=currency.module.js.map