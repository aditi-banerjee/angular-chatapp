import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { FormsModule } from '@angular/forms'
import { ActionCableService } from 'angular2-actioncable';
// import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
// import { myRxStompConfig } from './my-rx-stomp.config';


@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    // {
    //   provide: InjectableRxStompConfig,
    //   useValue: myRxStompConfig,
    // },
    // {
    //   provide: RxStompService,
    //   useFactory: rxStompServiceFactory,
    //   deps: [InjectableRxStompConfig],
    // }
    ActionCableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
