import { Component, OnInit } from '@angular/core';
import { SocketIoService } from "../../../socket/socket-io.service";
import { SocketMessage } from "../../socket-message";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.store";
import {appendMessage} from "../../chat.actions";

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit {

  constructor(private socket: SocketIoService, private store: Store<AppState>) { }

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
    this.store.dispatch(appendMessage({ chatId: room, message }))
  }
}
