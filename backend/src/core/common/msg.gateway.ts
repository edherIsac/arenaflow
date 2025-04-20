import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { setSocket } from './socket-io/io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MsgGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MsgGateway.name);

  constructor() {}

  afterInit(server: Server): void {
    this.logger.log(`WebSocket iniciado [Listo]`);
    setSocket(server);
  }

  // ============== Gestion de conexión de los clientes del socket ==================================================
  handleDisconnect(client: any) {
    console.log(`Cliente no. [${client.id}] desconectado`);
  }

  handleConnection(client: Socket) {
    console.log(`Cliente no. [${client.id}] se ha conectado`);
  }

  @SubscribeMessage('leaveRoomGroup')
  handleleaveRoomGroupEvent(client: Socket, payload: any): void {
    console.clear();
    const { room } = payload;
    client.leave(room);
    console.log(`cliente ${client.id} salio del grupo [${room}]`);
  }
}
