import { AlertController, ToastController, Alert } from 'ionic-angular';
import { Injectable } from "@angular/core";

@Injectable()
export class DialogUtil {
    constructor(public alert: AlertController, public toast: ToastController) { }

    public simpleMessageDialog(msg: string, confirmHandler: () => void){
        this.simpleTitleMessageDialog(null,msg,confirmHandler);
    }

    public simpleTitleMessageDialog(t:string,msg: string, confirmHandler: () => void):Alert {
        let dialog = this.alert.create({
            title:t,
            message: msg,
            buttons: [
                {
                    text:"确定",
                    handler:()=>{
                        confirmHandler();
                        dialog.dismiss();
                        return false;
                    }
                },
                {
                    text:"取消",
                    role:"cancel"
                }
            ],
            enableBackdropDismiss:false
        });
        dialog.present();
        return dialog;
    }

    public showAtMiddleToast(msg: string, duration = 1800):Promise<any> {
        return this.toast.create({
            message: msg,
            position: "middle",
            duration: duration,
            cssClass: 'text-align: center',
            dismissOnPageChange:false
        }).present();
    }
    public showAtBottomToast(msg: string, duration = 1800): Promise<any> {
        return this.toast.create({
            message: msg,
            position: "bottom",
            duration: duration,
            cssClass: 'text-align: center',
            dismissOnPageChange: false
        }).present();
    }

    public showUpgradeDialot(cancel:()=>void):Alert{
        let dialog = this.alert.create({
            title: '下载进度：0%',
            buttons: [
                {
                    text: "取消",
                    role: "cancel",
                    handler: cancel
                }
            ],
            enableBackdropDismiss: false
        });
        dialog.present();
        return dialog;
    }
}