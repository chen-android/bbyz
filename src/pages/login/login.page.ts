import { EncryptUtils } from './../../utils/EncryptUtils';
import { StorageUtils } from './../../providers/storage/StorageUtils';
import { MainMenu } from './../main/main.menu';
import { User } from './../../module/User';
import { CommandKeys } from './../../utils/CommandKeys';
import { HttpServices } from './../../providers/http/http.service';
import { StorageKeys } from './../../utils/StorageKeys';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CacheData } from '../../providers/storage/CacheData';
import CryptoJS from "crypto-js";
/**
 * 登录页
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.page.html',
})
export class LoginPage {
    id: string;
    pwd: string;
    saveCheck: boolean;
    isDebug:boolean ;
    path:string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageUtils, 
        public http: HttpServices,public toast:ToastController,public encrypt:EncryptUtils) {
    }

    ionViewDidLoad() {
        this.isDebug = CacheData.isDebug;
        this.storage.getUser().then(value => {
            if (value) {
                this.id = value["WorkerNo"];
                this.saveCheck = true;
            }
        });
    }
    login() {
        this.http.postRequest1<User>(CommandKeys.login,this.id,{"Password":this.pwd},value=>{
            if (value.success){
                let user = value.object;
                CacheData.id = this.id;
                if (this.saveCheck) {
                    this.storage.setUser(user);
                }
                this.toast.create({
                    message:'登录成功',
                    position:"middle",
                    duration:800
                }).present();
                setTimeout(() => {
                    this.navCtrl.setRoot(MainMenu);
                }, 800);
            }
        });
        
    }

    setPath(){
        CacheData.url = this.path + "/api/Mobile";
        this.toast.create({
            message: '设置成功',
            position: "middle",
            duration: 800
        }).present();
    }
}
