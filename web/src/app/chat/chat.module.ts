import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from "ngx-avatar";
import { SocketIoService } from "../socket/socket-io.service";
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatService } from "./chat.service";
import { MaterialModule } from "../material/material.module";
import { WelcomeDialogComponent } from "./components/welcome-dialog/welcome-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [ChatListComponent, WelcomeDialogComponent],
  imports: [
    CommonModule,
    AvatarModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
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
