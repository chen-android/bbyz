import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Scroll } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

import { BusIssueItem } from '../../../module/BusIssueItem';
import { HttpServices } from '../../../providers/http/http.service';
import { CacheData } from '../../../providers/storage/CacheData';
import { CommandKeys } from '../../../utils/CommandKeys';
import { DialogUtil } from '../../../utils/DialogUtil';
import { Site } from '../../../module/Site';
import { StorageUtils } from '../../../providers/storage/StorageUtils';



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
  @ViewChild('headerScroll') headerScroll: Scroll;
  @ViewChild('contentScroll') contentScroll: Scroll;

  driveDate: string;
  stopNo: string;
  dataArray: Array<BusIssueItem>;
  showTip: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServices, public dialog: DialogUtil, public storage: StorageUtils) {
    this.driveDate = new Date().toISOString().substring(0, 10);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchIssueBusPage');
    let that = this;
    this.contentScroll.addScrollEventListener(function (event: any) {
      that.headerScroll._scrollContent.nativeElement.scrollLeft = event.target.scrollLeft;
    })
  }
  /**
   * 获取站点代码
   */
  getStopNo() {
    this.navCtrl.push("SiteSearchPage", {
      "site": this.stationCallBack
    })
  }

  stationCallBack = (params: Site) => {
    return new Promise((resolve, reject) => {
      if (typeof (params) != "undefined") {
        this.stopNo = params.StopNo;
        resolve("ok");
      } else {
        reject(Error("params error"));
      }
    });
  }
  requestData() {
    let content = {
      StationID: CacheData.stationId,
      DriveDate: this.driveDate,
      StopNo: this.stopNo
    }
    this.http.postRequest<Array<BusIssueItem>>(CommandKeys.searchIssueBus, content, value => {
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
