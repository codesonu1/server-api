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
exports.UserCoinDepositeLogsSchema = exports.UserCoinDepositeLogs = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserCoinDepositeLogs = class UserCoinDepositeLogs {
};
exports.UserCoinDepositeLogs = UserCoinDepositeLogs;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserCoinDepositeLogs.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserCoinDepositeLogs.prototype, "deposite_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], UserCoinDepositeLogs.prototype, "is_recharge", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now() }),
    __metadata("design:type", Date)
], UserCoinDepositeLogs.prototype, "created_at", void 0);
exports.UserCoinDepositeLogs = UserCoinDepositeLogs = __decorate([
    (0, mongoose_1.Schema)()
], UserCoinDepositeLogs);
exports.UserCoinDepositeLogsSchema = mongoose_1.SchemaFactory.createForClass(UserCoinDepositeLogs);
//# sourceMappingURL=user_coin_deposite_logs.schema.js.map