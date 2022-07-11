import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CChatRoomComponent } from './component/page-chat/c-chat-room/c-chat-room.component';
import { CRoomStartComponent } from './component/page-chat/c-room-start/c-room-start.component';
import { PageChatComponent } from './component/page-chat/page-chat.component';


@NgModule({
  declarations: [
    AppComponent,
    PageChatComponent,
    CRoomStartComponent,
    CChatRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
