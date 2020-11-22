import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  all():Observable<any[]> {
    console.log("get all services");
    return this.http.get<any[]>(`${environment.api}/chats`);
  }
}
