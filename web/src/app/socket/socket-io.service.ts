import {Inject, Injectable, InjectionToken} from '@angular/core';
import { io, Socket } from 'socket.io-client';


export interface SocketIoConfig {
  url: string;
  options?: any;
}

export const SOCKET_IO_CONFIG_TOKEN = new InjectionToken<SocketIoConfig>('SOCKET_IO_CONFIG_TOKEN');


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  io: Socket;
  constructor(@Inject(SOCKET_IO_CONFIG_TOKEN) private config: SocketIoConfig) {
    this.io = io(this.config.url);
  }
}
