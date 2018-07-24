import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';

import {AppComponent} from './app.component';
import {MessagesPresenterComponent} from './messages-presenter/messages-presenter.component';
import {MessageItemComponent} from './message-item/message-item.component';
import {FromASCIIPipe} from './from-ascii.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MessagesPresenterComponent,
    MessageItemComponent,
    FromASCIIPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
