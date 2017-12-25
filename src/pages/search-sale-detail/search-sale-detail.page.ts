import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BusSaleDetailItem } from '../../module/BusSaleDetailItem';
import { HttpServices } from '../../providers/http/http.service';
import { CacheData } from '../../providers/storage/CacheData';
import { CommandKeys } from '../../utils/CommandKeys';
import { DialogUtil } from '../../utils/DialogUtil';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public dialog: DialogUtil, public http: HttpServices) {
  }

  requestData() {
    let content = {
      StationID: CacheData.stationId,
      StartDate: this.beginTime,
      EndDate: this.endTime,
      NameOrIDCardNoOrTel: this.otherMessage
    }
    this.http.postRequest<Array<BusSaleDetailItem>>(CommandKeys.searchBusSaleDetail,content,value => {
      if (value.success) {
        this.dataArray = value.object;
        if (this.dataArray.length == 0) {
          this.dialog.showAtMiddleToast('未查询到相关结果！');
        }
      }
      return false;
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchSaleDetailPage');
  }
  searchAction() {
    if (!this.beginTime || !this.endTime || !this.otherMessage) {
      this.dialog.showAtMiddleToast('请填写必要信息！');
      return;
    }
    this.requestData();
  }
}
