import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Chat } from "./chat";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  all():Observable<any[]> {
    console.log("get all services");
    return this.http.get<Chat[]>(`${environment.api}/chats`);
  }
}
