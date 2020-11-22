import {Component, OnInit} from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { first, tap } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";

import { AppState } from "./app.store";
import { User } from "./user/user";
import { WelcomeDialogComponent } from "./chat/components/welcome-dialog/welcome-dialog.component";
import { resetUser } from "./user/user.actions";
import { SocketIoService } from "./socket/socket-io.service";
import { SocketMessage } from "./chat/socket-message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chat';
  $user: Observable<User>;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private socket: SocketIoService,
  ) {
    this.$user = this.store.select((state) => state.user)
      .pipe(tap(user => {
        if (!user._id) {
          this.showWelcomeDialog();
        }
      }));
  }

  ngOnInit() {
    // subscribe for sign out responses
    this.socket.io.on("chat.sign-out.success", this.onSuccessSignOut.bind(this));

    // subscribe for sign out responses
    this.socket.io.on("chat.sign-out.error", this.onErrorSignOut.bind(this));
  }

  /**
   * Ask for a nickname
   */
  showWelcomeDialog() {
    const dialogRef = this.dialog.open(WelcomeDialogComponent, {
      width: '250px',
      data: {},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  /**
   * Handle success sign out
   * @param result
   */
  onSuccessSignOut(result: SocketMessage<any>) {
    this.store.dispatch(resetUser());
    // TODO: restore additional data (chats, messages, etc)
  }

  /**
   * Handle error sign out
   * @param error
   */
  onErrorSignOut(error: SocketMessage<any>) {
    console.log(error);
  }

  /**
   * Sign out
   */
   signOut() {
    this.$user.pipe(first()).subscribe((user) => {
      // emit sign out to server
      this.socket.io.emit('chat.sign-out', user);
      // reset store data, this remove all user data from local storage
    });
  }
}
