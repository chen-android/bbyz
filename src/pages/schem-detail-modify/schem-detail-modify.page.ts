import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { CacheData } from '../../providers/storage/CacheData';
import { DialogUtil } from '../../utils/DialogUtil';
import { BusTypeSearchPage } from '../bus-type-search/bus-type-search.page';
import { BusType } from './../../module/BusType';
import { SchemItem } from './../../module/SchemItem';
import { HttpServices } from './../../providers/http/http.service';
import { CommandKeys } from './../../utils/CommandKeys';

/**
 * Generated class for the SchemDetailModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-schem-detail-modify',
    templateUrl: 'schem-detail-modify.page.html',
})
export class SchemDetailModifyPage {
    schem: SchemItem;
    selectTime: string;
    startSeatNo: number;
    totalSeatNum: number;
    checkGateNo: string;
    schemType: number;
    isForcePass: boolean;
    selectedBusType: BusType;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServices,
        public action: ActionSheetController, public dialog: DialogUtil) {
        this.schem = this.navParams.get("schem");
        this.selectTime = this.schem.DriveTime.substring(11, 16);
        this.startSeatNo = this.schem.StartSeatNo;
        this.totalSeatNum = this.schem.TotalSeatNum;
        this.checkGateNo = this.schem.CheckGateNo;
        this.isForcePass = this.schem.IsForcePass == 1;
        this.schemType = this.schem.SchemTypeCode;
        this.selectedBusType = new BusType();
        this.selectedBusType.BusTypeName = this.schem.BusTypeName;
    }

    ionViewDidLoad() {
    }
    confirmClick() {
        let keyNo: Array<string> = new Array();
        let value: Array<string | number> = new Array();
        if (this.schemType != this.schem.SchemTypeCode) {
            keyNo.push("0");
            value.push(this.schemType);
        }
        if (this.selectTime != this.schem.DriveTime.substring(11, 16)) {
            keyNo.push("1");
            value.push(this.selectTime);
        }
        if (this.checkGateNo != this.schem.CheckGateNo) {
            keyNo.push("2");
            value.push(this.checkGateNo);
        }
        if (this.selectedBusType && this.selectedBusType.BusTypeName != this.schem.BusTypeName) {
            keyNo.push("3");
            value.push(this.selectedBusType.BusTypeID);
        }
        if ((!this.isForcePass && this.schem.IsForcePass == 1) ||
            (this.isForcePass && this.schem.IsForcePass != 1)) {
            keyNo.push("4");
            value.push(this.isForcePass ? 1 : 0);
        }
        if (this.startSeatNo != this.schem.StartSeatNo ||
            this.totalSeatNum != this.schem.TotalSeatNum) {
            if (this.startSeatNo < 0 || this.startSeatNo > 100) {
                this.dialog.showAtMiddleToast("起座号必须在0-100之间");
                return;
            }
            if (this.totalSeatNum < 0 || this.totalSeatNum > 100) {
                this.dialog.showAtMiddleToast("座位数必须在0-100之间");
                return;
            }
            keyNo.push("5");
            value.push(this.startSeatNo + "|" + this.totalSeatNum);
        }
        if (keyNo.length > 0) {
            let content = {
                "StationID": CacheData.stationId,
                "SchemID": this.schem.SchemID,
                "FieldTypeNo": keyNo.join(","),
                "Value": value.join(",")
            };
            this.http.postRequest(CommandKeys.modifySchem, content, value => {
                if (value.success) {
                    this.schem.SchemTypeCode = this.schemType;
                    this.schem.SchemType = this.schemType == 1?"正班":"加班";
                    this.schem.DriveTime = this.schem.DriveTime.replace(this.schem.DriveTime.substring(11, 16), this.selectTime);
                    this.schem.CheckGateNo = this.checkGateNo;
                    this.schem.BusTypeName = this.selectedBusType.BusTypeName;
                    this.schem.IsForcePass = this.isForcePass ? 1 : 0;
                    this.schem.StartSeatNo = this.startSeatNo;
                    this.schem.TotalSeatNum = this.totalSeatNum;
                    this.schem.LeastSeatNum = this.totalSeatNum - this.schem.SaledNum-this.schem.ReserveNum;
                    this.dialog.showAtMiddleToast("修改成功", 800);
                    setTimeout(() => {
                        this.navCtrl.pop();
                    }, 800);
                }
                return false;
            });
        } else {
            this.navCtrl.pop();
        }
    }
    cancelClick() {
        this.navCtrl.pop();
    }
    busTypeClick() {
        this.navCtrl.push(BusTypeSearchPage, {
            callback: (busType: BusType) => {
                return new Promise((resolve) => {
                    this.selectedBusType = busType;
                    resolve("ok");
                });
            },
            busTypeName: this.schem.BusTypeName
        });
    }
}
