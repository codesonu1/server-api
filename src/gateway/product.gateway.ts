import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { WebSocket, Server } from 'ws';
import { EventEmitter } from 'events';

@WebSocketGateway()
export class ProductGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private readonly eventEmitter: EventEmitter = new EventEmitter();

    constructor() { }

    handleConnection(client: WebSocket) {
        console.log('Client connected successfully!');
    }

    handleDisconnect(client: WebSocket) {
        console.log('Client disconnected successfully!');
    }

    @SubscribeMessage('checkProductQty')
    async handleCheckProductQty(client: WebSocket, data: { productId: string }) {
        console.log({ data });
        const products = [
            { id: '1', name: 'Product 1', qty: 10 },
            { id: '2', name: 'Product 2', qty: -5 },
            { id: '3', name: 'Product 3', qty: 3 },
        ];
        const product = products.find(p => p.id === data.productId);
        const productQty = product ? product.qty : 0;

        if (productQty < 0) {
            // Emit event using the eventEmitter
            this.eventEmitter.emit('productQtyAlert', 'Product quantity is less than 0. Please update the quantity.');
            // Send message to the client
            client.send(JSON.stringify({
                event: 'productQtyAlert',
                message: 'Product quantity is less than 0. Please update the quantity.',
            }));
        } else {
            // Send the product quantity to the client
            client.send(JSON.stringify({
                event: 'productQty',
                qty: productQty,
            }));
        }
    }
}
