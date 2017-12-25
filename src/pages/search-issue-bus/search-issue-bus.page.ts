import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServices } from '../../providers/http/http.service';
import { BusIssueItem } from '../../module/BusIssueItem';
import { CacheData } from '../../providers/storage/CacheData';
import { CommandKeys } from '../../utils/CommandKeys';
import { DialogUtil } from '../../utils/DialogUtil';

/**
 * Generated class for the SearchIssueBusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-issue-bus',
  templateUrl: 'search-issue-bus.page.html',
})
export class SearchIssueBusPage {
  driveDate: string;
  stopNo: string;
  dataArray: Array<BusIssueItem>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServices, public dialog: DialogUtil) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchIssueBusPage');
  }
  requestData() {
    let content = {
      StationID: CacheData.stationId,
      DriveDate: this.driveDate,
      StopNo: this.stopNo
    }
    this.http.postRequest<Array<BusIssueItem>>(CommandKeys.searchIssueBus,content,value => {
      if (value.success) {
        this.dataArray = value.object;
        if (this.dataArray.length == 0) {
          this.dialog.showAtMiddleToast("未查询到相关信息！");
        }
      }
      return false
    })
  }
  searchAction() {
    if (!this.driveDate || !this.stopNo) {
      this.dialog.showAtMiddleToast("请填写必要信息！");
      return;
    }
    this.requestData();
  }
}
