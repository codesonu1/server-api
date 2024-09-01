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
exports.CurrencyController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../gaurd/auth.guard");
const permission_guard_1 = require("../gaurd/permission.guard");
const role_decorator_1 = require("../gaurd/role.decorator");
const curreny_service_1 = require("../use-cases/currency/curreny.service");
let CurrencyController = class CurrencyController {
    constructor(currenyService) {
        this.currenyService = currenyService;
    }
    async getCurrency(res) {
        return await this.currenyService.getCurrency(res);
    }
    async postCurrency(body, res) {
        return await this.currenyService.addCurrency(body, res);
    }
    async addUserProfitPercentage(body, res) {
        return await this.currenyService.addProfitPercentage(body, res);
    }
};
exports.CurrencyController = CurrencyController;
__decorate([
    (0, common_1.Get)("/get-currencys"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("user", "admin"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "getCurrency", null);
__decorate([
    (0, common_1.Post)("/add-currency"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("admin"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "postCurrency", null);
__decorate([
    (0, common_1.Post)("/add-user-profit-percentage"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("admin"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "addUserProfitPercentage", null);
exports.CurrencyController = CurrencyController = __decorate([
    (0, common_1.Controller)('currency'),
    __metadata("design:paramtypes", [curreny_service_1.CurrenyService])
], CurrencyController);
//# sourceMappingURL=currency.controller.js.map