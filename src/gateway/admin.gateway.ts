import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
    WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UserGateway } from './user.gateway';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({ namespace: '/admin', cors: true })
@Injectable()
export class AdminGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly userGateway: UserGateway) { }

    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        console.log('Admin Gateway Initialized');
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Admin connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Admin disconnected: ${client.id}`);
    }

    @SubscribeMessage('sendMessageToUser')
    handleAdminMessage(@MessageBody() data: { clientId: string; message: string }, @ConnectedSocket() client: Socket): void {
        console.log(`Admin sends message to user: ${data.clientId}`);
        this.userGateway.sendMessageToUser(data);
    }

    @SubscribeMessage('userMessage')
    handleUserMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
        console.log('Admin received message from user:', data);
    }
}
