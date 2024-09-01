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
exports.AdminGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const user_gateway_1 = require("./user.gateway");
const common_1 = require("@nestjs/common");
let AdminGateway = class AdminGateway {
    constructor(userGateway) {
        this.userGateway = userGateway;
    }
    afterInit(server) {
        console.log('Admin Gateway Initialized');
    }
    handleConnection(client, ...args) {
        console.log(`Admin connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Admin disconnected: ${client.id}`);
    }
    handleAdminMessage(data, client) {
        console.log(`Admin sends message to user: ${data.clientId}`);
        this.userGateway.sendMessageToUser(data);
    }
    handleUserMessage(data, client) {
        console.log('Admin received message from user:', data);
    }
};
exports.AdminGateway = AdminGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AdminGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessageToUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AdminGateway.prototype, "handleAdminMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('userMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AdminGateway.prototype, "handleUserMessage", null);
exports.AdminGateway = AdminGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/admin', cors: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_gateway_1.UserGateway])
], AdminGateway);
//# sourceMappingURL=admin.gateway.js.map