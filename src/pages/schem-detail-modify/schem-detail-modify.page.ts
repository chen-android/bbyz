import { ToastUtil } from './../../utils/ToastUtil';
import { BusType } from './../../module/BusType';
import { CommandKeys } from './../../utils/CommandKeys';
import { HttpServices } from './../../providers/http/http.service';
import { SchemItem } from './../../module/SchemItem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CacheData } from '../../providers/storage/CacheData';

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
    busTypeList: Array<BusType>;
    selectedBusType: BusType;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServices,
        public action: ActionSheetController, public toast: ToastUtil) {
        this.schem = this.navParams.get("schem");
        this.selectTime = this.schem.DriveTime.substring(11, 16);
        this.startSeatNo = this.schem.StartSeatNo;
        this.totalSeatNum = this.schem.TotalSeatNum;
        this.checkGateNo = this.schem.CheckGateNo;
        this.isForcePass = this.schem.IsForcePass == 1;
        this.schemType = this.schem.SchemTypeCode;
    }

    ionViewDidLoad() {
        this.requestBusType(false);
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
                this.toast.showAtMiddle("起座号必须在0-100之间");
                return;
            }
            if (this.totalSeatNum < 0 || this.totalSeatNum > 100) {
                this.toast.showAtMiddle("座位数必须在0-100之间");
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
                if(value.success){
                    this.toast.showAtMiddle("修改成功",800);
                    setTimeout(() => {
                        this.navCtrl.pop();
                    }, 800);
                }
                return false;
            });
        }else{
            this.navCtrl.pop();
        }
    }
    cancelClick() {
        this.navCtrl.pop();
    }
    busTypeClick() {
        if (this.busTypeList && this.busTypeList.length > 0) {
            this.showBusTypeDialog();
        } else {
            this.requestBusType(true);
        }
    }

    requestBusType(showTypeDialog: boolean) {
        this.http.postRequest<Array<BusType>>(CommandKeys.busType, { StationID: CacheData.stationId }, value => {
            if (value.success) {
                this.busTypeList = value.object;
                if (!this.selectedBusType) {
                    this.selectedBusType = this.busTypeList.find((value) => {
                        if (value.BusTypeName == this.schem.BusTypeName) {
                            return true;
                        }
                    });
                }
                if (showTypeDialog) {
                    this.showBusTypeDialog();
                }
            }
            return false;
        })
    }
    showBusTypeDialog() {
        let bts = [];
        this.busTypeList.forEach((value, index) => {
            bts[index] = {
                text: value.BusTypeName,
                handler: () => {
                    this.selectedBusType = value;
                }
            }
        });
        bts[bts.length] = {
            text: "取消",
            role: "cancel",

        }
        this.action.create({
            buttons: bts,
            enableBackdropDismiss: true
        }).present();
    }
}
