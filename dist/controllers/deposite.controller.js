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
exports.DepositeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../gaurd/auth.guard");
const permission_guard_1 = require("../gaurd/permission.guard");
const role_decorator_1 = require("../gaurd/role.decorator");
const deposite_service_1 = require("../use-cases/deposite/deposite.service");
let DepositeController = class DepositeController {
    constructor(depositeService) {
        this.depositeService = depositeService;
    }
    async getAllDepositeCoin(res) {
        return this.depositeService.getAllUserDespositeCoin(res);
    }
    async depositeCoin(body, res, files, req) {
        return await this.depositeService.depositeCoin(body, res, files, req);
    }
    async depositeCoinVerify(body, res) {
        return await this.depositeService.coinDepositeVerify(body, res);
    }
    async getAllCoinDepositeCoin(res) {
        return await this.depositeService.getAllDepositeCoinBill(res);
    }
    async addAddress(body, res, req) {
        return await this.depositeService.addAddress(body, res, req);
    }
    async getAllAddress(res) {
        return await this.depositeService.getAllAddress(res);
    }
};
exports.DepositeController = DepositeController;
__decorate([
    (0, common_1.Get)("get-all-deposite-coin"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("user", "admin"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepositeController.prototype, "getAllDepositeCoin", null);
__decorate([
    (0, common_1.Post)("deposite-coin"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("user"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("voucher_img")),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DepositeController.prototype, "depositeCoin", null);
__decorate([
    (0, common_1.Post)("deposite-coin-verify"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("admin"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DepositeController.prototype, "depositeCoinVerify", null);
__decorate([
    (0, common_1.Get)("deposite-coin-bills"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("user", "admin"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepositeController.prototype, "getAllCoinDepositeCoin", null);
__decorate([
    (0, common_1.Post)("add-address"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("user"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DepositeController.prototype, "addAddress", null);
__decorate([
    (0, common_1.Post)("get-all-address"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("user", "admin"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepositeController.prototype, "getAllAddress", null);
exports.DepositeController = DepositeController = __decorate([
    (0, common_1.Controller)('deposite'),
    __metadata("design:paramtypes", [deposite_service_1.DepositeService])
], DepositeController);
//# sourceMappingURL=deposite.controller.js.map