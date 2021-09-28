import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from './message.model';
import { MessageService } from './message.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { EntityResponse } from 'src/app/shared/model/entity-response.model';
// import { RxStompService } from '@stomp/ng2-stompjs';
// import { Message } from '@stomp/stompjs';
import { ActionCableService, Channel } from 'angular2-actioncable';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit,OnDestroy {

  messages: Array<Messages> = new Array<Messages>();
  subscription: Subscription = new Subscription();
  content: string;
  private topicSubscription: Subscription

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService,
    // private rxStompService: RxStompService,
    private cableService: ActionCableService
  ) { }

  ngOnInit(): void {
    this.getMessages();
    // this.topicSubscription = this.rxStompService.watch('/topic/demo').subscribe((message: Message) => {
    //   this.messages.push({content: message.body});
    // });

    const channel: Channel = this.cableService
      .cable('ws://localhost:3000/api/cable')
      .channel('RoomChannel');
 
    // Subscribe to incoming messages
    this.topicSubscription = channel.received().subscribe(message => {
      this.messages.push({content: message.message.content});
    });
  }

  getMessages(): void {
    this.subscription.add(this.messageService.getMessagesList().subscribe((response: EntityResponse<Array<Messages>>) => {
      this.messages = response.messages;
    }));
  }

  onSubmit(): void {
    console.log("-----this is for test====", this.content);

    this.subscription.add(this.messageService.sendMessage(this.content).subscribe((response) => {
    }))
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

}
