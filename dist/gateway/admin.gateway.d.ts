import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UserGateway } from './user.gateway';
export declare class AdminGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly userGateway;
    constructor(userGateway: UserGateway);
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleAdminMessage(data: {
        clientId: string;
        message: string;
    }, client: Socket): void;
    handleUserMessage(data: any, client: Socket): void;
}
