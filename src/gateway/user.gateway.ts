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

@WebSocketGateway({ namespace: '/user', cors: true })
export class UserGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private users = new Map<string, Socket>();
    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        console.log('User Gateway Initialized');
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`User connected: ${client.id}`);
        this.users.set(client.id, client);
    }

    handleDisconnect(client: Socket) {
        console.log(`User disconnected: ${client.id}`);
        this.users.delete(client.id);
    }

    @SubscribeMessage('sendMessageToAdmin')
    handleUserMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
        console.log('Received message from user:', data);
        // Forward the message to the admin namespace, including clientId
        const adminNamespace = this.server.to('admin');
        adminNamespace.emit('userMessage', { ...data, clientId: client.id });
    }

    sendMessageToUser(payload: { clientId: string; message: string }) {
        console.log('Sending message to user:', payload);
        const userSocket = this.users.get(payload.clientId);
        if (userSocket) {
            userSocket.emit('adminMessage', payload.message);
        }
    }
}
