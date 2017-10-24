import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams
    // public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad PersonPage');
  }

  saveQr() {
    let that = this;
    // navigator.screenshot.save(function (error, res) {
    //   if (error) {
    //     that.showToast("保存失败！");
    //   } else {
    //     that.showToast("保存成功，微信扫描关注公众号~");
    //   }
    // }, 'jpg', 100, 'Ion2Screenshot');
  }
  showToast(msg) {
    // let toast = this.toastCtrl.create({
    //   message: msg,
    //   duration: 2000
    // });
    // toast.present();
  }

}
