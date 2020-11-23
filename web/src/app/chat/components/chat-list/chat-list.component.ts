import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../chat.service";
import { SocketIoService } from "../../../socket/socket-io.service";
import { Observable } from "rxjs";
import { Chat } from "../../chat";
import { User } from "../../../user/user";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app.store";
import { tap } from "rxjs/operators";
import { setChatList } from "../../chat.actions";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  $user!: Observable<User>;
  $chat!: Observable<Chat|null>;
  $chats!: Observable<Chat[]>;

  constructor(
    private socket: SocketIoService,
    private chatService: ChatService,
    private store: Store<AppState>
  ) {
    this.$chats = this.store.select(state => state.chat.list);
    this.$chat = this.store.select(state => state.chat.current);
    this.$user = this.store.select(state => state.user);
  }

  ngOnInit(): void {
    // Subscribe to user store changes
    this.$user.pipe(tap(this.fetchUserChats.bind(this))).subscribe();
  }

  /**
   * Fetch user chat from server
   * @param user
   */
  fetchUserChats(user: User) {
    this.chatService.search({ user_id: user._id}).pipe(tap(this.onSuccessFetchList.bind(this))).subscribe();
  }

  /**
   * Handle success list response
   * @param list
   */
  onSuccessFetchList(list: Chat[]) {
    // Set list in store
    this.store.dispatch(setChatList({ list }));
  }
}
