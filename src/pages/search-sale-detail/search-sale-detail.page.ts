import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

/**
 * Generated class for the SearchSaleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-sale-detail',
  templateUrl: 'search-sale-detail.page.html',
})
export class SearchSaleDetailPage {
  beginTime: string;
  endTime: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchSaleDetailPage');
  }
  searchAction() {
    console.log(this.beginTime);
    console.log(this.endTime);
  }
}
