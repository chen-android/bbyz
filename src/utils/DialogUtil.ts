import { AlertController } from 'ionic-angular';
import { Injectable } from "@angular/core";

@Injectable()
export class DialogUtil {
    constructor(public alert: AlertController) { }
    public simpleMessageDialog(msg: string, confirmHandler: () => void) {
        let dialog = this.alert.create({
            message: msg,
            buttons: [
                {
                    text:"确定",
                    handler:()=>{
                        confirmHandler();
                        dialog.dismiss();
                    }
                },
                {
                    text:"取消",
                    role:"cancel"
                }
            ]
        });
        dialog.present();
    }
}