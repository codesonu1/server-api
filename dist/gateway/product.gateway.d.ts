import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { WebSocket, Server } from 'ws';
export declare class ProductGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly eventEmitter;
    constructor();
    handleConnection(client: WebSocket): void;
    handleDisconnect(client: WebSocket): void;
    handleCheckProductQty(client: WebSocket, data: {
        productId: string;
    }): Promise<void>;
}
