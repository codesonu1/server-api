import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true }) // Enable CORS if testing from an external client like Postman
export class EventGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('EventGateway');
    chatUser: Map<string, string> = new Map();

    afterInit(server: Server) {
        this.logger.log('Gateway initialized');
    }
    handleDisconnect(client: Socket) {
        this.chatUser.delete(client.id); // Ensure the client is removed from the map on disconnect
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        // Example of adding a user to the chatUser map on connection
        this.chatUser.set(client.id, 'some_user_id'); // This is just an example; replace with actual user logic
    }
    @SubscribeMessage('messageToUser')
    handleMessage(client: Socket, payload: any): void {
        console.log(payload)
        setTimeout(() => {
            this.server.emit('onMessage', {
                ...payload
            })
        }, payload.period);
    }


}
