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
  otherMessage: string;
  dataArray: Array<BusSaleDetailItem>;
  listCSS: object = {}
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dialog: DialogUtil, public http: HttpServices, public storage: StorageUtils) {
    this.beginTime = new Date().toISOString().substring(0, 10);
    this.endTime = new Date().toISOString().substring(0, 10);
    this.listCSS = {
      "height" : ((window.innerHeight - 238)*0.95 - 50).toString() + 'px',
      "width" : "150rem"
    } 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchSaleDetailPage');
  }

  requestData() {
    let content = {
      StationID: CacheData.stationId,
      StartDate: this.beginTime,
      EndDate: this.endTime,
      NameOrIDCardNoOrTel: this.otherMessage
    }
    this.http.postRequest<Array<BusSaleDetailItem>>(CommandKeys.searchBusSaleDetail, content, value => {
      if (value.success) {
        this.dataArray = value.object;
        if (this.dataArray.length == 0) {
          this.dialog.showAtMiddleToast('未查询到相关结果！');
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
    if (!this.beginTime || !this.endTime || !this.otherMessage) {
      this.dialog.showAtMiddleToast('请填写必要信息！');
      return;
    }
    this.requestData();
  }
}
