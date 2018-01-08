import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CloseReason } from '../../module/CloseReason';
import { SchemItem } from '../../module/SchemItem';
import { CacheData } from '../../providers/storage/CacheData';
import { CommandKeys } from '../../utils/CommandKeys';
import { DialogUtil } from '../../utils/DialogUtil';
import { HttpServices } from './../../providers/http/http.service';

/**
 * Generated class for the SchemDetailShiftClosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-schem-detail-shift-close',
    templateUrl: 'schem-detail-shift-close.page.html',
})
export class SchemDetailShiftClosePage {
    schem: SchemItem
    closeReason: string;
    reasons: Array<CloseReason>;
    otherReason:string;
    constructor(public navCtrl: NavController, public navParams: NavParams,public dialog: DialogUtil,
        public http: HttpServices) {
        this.schem = navParams.get("schem");
        this.closeReason = "正常停班";
    }
    ionViewDidLoad() {
        this.requestCloseReason();
    }
    reasonClick(r:CloseReason){
        this.otherReason = r.ReasonName;
    }
    confirmClick() {
        this.dialog.simpleMessageDialog("确定对该班次停班？", () => {
            this.requestShiftClose();
        });
    }
    cancelClick(){
        this.navCtrl.pop();
    }
    requestCloseReason(){
        let content = {
            "StationID": CacheData.stationId,
            "ReasonTypeCode": "2"
        };
        this.http.postRequest<Array<CloseReason>>(CommandKeys.closeReason,content,value=>{
            if(value.success){
                this.reasons = value.object;
                if(this.reasons){
                    this.reasons = this.reasons.sort((a,b)=>{
                        if(a.UseTimes > b.UseTimes){
                            return -1;
                        }else if(a.UseTimes == b.UseTimes){
                            return 0;
                        }else{
                            return 1;
                        }
                    });
                    if(this.reasons.length>10){
                        this.reasons.splice(10,this.reasons.length-10);
                    }
                }
            }
            return false;
        });
    }
    requestShiftClose() {
        let content = {
            "StationID": CacheData.stationId,
            "SchemID": this.schem.SchemID,
            "Reason":this.closeReason
        };
        this.http.postRequest(CommandKeys.shiftClose, content, value => {
            if (value.success) {
                this.schem.IsRun = 0;
                this.navCtrl.pop();
            }
            return false;
        });
    }
}
