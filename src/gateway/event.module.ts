import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { UserGateway } from './user.gateway';
import { AdminGateway } from './admin.gateway';

@Module({
    providers: [EventGateway , UserGateway , AdminGateway],
})
export class EventsModule { }