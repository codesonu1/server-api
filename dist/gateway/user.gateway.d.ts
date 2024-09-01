import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class UserGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private users;
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleUserMessage(data: any, client: Socket): void;
    sendMessageToUser(payload: {
        clientId: string;
        message: string;
    }): void;
}
