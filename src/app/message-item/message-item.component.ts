import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Message} from '../interfaces';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit, OnDestroy {

  @Input() message: Message;
  @Input() nextTickEmitter: Subject<void>;
  @Output() expired = new EventEmitter<Message>();

  private tickSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.tickSubscription = this.nextTickEmitter.subscribe((time: any) => {
      if (this.message.expires < time) {
        this.expired.emit(this.message);
      }
    });
  }

  ngOnDestroy() {
    this.tickSubscription.unsubscribe();
  }

}
