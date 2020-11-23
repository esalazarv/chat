import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MaterialModule } from "./material/material.module";
import { SocketModule } from "./socket/socket.module";
import { ChatModule } from "./chat/chat.module";
import store , { metaReducers }from "./app.store";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SocketModule.forRoot({ url: environment.socket_io }),
    ChatModule,
    StoreModule.forRoot(store, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
