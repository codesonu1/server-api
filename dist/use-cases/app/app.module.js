"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("../../controllers/index");
const app_service_1 = require("./app.service");
const auth_module_1 = require("../auth/auth.module");
const currency_module_1 = require("../currency/currency.module");
const mongodb_1 = require("../../config/mongodb");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_controller_1 = require("../../controllers/cloudinary.controller");
const cloudinary_service_1 = require("../../utils/cloudinary/cloudinary.service");
const network_module_1 = require("../network/network.module");
const deposite_module_1 = require("../deposite/deposite.module");
const trade_module_1 = require("../trade/trade.module");
const event_module_1 = require("../../gateway/event.module");
const withdrawl_module_1 = require("../withdrawl/withdrawl.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongodb_1.MongoDataService,
            auth_module_1.AuthModule,
            currency_module_1.CurrencyModule,
            platform_express_1.MulterModule.register({
                dest: "./uploads"
            }),
            network_module_1.NetworkModule,
            deposite_module_1.DepositeModule,
            trade_module_1.TradeModule,
            event_module_1.EventsModule,
            withdrawl_module_1.WithdrawlModule
        ],
        controllers: [index_1.AppController, cloudinary_controller_1.CloudinaryController],
        providers: [app_service_1.AppService, cloudinary_service_1.CloudinaryService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map