import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
@Injectable()
export class ToastUtil {
    constructor(public toast: ToastController) { }
    public showAtMiddle(msg: string, duration = 1800) {
        this.toast.create({
            message: msg,
            position: "middle",
            duration: duration
        }).present();
    }
    public showAtBottom(msg: string, duration = 1800) {
        this.toast.create({
            message: msg,
            position: "bottom",
            duration: duration
        }).present();
    }
}