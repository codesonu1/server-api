"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("../../controllers/auth.controller");
const mongoose_1 = require("@nestjs/mongoose");
const add_user_schema_1 = require("../../core/dtos/models/add_user.schema");
const cloudinary_service_1 = require("../../utils/cloudinary/cloudinary.service");
const verify_user_profile_schema_1 = require("../../core/dtos/models/verify_user_profile.schema");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{
                    name: "User", schema: add_user_schema_1.UserSchema
                },
                {
                    name: "VerifyUserProfile", schema: verify_user_profile_schema_1.VerifyProfileSchema
                }])],
        providers: [auth_service_1.AuthService, cloudinary_service_1.CloudinaryService],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map