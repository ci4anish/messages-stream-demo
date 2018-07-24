import {Component, OnInit, OnDestroy} from '@angular/core';
import {MessagesConsumerService} from '../messages-consumer.service';
import {Message} from '../interfaces';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-messages-presenter',
  templateUrl: './messages-presenter.component.html',
  styleUrls: ['./messages-presenter.component.css']
})
export class MessagesPresenterComponent implements OnInit, OnDestroy {
  // make this a Set for performance reasons, much easier to remove message later
  messages: Set<Message> = new Set();
  nextTickEmitter: Subject<number> = new Subject();
  private tickerTimerId: number;

  constructor(private messagesConsumerService: MessagesConsumerService) {
    this.emitMessagesExpirationCheck();
  }

  ngOnInit() {
    this.messagesConsumerService.newMessageEventEmitter.subscribe((newMessage) => {
      this.messages.add(newMessage);
    });
  }

  ngOnDestroy() {
    window.clearInterval(this.tickerTimerId);
  }

  // use in ngFor trackBy for performance improvements;
  identify(_index, item) {
    return item.id;
  }

  onMessageExpire(expiredMessage: Message){
    this.messages.delete(expiredMessage);
  }

  // Each 1s emit check expiration event;
  private emitMessagesExpirationCheck() {
    this.tickerTimerId = window.setInterval(() => {
      const now = new Date();
      this.nextTickEmitter.next(now.getTime());
    }, 1000);
  }

}
