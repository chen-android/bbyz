import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

import { BusSaleItem } from '../../../module/BusSaleItem';
import { SchemItem } from '../../../module/SchemItem';
import { HttpServices } from '../../../providers/http/http.service';
import { CacheData } from '../../../providers/storage/CacheData';
import { CommandKeys } from '../../../utils/CommandKeys';
import { DialogUtil } from '../../../utils/DialogUtil';
import { StorageUtils } from '../../../providers/storage/StorageUtils';

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
  listCSS: object = {}
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: HttpServices, public dialog: DialogUtil, public storage: StorageUtils) {
    this.schem = this.navParams.get("schem");
    this.listCSS = {
      "height": ((window.innerHeight - 126) * 0.95 - 50).toString() + 'px',
      "width": "110rem"
    }
  }

  ionViewDidLoad() {
    this.requestData();
  }


  requestData() {

    let content = {
      "StationID": CacheData.stationId,
      "SchemID": this.schem.SchemID
    };
    this.http.postRequest<Array<BusSaleItem>>(CommandKeys.searchBusSale, content, value => {
      if (value.success) {
        this.dataArray = value.object;
        if (this.dataArray.length == 0) {
          this.dialog.showAtMiddleToast('暂无该车次售票信息');
        }
        this.storage.hasShowTableTip().then(hasShow => {
          if (!hasShow) {
            this.dialog.showAtMiddleToast("信息不完整？试试左右滑动");
            this.storage.setHasShowTableTip(true);
          }
        })
      }
      return false;
    });
  }

}
