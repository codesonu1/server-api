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
exports.EventGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
let EventGateway = class EventGateway {
    constructor() {
        this.logger = new common_1.Logger('EventGateway');
        this.chatUser = new Map();
    }
    afterInit(server) {
        this.logger.log('Gateway initialized');
    }
    handleDisconnect(client) {
        this.chatUser.delete(client.id);
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
        this.chatUser.set(client.id, 'some_user_id');
    }
    handleMessage(client, payload) {
        console.log(payload);
        setTimeout(() => {
            this.server.emit('onMessage', {
                ...payload
            });
        }, payload.period);
    }
};
exports.EventGateway = EventGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('messageToUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventGateway.prototype, "handleMessage", null);
exports.EventGateway = EventGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], EventGateway);
//# sourceMappingURL=event.gateway.js.map