import { ChatPopPage } from './../pages/chat-pop/chat-pop';
import { PersonPage } from './../pages/person/person';
import { FindPage } from './../pages/find/find';
import { PeoplePage } from './../pages/people/people';
import { ChatPage } from './../pages/chat/chat';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,

    ChatPage,
    PersonPage,
    FindPage,
    PeoplePage,

    ChatPopPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,

    ChatPage,
    PersonPage,
    FindPage,
    PeoplePage,

    ChatPopPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
