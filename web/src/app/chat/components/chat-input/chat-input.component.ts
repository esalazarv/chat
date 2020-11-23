import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SocketIoService } from "../../../socket/socket-io.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app.store";
import { combineLatest, Observable } from "rxjs";
import { Chat } from "../../chat";
import { User } from "../../../user/user";
import { Message } from "../../message";

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  $user!: Observable<User | null>;
  $chat!: Observable<Chat | null>;
  form!: FormGroup;
  shakeIt: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private socket: SocketIoService,
    private store: Store<AppState>
  ) {
    this.$chat = this.store.select(state => state.chat.current);
    this.$user = this.store.select(state => state.user);
    this.form = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onTyping() {
    console.log("notify typing");
  }

  onEnter() {
    this.send();
  }

  /**
   * Send message to current room
   */
  send() {
    combineLatest([this.$chat, this.$user]).subscribe(([chat, user]) => {
      if (!this.form.valid) {
        this.shakeIt = true;
        setTimeout(() => this.shakeIt = false, 1000);
        return;
      }
      if (chat && user) {
        const room = chat._id;
        const content = this.form.get('message')?.value;
        const message: Message<User> = { chat: chat._id, content, sender: user };
        this.socket.io.emit("chat.message", { room, message });
        this.form.reset();
      }
    });
  }
}
