import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SocketIoService } from "../../../socket/socket-io.service";

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, private socket: SocketIoService) {
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
    if (this.form.valid) {
      console.log("submit message", this.form.get('message')?.value);
    }
  }
}
