import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DebugLog } from '../../../module/DebugLog';

@Component({
    selector: 'page-log',
    templateUrl: 'log.html'
})
export class LogPage {
    data:string;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        let log = navParams.data as DebugLog
        this.data = log.log;
    }
}