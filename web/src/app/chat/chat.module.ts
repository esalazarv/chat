import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from "ngx-avatar";
import { SocketIoService } from "../socket/socket-io.service";
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatService } from "./chat.service";
import { MaterialModule } from "../material/material.module";
import { WelcomeDialogComponent } from "./components/welcome-dialog/welcome-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChatInputComponent } from './components/chat-input/chat-input.component';



@NgModule({
  declarations: [ChatListComponent, WelcomeDialogComponent, ChatInputComponent],
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
    ChatListComponent,
    ChatInputComponent
  ],
})
export class ChatModule {
  constructor(private socket: SocketIoService) {
    this.socket.io.on('connect', () => {
      console.log("connected from chat module");
    });
  }
}
