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

  all():Observable<Chat[]> {
    console.log("get all services");
    return this.http.get<Chat[]>(`${environment.api}/chats`);
  }

  search(params: {}):Observable<Chat[]> {
    console.log("get all services");
    return this.http.get<Chat[]>(`${environment.api}/chats`, { params });
  }
}
