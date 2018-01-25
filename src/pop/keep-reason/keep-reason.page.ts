import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { ViewController } from 'ionic-angular/navigation/view-controller';

import { CloseReason } from '../../module/CloseReason';
import { HttpServices } from '../../providers/http/http.service';
import { CacheData } from '../../providers/storage/CacheData';
import { CommandKeys } from '../../utils/CommandKeys';
import { EventKeys } from '../../utils/EventKeys';

@IonicPage()
@Component({
    selector: 'page-keep-reason',
    templateUrl: 'keep-reason.page.html'
})
export class KeepReasonPage {
    reasons: Array<CloseReason>;
    historyReasons: Array<Array<CloseReason>>;
    reason:string;
    constructor(public viewCtrl: ViewController, public http: HttpServices) {

    }
    ionViewDidLoad() {
        this.requestKeepHistoryReason();
    }
    reasonClick(r:CloseReason){
        this.reason = r.ReasonName;
    }
    confirmClick(){
        this.viewCtrl.dismiss(this.reason);
    }
    cancelClick(){
        this.viewCtrl.dismiss(EventKeys.conponentCancel);
    }
    requestKeepHistoryReason() {
        let content = {
            "StationID": CacheData.stationId,
            "ReasonTypeCode": "1"
        };
        this.http.postRequest<Array<CloseReason>>(CommandKeys.closeReason, content, value => {
            if (value.success) {
                this.reasons = value.object;
                if (this.reasons) {
                    this.reasons = this.reasons.sort((a, b) => {
                        if (a.UseTimes > b.UseTimes) {
                            return -1;
                        } else if (a.UseTimes == b.UseTimes) {
                            return 0;
                        } else {
                            return 1;
                        }
                    });
                    if (this.reasons.length > 4) {
                        this.reasons.splice(4, this.reasons.length - 4);
                    }
                    this.historyReasons = new Array();
                    let a: Array<CloseReason>;
                    for (let index = 0; index < this.reasons.length; index++) {
                        if (index % 2 == 0) {
                            a = new Array();
                        }
                        a.push(this.reasons[index]);
                        if (index % 2 == 1) {
                            this.historyReasons.push(a);
                        }
                    }
                    console.info(this.historyReasons);
                }
            }
            return false;
        });
    }
}