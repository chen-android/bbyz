import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DebugLog } from '../../../module/DebugLog';
import { LogUtil } from '../../../utils/LogUtil';

@Component({
    selector: 'page-log-menu',
    templateUrl: 'log-menu.html'
})
export class LogMenuPage {
    requestLogs: Array<DebugLog>;
    responseLogs: Array<DebugLog>;
    constructor(public navCtrl: NavController, public navParams: NavParams, public log: LogUtil) {
        this.requestLogs = log.requestLogs;
        this.responseLogs = log.responseLogs;
    }
    detail(l:DebugLog){
        this.navCtrl.push('LogPage',l);
    }
}
