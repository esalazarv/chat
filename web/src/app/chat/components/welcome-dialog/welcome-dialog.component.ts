import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { SocketIoService } from "../../../socket/socket-io.service";
import { User } from "../../../user/user";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app.store";
import { setUser } from "../../../user/user.actions";
import { SocketMessage } from "../../socket-message";


@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss']
})
export class WelcomeDialogComponent implements OnInit{

  shakeIt: boolean = false;
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<WelcomeDialogComponent>,
    private formBuilder: FormBuilder,
    private socket: SocketIoService,
    private store: Store<AppState>,
  ) {
    // initialize form
    const nickname = this.generateNickname();
    this.form = this.formBuilder.group({
      nickname: [nickname, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    // Subscribe to socket error response for sign in
    this.socket.io.on("chat.sign-in.error", this.onError.bind(this));

    // Subscribe to socket success response for sign in
    this.socket.io.on("chat.sign-in.success", this.onSuccess.bind(this));
  }

  /**
   * Handle success sign in response
   * @param payload
   */
  onSuccess(payload: SocketMessage<User>) {
    // update store
    this.store.dispatch(setUser(payload.message));
    this.dialogRef.close();
  }

  /**
   * Handle error sign in response
   * @param payload
   */
  onError(payload: SocketMessage<any>) {
    // animate dialog and restore after 1 second
    this.shakeIt = true;
    setTimeout(() => this.shakeIt = false, 1000);

    // Generate a new nick name for prevent duplicated
    this.form.get('nickname')?.setValue(this.generateNickname());
  }

  /**
   * Generate a random nickname
   */
  generateNickname(): string {
    return uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: '-'
    });
  }

  /**
   * Sign in to the chat
   */
  signIn(): void {
    this.socket.io.emit("chat.sign-in", { nickname: this.form.get('nickname')?.value });
  }
}
