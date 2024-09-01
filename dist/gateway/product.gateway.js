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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const ws_1 = require("ws");
const events_1 = require("events");
let ProductGateway = class ProductGateway {
    constructor() {
        this.eventEmitter = new events_1.EventEmitter();
    }
    handleConnection(client) {
        console.log('Client connected successfully!');
    }
    handleDisconnect(client) {
        console.log('Client disconnected successfully!');
    }
    async handleCheckProductQty(client, data) {
        console.log({ data });
        const products = [
            { id: '1', name: 'Product 1', qty: 10 },
            { id: '2', name: 'Product 2', qty: -5 },
            { id: '3', name: 'Product 3', qty: 3 },
        ];
        const product = products.find(p => p.id === data.productId);
        const productQty = product ? product.qty : 0;
        if (productQty < 0) {
            this.eventEmitter.emit('productQtyAlert', 'Product quantity is less than 0. Please update the quantity.');
            client.send(JSON.stringify({
                event: 'productQtyAlert',
                message: 'Product quantity is less than 0. Please update the quantity.',
            }));
        }
        else {
            client.send(JSON.stringify({
                event: 'productQty',
                qty: productQty,
            }));
        }
    }
};
exports.ProductGateway = ProductGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof ws_1.Server !== "undefined" && ws_1.Server) === "function" ? _a : Object)
], ProductGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('checkProductQty'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof ws_1.WebSocket !== "undefined" && ws_1.WebSocket) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], ProductGateway.prototype, "handleCheckProductQty", null);
exports.ProductGateway = ProductGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [])
], ProductGateway);
//# sourceMappingURL=product.gateway.js.map