"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const deposite_coin_schem_1 = require("../../core/dtos/models/deposite_coin.schem");
const deposite_service_1 = require("./deposite.service");
const cloudinary_service_1 = require("../../utils/cloudinary/cloudinary.service");
const deposite_controller_1 = require("../../controllers/deposite.controller");
const add_user_schema_1 = require("../../core/dtos/models/add_user.schema");
const user_coin_deposite_logs_schema_1 = require("../../core/dtos/models/user_coin_deposite_logs.schema");
const coin_verify_logs_schema_1 = require("../../core/dtos/models/coin_verify_logs.schema");
const add_currency_schema_1 = require("../../core/dtos/models/add_currency.schema");
const add_network_schema_1 = require("../../core/dtos/models/add_network.schema");
const bill_schema_1 = require("../../core/dtos/models/bill.schema");
const add_address_schema_1 = require("../../core/dtos/models/add_address.schema");
let DepositeModule = class DepositeModule {
};
exports.DepositeModule = DepositeModule;
exports.DepositeModule = DepositeModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{
                    name: "Deposite", schema: deposite_coin_schem_1.AddCoinSchema
                }, {
                    name: "User", schema: add_user_schema_1.UserSchema
                }, {
                    name: "UserCoinDepositeLogs", schema: user_coin_deposite_logs_schema_1.UserCoinDepositeLogsSchema
                }, {
                    name: "CoinVerifyLogs", schema: coin_verify_logs_schema_1.CoinVerifyLogsSchema
                },
                {
                    name: "Currency", schema: add_currency_schema_1.Addcurrency
                },
                {
                    name: "Network", schema: add_network_schema_1.AddNetwork
                },
                {
                    name: "Address", schema: add_address_schema_1.AddAddressSchema
                },
                {
                    name: "Bill", schema: bill_schema_1.BillSchema
                }
            ]),
        ],
        controllers: [deposite_controller_1.DepositeController],
        providers: [deposite_service_1.DepositeService, cloudinary_service_1.CloudinaryService],
    })
], DepositeModule);
//# sourceMappingURL=deposite.module.js.map