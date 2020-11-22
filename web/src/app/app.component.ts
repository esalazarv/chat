import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable} from "rxjs";
import { tap} from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";

import { AppState } from "./app.store";
import { User } from "./user/user";
import { WelcomeDialogComponent } from "./chat/components/welcome-dialog/welcome-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat';
  $user: Observable<User>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.$user = this.store.select((state) => state.user)
      .pipe(tap(user => {
        if (!user._id) {
          this.showWelcomeDialog();
        }
      }));
  }

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
}
