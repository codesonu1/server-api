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
exports.NetworkController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../gaurd/auth.guard");
const permission_guard_1 = require("../gaurd/permission.guard");
const role_decorator_1 = require("../gaurd/role.decorator");
const network_service_1 = require("../use-cases/network/network.service");
let NetworkController = class NetworkController {
    constructor(networkService) {
        this.networkService = networkService;
    }
    async getAllNetworks() {
        return await this.networkService.getAllNetworks();
    }
    async addNetwork(files, body, res) {
        return await this.networkService.addNetwork(body, res, files);
    }
    async deleteNetwork(body, res) {
        return await this.networkService.deleteNetwork(body, res);
    }
};
exports.NetworkController = NetworkController;
__decorate([
    (0, common_1.Get)("get-all-neworks"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("admin", "user"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NetworkController.prototype, "getAllNetworks", null);
__decorate([
    (0, common_1.Post)("add-network"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("admin"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("networkImg")),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], NetworkController.prototype, "addNetwork", null);
__decorate([
    (0, common_1.Post)("delete-nework"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("admin"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NetworkController.prototype, "deleteNetwork", null);
exports.NetworkController = NetworkController = __decorate([
    (0, common_1.Controller)('network'),
    __metadata("design:paramtypes", [network_service_1.NetworkService])
], NetworkController);
//# sourceMappingURL=network.controller.js.map