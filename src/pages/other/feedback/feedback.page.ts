import { CommandKeys } from './../../../utils/CommandKeys';
import { HttpServices } from './../../../providers/http/http.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-feedback',
    templateUrl: 'feedback.page.html',
})
export class FeedbackPage {
    feedbackMsg:string;
    constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpServices,public toast:ToastController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FeedbackPage');
    }
    commit() {
        // this.http.postRequest(CommandKeys.feedback,{"Message":this.feedbackMsg},value=>{
        //     if(value&&value.success){
        //         this.toast.create({
        //             message:"感谢您的反馈",
        //             duration:1000
        //         }).present();
        //         this.navCtrl.pop();
        //     }
        // })
        this.toast.create({
            message: '感谢您的反馈',
            duration: 800,
            position: 'middle'
        }).present();
        this.navCtrl.pop();
    }
}
