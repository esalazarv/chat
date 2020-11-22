import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { SocketIoService } from "../../../socket/socket-io.service";
import { User } from "../../../user/user";


@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss']
})
export class WelcomeDialogComponent implements OnInit{

  shakeIt: boolean = false;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<WelcomeDialogComponent>,
    private formBuilder: FormBuilder,
    private socket: SocketIoService,
  ) {

    const nickname = this.generateNickname();
    this.form = this.formBuilder.group({
      nickname: [nickname, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.socket.io.on("chat.sign-in.error", (response: any) => {
      this.shakeIt = true;
      this.form.get('nickname')?.setValue(this.generateNickname());
      setTimeout(() => {
        this.shakeIt = false;
      }, 1000);
    });
    this.socket.io.on("chat.sign-in.success", (user: User) => {
      this.dialogRef.close();
    });
  }


  generateNickname(): string {
    return uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: '-'
    });
  }

  join(): void {
    this.socket.io.emit("chat.sign-in", { nickname: this.form.get('nickname')?.value });
  }
}
