import { Component, OnInit } from '@angular/core';
import { SocketIoService } from "../../../socket/socket-io.service";
import { SocketMessage } from "../../socket-message";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app.store";
import { appendMessage } from "../../chat.actions";
import { Observable } from "rxjs";
import { Chat } from "../../chat";

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit {

  $chat!: Observable<Chat | null>;
  constructor(private socket: SocketIoService, private store: Store<AppState>) {
    this.$chat = this.store.select(state => state.chat.current);
  }

  ngOnInit(): void {
    console.log("listen messages from server")
    this.socket.io.on("chat.message", this.handleIncomingMessage.bind(this));
  }

  /**
   * handle incoming message
   * @param payload
   */
  handleIncomingMessage(payload: SocketMessage<any>) {
    const { room, message } = payload;
    // update chat messages
    this.store.dispatch(appendMessage({ chatId: room, message }))
  }
}
