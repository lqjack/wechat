import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatPopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-pop',
  templateUrl: 'chat-pop.html',
})
export class ChatPopPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPopPage');
  }

  ngOnInit() {
    if (this.navParams.data) {
    }
  }

  markRead(item) {
    console.info("read")
  }

  markTop(item) {
    console.info("top")
  }

  deleteChat(item) {
    console.info("deleted")
  }
}
