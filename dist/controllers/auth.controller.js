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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../gaurd/auth.guard");
const permission_guard_1 = require("../gaurd/permission.guard");
const role_decorator_1 = require("../gaurd/role.decorator");
const auth_service_1 = require("../use-cases/auth/auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async upload(file) {
        console.log(file);
    }
    async register(file, body, req, res) {
        return this.authService.register(body, res, file);
    }
    async login(body, res, req) {
        return this.authService.login(res, body);
    }
    async getProfile(req, res) {
        return this.authService.getProfile(req, res);
    }
    async updateUserProfile(file, body, req, res) {
        return this.authService.updateProfile(body, res, file, req);
    }
    async verifyProfile(body, req, res, files) {
        return this.authService.verifyProfile(files, req, res, body);
    }
    async getAllUser(res) {
        return this.authService.getAllUser(res);
    }
    async changePassword(body, req, res) {
        return this.authService.changePassword(body, req, res);
    }
    async logout(req) {
        return this.authService.logout(req);
    }
    async captch(req, res) {
        return this.authService.captch(req, res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("/upload"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image")),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "upload", null);
__decorate([
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("/get-profile"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("user", "admin"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)("/update-user-profile"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("user"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("profile")),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUserProfile", null);
__decorate([
    (0, common_1.Post)("/verify-profile"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("user", "admin"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'front_img', maxCount: 1 },
        { name: 'back_img', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyProfile", null);
__decorate([
    (0, common_1.Get)("get-all-users"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("admin"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Post)("/change-password"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("user", "admin"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)("/logout"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permission_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("user", "admin"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)("/captch"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "captch", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map