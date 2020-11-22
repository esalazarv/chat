import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from "ngx-avatar";
import { SocketIoService } from "../socket/socket-io.service";
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatService } from "./chat.service";
import { MaterialModule } from "../material/material.module";



@NgModule({
  declarations: [ChatListComponent],
  imports: [
    CommonModule,
    AvatarModule,
    MaterialModule,
  ],
  providers: [
    ChatService
  ],
  exports: [
    ChatListComponent
  ],
})
export class ChatModule {
  constructor(private socket: SocketIoService) {
    this.socket.io.on('connect', () => {
      console.log("connected from chat module");
    });
  }
}
