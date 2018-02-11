import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

import { BusSaleDetailItem } from '../../../module/BusSaleDetailItem';
import { HttpServices } from '../../../providers/http/http.service';
import { CacheData } from '../../../providers/storage/CacheData';
import { CommandKeys } from '../../../utils/CommandKeys';
import { DialogUtil } from '../../../utils/DialogUtil';
import { StorageUtils } from '../../../providers/storage/StorageUtils';
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
  listCSS: object = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: HttpServices, public dialog: DialogUtil, public storage: StorageUtils) {
    this.beginTime = new Date().toISOString().substring(0, 10);
    this.endTime = new Date().toISOString().substring(0, 10);
    this.listCSS = {
      "height" : ((window.innerHeight - 238)*0.95 - 50).toString() + 'px',
      "width" : "144rem"
    } 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchTicketNumberPage');
   
  }

  requestData() {
    let content = {
      StationID: CacheData.stationId,
      StartDate: this.beginTime,
      EndDate: this.endTime,
      TicketNo: this.ticketNumber
    }
    this.http.postRequest<Array<BusSaleDetailItem>>(CommandKeys.searchTicketNumber, content, value => {
      if (value.success) {
        this.dataArray = value.object;
        if (this.dataArray.length == 0) {
          this.dialog.showAtMiddleToast("未查询到相关信息！");
        } 
        this.storage.hasShowTableTip().then(hasShow => {
          if (!hasShow) {
            this.dialog.showAtMiddleToast("信息不完整？试试左右滑动");
            this.storage.setHasShowTableTip(true);
          }
        })
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
