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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyProfileSchema = exports.ProfileVerify = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ProfileVerify = class ProfileVerify {
};
exports.ProfileVerify = ProfileVerify;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProfileVerify.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProfileVerify.prototype, "verification_type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProfileVerify.prototype, "front_img", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProfileVerify.prototype, "back_img", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now() }),
    __metadata("design:type", Date)
], ProfileVerify.prototype, "created_at", void 0);
exports.ProfileVerify = ProfileVerify = __decorate([
    (0, mongoose_1.Schema)()
], ProfileVerify);
exports.VerifyProfileSchema = mongoose_1.SchemaFactory.createForClass(ProfileVerify);
//# sourceMappingURL=verify_user_profile.schema.js.map