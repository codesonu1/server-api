"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const network_controller_1 = require("../../controllers/network.controller");
const add_network_schema_1 = require("../../core/dtos/models/add_network.schema");
const network_service_1 = require("./network.service");
const cloudinary_service_1 = require("../../utils/cloudinary/cloudinary.service");
const add_user_schema_1 = require("../../core/dtos/models/add_user.schema");
let NetworkModule = class NetworkModule {
};
exports.NetworkModule = NetworkModule;
exports.NetworkModule = NetworkModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{
                    name: "Network", schema: add_network_schema_1.AddNetworkSchema
                }, {
                    name: "User", schema: add_user_schema_1.UserSchema
                }])
        ],
        controllers: [network_controller_1.NetworkController],
        providers: [network_service_1.NetworkService, cloudinary_service_1.CloudinaryService],
    })
], NetworkModule);
//# sourceMappingURL=network.module.js.map