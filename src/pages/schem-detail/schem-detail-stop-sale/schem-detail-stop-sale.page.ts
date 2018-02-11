import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

import { BusStop } from '../../../module/BusStop';
import { SchemItem } from '../../../module/SchemItem';
import { HttpServices } from '../../../providers/http/http.service';
import { CacheData } from '../../../providers/storage/CacheData';
import { CommandKeys } from '../../../utils/CommandKeys';
import { DialogUtil } from '../../../utils/DialogUtil';

/**
 * Generated class for the SchemDetailStopSalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-schem-detail-stop-sale',
    templateUrl: 'schem-detail-stop-sale.page.html',
})
export class SchemDetailStopSalePage {
    schem: SchemItem;
    stopList: Array<BusStop>;
    statusList: Array<boolean> = new Array();
    noList: Array<string> = new Array();
    valueList: Array<string> = new Array();
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServices,
        public dialog: DialogUtil) {
        this.schem = navParams.get("schem");
    }

    ionViewDidLoad() {
        this.requestStopStatus();

    }
    requestStopStatus() {
        this.http.postRequest<Array<BusStop>>(CommandKeys.stopList, { StationID: CacheData.stationId, SchemID: this.schem.SchemID }, value => {
            if (value.success) {
                this.stopList = value.object;
                this.stopList.forEach((value) => {
                    this.statusList.push(value.Enable != 0);
                });
            }
            return false;
        });
    }
    confirmClick() {
        let tLength = 0;
        let kLength = 0;
        this.stopList.forEach((value, index) => {
            if (value.Enable == 0) {
                if (this.statusList[index]) {
                    /* 原来停售，改为可售 */
                    this.noList.push(value.StopNo);
                    this.valueList.push("1");
                    kLength++;
                }
            } else {
                if (!this.statusList[index]) {
                    /* 原来可售，改为停售 */
                    this.noList.push(value.StopNo);
                    this.valueList.push("0");
                    tLength++;
                }
            }
        });
        if (tLength + kLength > 0) {
            let msg = "";
            if (tLength > 0) {
                msg += " 停止售票" + tLength + "个站点 ";
            }
            if (kLength > 0) {
                msg += " 开启售票 " + kLength + "个站点 ";
            }
            this.dialog.simpleMessageDialog(msg, () => {
                this.requestStopSale();
            });
        }

    }
    cancelClick() {
        this.navCtrl.pop();
    }
    requestStopSale() {
        let content = {
            StationID: CacheData.stationId,
            SchemID: this.schem.SchemID,
            StopNo: this.noList.join(",").toString(),
            Enable: this.valueList.join(",").toString()
        };
        this.http.postRequest(CommandKeys.stopSchem, content, value => {
            if (value.success) {
                this.dialog.showAtMiddleToast("操作成功", 800).then(value=>{
                    setTimeout(() => {
                        this.navCtrl.pop();
                    }, 800);
                });
            }
            return false;
        });
    }

}
