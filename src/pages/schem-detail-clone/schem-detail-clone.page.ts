import {CacheData} from '../../providers/storage/CacheData';
import { HttpServices } from './../../providers/http/http.service';
import { SchemItem } from './../../module/SchemItem';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CommandKeys } from '../../utils/CommandKeys';
import { BusType } from '../../module/BusType';

/**
 * Generated class for the SchemDetailClonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-schem-detail-clone',
    templateUrl: 'schem-detail-clone.page.html',
})
export class SchemDetailClonePage {
    schem: SchemItem;
    selectTime:string;
    startSeatNo:number;
    totalSeatNum:number;
    busTypeList: Array<BusType>;
    selectedBusType: BusType;
    checkGateNo:string;
    schemType:number;
    isRun:number;
    constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpServices,public action:ActionSheetController) {
        this.schem = this.navParams.get("schem");
        this.selectTime = this.schem.DriveTime.substring(11, 16);
    }

    ionViewDidLoad() {
        
    }
    busTypeClick(){

    }
    confirmClick(){

    }
    cancelClick(){
        
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
