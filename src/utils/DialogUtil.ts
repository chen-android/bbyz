import { AlertController, ToastController } from 'ionic-angular';
import { Injectable } from "@angular/core";

@Injectable()
export class DialogUtil {
    constructor(public alert: AlertController, public toast: ToastController) { }
    public simpleMessageDialog(msg: string, confirmHandler: () => void) {
        let dialog = this.alert.create({
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
    }

    public showAtMiddleToast(msg: string, duration = 1800):Promise<any> {
        return this.toast.create({
            message: msg,
            position: "middle",
            duration: duration,
            dismissOnPageChange:false
        }).present();
    }
    public showAtBottomToast(msg: string, duration = 1800): Promise<any> {
        return this.toast.create({
            message: msg,
            position: "bottom",
            duration: duration,
            dismissOnPageChange: false
        }).present();
    }
}