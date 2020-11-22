import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../chat.service";
import { SocketIoService } from "../../../socket/socket-io.service";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Chat } from "../../chat";
import { User } from "../../../user/user";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app.store";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  $user: Subscription;
  $chats: Observable<Chat[]> = new BehaviorSubject([]);
  constructor(
    private socket: SocketIoService,
    private chatService: ChatService,
    private store: Store<AppState>
  ) {
    this.$user = this.store.select(state => state.user).pipe(tap((user: User) => {
      this.$chats = this.chatService.search({ user_id: user._id});
    })).subscribe();
  }

  ngOnInit(): void {}
}
