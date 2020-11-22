import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss']
})
export class WelcomeDialogComponent {

  nickname: string;

  constructor(public dialogRef: MatDialogRef<WelcomeDialogComponent>) {
    this.nickname = "dasdasdasd";
  }

  onJoin(): void {
    this.dialogRef.close();
  }
}
