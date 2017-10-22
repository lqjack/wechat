import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPopPage } from './chat-pop';

@NgModule({
  declarations: [
    ChatPopPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatPopPage),
  ],
})
export class ChatPopPageModule {}
