import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../chat.service";
import { SocketIoService } from "../../../socket/socket-io.service";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  $chats: Observable<any[]> = new BehaviorSubject([]);
  constructor(private socket: SocketIoService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.socket.io.on('connect', () => {
      this.$chats = this.chatService.all();
    });
  }
}
