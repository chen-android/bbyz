import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CacheData } from '../../providers/storage/CacheData';
import { HttpServices } from '../../providers/http/http.service';
import { BusSaleItem } from '../../module/BusSaleItem';
import { CommandKeys } from '../../utils/CommandKeys';
import { SchemItem } from '../../module/SchemItem';
import { DialogUtil } from '../../utils/DialogUtil';

/**
 * 
 * 查询车次售票
 */

@IonicPage()
@Component({
  selector: 'page-search-bus-sale',
  templateUrl: 'search-bus-sale.page.html',
})
export class SearchBusSalePage {
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
