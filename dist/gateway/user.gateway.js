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
exports.UserGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let UserGateway = class UserGateway {
    constructor() {
        this.users = new Map();
    }
    afterInit(server) {
        console.log('User Gateway Initialized');
    }
    handleConnection(client, ...args) {
        console.log(`User connected: ${client.id}`);
        this.users.set(client.id, client);
    }
    handleDisconnect(client) {
        console.log(`User disconnected: ${client.id}`);
        this.users.delete(client.id);
    }
    handleUserMessage(data, client) {
        console.log('Received message from user:', data);
        const adminNamespace = this.server.to('admin');
        adminNamespace.emit('userMessage', { ...data, clientId: client.id });
    }
    sendMessageToUser(payload) {
        console.log('Sending message to user:', payload);
        const userSocket = this.users.get(payload.clientId);
        if (userSocket) {
            userSocket.emit('adminMessage', payload.message);
        }
    }
};
exports.UserGateway = UserGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], UserGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessageToAdmin'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], UserGateway.prototype, "handleUserMessage", null);
exports.UserGateway = UserGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/user', cors: true })
], UserGateway);
//# sourceMappingURL=user.gateway.js.map