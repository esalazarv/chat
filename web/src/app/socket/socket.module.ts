import { ModuleWithProviders, NgModule } from '@angular/core';
import { SOCKET_IO_CONFIG_TOKEN, SocketIoConfig, SocketIoService } from "./socket-io.service";

export function SocketFactory(config: SocketIoConfig) {
  return new SocketIoService(config);
}

@NgModule({})
export class SocketModule {
  static forRoot(config: SocketIoConfig): ModuleWithProviders<SocketModule> {
    return {
      ngModule: SocketModule,
      providers: [
        { provide: SOCKET_IO_CONFIG_TOKEN, useValue: config },
        {
          provide: SocketIoService,
          useFactory: SocketFactory,
          deps : [SOCKET_IO_CONFIG_TOKEN]
        }
      ],
    };
  }
}
