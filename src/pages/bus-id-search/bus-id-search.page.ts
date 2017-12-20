import { CacheData } from '../../providers/storage/CacheData';
import { CommandKeys } from '../../utils/CommandKeys';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BusId } from '../../module/BusId';
import { HttpServices } from '../../providers/http/http.service';

/**
 * Generated class for the BusIdSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bus-id-search',
  templateUrl: 'bus-id-search.page.html',
})
export class BusIdSearchPage {
  typeList: Array<BusId>;
  allList: Array<BusId>;
  searchCallBack: (params: BusId) => Promise<string>;
  licenseNo: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServices) {
    this.searchCallBack = navParams.get("callback");
    this.licenseNo = navParams.get("licenseNo");
  }

  ionViewDidLoad() {
    this.requestBusType();
  }
  requestBusType() {
    this.http.postRequest<Array<BusId>>(CommandKeys.busId, { StationID: CacheData.stationId }, value => {
      if (value.success) {
        this.allList = value.object;
        if (this.allList) {
          this.allList.reverse();
          let index = this.allList.findIndex((value) => {
            if (value.LicenseNo == this.licenseNo) {
              return true;
            }
            return false;
          });
          if (index > 0) {
            this.allList.push(this.allList.splice(index, 1)[0]);
          }
          this.allList.reverse();
        }
        this.setData();
      }
      return false;
    })
  }
  setData() {
    this.typeList = this.allList;
  }
  searchInput(ev: any) {
    this.setData();
    let s: string = ev.target.value;
    if (this.typeList != undefined && s && s.trim() != "") {
      this.typeList = this.typeList.filter(value => {
        return value.LicenseNo.includes(s)||value.CompanyName.includes(s);
      })
    }
  }
  itemClick(s: BusId) {
    this.searchCallBack(s).then(value => {
      this.navCtrl.pop();
    });
  }
}
