import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { DialogUtil } from '../../../utils/DialogUtil';
import { HttpServices } from './../../../providers/http/http.service';
import { CommandKeys } from './../../../utils/CommandKeys';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-feedback',
    templateUrl: 'feedback.page.html',
})
export class FeedbackPage {
    feedbackMsg: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServices,
        public dialog: DialogUtil) {
    }

    ionViewDidLoad() {

    }
    commit() {
        if (this.feedbackMsg && this.feedbackMsg.length >= 4) {
            this.http.postRequest(CommandKeys.feedback, { "Message": this.feedbackMsg }, value => {
                if (value.success) {
                    this.dialog.showAtMiddleToast("感谢您的反馈", 800);
                    setTimeout(() => {
                        this.navCtrl.pop();
                    }, 800);
                }
                return false;
            })
        }else{
            this.dialog.showAtMiddleToast("请输入反馈内容，不少于4个字");
        }
    }
}
