import { ChatPopPage } from './../chat-pop/chat-pop';
import { IonicPage, NavController, PopoverController, NavParams } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';


/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  constructor(public popoverCtrl: PopoverController,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  items: string[] = [];

  search(e) {
  }

  presentPopover(e) {
    let popover = this.popoverCtrl.create(ChatPopPage, {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement
    });

    popover.present({
      ev: e
    });
  }

  }
