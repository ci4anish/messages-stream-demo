import {Injectable} from '@angular/core';
import messages from './messages-mock.js';
import {Message} from './interfaces';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesConsumerService {
  newMessageEventEmitter: Subject<Message> = new Subject();
  private messages: Message[];
  private newMessageIntervalId: number;
  private messageCounter: number = 0;

  constructor() {
    this.messages = messages;
    this.initMNewMessagesStream();
  }

  // this could be some socket in the real app, I'll just push new message each 1s;
  private initMNewMessagesStream() {
    this.newMessageIntervalId = window.setInterval(() => {
      const message = this.messages[this.messageCounter];
      if (message) {
        this.newMessageEventEmitter.next(message);
        this.messageCounter++;
      } else {
        window.clearInterval(this.newMessageIntervalId);
        console.log('Messages ended');
      }
    }, 1000);
  }
}
