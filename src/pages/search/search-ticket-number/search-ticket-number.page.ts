import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

import { BusSaleDetailItem } from '../../../module/BusSaleDetailItem';
import { HttpServices } from '../../../providers/http/http.service';
import { CacheData } from '../../../providers/storage/CacheData';
import { CommandKeys } from '../../../utils/CommandKeys';
import { DialogUtil } from '../../../utils/DialogUtil';

/**
 * Generated class for the SearchTicketNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-ticket-number',
  templateUrl: 'search-ticket-number.page.html',
})
export class SearchTicketNumberPage {
  ticketNumber: string;
  beginTime: string;
  endTime: string;
  dataArray: Array<BusSaleDetailItem>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpServices, public dialog: DialogUtil) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchTicketNumberPage');
  }
  requestData () {
    let content = {
      StationID: CacheData.stationId,
      StartDate: this.beginTime,
      EndDate: this.endTime,
      TicketNo: this.ticketNumber
    }
    this.http.postRequest<Array<BusSaleDetailItem>>(CommandKeys.searchTicketNumber,content,value => {
      if (value.success) {
        this.dataArray = value.object;
        if (this.dataArray.length == 0) {
          this.dialog.showAtMiddleToast("未查询到相关信息！");
        }
      }
      return false;
    })
  }
  searchAction() {
    if (!this.ticketNumber || !this.beginTime || !this.endTime) {
      this.dialog.showAtMiddleToast("请填写必要信息！");
      return;
    }
    this.requestData();
  }
}
