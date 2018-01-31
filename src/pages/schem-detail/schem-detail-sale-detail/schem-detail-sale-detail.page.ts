import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

import { BusSaleItem } from '../../../module/BusSaleItem';
import { SchemItem } from '../../../module/SchemItem';
import { HttpServices } from '../../../providers/http/http.service';
import { CacheData } from '../../../providers/storage/CacheData';
import { CommandKeys } from '../../../utils/CommandKeys';
import { DialogUtil } from '../../../utils/DialogUtil';

/**
 * 
 * 查询车次售票
 */

@IonicPage()
@Component({
    selector: 'page-schem-detail-sale-detail',
  templateUrl: 'schem-detail-sale-detail.page.html',
})
export class SchemDetailSaleDetailPage {
  schem: SchemItem;
  dataArray: Array<BusSaleItem> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServices, public dialog: DialogUtil) {
    this.schem = this.navParams.get("schem");
  }

  requestData() {

    let content = {
      "StationID": CacheData.stationId,
      "SchemID": this.schem.SchemID
    };
    this.http.postRequest<Array<BusSaleItem>>(CommandKeys.searchBusSale, content, value => {
      if (value.success) {
        let list = value.object;
        if (list.length == 0) {
          this.dialog.showAtMiddleToast('暂无该车次售票信息');
        }
        this.dataArray = list;
      }
      return false;
    });
  }

  ionViewDidLoad() {
    this.requestData();
  }
}